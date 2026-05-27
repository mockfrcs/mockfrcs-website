// ── MockFRCS Supabase Auth Helper ──
const SUPABASE_URL = 'https://hrkmxvqtlefnvoxlfcev.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhya214dnF0bGVmbnZveGxmY2V2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NDYxNzMsImV4cCI6MjA5NTMyMjE3M30.C_LfZ2inL2p6_oDIBtQsPwCELg3hT3cwI68UhQOHw4Y';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Get current user
async function getUser() {
  const { data: { user } } = await db.auth.getUser();
  return user;
}

// Check if user has active membership
async function hasMembership(userId) {
  const { data, error } = await db
    .from('memberships')
    .select('*')
    .eq('user_id', userId)
    .eq('active', true)
    .gt('expires_at', new Date().toISOString())
    .single();
  return !!data && !error;
}

// Redirect if not logged in
async function requireAuth() {
  const user = await getUser();
  if (!user) {
    window.location.href = 'login.html';
    return null;
  }
  return user;
}

// Redirect if not a member
async function requireMembership() {
  const user = await requireAuth();
  if (!user) return null;
  const member = await hasMembership(user.id);
  if (!member) {
    window.location.href = 'pricing.html';
    return null;
  }
  return user;
}

// Sign out
async function signOut() {
  await db.auth.signOut();
  window.location.href = 'index.html';
}
