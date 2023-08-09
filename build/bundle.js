var app=function(){"use strict";function e(){}function t(e){return e()}function n(){return Object.create(null)}function o(e){e.forEach(t)}function s(e){return"function"==typeof e}function l(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}let r;function i(e,t){return e===t||(r||(r=document.createElement("a")),r.href=t,e===r.href)}const c="undefined"!=typeof window?window:"undefined"!=typeof globalThis?globalThis:global;function a(e,t){e.appendChild(t)}function u(e,t,n){e.insertBefore(t,n||null)}function d(e){e.parentNode&&e.parentNode.removeChild(e)}function f(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function p(e){return document.createElement(e)}function g(e){return document.createTextNode(e)}function m(){return g(" ")}function h(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function x(e,t,n){null==n?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function b(e){return""===e?null:+e}function y(e,t){t=""+t,e.data!==t&&(e.data=t)}function w(e,t){e.value=null==t?"":t}let $;function v(e){$=e}function k(e){(function(){if(!$)throw new Error("Function called outside component initialization");return $})().$$.on_mount.push(e)}const _=[],j=[];let C=[];const E=[],L=Promise.resolve();let B=!1;function I(e){C.push(e)}const P=new Set;let F=0;function T(){if(0!==F)return;const e=$;do{try{for(;F<_.length;){const e=_[F];F++,v(e),O(e.$$)}}catch(e){throw _.length=0,F=0,e}for(v(null),_.length=0,F=0;j.length;)j.pop()();for(let e=0;e<C.length;e+=1){const t=C[e];P.has(t)||(P.add(t),t())}C.length=0}while(_.length);for(;E.length;)E.pop()();B=!1,P.clear(),v(e)}function O(e){if(null!==e.fragment){e.update(),o(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(I)}}const G=new Set;function S(e){return void 0!==e?.length?e:Array.from(e)}function M(e,t){const n=e.$$;null!==n.fragment&&(!function(e){const t=[],n=[];C.forEach((o=>-1===e.indexOf(o)?t.push(o):n.push(o))),n.forEach((e=>e())),C=t}(n.after_update),o(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function N(e,t){-1===e.$$.dirty[0]&&(_.push(e),B||(B=!0,L.then(T)),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function R(l,r,i,c,a,u,f,p=[-1]){const g=$;v(l);const m=l.$$={fragment:null,ctx:[],props:u,update:e,not_equal:a,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(r.context||(g?g.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:r.target||g.$$.root};f&&f(m.root);let h=!1;if(m.ctx=i?i(l,r.props||{},((e,t,...n)=>{const o=n.length?n[0]:t;return m.ctx&&a(m.ctx[e],m.ctx[e]=o)&&(!m.skip_bound&&m.bound[e]&&m.bound[e](o),h&&N(l,e)),t})):[],m.update(),h=!0,o(m.before_update),m.fragment=!!c&&c(m.ctx),r.target){if(r.hydrate){const e=function(e){return Array.from(e.childNodes)}(r.target);m.fragment&&m.fragment.l(e),e.forEach(d)}else m.fragment&&m.fragment.c();r.intro&&((x=l.$$.fragment)&&x.i&&(G.delete(x),x.i(b))),function(e,n,l){const{fragment:r,after_update:i}=e.$$;r&&r.m(n,l),I((()=>{const n=e.$$.on_mount.map(t).filter(s);e.$$.on_destroy?e.$$.on_destroy.push(...n):o(n),e.$$.on_mount=[]})),i.forEach(I)}(l,r.target,r.anchor),T()}var x,b;v(g)}class A{$$=void 0;$$set=void 0;$destroy(){M(this,1),this.$destroy=e}$on(t,n){if(!s(n))return e;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const e=o.indexOf(n);-1!==e&&o.splice(e,1)}}$set(e){var t;this.$$set&&(t=e,0!==Object.keys(t).length)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}"undefined"!=typeof window&&(window.__svelte||(window.__svelte={v:new Set})).v.add("4");const{window:D}=c;function U(e,t,n){const o=e.slice();return o[27]=t[n],o[29]=n,o}function z(e,t,n){const o=e.slice();return o[30]=t[n],o}function H(e){let t,n,o;return{c(){t=p("p"),n=g("Last update:\n              "),o=g(e[2]),x(t,"class","text-sm text-gray-700 text-center pt-1")},m(e,s){u(e,t,s),a(t,n),a(t,o)},p(e,t){4&t[0]&&y(o,e[2])},d(e){e&&d(t)}}}function q(e){let t,n,o,s=e[27].price[e[30]]+"";return{c(){t=p("span"),n=g(s),o=g("$"),x(t,"class","font-medium pl-2 self-center")},m(e,s){u(e,t,s),a(t,n),a(t,o)},p(e,t){32&t[0]&&s!==(s=e[27].price[e[30]]+"")&&y(n,s)},d(e){e&&d(t)}}}function V(e){let t,n,o,s,l,r,i,c=e[27].sale[e[30]]+"",f=e[27].price[e[30]]+"";return{c(){t=p("span"),n=g(c),o=g("$"),s=m(),l=p("span"),r=g(f),i=g("$"),x(t,"class","font-medium text-blue-700 pl-2 self-center"),x(l,"class","text-sm text-red-700 line-through pl-2 self-center")},m(e,c){u(e,t,c),a(t,n),a(t,o),u(e,s,c),u(e,l,c),a(l,r),a(l,i)},p(e,t){32&t[0]&&c!==(c=e[27].sale[e[30]]+"")&&y(n,c),32&t[0]&&f!==(f=e[27].price[e[30]]+"")&&y(r,f)},d(e){e&&(d(t),d(s),d(l))}}}function W(e){let t,n,o,s,l=e[27].sale?`${e[16](e[27].price[e[30]],e[27].price[e[4]])?"-":"+"}${e[15](e[27].sale[e[30]],e[27].sale[e[4]])}`:`${e[16](e[27].price[e[30]],e[27].price[e[4]])?"-":"+"}${e[15](e[27].price[e[30]],e[27].price[e[4]])}`;return{c(){t=p("span"),n=g(l),o=g("%"),x(t,"class",s="text-sm "+(e[16](e[27].price[e[30]],e[27].price[e[4]])?"text-green-700":"text-red-700")+" pl-2 self-center")},m(e,s){u(e,t,s),a(t,n),a(t,o)},p(e,o){48&o[0]&&l!==(l=e[27].sale?`${e[16](e[27].price[e[30]],e[27].price[e[4]])?"-":"+"}${e[15](e[27].sale[e[30]],e[27].sale[e[4]])}`:`${e[16](e[27].price[e[30]],e[27].price[e[4]])?"-":"+"}${e[15](e[27].price[e[30]],e[27].price[e[4]])}`)&&y(n,l),48&o[0]&&s!==(s="text-sm "+(e[16](e[27].price[e[30]],e[27].price[e[4]])?"text-green-700":"text-red-700")+" pl-2 self-center")&&x(t,"class",s)},d(e){e&&d(t)}}}function J(e){let t,n,o,s,l,r,c,f=e[4]&&e[27].price[e[4]]&&0!==parseFloat(e[27].price[e[30]]);function g(e,t){return e[27].sale?V:q}let h=g(e),b=h(e),y=f&&W(e);return{c(){t=p("div"),n=p("img"),r=m(),b.c(),c=m(),y&&y.c(),x(n,"class","h-full"),i(n.src,o=`./flags/${e[30].toLowerCase()}.svg`)||x(n,"src",o),x(n,"alt",s=`${e[30]} Flag`),x(n,"title",l=`${e[30]} Flag`),x(t,"class","flex flex-inline h-5")},m(e,o){u(e,t,o),a(t,n),a(t,r),b.m(t,null),a(t,c),y&&y.m(t,null)},p(e,r){32&r[0]&&!i(n.src,o=`./flags/${e[30].toLowerCase()}.svg`)&&x(n,"src",o),32&r[0]&&s!==(s=`${e[30]} Flag`)&&x(n,"alt",s),32&r[0]&&l!==(l=`${e[30]} Flag`)&&x(n,"title",l),h===(h=g(e))&&b?b.p(e,r):(b.d(1),b=h(e),b&&(b.c(),b.m(t,c))),48&r[0]&&(f=e[4]&&e[27].price[e[4]]&&0!==parseFloat(e[27].price[e[30]])),f?y?y.p(e,r):(y=W(e),y.c(),y.m(t,null)):y&&(y.d(1),y=null)},d(e){e&&d(t),b.d(),y&&y.d()}}}function K(e){let t,n,o,s,l,r,c,f;function g(e,t){return e[27].sale?X:Q}let h=g(e),b=h(e);return{c(){t=p("div"),n=m(),o=p("div"),s=p("img"),f=m(),b.c(),x(t,"class","h-[1px] bg-slate-300 w-full"),x(s,"class","h-full"),i(s.src,l=`./flags/${e[4].toLowerCase()}.svg`)||x(s,"src",l),x(s,"alt",r=`${e[4]} Flag`),x(s,"title",c=`${e[4]} Flag`),x(o,"class","flex flex-inline h-5")},m(e,l){u(e,t,l),u(e,n,l),u(e,o,l),a(o,s),a(o,f),b.m(o,null)},p(e,t){16&t[0]&&!i(s.src,l=`./flags/${e[4].toLowerCase()}.svg`)&&x(s,"src",l),16&t[0]&&r!==(r=`${e[4]} Flag`)&&x(s,"alt",r),16&t[0]&&c!==(c=`${e[4]} Flag`)&&x(s,"title",c),h===(h=g(e))&&b?b.p(e,t):(b.d(1),b=h(e),b&&(b.c(),b.m(o,null)))},d(e){e&&(d(t),d(n),d(o)),b.d()}}}function Q(e){let t,n,o,s=e[27].price[e[4]]+"";return{c(){t=p("span"),n=g(s),o=g("$"),x(t,"class","font-medium pl-2 self-center")},m(e,s){u(e,t,s),a(t,n),a(t,o)},p(e,t){48&t[0]&&s!==(s=e[27].price[e[4]]+"")&&y(n,s)},d(e){e&&d(t)}}}function X(e){let t,n,o,s,l,r,i,c=e[27].sale[e[4]]+"",f=e[27].price[e[4]]+"";return{c(){t=p("span"),n=g(c),o=g("$"),s=m(),l=p("span"),r=g(f),i=g("$"),x(t,"class","font-medium text-blue-700 pl-2 self-center"),x(l,"class","text-sm text-red-700 line-through pl-2 self-center")},m(e,c){u(e,t,c),a(t,n),a(t,o),u(e,s,c),u(e,l,c),a(l,r),a(l,i)},p(e,t){48&t[0]&&c!==(c=e[27].sale[e[4]]+"")&&y(n,c),48&t[0]&&f!==(f=e[27].price[e[4]]+"")&&y(r,f)},d(e){e&&(d(t),d(s),d(l))}}}function Y(e){let t,n,l,r,c,b,w,$,v,k,_,j,C,E,L,B,I,P,F,T,O=e[27].title+"",G=e[27].category+"",M=S(Object.keys(e[27].price).slice(0,4)),N=[];for(let t=0;t<M.length;t+=1)N[t]=J(z(e,M,t));let R=e[4]&&e[27].price[e[4]]&&K(e);return{c(){t=p("li"),n=p("div"),l=p("div"),r=p("img"),$=m(),v=p("div"),k=p("div"),_=g(O),j=m(),C=p("div"),E=g(G),L=m(),B=p("div");for(let e=0;e<N.length;e+=1)N[e].c();I=m(),R&&R.c(),P=m(),x(r,"class","w-full"),i(r.src,c=e[27].image+"_200.jpg")||x(r,"src",c),x(r,"alt",b=e[27].title),x(r,"title",w=e[27].title),x(r,"loading","lazy"),x(k,"class","font-bold text-md line-clamp-2"),x(C,"class","text-sm text-gray-600"),x(v,"class","px-2 py-2 flex-grow"),x(B,"class","px-3 space-y-3 pb-3"),x(l,"class","rounded overflow-hidden hover:shadow-lg border-r border-b border-l border-gray-300 flex-1 flex flex-col"),x(n,"class","cursor-pointer flex flex-col px-1 pb-3 h-full"),x(n,"role","button"),x(n,"tabindex",e[29]),x(t,"class","w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6")},m(o,i){u(o,t,i),a(t,n),a(n,l),a(l,r),a(l,$),a(l,v),a(v,k),a(k,_),a(v,j),a(v,C),a(C,E),a(l,L),a(l,B);for(let e=0;e<N.length;e+=1)N[e]&&N[e].m(B,null);a(B,I),R&&R.m(B,null),a(t,P),F||(T=[h(n,"click",(function(){s(e[11](e[27].url))&&e[11](e[27].url).apply(this,arguments)})),h(n,"keypress",(function(){s(e[11](e[27].url))&&e[11](e[27].url).apply(this,arguments)}))],F=!0)},p(t,n){if(e=t,32&n[0]&&!i(r.src,c=e[27].image+"_200.jpg")&&x(r,"src",c),32&n[0]&&b!==(b=e[27].title)&&x(r,"alt",b),32&n[0]&&w!==(w=e[27].title)&&x(r,"title",w),32&n[0]&&O!==(O=e[27].title+"")&&y(_,O),32&n[0]&&G!==(G=e[27].category+"")&&y(E,G),98352&n[0]){let t;for(M=S(Object.keys(e[27].price).slice(0,4)),t=0;t<M.length;t+=1){const o=z(e,M,t);N[t]?N[t].p(o,n):(N[t]=J(o),N[t].c(),N[t].m(B,I))}for(;t<N.length;t+=1)N[t].d(1);N.length=M.length}e[4]&&e[27].price[e[4]]?R?R.p(e,n):(R=K(e),R.c(),R.m(B,null)):R&&(R.d(1),R=null)},d(e){e&&d(t),f(N,e),R&&R.d(),F=!1,o(T)}}}function Z(t){let n,s,l,r,i,c,$,v,k,_,j,C,E,L,B,I,P,F,T,O,G,M,N,R,A,z,q,V,W,J,K,Q,X,Z,ee,te,ne,oe,se,le,re,ie,ce,ae,ue,de,fe,pe,ge,me,he,xe,be,ye=t[2]&&H(t),we=S(t[5]),$e=[];for(let e=0;e<we.length;e+=1)$e[e]=Y(U(t,we,e));return{c(){n=p("main"),s=p("div"),s.innerHTML='<div class="flex items-center justify-between gap-2"><div class="text-4xl" id="BlockInstallClose">x</div> <div class="w-12"><img src="./icons/android/android-launchericon-48-48.png" alt="GOG Regions Price logo"/></div> <div class="max-w-[175px]"><span class="block font-bold">GOG Regions Price</span> <span class="block text-xs">Compare GOG&#39;s prices between all countries (in dollars)</span></div> <div><button id="BlockInstallButton" class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Install</button></div></div>',l=m(),r=p("div"),i=p("div"),c=p("div"),$=p("div"),v=p("h1"),v.textContent="GOG Regions Prices",k=m(),_=p("p"),_.innerHTML='If you know of any missing game, report it on\n            <a class="text-blue-700 underline" href="https://github.com/RodrigoTomeES/gog-regions-prices">Github\n            </a>.',j=m(),ye&&ye.c(),C=m(),E=p("select"),L=p("option"),L.textContent="Sales",B=p("option"),B.textContent="All games by discount rate",I=m(),P=p("div"),F=p("div"),T=p("label"),T.textContent="Search Term",O=m(),G=p("input"),M=m(),N=p("div"),R=p("button"),R.innerHTML='<span class="absolute left-0 inset-y-0 flex items-center pl-3"></span>\n            Search!',A=m(),z=p("div"),q=p("ul");for(let e=0;e<$e.length;e+=1)$e[e].c();V=m(),W=p("div"),J=p("div"),K=p("button"),Q=g("<<"),Z=m(),ee=p("button"),te=g("<"),oe=m(),se=p("label"),le=p("input"),re=g("\n          /\n        "),ie=g(t[3]),ce=m(),ae=p("div"),ue=p("button"),de=g(">"),pe=m(),ge=p("button"),me=g(">>"),x(s,"class","hidden bg-white shadow-2xl fixed bottom-0 left-0 right-0 z-50 p-4"),x(s,"id","BlockInstall"),x(v,"class","text-center text-3xl font-extrabold text-gray-900"),x(_,"class","text-sm text-gray-700 text-center"),x($,"class","justify-center w-full"),L.__value="sales",w(L,L.__value),B.__value="discount",w(B,B.__value),x(E,"class","bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"),x(T,"for","searchterm"),x(T,"class","sr-only"),x(G,"id","searchterm"),x(G,"name","searchterm"),x(G,"type","text"),G.required=!0,x(G,"class","appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"),x(G,"placeholder","Search for your game!"),x(P,"class","rounded-md shadow-sm -space-y-px"),x(R,"type","submit"),x(R,"class","group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),x(c,"class","block space-y-3 w-full md:w-1/3 py-3"),x(i,"class","w-full flex justify-center"),x(q,"class","flex flex-wrap w-full"),x(z,"class","flex w-full"),x(z,"id","games"),K.disabled=X=t[0]<=1,x(K,"class","disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),ee.disabled=ne=t[0]<=1,x(ee,"class","disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),x(J,"class","w-1/3 inline-flex gap-1"),x(le,"id","page"),x(le,"type","number"),x(le,"min",1),x(le,"max",t[3]),x(le,"class","border-none bg-transparent no-number-spinner max-w-[3ch] text-right focus:ring-0 focus:ring-offset-transparent focus:outline-none select-none"),x(se,"for","page"),x(se,"class","group relative focus-within:border focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 w-1/3 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),ue.disabled=fe=t[0]>=t[3],x(ue,"class","disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),ge.disabled=he=t[0]>=t[3],x(ge,"class","disabled:opacity-50 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"),x(ae,"class","w-1/3 inline-flex gap-1"),x(W,"class","flex flex-inline w-full mb-2 gap-2"),x(r,"class","flex flex-wrap justify-center items-center"),x(n,"class","container mx-auto px-3")},m(e,o){u(e,n,o),a(n,s),a(n,l),a(n,r),a(r,i),a(i,c),a(c,$),a($,v),a($,k),a($,_),a($,j),ye&&ye.m($,null),a(c,C),a(c,E),a(E,L),a(E,B),a(c,I),a(c,P),a(P,F),a(F,T),a(F,O),a(F,G),w(G,t[1]),a(c,M),a(c,N),a(N,R),a(r,A),a(r,z),a(z,q);for(let e=0;e<$e.length;e+=1)$e[e]&&$e[e].m(q,null);a(r,V),a(r,W),a(W,J),a(J,K),a(K,Q),a(J,Z),a(J,ee),a(ee,te),a(W,oe),a(W,se),a(se,le),w(le,t[0]),a(se,re),a(se,ie),a(W,ce),a(W,ae),a(ae,ue),a(ue,de),a(ae,pe),a(ae,ge),a(ge,me),xe||(be=[h(D,"keydown",t[9]),h(E,"change",t[21]),h(G,"input",t[22]),h(G,"keypress",t[8]),h(R,"click",t[7]),h(K,"click",t[23]),h(ee,"click",t[13]),h(le,"input",t[24]),h(le,"keydown",t[10]),h(ue,"click",t[12]),h(ge,"click",t[25])],xe=!0)},p(e,t){if(e[2]?ye?ye.p(e,t):(ye=H(e),ye.c(),ye.m($,null)):ye&&(ye.d(1),ye=null),2&t[0]&&G.value!==e[1]&&w(G,e[1]),100400&t[0]){let n;for(we=S(e[5]),n=0;n<we.length;n+=1){const o=U(e,we,n);$e[n]?$e[n].p(o,t):($e[n]=Y(o),$e[n].c(),$e[n].m(q,null))}for(;n<$e.length;n+=1)$e[n].d(1);$e.length=we.length}1&t[0]&&X!==(X=e[0]<=1)&&(K.disabled=X),1&t[0]&&ne!==(ne=e[0]<=1)&&(ee.disabled=ne),8&t[0]&&x(le,"max",e[3]),1&t[0]&&b(le.value)!==e[0]&&w(le,e[0]),8&t[0]&&y(ie,e[3]),9&t[0]&&fe!==(fe=e[0]>=e[3])&&(ue.disabled=fe),9&t[0]&&he!==(he=e[0]>=e[3])&&(ge.disabled=he)},i:e,o:e,d(e){e&&d(n),ye&&ye.d(),f($e,e),xe=!1,o(be)}}}function ee(e,t,n){let o,{searchResult:s=[]}=t,{searchTerm:l=""}=t,{games:r=[]}=t,{sales:i=[]}=t,{gamesByDiscount:c=[]}=t,{lastUpdated:a=""}=t,{totalPages:u=-1}=t,{currentPage:d=-1}=t,{userCountry:f=null}=t;k((async()=>{let e;await fetch("./sales.json").then((e=>e.json())).then((e=>{n(19,i=e.sort(((e,t)=>e.title.localeCompare(t.title)))),n(17,s=i),n(3,u=Math.floor(i.length/24)+1),n(0,d=1)})),await fetch("./lastUpdate.json").then((e=>e.json())).then((e=>{const t=e.last,o=t.substr(8,2),s=t.substr(5,2),l=t.substr(11,5);n(2,a=`${o}/${s} - ${l}`)}));const t=document.getElementById("BlockInstall"),o=document.getElementById("BlockInstallButton"),l=document.getElementById("BlockInstallClose");o.addEventListener("click",(async()=>{t.classList.add("hidden"),e.prompt();const{outcome:n}=await e.userChoice;console.log(`User response to the install prompt: ${n}`),e=null})),l.addEventListener("click",(async()=>{t.classList.add("hidden"),e=null})),window.addEventListener("beforeinstallprompt",(n=>{n.preventDefault(),e=n,t.classList.remove("hidden"),console.log("'beforeinstallprompt' event was fired.")})),window.addEventListener("appinstalled",(()=>{t.classList.add("hidden"),e=null,console.log("PWA was installed")})),n(4,f=navigator.language?.split("-")[1])}));const p=async e=>{"discount"===e?(0===c.length&&await fetch("./games.json").then((e=>e.json())).then((e=>{n(20,c=e.sort(((e,t)=>e["discount-rate"]<t["discount-rate"])))})),n(17,s=c)):n(17,s=i),n(3,u=Math.floor(s.length/24)+1),n(0,d=1)},g=async()=>{""==l.trim()?n(17,s=i):(0===r.length&&await fetch("./games.json").then((e=>e.json())).then((e=>{n(18,r=e.sort(((e,t)=>e.title.localeCompare(t.title))))})),n(17,s=r.filter((e=>e.title.toLowerCase().includes(l.trim().toLowerCase()))))),n(3,u=Math.floor(s.length/24)+1),n(0,d=1)},m=()=>{d<u&&x(1)},h=()=>{d>1&&x(-1)},x=e=>{y(d+e)},y=e=>{n(0,d=e),document.getElementById("games").scrollIntoView()};return e.$$set=e=>{"searchResult"in e&&n(17,s=e.searchResult),"searchTerm"in e&&n(1,l=e.searchTerm),"games"in e&&n(18,r=e.games),"sales"in e&&n(19,i=e.sales),"gamesByDiscount"in e&&n(20,c=e.gamesByDiscount),"lastUpdated"in e&&n(2,a=e.lastUpdated),"totalPages"in e&&n(3,u=e.totalPages),"currentPage"in e&&n(0,d=e.currentPage),"userCountry"in e&&n(4,f=e.userCountry)},e.$$.update=()=>{131073&e.$$.dirty[0]&&n(5,o=s.slice(24*(d-1),24*d))},[d,l,a,u,f,o,p,g,e=>{13===e.charCode&&g()},e=>{"searchterm"!==e.target.id&&(37===e.keyCode&&h(),39===e.keyCode&&m())},e=>{const t=!isNaN(e.key),n=t?parseInt(e.target.value+e.key):0;(!t&&"Backspace"!==e.key||t&&n>u)&&e.preventDefault()},e=>{window.open(`https://www.gog.com${e}`,"_blank").focus()},m,h,y,(e,t)=>Math.round(100*(100-100*e/t+Number.EPSILON))/100,(e,t)=>parseFloat(e)<parseFloat(t),s,r,i,c,e=>p(e.target.value),function(){l=this.value,n(1,l)},()=>y(1),function(){d=b(this.value),n(0,d)},()=>y(u)]}return new class extends A{constructor(e){super(),R(this,e,ee,Z,l,{searchResult:17,searchTerm:1,games:18,sales:19,gamesByDiscount:20,lastUpdated:2,totalPages:3,currentPage:0,userCountry:4},null,[-1,-1])}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
