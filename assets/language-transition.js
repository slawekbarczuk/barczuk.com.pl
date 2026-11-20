/* Shared R16/R08 navigation: gentle local language transitions and site <-> portal.
   Cross-origin View Transitions are not supported, so use a short CSS fade and an
   eight-second, non-personal first-party arrival marker shared across subdomains.
   Real links, modifier clicks, history, authentication and user motion settings remain native. */
(()=>{
 "use strict";
 const root=document.documentElement;
 const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const native='onpageswap' in window && 'onpagereveal' in window;
 const storageKey='barczuk-navigation-arrival-v2';
 const cookieName='barczuk_navigation_arrival';
 const hosts=['barczuk.com.pl','www.barczuk.com.pl','portal.barczuk.com.pl'];
 const isPortal=host=>host==='portal.barczuk.com.pl';
 const hostKey=host=>host==='www.barczuk.com.pl'?'barczuk.com.pl':host;
 const routeKey=url=>hostKey(url.hostname)+url.pathname;
 const current=new URL(location.href);
 const cookieAttrs='; Path=/; Domain=barczuk.com.pl; SameSite=Lax; Secure';
 let destination=null,timer=null;
 function readArrival(){
  let record=null;
  try{
   if(hosts.includes(current.hostname)){
    const part=document.cookie.split(';').map(x=>x.trim()).find(x=>x.startsWith(cookieName+'='));
    if(part){
     document.cookie=cookieName+'=; Max-Age=0'+cookieAttrs;
     record=JSON.parse(decodeURIComponent(part.slice(cookieName.length+1)));
    }
   }
  }catch{/* Cookies are optional; do not affect navigation. */}
  try{
   const saved=sessionStorage.getItem(storageKey);
   sessionStorage.removeItem(storageKey);
   if(!record&&saved)record=JSON.parse(saved);
  }catch{/* Storage may be unavailable. */}
  return Boolean(record&&record.key===routeKey(current)&&
   Date.now()-record.at>=0&&Date.now()-record.at<8000);
 }
 if(readArrival()&&!reduced()){
  root.classList.add('language-arriving');
  window.setTimeout(()=>root.classList.remove('language-arriving'),600);
 }
 document.addEventListener('click',event=>{
  const link=event.target.closest?.('a[href]');
  if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||
     event.shiftKey||event.altKey||link.hasAttribute('download')||
     (link.target&&link.target!=='_self')||link.getAttribute('aria-current')==='page'||reduced())return;
  let url;
  try{url=new URL(link.href,location.href);}catch{return;}
  if(!['https:','http:'].includes(url.protocol)||url.href===location.href)return;
  const language=Boolean(link.closest?.('[data-language-switcher]'));
  const sameOriginLanguage=language&&url.origin===location.origin;
  const crossPortal=hosts.includes(current.hostname)&&hosts.includes(url.hostname)&&
   hostKey(url.hostname)!==hostKey(current.hostname)&&
   (isPortal(url.hostname)||isPortal(current.hostname));
  if(!sameOriginLanguage&&!crossPortal)return;
  if(destination){event.preventDefault();return;}
  destination=url.href;
  // Native cross-document fade is supported only within the same origin.
  if(sameOriginLanguage&&native)return;
  event.preventDefault();
  const marker={key:routeKey(url),at:Date.now()};
  if(crossPortal){
   try{document.cookie=cookieName+'='+encodeURIComponent(JSON.stringify(marker))+
      '; Max-Age=8'+cookieAttrs;}catch{}
  }else{
   try{sessionStorage.setItem(storageKey,JSON.stringify(marker));}catch{}
  }
  root.classList.add('language-leaving');
  timer=window.setTimeout(()=>location.assign(destination),260);
 });
 window.addEventListener('pageswap',event=>{
  if(!destination||reduced())event.viewTransition?.skipTransition();
 });
 window.addEventListener('pageshow',()=>{
  window.clearTimeout(timer);
  timer=null;
  destination=null;
  root.classList.remove('language-leaving');
 });
})();