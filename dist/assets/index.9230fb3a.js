let Mt,te=(async()=>{Mt=function(){import("data:text/javascript,").then(async i=>(await i.__tla,i))},function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const u of r)if(u.type==="childList")for(const h of u.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&s(h)}).observe(document,{childList:!0,subtree:!0});function i(r){const u={};return r.integrity&&(u.integrity=r.integrity),r.referrerpolicy&&(u.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?u.credentials="include":r.crossorigin==="anonymous"?u.credentials="omit":u.credentials="same-origin",u}function s(r){if(r.ep)return;r.ep=!0;const u=i(r);fetch(r.href,u)}}(),function(o){function i(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var s=i(o);function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function h(e,t,n){return t&&u(e.prototype,t),n&&u(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,t){return D(e)||M(e,t)||O(e,t)||T()}function D(e){if(Array.isArray(e))return e}function M(e,t){var n=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(n!=null){var a=[],p=!0,f=!1,k,B;try{for(n=n.call(e);!(p=(k=n.next()).done)&&(a.push(k.value),!(t&&a.length===t));p=!0);}catch(I){f=!0,B=I}finally{try{!p&&n.return!=null&&n.return()}finally{if(f)throw B}}return a}}function O(e,t){if(e){if(typeof e=="string")return A(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if(n==="Object"&&e.constructor&&(n=e.constructor.name),n==="Map"||n==="Set")return Array.from(e);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return A(e,t)}}function A(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function T(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function c(e,t){var n=m(e,t,"get");return w(e,n)}function l(e,t,n){var a=m(e,t,"set");return v(e,a,n),n}function m(e,t,n){if(!t.has(e))throw new TypeError("attempted to "+n+" private field on non-instance");return t.get(e)}function w(e,t){return t.get?t.get.call(e):t.value}function v(e,t,n){if(t.set)t.set.call(e,n);else{if(!t.writable)throw new TypeError("attempted to set read only private field");t.value=n}}function g(e,t){if(t.has(e))throw new TypeError("Cannot initialize the same private elements twice on an object")}function _(e,t,n){g(e,t),t.set(e,n)}var F=function(){function e(t){r(this,e),d(this,"bounceHeight",15),d(this,"contractHeight",12),d(this,"bounceSpeed",52),d(this,"contractSpeed",52),d(this,"shadowAngle",-Math.PI/4),d(this,"elastic",!0),d(this,"exclusive",!1),t&&Object.assign(this,t)}return h(e,[{key:"override",value:function(t){return Object.assign(new e(this),t)}}]),e}(),x=new WeakMap,N=function(){function e(){r(this,e),_(this,x,{writable:!0,value:[]})}return h(e,[{key:"getBouncingMarkers",value:function(){return c(this,x)}},{key:"addBouncingMarker",value:function(t,n){n||t._bouncingMotion.bouncingOptions.exclusive?this.stopAllBouncingMarkers():this.stopExclusiveMarkerBouncing(),c(this,x).push(t)}},{key:"stopExclusiveMarkerBouncing",value:function(){var t=c(this,x).find(function(n){return n._bouncingMotion.bouncingOptions.exclusive});t&&t.stopBouncing()}},{key:"removeBouncingMarker",value:function(t){var n=c(this,x).indexOf(t);~n&&c(this,x).splice(n,1)}},{key:"stopAllBouncingMarkers",value:function(){for(var t;t=c(this,x).shift();)t.stopBouncing()}}]),e}(),R=o.Marker.prototype._setPos,Z=o.Marker.prototype.onAdd,tt=o.Marker.prototype.setIcon,$={_bouncingOptions:new F,_orchestration:new N,setBouncingOptions:function(e){return this._bouncingMotion.updateBouncingOptions(e),this},isBouncing:function(){return this._bouncingMotion.isBouncing},bounce:function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:null;this._bouncingMotion.bounce(e);var t=this._bouncingMotion.bouncingOptions.exclusive;return o.Marker.prototype._orchestration.addBouncingMarker(this,t),this},stopBouncing:function(){return this._bouncingMotion.stopBouncing(),o.Marker.prototype._orchestration.removeBouncingMarker(this),this},toggleBouncing:function(){return this._bouncingMotion.isBouncing?this.stopBouncing():this.bounce(),this},isRealMarker:function(){return this.__proto__===o.Marker.prototype},_setPos:function(e){R.call(this,e),this.isRealMarker()&&(this._bouncingMotion.position=e,this._bouncingMotion.resetStyles(this))},onAdd:function(e){Z.call(this,e),this.isRealMarker()&&this._bouncingMotion.resetStyles(this)},setIcon:function(e){tt.call(this,e),this.isRealMarker()&&this._icon&&this._bouncingMotion.resetStyles(this)}};function Ht(e,t,n,a){for(var p=Math.round(e+Math.cos(n)*(a*2)),f=Math.round(t+Math.sin(n)*(a*2)),k=Math.abs(p-e),B=e<p?1:-1,I=Math.abs(f-t),G=t<f?1:-1,j=(k>I?k:-I)/2,S,U=[],E=0;U.push([e,t]),E++,E!==a;)S=j,S>-k&&(j-=I,e+=B),S<I&&(j+=k,t+=G);return U}function Ut(e,t){t===void 0&&(t={});var n=t.insertAt;if(!(!e||typeof document>"u")){var a=document.head||document.getElementsByTagName("head")[0],p=document.createElement("style");p.type="text/css",n==="top"&&a.firstChild?a.insertBefore(p,a.firstChild):a.appendChild(p),p.styleSheet?p.styleSheet.cssText=e:p.appendChild(document.createTextNode(e))}}var zt=`@keyframes l-smooth-marker-bouncing-move {
    from {
        transform: translate(var(--pos-x), var(--pos-y))
    }
    to {
        transform: translate(var(--pos-x-jump, var(--pos-x)), var(--pos-y-jump))
    }
}

@keyframes l-smooth-marker-bouncing-contract {
    from {
        transform: translate(var(--pos-x), var(--pos-y))
    }
    to {
        transform: translate(var(--pos-x), var(--pos-y-contract)) scaleY(var(--scale-contract))
    }
}

.bouncing {
    animation-name: l-smooth-marker-bouncing-move, l-smooth-marker-bouncing-move, l-smooth-marker-bouncing-contract, l-smooth-marker-bouncing-contract;
    animation-direction: normal, reverse, normal, reverse;
    animation-duration: var(--duration-jump), var(--duration-jump), var(--duration-contract), var(--duration-contract);
    animation-delay: var(--delays)
}

.bouncing.simple {
    animation-name: l-smooth-marker-bouncing-move, l-smooth-marker-bouncing-move;
    animation-direction: normal, reverse;
    animation-duration: var(--duration-jump), var(--duration-jump);
    animation-delay: var(--delays)
}
`;Ut(zt);var vt=/([\w-]+): ([^;]+);/g,bt=function(){function e(t){r(this,e),t&&Object.assign(this,t)}return h(e,[{key:"findOpacity",value:function(t){this.opacity=(t==null?void 0:t.opacityWhenUnclustered)||(t==null?void 0:t.opacity)||1}},{key:"withStyles",value:function(t){var n=new e(this);return n&&Object.assign(n,t),n}},{key:"toString",value:function(){return Object.entries(this).map(function(t){return"".concat(t[0],": ").concat(t[1],";")}).join(" ")}}],[{key:"parse",value:function(t){for(var n={},a=vt.exec(t);a;)n[a[1]]=a[2],a=vt.exec(t);return delete n["z-index"],delete n.opacity,n.outline="none",new e(n)}},{key:"ofMarker",value:function(t){var n=e.parse(t._icon.style.cssText);return n.findOpacity(t.options),n["z-index"]=t._zIndex,n}}]),e}(),wt="l-smooth-marker-bouncing-",Gt=wt+"move",kt=wt+"contract",Nt=.8;function z(e,t){t.forEach(function(n){return o.DomUtil.removeClass(e,n)}),e.offsetWidth,t.forEach(function(n){return o.DomUtil.addClass(e,n)})}var J=new WeakMap,C=new WeakMap,H=new WeakMap,q=new WeakMap,et=new WeakMap,qt=function(){function e(t,n,a){var p=this;r(this,e),d(this,"marker",void 0),d(this,"position",void 0),d(this,"bouncingOptions",void 0),d(this,"isBouncing",!1),d(this,"iconStyles",void 0),d(this,"shadowStyles",void 0),d(this,"bouncingAnimationPlaying",!1),_(this,J,{writable:!0,value:kt}),_(this,C,{writable:!0,value:["bouncing"]}),_(this,H,{writable:!0,value:void 0}),_(this,q,{writable:!0,value:void 0}),_(this,et,{writable:!0,value:function(f){return p.onAnimationEnd(f)}}),this.marker=t,this.position=n,this.updateBouncingOptions(a)}return h(e,[{key:"updateBouncingOptions",value:function(t){if(this.bouncingOptions=t instanceof F?t:this.bouncingOptions.override(t),this.bouncingOptions.elastic){l(this,J,kt);var n=c(this,C).indexOf("simple");n>-1&&c(this,C).splice(n,1),this.marker._icon&&o.DomUtil.removeClass(this.marker._icon,"simple")}else l(this,J,Gt),c(this,C).push("simple");this.marker._icon&&this.resetStyles(this.marker)}},{key:"onAnimationEnd",value:function(t){var n=this;if(t.animationName===c(this,J)){var a;if(l(this,H,(a=c(this,H),a++,a)),l(this,H,c(this,H)%2),!c(this,H)){var p;this.isBouncing&&(c(this,q)===null||l(this,q,(p=c(this,q),--p)))?(z(this.marker._icon,c(this,C)),this.marker._shadow&&this.bouncingOptions.shadowAngle&&z(this.marker._shadow,c(this,C))):(c(this,C).forEach(function(f){o.DomUtil.removeClass(n.marker._icon,f),n.marker._shadow&&o.DomUtil.removeClass(n.marker._shadow,f)}),this.bouncingAnimationPlaying=!1,this.marker.fire("bounceend"))}}}},{key:"resetStyles",value:function(t){var n,a,p,f,k,B=this;this.marker=t,this.iconStyles=bt.ofMarker(t),t._shadow&&(this.shadowStyles=bt.parse(t._shadow.style.cssText));var I=((n=this.marker.getIcon())===null||n===void 0||(a=n.options)===null||a===void 0?void 0:a.iconSize[1])||((p=this.marker)===null||p===void 0||(f=p._iconObj)===null||f===void 0||(k=f.options)===null||k===void 0?void 0:k.iconSize[1]),G=e.animationParams(this.position,this.bouncingOptions,I);this.iconStyles=this.iconStyles.withStyles(G),this.marker._icon.style.cssText=this.iconStyles.toString(),this.bouncingAnimationPlaying&&(z(this.marker._icon,c(this,C)),this.marker._icon.addEventListener("animationend",c(this,et)));var j=this.bouncingOptions,S=j.bounceHeight,U=j.contractHeight,E=j.shadowAngle;if(this.marker._shadow)if(E){var ot,nt,_t=this.position,Yt=_t.x,Rt=_t.y,Jt=Ht(Yt,Rt,E,S+1),xt=b(Jt[S],2),Qt=xt[0],Vt=xt[1],Kt=(ot=this.marker.getIcon())===null||ot===void 0||(nt=ot.options)===null||nt===void 0?void 0:nt.shadowSize[1],Xt=e.contractScale(Kt,U);this.shadowStyles=this.shadowStyles.withStyles(G).withStyles({"--pos-x-jump":"".concat(Qt,"px"),"--pos-y-jump":"".concat(Vt,"px"),"--scale-contract":Xt}),this.marker._shadow.style.cssText=this.shadowStyles.toString(),this.bouncingAnimationPlaying&&z(this.marker._shadow,c(this,C))}else c(this,C).forEach(function(Zt){o.DomUtil.removeClass(B.marker._shadow,Zt)})}},{key:"bounce",value:function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:null;l(this,q,t),this.isBouncing=!0,!this.bouncingAnimationPlaying&&(l(this,H,0),this.bouncingAnimationPlaying=!0,z(this.marker._icon,c(this,C)),this.marker._shadow&&this.bouncingOptions.shadowAngle&&z(this.marker._shadow,c(this,C)),this.marker._icon.addEventListener("animationend",c(this,et)))}},{key:"stopBouncing",value:function(){this.isBouncing=!1}}],[{key:"animationParams",value:function(t,n,a){var p=t.x,f=t.y,k=n.bounceHeight,B=n.contractHeight,I=n.bounceSpeed,G=n.contractSpeed,j=e.contractScale(a,B),S=e.calculateDuration(k,I),U=e.calculateDuration(B,G),E=[0,S,S*2,S*2+U];return{"--pos-x":"".concat(p,"px"),"--pos-y":"".concat(f,"px"),"--pos-y-jump":"".concat(f-k,"px"),"--pos-y-contract":"".concat(f+B,"px"),"--scale-contract":j,"--duration-jump":"".concat(S,"ms"),"--duration-contract":"".concat(U,"ms"),"--delays":"0ms, ".concat(E[1],"ms, ").concat(E[2],"ms, ").concat(E[3],"ms")}}},{key:"contractScale",value:function(t,n){return(t-n)/t}},{key:"calculateDuration",value:function(t,n){for(var a=Math.round(n*Nt),p=t;--p;)a+=Math.round(n/(t-p));return a}}]),e}();s.default.Marker.include($),s.default.Marker.setBouncingOptions=function(e){o.Marker.prototype._bouncingOptions=e instanceof F?e:new F(e)},s.default.Marker.getBouncingMarkers=function(){o.Marker.prototype._orchestration.getBouncingMarkers()},s.default.Marker.stopAllBouncingMarkers=function(){o.Marker.prototype._orchestration.stopAllBouncingMarkers()},s.default.Marker.addInitHook(function(){if(this.isRealMarker()){var e=new F(o.Marker.prototype._bouncingOptions);this._bouncingMotion=new qt(this,new o.Point(0,0),e)}})}(L);const Ct=o=>o.trim(),Dt=o=>o&&o.split(" ").map(i=>i[0].toUpperCase()+i.slice(1)).join(" ").replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),it=o=>o.toLowerCase().trim().replaceAll(" ","-"),St=o=>o.length<=12?o:`${o.slice(0,12)}..`,at=o=>new Date(o).toISOString().slice(0,10),rt=o=>{const i=new Date(o),s=navigator.language,r={month:"short",day:"numeric",year:"numeric"};return new Intl.DateTimeFormat(s,r).format(i)},Ot=o=>Math.round((o-273.15)*9/5+32),Lt=o=>"\u2B50\uFE0F".repeat(o).concat("\u2606".repeat(5-o)),At=o=>{if(o.length===6)return 1;if(o.length===7)return 2;if(o.length===8)return 3;if(o.length===9)return 4;if(o.length===10)return 5},Bt=(o,i)=>Math.floor(Math.random()*(i-o+1)+o),It=document.querySelector(".book-flight-btn__select"),st=()=>new Promise((o,i)=>{navigator.geolocation.getCurrentPosition(o,i)}),Y=async(o,i)=>{var s,r,u,h,d,b,D,M,O,A,T,c,l;try{const m=await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${o}&lon=${i}&format=json&apiKey=528c5dcffdab43848fa6c11bfb7a2545`);if(!m.ok)throw new Error("Problem getting location data");const w=await m.json(),v=(r=(s=w.results[0])==null?void 0:s.country_code)!=null?r:"Unavailable",g=await fetch(`https://restcountries.com/v3.1/alpha/${v}`);if(!g.ok)throw new Error("Problem getting country data");const _=await g.json(),F=v,x=(d=(h=(u=_[0])==null?void 0:u.name)==null?void 0:h.common)!=null?d:"Unavailable",N=(D=(b=w.results[0])==null?void 0:b.city)!=null?D:"Unavailable",R=(O=(M=_[0])==null?void 0:M.flag)!=null?O:"Unavailable",Z=Object.values((T=(A=_[0])==null?void 0:A.languages)!=null?T:"Unavailable").join(", "),tt=Object.values((l=(c=_[0])==null?void 0:c.currencies)!=null?l:"Unavailable").map($=>`${$==null?void 0:$.name} ${$==null?void 0:$.symbol}`)[0];return{countryAbbrev:F,countryName:x,city:N,flag:R,latitude:o,longitude:i,currency:tt,language:Z}}catch(m){return"Unavailable"}},ct=async(o,i)=>{try{const s=await Y(o,i),r="1db6ec5257aa7458bd25e359a7102c19",u=await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${s.latitude}&lon=${s.longitude}&appid=${r}`);if(!u.ok)throw new Error("Problem getting location data");const h=await u.json();return h?[`https://openweathermap.org/img/wn/${h.current.weather[0].icon}@2x.png`,`${h.current.weather[0].description}`,`${Ot(h.current.temp)}\xB0`]:void 0}catch(s){return"Unavailable"}},Pt=async()=>{try{const o=await st(),{latitude:i,longitude:s}=o.coords,r=(await Y(i,s)).countryName,u=await fetch("https://restcountries.com/v3.1/all");if(!u.ok)throw new Error("Problem getting country data");const h=(await u.json()).map(b=>`${b.flag} ${b.name.common}`).sort();let d="<option disabled selected value>book trip</option>";h.forEach(b=>{d+=`<option value="https://www.kiwi.com/en/search/tiles/${it(r)}/${it(b.slice(5,b.length).trim().toLowerCase())}">${b}</option>`,It.innerHTML=d})}catch(o){return"Unavailable"}},Ft=async()=>{try{const o=await fetch("https://api.unsplash.com/collections/nOMRmitGW64/photos/?per_page=30&client_id=92MhZXBYZ32qrYaz6K9ZS_7x6HjAo7TrqHWgSvFNc4U");if(!o.ok)throw new Error("Problem getting image data");const i=await o.json(),s=Bt(0,29);return i[s].urls.full}catch(o){return"Unavailable"}};(async()=>{try{await Pt()}catch(o){return`${o.message}`}})();const W=document.querySelector(".form"),jt=document.querySelector(".trips"),Q=document.querySelector(".form__input--title"),lt=document.querySelector(".form__input--rating"),ut=document.querySelector(".form__input--start-date"),dt=document.querySelector(".form__input--end-date"),pt=document.querySelector(".form__input--desc");let y,ht;const Et=3;let P=[{id:"658#@#45#2!",title:"Bon Voyage \u{1F6E9}",rating:"\u2B50\uFE0F\u2B50\uFE0F\u2B50\uFE0F\u2B50\uFE0F\u2606",startDate:"Oct 23, 2027",endDate:"Dec 14, 2029",desc:"From modern skyscrapers to neon lights, palaces, Seoul is a fascinating mix of old and new.",coords:[37.5326,127.024612],countryCode:"SK",countryFlag:"\u{1F1F0}\u{1F1F7}",city:"Seoul",cityWeaIconPath:"http://openweathermap.org/img/wn/11d@2x.png",cityWeaDesc:"light rain",tripImg:"https://images.unsplash.com/photo-1641463594370-68593b56552c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"},{id:"thgj79845#2!",title:"Majestic Views",rating:"\u2B50\uFE0F\u2B50\uFE0F\u2B50\uFE0F\u2606\u2606",startDate:"Jan 22, 2023",endDate:"Feb 01, 2023",desc:"Lago di Braies is a beautiful lake surrounded by green mountains \u{1F60D}. I had an amazing time.",coords:[46.694721,12.084444],countryCode:"IT",countryFlag:"\u{1F1EE}\u{1F1F9}",city:"Pragser Wildsee",cityWeaIconPath:"https://openweathermap.org/img/wn/02d@2x.png",cityWeaDesc:"few clouds",tripImg:"https://images.unsplash.com/photo-1536323760109-ca8c07450053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80"},{id:"coki45#2!",title:"Bottoms Up In Mo'Bay",rating:"\u2B50\uFE0F\u2B50\uFE0F\u2B50\uFE0F\u2B50\uFE0F\u2B50\uFE0F",startDate:"Mar 12, 2022",endDate:"June 01, 2022",desc:"Montego Bay has duty-free shopping, vibrant nightlife, & calm waters. I can't wait to return!",coords:[18.47163118420902,-77.92087554931642],countryCode:"JM",countryFlag:"\u{1F1EF}\u{1F1F2}",city:"Montego Bay",cityWeaIconPath:"https://openweathermap.org/img/wn/01d@2x.png",cityWeaDesc:"clear sky",tripImg:"https://images.unsplash.com/photo-1624483275193-33b8acc6e32f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80%20%20https://images.unsplash.com/photo-1592945843838-c69fc7dacb08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80%20https://images.unsplash.com/photo-1626292730004-0b3373283151?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2864&q=80"}];const mt=o=>{W.classList.remove("hidden"),Q.focus(),ht=o,L.popup({autoClose:!0,closeOnClick:!0,className:"leaflet-pop--addTrip"}).setLatLng(o.latlng).setContent("<p>Add a trip here.</p>").openOn(y)},Tt=()=>{W.reset(),W.style.display="none",W.classList.add("hidden"),setTimeout(()=>W.style.display="grid",1e3)},V=(o,i)=>y.flyTo(o,i),gt=o=>{const i=L.divIcon({className:"tealCircleIcon"});L.marker(o.coords,{icon:i}).on("click",()=>{V(o.coords,13)}).addTo(y).bindPopup(L.popup({maxWidth:300,minWidth:30,autoClose:!1,closeOnClick:!1,className:"trip-popup"})).setPopupContent(`${o.countryFlag} ${o.countryCode.toUpperCase()}\xA0\xA0\xA0\u{1F4CD}${o.city}`).openPopup()},ft=o=>{const i=`
        <li class="trip card card-box" data-id='${o.id}'>
                <aside class="card__aside">
                        <figure class="card__figure">
                                <img class="card__image" src='${o.tripImg}' alt="picture of a hand holding a beer outstretched towards a lake" />
                        </figure>
                </aside>
                <header class="card__header card-textbox">
                        <div class="card-textbox__location-box">
                                <div class="card-textbox__country">
                                        <p class="card__flag">${o.countryFlag}</p>
                                        <p class="card__country">${o.countryCode}</p>  
                                        <p class="card__map-marker">\u{1F4CD}</p>
                                        <div class="card__weather-icon-div card__country">${o.city}
                                                <img class="card__weather-icon" src='${o.cityWeaIconPath}'/>
                                        </div>
                                </div>
                                <div>
                                        <ion-icon class="card__drop-down--icon" data-bs-toggle="dropdown" type="div" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" name="ellipsis-horizontal"></ion-icon>
                                        <div class="card__dropdown-menu--styling  dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <div class="dropdown-item card__dropdown-item--styling editBtn"><ion-icon name="create-outline"></ion-icon>Edit</div>
                                        <div class="dropdown-item card__dropdown-item--styling deleteBtn"><ion-icon name="trash-outline"></ion-icon>Delete</div>
                                </div>
                        </div>
                        </div>
                        <h2 class="card__title">${o.title}</h2>
                        <div class="card__body">
                                <div class = 'card__date-rating-box'>
                                <p class="card__date">${o.startDate} - ${o.endDate}</p>
                                <p  class="card__rating">${o.rating}</p>
                                </div>
                                <p class="card__description">${o.desc}</p>
                        </div>
                </header>
        </li>
`;W.insertAdjacentHTML("afterend",i)},$t=()=>{const o=JSON.parse(localStorage.getItem("trips"));!o||(P=o,P.forEach(i=>{ft(i),gt(i)}))};await(async()=>{try{const o=await st(),{latitude:i,longitude:s}=o.coords,r=[i,s],u=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{maxZoom:18,id:"mapbox/dark-v10",tileSize:512,zoomOffset:-1,accessToken:"pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA"}),h=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{maxZoom:18,id:"mapbox/navigation-night-v1",tileSize:512,zoomOffset:-1,accessToken:"pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA"}),d=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{maxZoom:18,id:"mapbox/streets-v11",tileSize:512,zoomOffset:-1,accessToken:"pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA"});y=L.map("map",{zoomControl:!1,center:r,layers:[d,h,u]}).setView(r,Et),L.marker(r,{icon:L.icon.pulse({iconUrl:"https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon-2x.png",color:"#D68C45",fillColor:"#D68C45"})}).on("click",()=>V(r,14)).addTo(y).bindPopup(L.popup({maxWidth:300,minWidth:20,autoClose:!0,closeOnClick:!0,className:"search-popup"})).setPopupContent(`
                                \u{1F468}\u{1F3FD}\u200D\u{1F4BB} Hi! I'm Keron, and this is your<br> \xA0\xA0\xA0\xA0\xA0current position.<br><br> \u2699\uFE0F Trips Ahoy! key features are: <br>
                                \u{1F4CC} Find a place by using the search box. <br>
                                \u{1F4CC} Get current weather for place searched. <br>
                                \u{1F4CC} Find places near an area searched. <br>
                                \u{1F4CC} Find a route and directions. <br>
                                \u{1F4CC} Add a trip by clicking on the map. <br>
                                \u{1F4CC} Rate trip <br>
                                \u{1F4CC} Update trip <br>
                                \u{1F4CC} Delete trip <br>
                                \u{1F4CC} Change map style. <br>
                                `).bindTooltip(" Click to learn more about Trips Ahoy!",{direction:"right",interactive:!0}).toggleTooltip(globalThis);const b="AAPKdec506a2a45242168858f4b1bdd8bc83U3L-BFCyxIRNCMccr-A9Ww_dzna7wRD9H-Ap3GNvX8ZF6RBh9hXKqMgBFezUMC7a",D=L.esri.Geocoding.geosearch({position:"topright",placeholder:"Find address or place...",useMapBounds:!1,providers:[L.esri.Geocoding.arcgisOnlineProvider({apikey:b,nearby:{lat:r[0],lng:r[1]}})]}),M=L.layerGroup().addTo(y);D.on("results",async l=>{M.clearLayers();const m=[l.results[0].latlng.lat,l.results[0].latlng.lng],w=await ct(m[0],m[1]),v=await Y(m[0],m[1]);for(let g=l.results.length-1;g>=0;g--){const _={icon:L.icon({iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png"})},F={icon:L.divIcon({className:"css-icon",html:'<div class="gps_ring"></div>',iconSize:[18,22]})},x=L.marker(l.results[g].latlng,_).on("click",function(){this.bounce(1),V(m,15)}),N=L.marker(l.results[g].latlng,F),R=`${Math.round(l.results[g].latlng.lng*1e5)/1e5}, ${Math.round(l.results[g].latlng.lat*1e5)/1e5}`;x.bindPopup(L.popup({autoClose:!1,closeOnClick:!1,className:"search-popup"})).setPopupContent(`<p>${v.flag} <strong>${l.results[g].properties.LongLabel}</strong>
                                        <br>\u2601\uFE0F ${w[2]}<i> ${w[1]}</i>
                                        <br><span>\u{1F5E3}</span> ${v.language} 
                                        <br><span>\u{1F4B8}</span> ${v.currency} 
                                        </p>`),M.addLayer(N),M.addLayer(x),x.openPopup().bounce(3)._icon.classList.add("hueChangeOrange")}});const O={Street:d,Navigation:h,Dark:u};D.addTo(y),L.control.zoom({position:"bottomright"}).addTo(y),y.addControl(new L.Control.Fullscreen({position:"bottomright"})),L.control.layers(O,null,{position:"bottomright"}).addTo(y),L.Control.PlacesSelect=L.Control.extend({onAdd(l){const m=[["","Find places nearby..."],["Travel and Transport","Travel and Transport"],["Airport","Airport"],["Train station","Train station"],["Hotel","Hotel"],["Food","Food"],["Coffee shop","Coffee shop"],["Shops and Service","Shops and Service"],["Arts and Entertainment","Arts and Entertainment"],["Parks and Outdoors","Parks and Outdoors"],["Gas station","Gas station"],["Hospital","Hospital"],["Nightlife Spot","Nightlife Spot"]],w=L.DomUtil.create("select","");return w.setAttribute("id","optionsSelect"),w.setAttribute("style","padding:16px 0px;text-align:center;max-width: 150px;"),m.forEach(v=>{const g=L.DomUtil.create("option");g.value=v[0],g.innerHTML=v[1],w.appendChild(g)}),w},onRemove(l){}}),L.control.placesSelect=function(l){return new L.Control.PlacesSelect(l)},L.control.placesSelect({position:"topright"}).addTo(y);const A=L.layerGroup().addTo(y),T=function(l){L.esri.Geocoding.geocode({apikey:b}).category(l).nearby(y.getCenter(),10).run((m,w)=>{m||(A.clearLayers(),w.results.forEach(v=>{L.marker(v.latlng,{bounceOnAdd:!0}).on("click",function(){this.bounce(1)}).addTo(A).bindPopup(L.popup({maxWidth:300,minWidth:30,autoClose:!0,closeOnClick:!1,className:"trip-popup"})).setPopupContent(`<strong class='places'>${v.properties.PlaceName}</strong></br>${v.properties.Place_addr}`).openPopup().bounce(3)._icon.classList.add("hueChangeTeal")}))})},c=document.getElementById("optionsSelect");c.addEventListener("change",()=>{c.value!==""&&T(c.value)}),document.querySelector("#optionsSelect option").disabled=!0,c.addEventListener("click",l=>{l.stopPropagation()}),L.Routing.control({position:"topright",show:!1,waypoints:[null],showAlternatives:!0,lineOptions:{styles:[{color:"#319795",opacity:1,weight:3}]},altLineOptions:{styles:[{color:"#D68C45",opacity:.15,weight:9},{color:"white",opacity:0,weight:3},{color:"#D68C45",opacity:1,weight:3}]},createMarker:(l,m)=>l===0?L.marker(m.latLng,{icon:L.icon.pulse({iconUrl:"https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon-2x.png",color:"#319795",fillColor:"#319795"}),draggable:!0,bounceOnAdd:!1,bounceOnAddOptions:{duration:1e3,height:800}}):L.marker(m.latLng,{icon:L.icon({iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",className:"hueChangeTeal"}),draggable:!0,bounceOnAdd:!1,bounceOnAddOptions:{duration:1e3,height:800}}),routeWhileDragging:!0,geocoder:L.Control.Geocoder.nominatim()}).addTo(y),y.on("click",mt),$t()}catch(o){return Promise.reject(o.message)}})();const K=o=>{if(!y)return;const i=o.target.closest(".trip");if(i)return P.find(s=>s.id===i.dataset.id)};(()=>{document.querySelectorAll(".deleteBtn").forEach(o=>{o.addEventListener("click",i=>{const s=K(i);P=P.filter(r=>r.id!==s.id),X(),location.reload()})})})(),(()=>{document.querySelectorAll(".editBtn").forEach(o=>{o.addEventListener("click",i=>{const s=K(i);P=P.filter(d=>d.id!==s.id),X();const{coords:r}=s,u={latlng:{lat:r[0],lng:r[1]}};mt(u),Q.value=s.title,lt.value=At(s.rating),ut.value=at(s.startDate),dt.value=at(s.endDate),pt.value=s.desc;const h={countryCode:s.countryCode,countryFlag:s.countryFlag,cityWeaIconPath:s.cityWeaIconPath,cityWeaDesc:s.cityWeaDesc,tripImg:s.tripImg};console.log(u,h.tripImg),i.key==="Enter"&&yt(h)})})})();const Wt=o=>{const i=K(o);y.flyTo(i.coords,13)},X=()=>localStorage.setItem("trips",JSON.stringify(P)),yt=async o=>{try{o.preventDefault();const i=uuid.v4(),s=Ct(Q.value),r=Dt(s),u=Lt(lt.value),h=rt(ut.value),d=rt(dt.value),b=pt.value,{lat:D,lng:M}=ht.latlng,O=await Y(D,M),A=O.countryAbbrev,T=O.flag,c=St(O.city),l=await ct(D,M),m=l[0],w=l[1],v=await Ft(),g={id:i,title:r,rating:u,startDate:h,endDate:d,desc:b,coords:[D,M],countryCode:A,countryFlag:T,city:c,cityWeaIconPath:m,cityWeaDesc:w,tripImg:v};P.push(g),gt(g),ft(g),Tt(),X(),location.reload()}catch(i){console.error(i)}};W.addEventListener("submit",yt),document.querySelector(".form__btn").addEventListener("click",o=>o.stopPropagation()),jt.addEventListener("click",Wt),document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),document.querySelector(".year").textContent=new Date().getFullYear()})();export{te as __tla,Mt as __vite_legacy_guard};