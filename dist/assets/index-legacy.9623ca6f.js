System.register([],(function(t,e){"use strict";return{execute:async function(){!function(t){function e(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var n=e(t);function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function a(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function s(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,i,a=[],r=!0,s=!1;try{for(n=n.call(t);!(r=(o=n.next()).done)&&(a.push(o.value),!e||a.length!==e);r=!0);}catch(c){s=!0,i=c}finally{try{r||null==n.return||n.return()}finally{if(s)throw i}}return a}}(t,e)||function(t,e){if(t){if("string"==typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?c(t,e):void 0}}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=new Array(e);n<e;n++)o[n]=t[n];return o}function l(t,e){return function(t,e){return e.get?e.get.call(t):e.value}(t,d(t,e,"get"))}function u(t,e,n){return function(t,e,n){if(e.set)e.set.call(t,n);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=n}}(t,d(t,e,"set"),n),n}function d(t,e,n){if(!e.has(t))throw new TypeError("attempted to "+n+" private field on non-instance");return e.get(t)}function p(t,e,n){!function(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}(t,e),e.set(t,n)}var h=function(){function t(e){o(this,t),r(this,"bounceHeight",15),r(this,"contractHeight",12),r(this,"bounceSpeed",52),r(this,"contractSpeed",52),r(this,"shadowAngle",-Math.PI/4),r(this,"elastic",!0),r(this,"exclusive",!1),e&&Object.assign(this,e)}return a(t,[{key:"override",value:function(e){return Object.assign(new t(this),e)}}]),t}(),m=new WeakMap,g=function(){function t(){o(this,t),p(this,m,{writable:!0,value:[]})}return a(t,[{key:"getBouncingMarkers",value:function(){return l(this,m)}},{key:"addBouncingMarker",value:function(t,e){e||t._bouncingMotion.bouncingOptions.exclusive?this.stopAllBouncingMarkers():this.stopExclusiveMarkerBouncing(),l(this,m).push(t)}},{key:"stopExclusiveMarkerBouncing",value:function(){var t=l(this,m).find((function(t){return t._bouncingMotion.bouncingOptions.exclusive}));t&&t.stopBouncing()}},{key:"removeBouncingMarker",value:function(t){var e=l(this,m).indexOf(t);~e&&l(this,m).splice(e,1)}},{key:"stopAllBouncingMarkers",value:function(){for(var t;t=l(this,m).shift();)t.stopBouncing()}}]),t}(),y=t.Marker.prototype._setPos,f=t.Marker.prototype.onAdd,v=t.Marker.prototype.setIcon,b={_bouncingOptions:new h,_orchestration:new g,setBouncingOptions:function(t){return this._bouncingMotion.updateBouncingOptions(t),this},isBouncing:function(){return this._bouncingMotion.isBouncing},bounce:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;this._bouncingMotion.bounce(e);var n=this._bouncingMotion.bouncingOptions.exclusive;return t.Marker.prototype._orchestration.addBouncingMarker(this,n),this},stopBouncing:function(){return this._bouncingMotion.stopBouncing(),t.Marker.prototype._orchestration.removeBouncingMarker(this),this},toggleBouncing:function(){return this._bouncingMotion.isBouncing?this.stopBouncing():this.bounce(),this},isRealMarker:function(){return this.__proto__===t.Marker.prototype},_setPos:function(t){y.call(this,t),this.isRealMarker()&&(this._bouncingMotion.position=t,this._bouncingMotion.resetStyles(this))},onAdd:function(t){f.call(this,t),this.isRealMarker()&&this._bouncingMotion.resetStyles(this)},setIcon:function(t){v.call(this,t),this.isRealMarker()&&this._icon&&this._bouncingMotion.resetStyles(this)}};!function(t,e){void 0===e&&(e={});var n=e.insertAt;if(t&&"undefined"!=typeof document){var o=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&o.firstChild?o.insertBefore(i,o.firstChild):o.appendChild(i),i.styleSheet?i.styleSheet.cssText=t:i.appendChild(document.createTextNode(t))}}("@keyframes l-smooth-marker-bouncing-move {\n    from {\n        transform: translate(var(--pos-x), var(--pos-y))\n    }\n    to {\n        transform: translate(var(--pos-x-jump, var(--pos-x)), var(--pos-y-jump))\n    }\n}\n\n@keyframes l-smooth-marker-bouncing-contract {\n    from {\n        transform: translate(var(--pos-x), var(--pos-y))\n    }\n    to {\n        transform: translate(var(--pos-x), var(--pos-y-contract)) scaleY(var(--scale-contract))\n    }\n}\n\n.bouncing {\n    animation-name: l-smooth-marker-bouncing-move, l-smooth-marker-bouncing-move, l-smooth-marker-bouncing-contract, l-smooth-marker-bouncing-contract;\n    animation-direction: normal, reverse, normal, reverse;\n    animation-duration: var(--duration-jump), var(--duration-jump), var(--duration-contract), var(--duration-contract);\n    animation-delay: var(--delays)\n}\n\n.bouncing.simple {\n    animation-name: l-smooth-marker-bouncing-move, l-smooth-marker-bouncing-move;\n    animation-direction: normal, reverse;\n    animation-duration: var(--duration-jump), var(--duration-jump);\n    animation-delay: var(--delays)\n}\n");var w=/([\w-]+): ([^;]+);/g,k=function(){function t(e){o(this,t),e&&Object.assign(this,e)}return a(t,[{key:"findOpacity",value:function(t){this.opacity=(null==t?void 0:t.opacityWhenUnclustered)||(null==t?void 0:t.opacity)||1}},{key:"withStyles",value:function(e){var n=new t(this);return n&&Object.assign(n,e),n}},{key:"toString",value:function(){return Object.entries(this).map((function(t){return"".concat(t[0],": ").concat(t[1],";")})).join(" ")}}],[{key:"parse",value:function(e){for(var n={},o=w.exec(e);o;)n[o[1]]=o[2],o=w.exec(e);return delete n["z-index"],delete n.opacity,n.outline="none",new t(n)}},{key:"ofMarker",value:function(e){var n=t.parse(e._icon.style.cssText);return n.findOpacity(e.options),n["z-index"]=e._zIndex,n}}]),t}(),_="l-smooth-marker-bouncing-",x=_+"contract";function M(e,n){n.forEach((function(n){return t.DomUtil.removeClass(e,n)})),e.offsetWidth,n.forEach((function(n){return t.DomUtil.addClass(e,n)}))}var S=new WeakMap,O=new WeakMap,L=new WeakMap,C=new WeakMap,A=new WeakMap,B=function(){function e(t,n,i){var a=this;o(this,e),r(this,"marker",void 0),r(this,"position",void 0),r(this,"bouncingOptions",void 0),r(this,"isBouncing",!1),r(this,"iconStyles",void 0),r(this,"shadowStyles",void 0),r(this,"bouncingAnimationPlaying",!1),p(this,S,{writable:!0,value:x}),p(this,O,{writable:!0,value:["bouncing"]}),p(this,L,{writable:!0,value:void 0}),p(this,C,{writable:!0,value:void 0}),p(this,A,{writable:!0,value:function(t){return a.onAnimationEnd(t)}}),this.marker=t,this.position=n,this.updateBouncingOptions(i)}return a(e,[{key:"updateBouncingOptions",value:function(e){if(this.bouncingOptions=e instanceof h?e:this.bouncingOptions.override(e),this.bouncingOptions.elastic){u(this,S,x);var n=l(this,O).indexOf("simple");n>-1&&l(this,O).splice(n,1),this.marker._icon&&t.DomUtil.removeClass(this.marker._icon,"simple")}else u(this,S,"l-smooth-marker-bouncing-move"),l(this,O).push("simple");this.marker._icon&&this.resetStyles(this.marker)}},{key:"onAnimationEnd",value:function(e){var n,o,i=this;e.animationName===l(this,S)&&(u(this,L,(n=l(this,L),++n)),u(this,L,l(this,L)%2),l(this,L)||(this.isBouncing&&(null===l(this,C)||u(this,C,(o=l(this,C),--o)))?(M(this.marker._icon,l(this,O)),this.marker._shadow&&this.bouncingOptions.shadowAngle&&M(this.marker._shadow,l(this,O))):(l(this,O).forEach((function(e){t.DomUtil.removeClass(i.marker._icon,e),i.marker._shadow&&t.DomUtil.removeClass(i.marker._shadow,e)})),this.bouncingAnimationPlaying=!1,this.marker.fire("bounceend"))))}},{key:"resetStyles",value:function(n){var o,i,a,r,c,u=this;this.marker=n,this.iconStyles=k.ofMarker(n),n._shadow&&(this.shadowStyles=k.parse(n._shadow.style.cssText));var d=(null===(o=this.marker.getIcon())||void 0===o||null===(i=o.options)||void 0===i?void 0:i.iconSize[1])||(null===(a=this.marker)||void 0===a||null===(r=a._iconObj)||void 0===r||null===(c=r.options)||void 0===c?void 0:c.iconSize[1]),p=e.animationParams(this.position,this.bouncingOptions,d);this.iconStyles=this.iconStyles.withStyles(p),this.marker._icon.style.cssText=this.iconStyles.toString(),this.bouncingAnimationPlaying&&(M(this.marker._icon,l(this,O)),this.marker._icon.addEventListener("animationend",l(this,A)));var h=this.bouncingOptions,m=h.bounceHeight,g=h.contractHeight,y=h.shadowAngle;if(this.marker._shadow)if(y){var f,v,b=this.position,w=function(t,e,n,o){for(var i,a=Math.round(t+Math.cos(n)*(2*o)),r=Math.round(e+Math.sin(n)*(2*o)),s=Math.abs(a-t),c=t<a?1:-1,l=Math.abs(r-e),u=e<r?1:-1,d=(s>l?s:-l)/2,p=[],h=0;p.push([t,e]),++h!==o;)(i=d)>-s&&(d-=l,t+=c),i<l&&(d+=s,e+=u);return p}(b.x,b.y,y,m+1),_=s(w[m],2),x=_[0],S=_[1],L=null===(f=this.marker.getIcon())||void 0===f||null===(v=f.options)||void 0===v?void 0:v.shadowSize[1],C=e.contractScale(L,g);this.shadowStyles=this.shadowStyles.withStyles(p).withStyles({"--pos-x-jump":"".concat(x,"px"),"--pos-y-jump":"".concat(S,"px"),"--scale-contract":C}),this.marker._shadow.style.cssText=this.shadowStyles.toString(),this.bouncingAnimationPlaying&&M(this.marker._shadow,l(this,O))}else l(this,O).forEach((function(e){t.DomUtil.removeClass(u.marker._shadow,e)}))}},{key:"bounce",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;u(this,C,t),this.isBouncing=!0,this.bouncingAnimationPlaying||(u(this,L,0),this.bouncingAnimationPlaying=!0,M(this.marker._icon,l(this,O)),this.marker._shadow&&this.bouncingOptions.shadowAngle&&M(this.marker._shadow,l(this,O)),this.marker._icon.addEventListener("animationend",l(this,A)))}},{key:"stopBouncing",value:function(){this.isBouncing=!1}}],[{key:"animationParams",value:function(t,n,o){var i=t.x,a=t.y,r=n.bounceHeight,s=n.contractHeight,c=n.bounceSpeed,l=n.contractSpeed,u=e.contractScale(o,s),d=e.calculateDuration(r,c),p=e.calculateDuration(s,l),h=[0,d,2*d,2*d+p];return{"--pos-x":"".concat(i,"px"),"--pos-y":"".concat(a,"px"),"--pos-y-jump":"".concat(a-r,"px"),"--pos-y-contract":"".concat(a+s,"px"),"--scale-contract":u,"--duration-jump":"".concat(d,"ms"),"--duration-contract":"".concat(p,"ms"),"--delays":"0ms, ".concat(h[1],"ms, ").concat(h[2],"ms, ").concat(h[3],"ms")}}},{key:"contractScale",value:function(t,e){return(t-e)/t}},{key:"calculateDuration",value:function(t,e){for(var n=Math.round(.8*e),o=t;--o;)n+=Math.round(e/(t-o));return n}}]),e}();n.default.Marker.include(b),n.default.Marker.setBouncingOptions=function(e){t.Marker.prototype._bouncingOptions=e instanceof h?e:new h(e)},n.default.Marker.getBouncingMarkers=function(){t.Marker.prototype._orchestration.getBouncingMarkers()},n.default.Marker.stopAllBouncingMarkers=function(){t.Marker.prototype._orchestration.stopAllBouncingMarkers()},n.default.Marker.addInitHook((function(){if(this.isRealMarker()){var e=new h(t.Marker.prototype._bouncingOptions);this._bouncingMotion=new B(this,new t.Point(0,0),e)}}))}(L);const t=t=>t.toLowerCase().trim().replaceAll(" ","-"),e=t=>new Date(t).toISOString().slice(0,10),n=t=>{const e=new Date(t),n=navigator.language;return new Intl.DateTimeFormat(n,{month:"short",day:"numeric",year:"numeric"}).format(e)},o=document.querySelector(".book-flight-btn__select"),i=()=>new Promise(((t,e)=>{navigator.geolocation.getCurrentPosition(t,e)})),a=async(t,e)=>{try{const n="528c5dcffdab43848fa6c11bfb7a2545",o=await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${t}&lon=${e}&format=json&apiKey=${n}`);if(!o.ok)throw new Error("Problem getting location data");const i=await o.json(),a=i.results[0]?.country_code??"Unavailable",r=await fetch(`https://restcountries.com/v3.1/alpha/${a}`);if(!r.ok)throw new Error("Problem getting country data");const s=await r.json(),c=a,l=s[0]?.name?.common??"Unavailable",u=i.results[0]?.city??"Unavailable",d=s[0]?.flag??"Unavailable",p=Object.values(s[0]?.languages??"Unavailable").join(", "),h=Object.values(s[0]?.currencies??"Unavailable").map((t=>`${t?.name} ${t?.symbol}`))[0];return{countryAbbrev:c,countryName:l,city:u,flag:d,latitude:t,longitude:e,currency:h,language:p}}catch(n){return"Unavailable"}},r=async(t,e)=>{try{const o=await a(t,e),i="1db6ec5257aa7458bd25e359a7102c19",r=await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${o.latitude}&lon=${o.longitude}&appid=${i}`);if(!r.ok)throw new Error("Problem getting location data");const s=await r.json();if(!s)return;return[`https://openweathermap.org/img/wn/${s.current.weather[0].icon}@2x.png`,`${s.current.weather[0].description}`,`${n=s.current.temp,Math.round(9*(n-273.15)/5+32)}°`]}catch(o){return"Unavailable"}var n},s=async()=>{try{const n="92MhZXBYZ32qrYaz6K9ZS_7x6HjAo7TrqHWgSvFNc4U",o=await fetch(`https://api.unsplash.com/collections/nOMRmitGW64/photos/?per_page=30&client_id=${n}`);if(!o.ok)throw new Error("Problem getting image data");const i=await o.json(),a=(t=0,e=29,Math.floor(Math.random()*(e-t+1)+t));return i[a].urls.full}catch(n){return"Unavailable"}var t,e};(async()=>{try{await(async()=>{try{const e=await i(),{latitude:n,longitude:r}=e.coords,s=(await a(n,r)).countryName,c=await fetch("https://restcountries.com/v3.1/all");if(!c.ok)throw new Error("Problem getting country data");const l=(await c.json()).map((t=>`${t.flag} ${t.name.common}`)).sort();let u="<option disabled selected value>book trip</option>";l.forEach((e=>{u+=`<option value="https://www.kiwi.com/en/search/tiles/${t(s)}/${t(e.slice(5,e.length).trim().toLowerCase())}">${e}</option>`,o.innerHTML=u}))}catch(e){return"Unavailable"}})()}catch(e){return`${e.message}`}})();const c=document.querySelector(".form"),l=document.querySelector(".trips"),u=document.querySelector(".form__input--title"),d=document.querySelector(".form__input--rating"),p=document.querySelector(".form__input--start-date"),h=document.querySelector(".form__input--end-date"),m=document.querySelector(".form__input--desc");let g,y,f=[{id:"658#@#45#2!",title:"Bon Voyage 🛩",rating:"⭐️⭐️⭐️⭐️☆",startDate:"Oct 23, 2027",endDate:"Dec 14, 2029",desc:"From modern skyscrapers to neon lights, palaces, Seoul is a fascinating mix of old and new.",coords:[37.5326,127.024612],countryCode:"SK",countryFlag:"🇰🇷",city:"Seoul",cityWeaIconPath:"http://openweathermap.org/img/wn/11d@2x.png",cityWeaDesc:"light rain",tripImg:"https://images.unsplash.com/photo-1641463594370-68593b56552c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"},{id:"thgj79845#2!",title:"Majestic Views",rating:"⭐️⭐️⭐️☆☆",startDate:"Jan 22, 2023",endDate:"Feb 01, 2023",desc:"Lago di Braies is a beautiful lake surrounded by green mountains 😍. I had an amazing time.",coords:[46.694721,12.084444],countryCode:"IT",countryFlag:"🇮🇹",city:"Pragser Wildsee",cityWeaIconPath:"https://openweathermap.org/img/wn/02d@2x.png",cityWeaDesc:"few clouds",tripImg:"https://images.unsplash.com/photo-1536323760109-ca8c07450053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80"},{id:"coki45#2!",title:"Bottoms Up In Mo'Bay",rating:"⭐️⭐️⭐️⭐️⭐️",startDate:"Mar 12, 2022",endDate:"June 01, 2022",desc:"Montego Bay has duty-free shopping, vibrant nightlife, & calm waters. I can't wait to return!",coords:[18.47163118420902,-77.92087554931642],countryCode:"JM",countryFlag:"🇯🇲",city:"Montego Bay",cityWeaIconPath:"https://openweathermap.org/img/wn/01d@2x.png",cityWeaDesc:"clear sky",tripImg:"https://images.unsplash.com/photo-1624483275193-33b8acc6e32f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80%20%20https://images.unsplash.com/photo-1592945843838-c69fc7dacb08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80%20https://images.unsplash.com/photo-1626292730004-0b3373283151?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2864&q=80"}];const v=t=>{c.classList.remove("hidden"),u.focus(),y=t,L.popup({autoClose:!0,closeOnClick:!0,className:"leaflet-pop--addTrip"}).setLatLng(t.latlng).setContent("<p>Add a trip here.</p>").openOn(g)},b=(t,e)=>g.flyTo(t,e),w=t=>{const e=L.divIcon({className:"tealCircleIcon"});L.marker(t.coords,{icon:e}).on("click",(()=>{b(t.coords,13)})).addTo(g).bindPopup(L.popup({maxWidth:300,minWidth:30,autoClose:!1,closeOnClick:!1,className:"trip-popup"})).setPopupContent(`${t.countryFlag} ${t.countryCode.toUpperCase()}   📍${t.city}`).openPopup()},k=t=>{const e=`\n        <li class="trip card card-box" data-id='${t.id}'>\n                <aside class="card__aside">\n                        <figure class="card__figure">\n                                <img class="card__image" src='${t.tripImg}' alt="picture of a hand holding a beer outstretched towards a lake" />\n                        </figure>\n                </aside>\n                <header class="card__header card-textbox">\n                        <div class="card-textbox__location-box">\n                                <div class="card-textbox__country">\n                                        <p class="card__flag">${t.countryFlag}</p>\n                                        <p class="card__country">${t.countryCode}</p>  \n                                        <p class="card__map-marker">📍</p>\n                                        <div class="card__weather-icon-div card__country">${t.city}\n                                                <img class="card__weather-icon" src='${t.cityWeaIconPath}'/>\n                                        </div>\n                                </div>\n                                <div>\n                                        <ion-icon class="card__drop-down--icon" data-bs-toggle="dropdown" type="div" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" name="ellipsis-horizontal"></ion-icon>\n                                        <div class="card__dropdown-menu--styling  dropdown-menu" aria-labelledby="dropdownMenuButton">\n                                        <div class="dropdown-item card__dropdown-item--styling editBtn"><ion-icon name="create-outline"></ion-icon>Edit</div>\n                                        <div class="dropdown-item card__dropdown-item--styling deleteBtn"><ion-icon name="trash-outline"></ion-icon>Delete</div>\n                                </div>\n                        </div>\n                        </div>\n                        <h2 class="card__title">${t.title}</h2>\n                        <div class="card__body">\n                                <div class = 'card__date-rating-box'>\n                                <p class="card__date">${t.startDate} - ${t.endDate}</p>\n                                <p  class="card__rating">${t.rating}</p>\n                                </div>\n                                <p class="card__description">${t.desc}</p>\n                        </div>\n                </header>\n        </li>\n`;c.insertAdjacentHTML("afterend",e)};await(async()=>{try{const t=await i(),{latitude:e,longitude:n}=t.coords,o=[e,n],s=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{maxZoom:18,id:"mapbox/dark-v10",tileSize:512,zoomOffset:-1,accessToken:"pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA"}),c=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{maxZoom:18,id:"mapbox/navigation-night-v1",tileSize:512,zoomOffset:-1,accessToken:"pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA"}),l=L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",{maxZoom:18,id:"mapbox/streets-v11",tileSize:512,zoomOffset:-1,accessToken:"pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA"});g=L.map("map",{zoomControl:!1,center:o,layers:[l,c,s]}).setView(o,3),L.marker(o,{icon:L.icon.pulse({iconUrl:"https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon-2x.png",color:"#D68C45",fillColor:"#D68C45"})}).on("click",(()=>b(o,14))).addTo(g).bindPopup(L.popup({maxWidth:300,minWidth:20,autoClose:!0,closeOnClick:!0,className:"search-popup"})).setPopupContent("\n                                👨🏽‍💻 Hi! I'm Keron, and this is your<br>      current position.<br><br> ⚙️ Trips Ahoy! key features are: <br>\n                                📌 Find a place by using the search box. <br>\n                                📌 Get current weather for place searched. <br>\n                                📌 Find places near an area searched. <br>\n                                📌 Find a route and directions. <br>\n                                📌 Add a trip by clicking on the map. <br>\n                                📌 Rate trip <br>\n                                📌 Update trip <br>\n                                📌 Delete trip <br>\n                                📌 Change map style. <br>\n                                ").bindTooltip(" Click to learn more about Trips Ahoy!",{direction:"right",interactive:!0}).toggleTooltip(globalThis);const u="AAPKdec506a2a45242168858f4b1bdd8bc83U3L-BFCyxIRNCMccr-A9Ww_dzna7wRD9H-Ap3GNvX8ZF6RBh9hXKqMgBFezUMC7a",d=L.esri.Geocoding.geosearch({position:"topright",placeholder:"Find address or place...",useMapBounds:!1,providers:[L.esri.Geocoding.arcgisOnlineProvider({apikey:u,nearby:{lat:o[0],lng:o[1]}})]}),p=L.layerGroup().addTo(g);d.on("results",(async t=>{p.clearLayers();const e=[t.results[0].latlng.lat,t.results[0].latlng.lng],n=await r(e[0],e[1]),o=await a(e[0],e[1]);for(let i=t.results.length-1;i>=0;i--){const a={icon:L.icon({iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png"})},r={icon:L.divIcon({className:"css-icon",html:'<div class="gps_ring"></div>',iconSize:[18,22]})},s=L.marker(t.results[i].latlng,a).on("click",(function(){this.bounce(1),b(e,15)})),c=L.marker(t.results[i].latlng,r);Math.round(1e5*t.results[i].latlng.lng),Math.round(1e5*t.results[i].latlng.lat),s.bindPopup(L.popup({autoClose:!0,closeOnClick:!1,className:"search-popup"})).setPopupContent(`<p>${o.flag} <strong>${t.results[i].properties.LongLabel}</strong>\n                                        <br>☁️ ${n[2]}<i> ${n[1]}</i>\n                                        <br><span>🗣</span> ${o.language} \n                                        <br><span>💸</span> ${o.currency} \n                                        </p>`),p.addLayer(c),p.addLayer(s),s.openPopup().bounce(3)._icon.classList.add("hueChangeOrange")}}));const h={Street:l,Navigation:c,Dark:s};d.addTo(g),L.control.zoom({position:"bottomright"}).addTo(g),g.addControl(new L.Control.Fullscreen({position:"bottomright"})),L.control.layers(h,null,{position:"bottomright"}).addTo(g),L.Control.PlacesSelect=L.Control.extend({onAdd(t){const e=L.DomUtil.create("select","");return e.setAttribute("id","optionsSelect"),e.setAttribute("style","padding:16px 0px;text-align:center;max-width: 150px;"),[["","Find places nearby..."],["Travel and Transport","Travel and Transport"],["Airport","Airport"],["Train station","Train station"],["Hotel","Hotel"],["Food","Food"],["Coffee shop","Coffee shop"],["Shops and Service","Shops and Service"],["Arts and Entertainment","Arts and Entertainment"],["Parks and Outdoors","Parks and Outdoors"],["Gas station","Gas station"],["Hospital","Hospital"],["Nightlife Spot","Nightlife Spot"]].forEach((t=>{const n=L.DomUtil.create("option");n.value=t[0],n.innerHTML=t[1],e.appendChild(n)})),e},onRemove(t){}}),L.control.placesSelect=function(t){return new L.Control.PlacesSelect(t)},L.control.placesSelect({position:"topright"}).addTo(g);const m=L.layerGroup().addTo(g),y=function(t){L.esri.Geocoding.geocode({apikey:u}).category(t).nearby(g.getCenter(),10).run(((t,e)=>{t||(m.clearLayers(),e.results.forEach((t=>{L.marker(t.latlng,{bounceOnAdd:!0}).on("click",(function(){this.bounce(1)})).addTo(m).bindPopup(L.popup({maxWidth:300,minWidth:30,autoClose:!1,closeOnClick:!1,className:"trip-popup"})).setPopupContent(`<strong class='places'>${t.properties.PlaceName}</strong></br>${t.properties.Place_addr}`).openPopup().bounce(3)._icon.classList.add("hueChangeTeal")})))}))},_=document.getElementById("optionsSelect");_.addEventListener("change",(()=>{""!==_.value&&y(_.value)})),document.querySelector("#optionsSelect option").disabled=!0,_.addEventListener("click",(t=>{t.stopPropagation()})),L.Routing.control({position:"topright",show:!1,waypoints:[null],showAlternatives:!0,lineOptions:{styles:[{color:"#319795",opacity:1,weight:3}]},altLineOptions:{styles:[{color:"#D68C45",opacity:.15,weight:9},{color:"white",opacity:0,weight:3},{color:"#D68C45",opacity:1,weight:3}]},createMarker:(t,e)=>0===t?L.marker(e.latLng,{icon:L.icon.pulse({iconUrl:"https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon-2x.png",color:"#319795",fillColor:"#319795"}),draggable:!0,bounceOnAdd:!1,bounceOnAddOptions:{duration:1e3,height:800}}):L.marker(e.latLng,{icon:L.icon({iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],iconUrl:"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",className:"hueChangeTeal"}),draggable:!0,bounceOnAdd:!1,bounceOnAddOptions:{duration:1e3,height:800}}),routeWhileDragging:!0,geocoder:L.Control.Geocoder.nominatim()}).addTo(g),g.on("click",v),(()=>{const t=JSON.parse(localStorage.getItem("trips"));t&&(f=t,f.forEach((t=>{k(t),w(t)})))})()}catch(t){return Promise.reject(t.message)}})();const _=t=>{if(!g)return;const e=t.target.closest(".trip");return e?f.find((t=>t.id===e.dataset.id)):void 0};document.querySelectorAll(".deleteBtn").forEach((t=>{t.addEventListener("click",(t=>{const e=_(t);f=f.filter((t=>t.id!==e.id)),M(),location.reload()}))})),document.querySelectorAll(".editBtn").forEach((t=>{t.addEventListener("click",(t=>{const n=_(t);f=f.filter((t=>t.id!==n.id)),M();const{coords:o}=n,i={latlng:{lat:o[0],lng:o[1]}};var a;v(i),u.value=n.title,d.value=6===(a=n.rating).length?1:7===a.length?2:8===a.length?3:9===a.length?4:10===a.length?5:void 0,p.value=e(n.startDate),h.value=e(n.endDate),m.value=n.desc;const r={countryCode:n.countryCode,countryFlag:n.countryFlag,cityWeaIconPath:n.cityWeaIconPath,cityWeaDesc:n.cityWeaDesc,tripImg:n.tripImg};console.log(i,r.tripImg),"Enter"===t.key&&S(r)}))}));const x=t=>{const e=_(t);g.flyTo(e.coords,13)},M=()=>localStorage.setItem("trips",JSON.stringify(f)),S=async t=>{try{t.preventDefault();const i=uuid.v4(),l=u.value.trim(),g=(o=l)&&o.split(" ").map((t=>t[0].toUpperCase()+t.slice(1))).join(" ").replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),v=(e=d.value,"⭐️".repeat(e).concat("☆".repeat(5-e))),b=n(p.value),_=n(h.value),x=m.value,{lat:S,lng:O}=y.latlng,L=await a(S,O),C=L.countryAbbrev,A=L.flag,B=(t=>t.length<=12?t:`${t.slice(0,12)}..`)(L.city),D=await r(S,O),I=D[0],P=D[1],j=await s(),T={id:i,title:g,rating:v,startDate:b,endDate:_,desc:x,coords:[S,O],countryCode:C,countryFlag:A,city:B,cityWeaIconPath:I,cityWeaDesc:P,tripImg:j};f.push(T),w(T),k(T),c.reset(),c.style.display="none",c.classList.add("hidden"),setTimeout((()=>c.style.display="grid"),1e3),M(),location.reload()}catch(i){console.error(i)}var e,o};c.addEventListener("submit",S),document.querySelector(".form__btn").addEventListener("click",(t=>t.stopPropagation())),l.addEventListener("click",x),document.createElement("canvas").getContext("2d",{willReadFrequently:!0}),document.querySelector(".year").textContent=(new Date).getFullYear()}}}));
