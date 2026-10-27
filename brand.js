/* MockFRCS — shared UI: mobile nav, scroll-reveal, scroll-progress */
function toggleNav(){var m=document.getElementById('navMob');if(m)m.classList.toggle('open');}
(function(){
  function init(){
    // scroll-reveal
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){
        es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
      },{rootMargin:'0px 0px -8% 0px',threshold:.08});
      document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });
    } else {
      document.querySelectorAll('.reveal').forEach(function(el){ el.classList.add('in'); });
    }
    // scroll progress
    var pr=document.getElementById('progress');
    if(pr){
      var upd=function(){ var h=document.documentElement; var d=h.scrollHeight-h.clientHeight; pr.style.width=(d>0?(h.scrollTop/d*100):0)+'%'; };
      addEventListener('scroll',upd,{passive:true}); upd();
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
