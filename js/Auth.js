// ═══════════════════════════════════════════════════════════════
// MockFRCS — Supabase Auth Helper
// ---------------------------------------------------------------
// SETUP: Replace the two values below with your project's details.
// Find them at: https://supabase.com/dashboard → your project →
// Settings → API
// ═══════════════════════════════════════════════════════════════

const SUPABASE_URL = 'https://hrkmxvqtlefnvoxlfcev.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhya214dnF0bGVmbnZveGxmY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NDYxNzMsImV4cCI6MjA5NTMyMjE3M30.C_LfZ2inL2p6_oDIBtQsPwCELg3hT3cwI68UhQOHw4Y';

// ── Initialise client ──────────────────────────────────────────
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Get current session (returns null if not logged in) ────────
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// ── Get current user profile from the `profiles` table ─────────
export async function getProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) console.error('Profile fetch error:', error);
  return data;
}

// ── Check if user has an active membership ─────────────────────
export async function hasMembership(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('membership_expires_at')
    .eq('id', userId)
    .single();
  if (error || !data) return false;
  if (!data.membership_expires_at) return false;
  return new Date(data.membership_expires_at) > new Date();
}

// ── Redirect to login if not authenticated ─────────────────────
export async function requireAuth(redirectTo = '/login.html') {
  const session = await getSession();
  if (!session) {
    window.location.href = redirectTo;
    return null;
  }
  return session;
}

// ── Redirect to login if not authenticated OR no membership ────
export async function requireMembership() {
  const session = await requireAuth();
  if (!session) return null;
  const active = await hasMembership(session.user.id);
  if (!active) {
    window.location.href = '/subscribe.html';
    return null;
  }
  return session;
}

// ── Sign up with email + password ─────────────────────────────
export async function signUp(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${window.location.origin}/login.html?confirmed=1`
    }
  });
  return { data, error };
}

// ── Sign in ───────────────────────────────────────────────────
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

// ── Sign out ──────────────────────────────────────────────────
export async function signOut() {
  await supabase.auth.signOut();
  window.location.href = '/login.html';
}

// ── Password reset ────────────────────────────────────────────
export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password.html`
  });
  return { error };
}
