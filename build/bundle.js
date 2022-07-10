var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function l(e){e.forEach(t)}function o(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let r,i;function c(e,t){return r||(r=document.createElement("a")),r.href=t,e===r.href}function a(e,t){e.appendChild(t)}function d(e,t,n){e.insertBefore(t,n||null)}function u(e){e.parentNode.removeChild(e)}function f(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function g(e){return document.createElement(e)}function p(e){return document.createTextNode(e)}function m(){return p(" ")}function h(e,t,n,l){return e.addEventListener(t,n,l),()=>e.removeEventListener(t,n,l)}function x(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function b(e,t){t=""+t,e.wholeText!==t&&(e.data=t)}function y(e,t){e.value=null==t?"":t}function w(e){i=e}function v(e){(function(){if(!i)throw new Error("Function called outside component initialization");return i})().$$.on_mount.push(e)}const $=[],k=[],j=[],C=[],_=Promise.resolve();let L=!1;function E(e){j.push(e)}const P=new Set;let B=0;function I(){const e=i;do{for(;B<$.length;){const e=$[B];B++,w(e),T(e.$$)}for(w(null),$.length=0,B=0;k.length;)k.pop()();for(let e=0;e<j.length;e+=1){const t=j[e];P.has(t)||(P.add(t),t())}j.length=0}while($.length);for(;C.length;)C.pop()();L=!1,P.clear(),w(e)}function T(e){if(null!==e.fragment){e.update(),l(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(E)}}const F=new Set;const G="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function O(e,t){-1===e.$$.dirty[0]&&($.push(e),L||(L=!0,_.then(I)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function R(s,r,c,a,d,f,g,p=[-1]){const m=i;w(s);const h=s.$$={fragment:null,ctx:null,props:f,update:e,not_equal:d,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(m?m.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:r.target||m.$$.root};g&&g(h.root);let x=!1;if(h.ctx=c?c(s,r.props||{},((e,t,...n)=>{const l=n.length?n[0]:t;return h.ctx&&d(h.ctx[e],h.ctx[e]=l)&&(!h.skip_bound&&h.bound[e]&&h.bound[e](l),x&&O(s,e)),t})):[],h.update(),x=!0,l(h.before_update),h.fragment=!!a&&a(h.ctx),r.target){if(r.hydrate){const e=function(e){return Array.from(e.childNodes)}(r.target);h.fragment&&h.fragment.l(e),e.forEach(u)}else h.fragment&&h.fragment.c();r.intro&&((b=s.$$.fragment)&&b.i&&(F.delete(b),b.i(y))),function(e,n,s,r){const{fragment:i,on_mount:c,on_destroy:a,after_update:d}=e.$$;i&&i.m(n,s),r||E((()=>{const n=c.map(t).filter(o);a?a.push(...n):l(n),e.$$.on_mount=[]})),d.forEach(E)}(s,r.target,r.anchor,r.customElement),I()}var b,y;w(m)}const{window:M}=G;function S(e,t,n){const l=e.slice();return l[20]=t[n],l}function U(e,t,n){const l=e.slice();return l[23]=t[n],l}function A(e){let t,n,l;return{c(){t=g("p"),n=p("Last update:\n              "),l=p(e[2]),x(t,"class","text-sm text-gray-700 text-center pt-1")},m(e,o){d(e,t,o),a(t,n),a(t,l)},p(e,t){4&t&&b(l,e[2])},d(e){e&&u(t)}}}function z(e){let t,n,l,o=e[20].price[e[23]]+"";return{c(){t=g("span"),n=p(o),l=p("$"),x(t,"class","font-medium pl-2 self-center")},m(e,o){d(e,t,o),a(t,n),a(t,l)},p(e,t){32&t&&o!==(o=e[20].price[e[23]]+"")&&b(n,o)},d(e){e&&u(t)}}}function N(e){let t,n,l,o,s,r,i,c=e[20].sale[e[23]]+"",f=e[20].price[e[23]]+"";return{c(){t=g("span"),n=p(c),l=p("$"),o=m(),s=g("span"),r=p(f),i=p("$"),x(t,"class","font-medium text-blue-700 pl-2 self-center"),x(s,"class","text-sm text-red-700 line-through pl-2 self-center")},m(e,c){d(e,t,c),a(t,n),a(t,l),d(e,o,c),d(e,s,c),a(s,r),a(s,i)},p(e,t){32&t&&c!==(c=e[20].sale[e[23]]+"")&&b(n,c),32&t&&f!==(f=e[20].price[e[23]]+"")&&b(r,f)},d(e){e&&u(t),e&&u(o),e&&u(s)}}}function H(e){let t,n,l,o,s,r;function i(e,t){return e[20].sale?N:z}let f=i(e),p=f(e);return{c(){t=g("div"),n=g("img"),r=m(),p.c(),x(n,"class","h-full"),c(n.src,l=`./flags/${e[23].toLowerCase()}.svg`)||x(n,"src",l),x(n,"alt",o=`${e[23]} Flag`),x(n,"title",s=`${e[23]} Flag`),x(t,"class","flex flex-inline h-5")},m(e,l){d(e,t,l),a(t,n),a(t,r),p.m(t,null)},p(e,r){32&r&&!c(n.src,l=`./flags/${e[23].toLowerCase()}.svg`)&&x(n,"src",l),32&r&&o!==(o=`${e[23]} Flag`)&&x(n,"alt",o),32&r&&s!==(s=`${e[23]} Flag`)&&x(n,"title",s),f===(f=i(e))&&p?p.p(e,r):(p.d(1),p=f(e),p&&(p.c(),p.m(t,null)))},d(e){e&&u(t),p.d()}}}function q(e){let t,n,l,o,s,r,i,f;function p(e,t){return e[20].sale?V:D}let h=p(e),b=h(e);return{c(){t=g("div"),n=m(),l=g("div"),o=g("img"),f=m(),b.c(),x(t,"class","h-[1px] bg-slate-300 w-full"),x(o,"class","h-full"),c(o.src,s=`./flags/${e[4].toLowerCase()}.svg`)||x(o,"src",s),x(o,"alt",r=`${e[4]} Flag`),x(o,"title",i=`${e[4]} Flag`),x(l,"class","flex flex-inline h-5")},m(e,s){d(e,t,s),d(e,n,s),d(e,l,s),a(l,o),a(l,f),b.m(l,null)},p(e,t){16&t&&!c(o.src,s=`./flags/${e[4].toLowerCase()}.svg`)&&x(o,"src",s),16&t&&r!==(r=`${e[4]} Flag`)&&x(o,"alt",r),16&t&&i!==(i=`${e[4]} Flag`)&&x(o,"title",i),h===(h=p(e))&&b?b.p(e,t):(b.d(1),b=h(e),b&&(b.c(),b.m(l,null)))},d(e){e&&u(t),e&&u(n),e&&u(l),b.d()}}}function D(e){let t,n,l,o=e[20].price[e[4]]+"";return{c(){t=g("span"),n=p(o),l=p("$"),x(t,"class","font-medium pl-2 self-center")},m(e,o){d(e,t,o),a(t,n),a(t,l)},p(e,t){48&t&&o!==(o=e[20].price[e[4]]+"")&&b(n,o)},d(e){e&&u(t)}}}function V(e){let t,n,l,o,s,r,i,c=e[20].sale[e[4]]+"",f=e[20].price[e[4]]+"";return{c(){t=g("span"),n=p(c),l=p("$"),o=m(),s=g("span"),r=p(f),i=p("$"),x(t,"class","font-medium text-blue-700 pl-2 self-center"),x(s,"class","text-sm text-red-700 line-through pl-2 self-center")},m(e,c){d(e,t,c),a(t,n),a(t,l),d(e,o,c),d(e,s,c),a(s,r),a(s,i)},p(e,t){48&t&&c!==(c=e[20].sale[e[4]]+"")&&b(n,c),48&t&&f!==(f=e[20].price[e[4]]+"")&&b(r,f)},d(e){e&&u(t),e&&u(o),e&&u(s)}}}function W(e){let t,n,l,s,r,i,y,w,v,$,k,j,C,_,L,E,P,B,I,T=e[20].title+"",F=e[20].category+"",G=Object.keys(e[20].price).slice(0,4),O=[];for(let t=0;t<G.length;t+=1)O[t]=H(U(e,G,t));let R=e[4]&&e[20].price[e[4]]&&q(e);return{c(){t=g("div"),n=g("div"),l=g("img"),y=m(),w=g("div"),v=g("div"),$=p(T),k=m(),j=g("div"),C=p(F),_=m(),L=g("div");for(let e=0;e<O.length;e+=1)O[e].c();E=m(),R&&R.c(),P=m(),x(l,"class","w-full"),c(l.src,s=e[20].image+"_200.jpg")||x(l,"src",s),x(l,"alt",r=e[20].title),x(l,"title",i=e[20].title),x(l,"loading","lazy"),x(v,"class","font-bold text-md line-clamp-2"),x(j,"class","text-sm text-gray-600"),x(w,"class","px-2 py-2 flex-grow"),x(L,"class","px-3 space-y-3 pb-3"),x(n,"class","rounded overflow-hidden hover:shadow-lg border-r border-b border-l border-gray-300 flex-1 flex flex-col"),x(t,"class","cursor-pointer flex flex-col w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 px-1 pb-3"),x(t,"role","listitem")},m(s,r){d(s,t,r),a(t,n),a(n,l),a(n,y),a(n,w),a(w,v),a(v,$),a(w,k),a(w,j),a(j,C),a(n,_),a(n,L);for(let e=0;e<O.length;e+=1)O[e].m(L,null);a(L,E),R&&R.m(L,null),a(t,P),B||(I=h(t,"click",(function(){o(e[9](e[20].url))&&e[9](e[20].url).apply(this,arguments)})),B=!0)},p(t,n){if(e=t,32&n&&!c(l.src,s=e[20].image+"_200.jpg")&&x(l,"src",s),32&n&&r!==(r=e[20].title)&&x(l,"alt",r),32&n&&i!==(i=e[20].title)&&x(l,"title",i),32&n&&T!==(T=e[20].title+"")&&b($,T),32&n&&F!==(F=e[20].category+"")&&b(C,F),32&n){let t;for(G=Object.keys(e[20].price).slice(0,4),t=0;t<G.length;t+=1){const l=U(e,G,t);O[t]?O[t].p(l,n):(O[t]=H(l),O[t].c(),O[t].m(L,E))}for(;t<O.length;t+=1)O[t].d(1);O.length=G.length}e[4]&&e[20].price[e[4]]?R?R.p(e,n):(R=q(e),R.c(),R.m(L,null)):R&&(R.d(1),R=null)},d(e){e&&u(t),f(O,e),R&&R.d(),B=!1,I()}}}function J(t){let n,o,s,r,i,c,w,v,$,k,j,C,_,L,E,P,B,I,T,F,G,O,R,U,z,N,H,q,D,V,J,K,Q,X,Y,Z,ee,te,ne,le,oe,se,re,ie,ce,ae,de,ue,fe,ge,pe=t[2]&&A(t),me=t[5],he=[];for(let e=0;e<me.length;e+=1)he[e]=W(S(t,me,e));return{c(){n=g("main"),o=g("div"),o.innerHTML='<div class="flex items-center justify-between gap-2"><div class="text-4xl" id="BlockInstallClose">x</div> \n      <div class="w-12"><img src="./icons/android/android-launchericon-48-48.png" alt="GOG Regions Price logo"/></div> \n      <div class="max-w-[175px]"><span class="block font-bold">GOG Regions Price</span> \n        <span class="block text-xs">Compare GOG&#39;s prices between all regions (in dollars)</span></div> \n      <div><button id="BlockInstallButton" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Install</button></div></div>',s=m(),r=g("div"),i=g("div"),c=g("div"),w=g("div"),v=g("h1"),v.textContent="GOG Regions Prices",$=m(),k=g("p"),k.innerHTML='If you know of any missing game report it on\n            <a class="text-blue-700 underline" href="https://github.com/RodrigoTomeES/gog-regions-prices">Github</a>',j=m(),pe&&pe.c(),C=m(),_=g("div"),L=g("div"),E=g("label"),E.textContent="Search Term",P=m(),B=g("input"),I=m(),T=g("div"),F=g("button"),F.innerHTML='<span class="absolute left-0 inset-y-0 flex items-center pl-3"></span>\n            Search!',G=m(),O=g("div"),R=g("div");for(let e=0;e<he.length;e+=1)he[e].c();U=m(),z=g("div"),N=g("div"),H=g("button"),q=p("<< First"),V=m(),J=g("button"),K=p("<< Previous"),X=m(),Y=g("div"),Z=g("div"),ee=p(t[0]),te=p("\n          /\n          "),ne=p(t[3]),le=m(),oe=g("div"),se=g("button"),re=p("Next >>"),ce=m(),ae=g("button"),de=p("Last >>"),x(o,"class","hidden bg-white shadow-2xl fixed bottom-0 left-0 right-0 z-50 p-4"),x(o,"id","BlockInstall"),x(v,"class","text-center text-3xl font-extrabold text-gray-900 "),x(k,"class","text-sm text-gray-700 text-center"),x(w,"class","justify-center w-full"),x(E,"for","searchterm"),x(E,"class","sr-only"),x(B,"id","searchterm"),x(B,"name","searchterm"),x(B,"type","text"),B.required=!0,x(B,"class","appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"),x(B,"placeholder","Search for your game!"),x(_,"class","rounded-md shadow-sm -space-y-px"),x(F,"type","submit"),x(F,"class","group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),x(c,"class","block space-y-3 w-full md:w-1/3 py-3"),x(i,"class","w-full flex justify-center"),x(R,"class","flex flex-wrap w-full"),x(R,"role","list"),x(O,"class","flex w-full"),x(O,"id","games"),H.disabled=D=t[0]<=1,x(H,"class","disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),J.disabled=Q=t[0]<=1,x(J,"class","disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),x(N,"class","w-1/3 px-1 inline-flex gap-1"),x(Z,"class","group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),x(Y,"class","w-1/3 px-1"),se.disabled=ie=t[0]>=t[3],x(se,"class","disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),ae.disabled=ue=t[0]>=t[3],x(ae,"class","disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),x(oe,"class","w-1/3 px-1 inline-flex gap-1"),x(z,"class","flex flex-inline w-full mb-2"),x(r,"class","flex flex-wrap justify-center items-center"),x(n,"class","container mx-auto px-3")},m(e,l){d(e,n,l),a(n,o),a(n,s),a(n,r),a(r,i),a(i,c),a(c,w),a(w,v),a(w,$),a(w,k),a(w,j),pe&&pe.m(w,null),a(c,C),a(c,_),a(_,L),a(L,E),a(L,P),a(L,B),y(B,t[1]),a(c,I),a(c,T),a(T,F),a(r,G),a(r,O),a(O,R);for(let e=0;e<he.length;e+=1)he[e].m(R,null);a(r,U),a(r,z),a(z,N),a(N,H),a(H,q),a(N,V),a(N,J),a(J,K),a(z,X),a(z,Y),a(Y,Z),a(Z,ee),a(Z,te),a(Z,ne),a(z,le),a(z,oe),a(oe,se),a(se,re),a(oe,ce),a(oe,ae),a(ae,de),fe||(ge=[h(M,"keydown",t[8]),h(B,"input",t[16]),h(B,"keypress",t[7]),h(F,"click",t[6]),h(H,"click",t[17]),h(J,"click",t[11]),h(se,"click",t[10]),h(ae,"click",t[18])],fe=!0)},p(e,[t]){if(e[2]?pe?pe.p(e,t):(pe=A(e),pe.c(),pe.m(w,null)):pe&&(pe.d(1),pe=null),2&t&&B.value!==e[1]&&y(B,e[1]),560&t){let n;for(me=e[5],n=0;n<me.length;n+=1){const l=S(e,me,n);he[n]?he[n].p(l,t):(he[n]=W(l),he[n].c(),he[n].m(R,null))}for(;n<he.length;n+=1)he[n].d(1);he.length=me.length}1&t&&D!==(D=e[0]<=1)&&(H.disabled=D),1&t&&Q!==(Q=e[0]<=1)&&(J.disabled=Q),1&t&&b(ee,e[0]),8&t&&b(ne,e[3]),9&t&&ie!==(ie=e[0]>=e[3])&&(se.disabled=ie),9&t&&ue!==(ue=e[0]>=e[3])&&(ae.disabled=ue)},i:e,o:e,d(e){e&&u(n),pe&&pe.d(),f(he,e),fe=!1,l(ge)}}}function K(e,t,n){let l,{searchResult:o=[]}=t,{searchTerm:s=""}=t,{games:r=[]}=t,{sales:i=[]}=t,{lastUpdated:c=""}=t,{totalPages:a=-1}=t,{currentPage:d=-1}=t,{userCountry:u=null}=t;async function f(){""==s.trim()?n(13,o=i):(0===r.length&&await fetch("./games.json").then((e=>e.json())).then((e=>{n(14,r=e.sort(((e,t)=>e.title.localeCompare(t.title))))})),n(13,o=r.filter((e=>e.title.toLowerCase().includes(s.trim().toLowerCase()))))),n(3,a=Math.floor(o.length/24)+1),n(0,d=1)}v((async()=>{let e;await fetch("./sales.json").then((e=>e.json())).then((e=>{n(15,i=e.sort(((e,t)=>e.title.localeCompare(t.title)))),n(13,o=i),n(3,a=Math.floor(i.length/24)+1),n(0,d=1)})),await fetch("./lastUpdate.json").then((e=>e.json())).then((e=>{const t=e.last,l=t.substr(8,2),o=t.substr(5,2),s=t.substr(11,5);n(2,c=`${l}/${o} - ${s}`)}));const t=document.getElementById("BlockInstall"),l=document.getElementById("BlockInstallButton"),s=document.getElementById("BlockInstallClose");window.addEventListener("beforeinstallprompt",(n=>{n.preventDefault(),e=n,t.classList.remove("hidden"),console.log("'beforeinstallprompt' event was fired.")})),l.addEventListener("click",(async()=>{t.classList.add("hidden"),e.prompt();const{outcome:n}=await e.userChoice;console.log(`User response to the install prompt: ${n}`),e=null})),s.addEventListener("click",(async()=>{t.classList.add("hidden"),e=null})),window.addEventListener("appinstalled",(()=>{t.classList.add("hidden"),e=null,console.log("PWA was installed")})),n(4,u=navigator.language?.split("-")[1])}));function g(){d<a&&m(1)}function p(){d>1&&m(-1)}function m(e){h(d+e)}function h(e){n(0,d=e),document.getElementById("games").scrollIntoView()}return e.$$set=e=>{"searchResult"in e&&n(13,o=e.searchResult),"searchTerm"in e&&n(1,s=e.searchTerm),"games"in e&&n(14,r=e.games),"sales"in e&&n(15,i=e.sales),"lastUpdated"in e&&n(2,c=e.lastUpdated),"totalPages"in e&&n(3,a=e.totalPages),"currentPage"in e&&n(0,d=e.currentPage),"userCountry"in e&&n(4,u=e.userCountry)},e.$$.update=()=>{8193&e.$$.dirty&&n(5,l=o.slice(24*(d-1),24*d))},[d,s,c,a,u,l,f,e=>{13===e.charCode&&f()},e=>{"searchterm"!==e.target.id&&(37===e.keyCode&&p(),39===e.keyCode&&g())},e=>{window.open(`https://www.gog.com${e}`,"_blank").focus()},g,p,h,o,r,i,function(){s=this.value,n(1,s)},()=>h(1),()=>h(a)]}return new class extends class{$destroy(){!function(e,t){const n=e.$$;null!==n.fragment&&(l(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}{constructor(e){super(),R(this,e,K,J,s,{searchResult:13,searchTerm:1,games:14,sales:15,lastUpdated:2,totalPages:3,currentPage:0,userCountry:4})}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
