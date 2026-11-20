/* Loaded in <head> so a fallback arrival can fade in from the first paint.
   Uses normal document navigation: no fetching/replacing pages or form state. */
(()=>{
 "use strict";
 const root=document.documentElement;
 const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const native='onpageswap' in window && 'onpagereveal' in window;
 const storageKey='barczuk-language-arrival';
 let destination=null,timer=null;
 try{
  const arrival=JSON.parse(sessionStorage.getItem(storageKey)||'null');
  sessionStorage.removeItem(storageKey);
  if(arrival&&arrival.url===location.href&&Date.now()-arrival.at<5000&&!reduced()){
   root.classList.add('language-arriving');
   window.setTimeout(()=>root.classList.remove('language-arriving'),350);
  }
 }catch{/* Storage may be unavailable; links still work normally. */}
 document.addEventListener('click',event=>{
  const link=event.target.closest?.('[data-language-switcher] a');
  if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||
     link.hasAttribute('download')||(link.target&&link.target!=='_self')||
     link.getAttribute('aria-current')==='page'||reduced())return;
  const url=new URL(link.href,location.href);
  if(url.origin!==location.origin||url.href===location.href)return;
  if(destination){event.preventDefault();return;}
  destination=url.href;
  if(native)return;
  event.preventDefault();
  try{sessionStorage.setItem(storageKey,JSON.stringify({url:destination,at:Date.now()}));}catch{}
  root.classList.add('language-leaving');
  timer=window.setTimeout(()=>location.assign(destination),140);
 });
 window.addEventListener('pageswap',event=>{
  if(!destination||reduced())event.viewTransition?.skipTransition();
 });
 // Restoring a page from history must never restore its faded-out state.
 window.addEventListener('pageshow',()=>{
  window.clearTimeout(timer);timer=null;destination=null;
  root.classList.remove('language-leaving');
 });
})();
