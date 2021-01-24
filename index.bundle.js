var global="object"==typeof self&&self.self===self&&self||"object"==typeof global&&global.global===global&&global||this,instances={},modules={"../node_modules/mithril/render/vnode.js":function(e,t,n){"use strict";function r(e,t,n,r,o,i){return{tag:e,key:t,attrs:n,children:r,text:o,dom:i,domSize:void 0,state:void 0,events:void 0,instance:void 0}}r.normalize=function(e){return Array.isArray(e)?r("[",void 0,void 0,r.normalizeChildren(e),void 0,void 0):null==e||"boolean"==typeof e?null:"object"==typeof e?e:r("#",void 0,void 0,String(e),void 0,void 0)},r.normalizeChildren=function(e){var t=[];if(e.length){for(var n=null!=e[0]&&null!=e[0].key,o=1;o<e.length;o++)if((null!=e[o]&&null!=e[o].key)!==n)throw new TypeError("Vnodes must either always have keys or never have keys!");for(o=0;o<e.length;o++)t[o]=r.normalize(e[o])}return t},t.exports=r},"../node_modules/mithril/render/hyperscriptVnode.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/render/vnode.js");t.exports=function(){var e,t=arguments[this],n=this+1;if(null==t?t={}:("object"!=typeof t||null!=t.tag||Array.isArray(t))&&(t={},n=this),arguments.length===n+1)e=arguments[n],Array.isArray(e)||(e=[e]);else for(e=[];n<arguments.length;)e.push(arguments[n++]);return r("",t.key,t,e)}},"../node_modules/mithril/render/hyperscript.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/render/vnode.js"),o=e("../node_modules/mithril/render/hyperscriptVnode.js"),i=/(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g,l={},s={}.hasOwnProperty;function a(e){for(var t in e)if(s.call(e,t))return!1;return!0}t.exports=function(e){if(null==e||"string"!=typeof e&&"function"!=typeof e&&"function"!=typeof e.view)throw Error("The selector must be either a string or a component.");var t=o.apply(1,arguments);return"string"==typeof e&&(t.children=r.normalizeChildren(t.children),"["!==e)?function(e,t){var n=t.attrs,o=r.normalizeChildren(t.children),i=s.call(n,"class"),l=i?n.class:n.className;if(t.tag=e.tag,t.attrs=null,t.children=void 0,!a(e.attrs)&&!a(n)){var u={};for(var c in n)s.call(n,c)&&(u[c]=n[c]);n=u}for(var c in e.attrs)s.call(e.attrs,c)&&"className"!==c&&!s.call(n,c)&&(n[c]=e.attrs[c]);for(var c in null==l&&null==e.attrs.className||(n.className=null!=l?null!=e.attrs.className?String(e.attrs.className)+" "+String(l):l:null!=e.attrs.className?e.attrs.className:null),i&&(n.class=null),n)if(s.call(n,c)&&"key"!==c){t.attrs=n;break}return Array.isArray(o)&&1===o.length&&null!=o[0]&&"#"===o[0].tag?t.text=o[0].children:t.children=o,t}(l[e]||function(e){for(var t,n="div",r=[],o={};t=i.exec(e);){var s=t[1],a=t[2];if(""===s&&""!==a)n=a;else if("#"===s)o.id=a;else if("."===s)r.push(a);else if("["===t[3][0]){var u=t[6];u&&(u=u.replace(/\\(["'])/g,"$1").replace(/\\\\/g,"\\")),"class"===t[4]?r.push(u):o[t[4]]=""===u?u:u||!0}}return r.length>0&&(o.className=r.join(" ")),l[e]={tag:n,attrs:o}}(e),t):(t.tag=e,t)}},"../node_modules/mithril/render/trust.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/render/vnode.js");t.exports=function(e){return null==e&&(e=""),r("<",void 0,void 0,e,void 0,void 0)}},"../node_modules/mithril/render/fragment.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/render/vnode.js"),o=e("../node_modules/mithril/render/hyperscriptVnode.js");t.exports=function(){var e=o.apply(0,arguments);return e.tag="[",e.children=r.normalizeChildren(e.children),e}},"../node_modules/mithril/hyperscript.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/render/hyperscript.js");r.trust=e("../node_modules/mithril/render/trust.js"),r.fragment=e("../node_modules/mithril/render/fragment.js"),t.exports=r},"../node_modules/mithril/promise/polyfill.js":function(e,t,n){"use strict";var r=function(e){if(!(this instanceof r))throw new Error("Promise must be called with `new`");if("function"!=typeof e)throw new TypeError("executor must be a function");var t=this,n=[],o=[],i=u(n,!0),l=u(o,!1),s=t._instance={resolvers:n,rejectors:o},a="function"==typeof setImmediate?setImmediate:setTimeout;function u(e,r){return function i(u){var d;try{if(!r||null==u||"object"!=typeof u&&"function"!=typeof u||"function"!=typeof(d=u.then))a(function(){r||0!==e.length||console.error("Possible unhandled promise rejection:",u);for(var t=0;t<e.length;t++)e[t](u);n.length=0,o.length=0,s.state=r,s.retry=function(){i(u)}});else{if(u===t)throw new TypeError("Promise can't be resolved w/ itself");c(d.bind(u))}}catch(e){l(e)}}}function c(e){var t=0;function n(e){return function(n){t++>0||e(n)}}var r=n(l);try{e(n(i),r)}catch(e){r(e)}}c(e)};r.prototype.then=function(e,t){var n,o,i=this._instance;function l(e,t,r,l){t.push(function(t){if("function"!=typeof e)r(t);else try{n(e(t))}catch(e){o&&o(e)}}),"function"==typeof i.retry&&l===i.state&&i.retry()}var s=new r(function(e,t){n=e,o=t});return l(e,i.resolvers,n,!0),l(t,i.rejectors,o,!1),s},r.prototype.catch=function(e){return this.then(null,e)},r.prototype.finally=function(e){return this.then(function(t){return r.resolve(e()).then(function(){return t})},function(t){return r.resolve(e()).then(function(){return r.reject(t)})})},r.resolve=function(e){return e instanceof r?e:new r(function(t){t(e)})},r.reject=function(e){return new r(function(t,n){n(e)})},r.all=function(e){return new r(function(t,n){var r=e.length,o=0,i=[];if(0===e.length)t([]);else for(var l=0;l<e.length;l++)!function(l){function s(e){o++,i[l]=e,o===r&&t(i)}null==e[l]||"object"!=typeof e[l]&&"function"!=typeof e[l]||"function"!=typeof e[l].then?s(e[l]):e[l].then(s,n)}(l)})},r.race=function(e){return new r(function(t,n){for(var r=0;r<e.length;r++)e[r].then(t,n)})},t.exports=r},"../node_modules/mithril/promise/promise.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/promise/polyfill.js");"undefined"!=typeof window?(void 0===window.Promise?window.Promise=r:window.Promise.prototype.finally||(window.Promise.prototype.finally=r.prototype.finally),t.exports=window.Promise):void 0!==global?(void 0===global.Promise?global.Promise=r:global.Promise.prototype.finally||(global.Promise.prototype.finally=r.prototype.finally),t.exports=global.Promise):t.exports=r},"../node_modules/mithril/render/render.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/render/vnode.js");t.exports=function(e){var t,n=e&&e.document,o={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"};function i(e){return e.attrs&&e.attrs.xmlns||o[e.tag]}function l(e,t){if(e.state!==t)throw new Error("`vnode.state` must not be modified")}function s(e){var t=e.state;try{return this.apply(t,arguments)}finally{l(e,t)}}function a(){try{return n.activeElement}catch(e){return null}}function u(e,t,n,r,o,i,l){for(var s=n;s<r;s++){var a=t[s];null!=a&&c(e,a,o,l,i)}}function c(e,t,o,l,a){var d=t.tag;if("string"==typeof d)switch(t.state={},null!=t.attrs&&$(t.attrs,t,o),d){case"#":!function(e,t,r){t.dom=n.createTextNode(t.children),w(e,t.dom,r)}(e,t,a);break;case"<":f(e,t,l,a);break;case"[":!function(e,t,r,o,i){var l=n.createDocumentFragment();if(null!=t.children){var s=t.children;u(l,s,0,s.length,r,null,o)}t.dom=l.firstChild,t.domSize=l.childNodes.length,w(e,l,i)}(e,t,o,l,a);break;default:!function(e,t,o,l,s){var a=t.tag,c=t.attrs,d=c&&c.is,f=(l=i(t)||l)?d?n.createElementNS(l,a,{is:d}):n.createElementNS(l,a):d?n.createElement(a,{is:d}):n.createElement(a);t.dom=f,null!=c&&function(e,t,n){for(var r in t)S(e,r,null,t[r],n)}(t,c,l);if(w(e,f,s),!b(t)&&(null!=t.text&&(""!==t.text?f.textContent=t.text:t.children=[r("#",void 0,void 0,t.text,void 0,void 0)]),null!=t.children)){var m=t.children;u(f,m,0,m.length,o,null,l),"select"===t.tag&&null!=c&&function(e,t){if("value"in t)if(null===t.value)-1!==e.dom.selectedIndex&&(e.dom.value=null);else{var n=""+t.value;e.dom.value===n&&-1!==e.dom.selectedIndex||(e.dom.value=n)}"selectedIndex"in t&&S(e,"selectedIndex",null,t.selectedIndex,void 0)}(t,c)}}(e,t,o,l,a)}else!function(e,t,n,o,i){(function(e,t){var n;if("function"==typeof e.tag.view){if(e.state=Object.create(e.tag),null!=(n=e.state.view).$$reentrantLock$$)return;n.$$reentrantLock$$=!0}else{if(e.state=void 0,null!=(n=e.tag).$$reentrantLock$$)return;n.$$reentrantLock$$=!0,e.state=null!=e.tag.prototype&&"function"==typeof e.tag.prototype.view?new e.tag(e):e.tag(e)}if($(e.state,e,t),null!=e.attrs&&$(e.attrs,e,t),e.instance=r.normalize(s.call(e.state.view,e)),e.instance===e)throw Error("A view cannot return the vnode it received as argument");n.$$reentrantLock$$=null})(t,n),null!=t.instance?(c(e,t.instance,n,o,i),t.dom=t.instance.dom,t.domSize=null!=t.dom?t.instance.domSize:0):t.domSize=0}(e,t,o,l,a)}var d={caption:"table",thead:"table",tbody:"table",tfoot:"table",tr:"tbody",th:"tr",td:"tr",colgroup:"table",col:"colgroup"};function f(e,t,r,o){var i=t.children.match(/^\s*?<(\w+)/im)||[],l=n.createElement(d[i[1]]||"div");"http://www.w3.org/2000/svg"===r?(l.innerHTML='<svg xmlns="http://www.w3.org/2000/svg">'+t.children+"</svg>",l=l.firstChild):l.innerHTML=t.children,t.dom=l.firstChild,t.domSize=l.childNodes.length,t.instance=[];for(var s,a=n.createDocumentFragment();s=l.firstChild;)t.instance.push(s),a.appendChild(s);w(e,a,o)}function m(e,t,n,r,o,i){if(t!==n&&(null!=t||null!=n))if(null==t||0===t.length)u(e,n,0,n.length,r,o,i);else if(null==n||0===n.length)x(e,t,0,t.length);else{var l=null!=t[0]&&null!=t[0].key,s=null!=n[0]&&null!=n[0].key,a=0,d=0;if(!l)for(;d<t.length&&null==t[d];)d++;if(!s)for(;a<n.length&&null==n[a];)a++;if(null===s&&null==l)return;if(l!==s)x(e,t,d,t.length),u(e,n,a,n.length,r,o,i);else if(s){for(var f,m,w,b,_,k=t.length-1,E=n.length-1;k>=d&&E>=a&&(w=t[k],b=n[E],w.key===b.key);)w!==b&&h(e,w,b,r,o,i),null!=b.dom&&(o=b.dom),k--,E--;for(;k>=d&&E>=a&&(f=t[d],m=n[a],f.key===m.key);)d++,a++,f!==m&&h(e,f,m,r,y(t,d,o),i);for(;k>=d&&E>=a&&a!==E&&f.key===b.key&&w.key===m.key;)g(e,w,_=y(t,d,o)),w!==m&&h(e,w,m,r,_,i),++a<=--E&&g(e,f,o),f!==b&&h(e,f,b,r,o,i),null!=b.dom&&(o=b.dom),d++,w=t[--k],b=n[E],f=t[d],m=n[a];for(;k>=d&&E>=a&&w.key===b.key;)w!==b&&h(e,w,b,r,o,i),null!=b.dom&&(o=b.dom),E--,w=t[--k],b=n[E];if(a>E)x(e,t,d,k+1);else if(d>k)u(e,n,a,E+1,r,o,i);else{var S,C,z=o,A=E-a+1,O=new Array(A),T=0,I=0,N=2147483647,L=0;for(I=0;I<A;I++)O[I]=-1;for(I=E;I>=a;I--){null==S&&(S=p(t,d,k+1));var P=S[(b=n[I]).key];null!=P&&(N=P<N?P:-1,O[I-a]=P,w=t[P],t[P]=null,w!==b&&h(e,w,b,r,o,i),null!=b.dom&&(o=b.dom),L++)}if(o=z,L!==k-d+1&&x(e,t,d,k+1),0===L)u(e,n,a,E+1,r,o,i);else if(-1===N)for(T=(C=function(e){for(var t=[0],n=0,r=0,o=0,i=v.length=e.length,o=0;o<i;o++)v[o]=e[o];for(var o=0;o<i;++o)if(-1!==e[o]){var l=t[t.length-1];if(e[l]<e[o])v[o]=l,t.push(o);else{for(n=0,r=t.length-1;n<r;){var s=(n>>>1)+(r>>>1)+(n&r&1);e[t[s]]<e[o]?n=s+1:r=s}e[o]<e[t[n]]&&(n>0&&(v[o]=t[n-1]),t[n]=o)}}n=t.length,r=t[n-1];for(;n-- >0;)t[n]=r,r=v[r];return v.length=0,t}(O)).length-1,I=E;I>=a;I--)m=n[I],-1===O[I-a]?c(e,m,r,i,o):C[T]===I-a?T--:g(e,m,o),null!=m.dom&&(o=n[I].dom);else for(I=E;I>=a;I--)m=n[I],-1===O[I-a]&&c(e,m,r,i,o),null!=m.dom&&(o=n[I].dom)}}else{var $=t.length<n.length?t.length:n.length;for(a=a<d?a:d;a<$;a++)(f=t[a])===(m=n[a])||null==f&&null==m||(null==f?c(e,m,r,i,y(t,a+1,o)):null==m?j(e,f):h(e,f,m,r,y(t,a+1,o),i));t.length>$&&x(e,t,a,t.length),n.length>$&&u(e,n,a,n.length,r,o,i)}}}function h(e,t,n,o,l,a){var u=t.tag;if(u===n.tag){if(n.state=t.state,n.events=t.events,function(e,t){do{if(null!=e.attrs&&"function"==typeof e.attrs.onbeforeupdate){var n=s.call(e.attrs.onbeforeupdate,e,t);if(void 0!==n&&!n)break}if("string"!=typeof e.tag&&"function"==typeof e.state.onbeforeupdate){var n=s.call(e.state.onbeforeupdate,e,t);if(void 0!==n&&!n)break}return!1}while(0);return e.dom=t.dom,e.domSize=t.domSize,e.instance=t.instance,e.attrs=t.attrs,e.children=t.children,e.text=t.text,!0}(n,t))return;if("string"==typeof u)switch(null!=n.attrs&&q(n.attrs,n,o),u){case"#":!function(e,t){e.children.toString()!==t.children.toString()&&(e.dom.nodeValue=t.children);t.dom=e.dom}(t,n);break;case"<":!function(e,t,n,r,o){t.children!==n.children?(_(e,t),f(e,n,r,o)):(n.dom=t.dom,n.domSize=t.domSize,n.instance=t.instance)}(e,t,n,a,l);break;case"[":!function(e,t,n,r,o,i){m(e,t.children,n.children,r,o,i);var l=0,s=n.children;if(n.dom=null,null!=s){for(var a=0;a<s.length;a++){var u=s[a];null!=u&&null!=u.dom&&(null==n.dom&&(n.dom=u.dom),l+=u.domSize||1)}1!==l&&(n.domSize=l)}}(e,t,n,o,l,a);break;default:!function(e,t,n,o){var l=t.dom=e.dom;o=i(t)||o,"textarea"===t.tag&&(null==t.attrs&&(t.attrs={}),null!=t.text&&(t.attrs.value=t.text,t.text=void 0));(function(e,t,n,r){if(null!=n)for(var o in n)S(e,o,t&&t[o],n[o],r);var i;if(null!=t)for(var o in t)null==(i=t[o])||null!=n&&null!=n[o]||C(e,o,i,r)})(t,e.attrs,t.attrs,o),b(t)||(null!=e.text&&null!=t.text&&""!==t.text?e.text.toString()!==t.text.toString()&&(e.dom.firstChild.nodeValue=t.text):(null!=e.text&&(e.children=[r("#",void 0,void 0,e.text,void 0,e.dom.firstChild)]),null!=t.text&&(t.children=[r("#",void 0,void 0,t.text,void 0,void 0)]),m(l,e.children,t.children,n,null,o)))}(t,n,o,a)}else!function(e,t,n,o,i,l){if(n.instance=r.normalize(s.call(n.state.view,n)),n.instance===n)throw Error("A view cannot return the vnode it received as argument");q(n.state,n,o),null!=n.attrs&&q(n.attrs,n,o);null!=n.instance?(null==t.instance?c(e,n.instance,o,l,i):h(e,t.instance,n.instance,o,i,l),n.dom=n.instance.dom,n.domSize=n.instance.domSize):null!=t.instance?(j(e,t.instance),n.dom=void 0,n.domSize=0):(n.dom=t.dom,n.domSize=t.domSize)}(e,t,n,o,l,a)}else j(e,t),c(e,n,o,a,l)}function p(e,t,n){for(var r=Object.create(null);t<n;t++){var o=e[t];if(null!=o){var i=o.key;null!=i&&(r[i]=t)}}return r}var v=[];function y(e,t,n){for(;t<e.length;t++)if(null!=e[t]&&null!=e[t].dom)return e[t].dom;return n}function g(e,t,r){var o=n.createDocumentFragment();!function e(t,n,r){for(;null!=r.dom&&r.dom.parentNode===t;){if("string"!=typeof r.tag){if(null!=(r=r.instance))continue}else if("<"===r.tag)for(var o=0;o<r.instance.length;o++)n.appendChild(r.instance[o]);else if("["!==r.tag)n.appendChild(r.dom);else if(1===r.children.length){if(null!=(r=r.children[0]))continue}else for(var o=0;o<r.children.length;o++){var i=r.children[o];null!=i&&e(t,n,i)}break}}(e,o,t),w(e,o,r)}function w(e,t,n){null!=n?e.insertBefore(t,n):e.appendChild(t)}function b(e){if(null==e.attrs||null==e.attrs.contenteditable&&null==e.attrs.contentEditable)return!1;var t=e.children;if(null!=t&&1===t.length&&"<"===t[0].tag){var n=t[0].children;e.dom.innerHTML!==n&&(e.dom.innerHTML=n)}else if(null!=e.text||null!=t&&0!==t.length)throw new Error("Child node of a contenteditable must be trusted");return!0}function x(e,t,n,r){for(var o=n;o<r;o++){var i=t[o];null!=i&&j(e,i)}}function j(e,t){var n,r,o,i=0,a=t.state;"string"!=typeof t.tag&&"function"==typeof t.state.onbeforeremove&&(null!=(o=s.call(t.state.onbeforeremove,t))&&"function"==typeof o.then&&(i=1,n=o));t.attrs&&"function"==typeof t.attrs.onbeforeremove&&(null!=(o=s.call(t.attrs.onbeforeremove,t))&&"function"==typeof o.then&&(i|=2,r=o));if(l(t,a),i){if(null!=n){var u=function(){1&i&&((i&=2)||c())};n.then(u,u)}if(null!=r){u=function(){2&i&&((i&=1)||c())};r.then(u,u)}}else E(t),k(e,t);function c(){l(t,a),E(t),k(e,t)}}function _(e,t){for(var n=0;n<t.instance.length;n++)e.removeChild(t.instance[n])}function k(e,t){for(;null!=t.dom&&t.dom.parentNode===e;){if("string"!=typeof t.tag){if(null!=(t=t.instance))continue}else if("<"===t.tag)_(e,t);else{if("["!==t.tag&&(e.removeChild(t.dom),!Array.isArray(t.children)))break;if(1===t.children.length){if(null!=(t=t.children[0]))continue}else for(var n=0;n<t.children.length;n++){var r=t.children[n];null!=r&&k(e,r)}}break}}function E(e){if("string"!=typeof e.tag&&"function"==typeof e.state.onremove&&s.call(e.state.onremove,e),e.attrs&&"function"==typeof e.attrs.onremove&&s.call(e.attrs.onremove,e),"string"!=typeof e.tag)null!=e.instance&&E(e.instance);else{var t=e.children;if(Array.isArray(t))for(var n=0;n<t.length;n++){var r=t[n];null!=r&&E(r)}}}function S(e,t,r,o,i){if("key"!==t&&"is"!==t&&null!=o&&!z(t)&&(r!==o||function(e,t){return"value"===t||"checked"===t||"selectedIndex"===t||"selected"===t&&e.dom===a()||"option"===e.tag&&e.dom.parentNode===n.activeElement}(e,t)||"object"==typeof o)){if("o"===t[0]&&"n"===t[1])return P(e,t,o);if("xlink:"===t.slice(0,6))e.dom.setAttributeNS("http://www.w3.org/1999/xlink",t.slice(6),o);else if("style"===t)N(e.dom,r,o);else if(A(e,t,i)){if("value"===t){if(("input"===e.tag||"textarea"===e.tag)&&e.dom.value===""+o&&e.dom===a())return;if("select"===e.tag&&null!==r&&e.dom.value===""+o)return;if("option"===e.tag&&null!==r&&e.dom.value===""+o)return}"input"===e.tag&&"type"===t?e.dom.setAttribute(t,o):e.dom[t]=o}else"boolean"==typeof o?o?e.dom.setAttribute(t,""):e.dom.removeAttribute(t):e.dom.setAttribute("className"===t?"class":t,o)}}function C(e,t,n,r){if("key"!==t&&"is"!==t&&null!=n&&!z(t))if("o"!==t[0]||"n"!==t[1]||z(t))if("style"===t)N(e.dom,n,null);else if(!A(e,t,r)||"className"===t||"value"===t&&("option"===e.tag||"select"===e.tag&&-1===e.dom.selectedIndex&&e.dom===a())||"input"===e.tag&&"type"===t){var o=t.indexOf(":");-1!==o&&(t=t.slice(o+1)),!1!==n&&e.dom.removeAttribute("className"===t?"class":t)}else e.dom[t]=null;else P(e,t,void 0)}function z(e){return"oninit"===e||"oncreate"===e||"onupdate"===e||"onremove"===e||"onbeforeremove"===e||"onbeforeupdate"===e}function A(e,t,n){return void 0===n&&(e.tag.indexOf("-")>-1||null!=e.attrs&&e.attrs.is||"href"!==t&&"list"!==t&&"form"!==t&&"width"!==t&&"height"!==t)&&t in e.dom}var O=/[A-Z]/g;function T(e){return"-"+e.toLowerCase()}function I(e){return"-"===e[0]&&"-"===e[1]?e:"cssFloat"===e?"float":e.replace(O,T)}function N(e,t,n){if(t===n);else if(null==n)e.style.cssText="";else if("object"!=typeof n)e.style.cssText=n;else if(null==t||"object"!=typeof t)for(var r in e.style.cssText="",n){null!=(o=n[r])&&e.style.setProperty(I(r),String(o))}else{for(var r in n){var o;null!=(o=n[r])&&(o=String(o))!==String(t[r])&&e.style.setProperty(I(r),o)}for(var r in t)null!=t[r]&&null==n[r]&&e.style.removeProperty(I(r))}}function L(){this._=t}function P(e,t,n){if(null!=e.events){if(e.events[t]===n)return;null==n||"function"!=typeof n&&"object"!=typeof n?(null!=e.events[t]&&e.dom.removeEventListener(t.slice(2),e.events,!1),e.events[t]=void 0):(null==e.events[t]&&e.dom.addEventListener(t.slice(2),e.events,!1),e.events[t]=n)}else null==n||"function"!=typeof n&&"object"!=typeof n||(e.events=new L,e.dom.addEventListener(t.slice(2),e.events,!1),e.events[t]=n)}function $(e,t,n){"function"==typeof e.oninit&&s.call(e.oninit,t),"function"==typeof e.oncreate&&n.push(s.bind(e.oncreate,t))}function q(e,t,n){"function"==typeof e.onupdate&&n.push(s.bind(e.onupdate,t))}return L.prototype=Object.create(null),L.prototype.handleEvent=function(e){var t,n=this["on"+e.type];"function"==typeof n?t=n.call(e.currentTarget,e):"function"==typeof n.handleEvent&&n.handleEvent(e),this._&&!1!==e.redraw&&(0,this._)(),!1===t&&(e.preventDefault(),e.stopPropagation())},function(e,n,o){if(!e)throw new TypeError("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.");var i=[],l=a(),s=e.namespaceURI;null==e.vnodes&&(e.textContent=""),n=r.normalizeChildren(Array.isArray(n)?n:[n]);var u=t;try{t="function"==typeof o?o:void 0,m(e,e.vnodes,n,i,null,"http://www.w3.org/1999/xhtml"===s?void 0:s)}finally{t=u}e.vnodes=n,null!=l&&a()!==l&&"function"==typeof l.focus&&l.focus();for(var c=0;c<i.length;c++)i[c]()}}},"../node_modules/mithril/render.js":function(e,t,n){"use strict";t.exports=e("../node_modules/mithril/render/render.js")(window)},"../node_modules/mithril/api/mount-redraw.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/render/vnode.js");t.exports=function(e,t,n){var o=[],i=!1,l=!1;function s(){if(i)throw new Error("Nested m.redraw.sync() call");i=!0;for(var t=0;t<o.length;t+=2)try{e(o[t],r(o[t+1]),a)}catch(e){n.error(e)}i=!1}function a(){l||(l=!0,t(function(){l=!1,s()}))}return a.sync=s,{mount:function(t,n){if(null!=n&&null==n.view&&"function"!=typeof n)throw new TypeError("m.mount(element, component) expects a component, not a vnode");var i=o.indexOf(t);i>=0&&(o.splice(i,2),e(t,[],a)),null!=n&&(o.push(t,n),e(t,r(n),a))},redraw:a}}},"../node_modules/mithril/mount-redraw.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/render.js");t.exports=e("../node_modules/mithril/api/mount-redraw.js")(r,requestAnimationFrame,console)},"../node_modules/mithril/querystring/build.js":function(e,t,n){"use strict";t.exports=function(e){if("[object Object]"!==Object.prototype.toString.call(e))return"";var t=[];for(var n in e)r(n,e[n]);return t.join("&");function r(e,n){if(Array.isArray(n))for(var o=0;o<n.length;o++)r(e+"["+o+"]",n[o]);else if("[object Object]"===Object.prototype.toString.call(n))for(var o in n)r(e+"["+o+"]",n[o]);else t.push(encodeURIComponent(e)+(null!=n&&""!==n?"="+encodeURIComponent(n):""))}}},"../node_modules/mithril/pathname/assign.js":function(e,t,n){"use strict";t.exports=Object.assign||function(e,t){t&&Object.keys(t).forEach(function(n){e[n]=t[n]})}},"../node_modules/mithril/pathname/build.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/querystring/build.js"),o=e("../node_modules/mithril/pathname/assign.js");t.exports=function(e,t){if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw new SyntaxError("Template parameter names *must* be separated");if(null==t)return e;var n=e.indexOf("?"),i=e.indexOf("#"),l=i<0?e.length:i,s=n<0?l:n,a=e.slice(0,s),u={};o(u,t);var c=a.replace(/:([^\/\.-]+)(\.{3})?/g,function(e,n,r){return delete u[n],null==t[n]?e:r?t[n]:encodeURIComponent(String(t[n]))}),d=c.indexOf("?"),f=c.indexOf("#"),m=f<0?c.length:f,h=d<0?m:d,p=c.slice(0,h);n>=0&&(p+=e.slice(n,l)),d>=0&&(p+=(n<0?"?":"&")+c.slice(d,m));var v=r(u);return v&&(p+=(n<0&&d<0?"?":"&")+v),i>=0&&(p+=e.slice(i)),f>=0&&(p+=(i<0?"":"&")+c.slice(f)),p}},"../node_modules/mithril/request/request.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/pathname/build.js");t.exports=function(e,t,n){var o=0;function i(e){return new t(e)}function l(e){return function(o,l){"string"!=typeof o?(l=o,o=o.url):null==l&&(l={});var s=new t(function(t,n){e(r(o,l.params),l,function(e){if("function"==typeof l.type)if(Array.isArray(e))for(var n=0;n<e.length;n++)e[n]=new l.type(e[n]);else e=new l.type(e);t(e)},n)});if(!0===l.background)return s;var a=0;function u(){0==--a&&"function"==typeof n&&n()}return function e(t){var n=t.then;t.constructor=i;t.then=function(){a++;var r=n.apply(t,arguments);return r.then(u,function(e){if(u(),0===a)throw e}),e(r)};return t}(s)}}function s(e,t){for(var n in e.headers)if({}.hasOwnProperty.call(e.headers,n)&&t.test(n))return!0;return!1}return i.prototype=t.prototype,i.__proto__=t,{request:l(function(t,n,r,o){var i,l=null!=n.method?n.method.toUpperCase():"GET",a=n.body,u=!(null!=n.serialize&&n.serialize!==JSON.serialize||a instanceof e.FormData),c=n.responseType||("function"==typeof n.extract?"":"json"),d=new e.XMLHttpRequest,f=!1,m=d,h=d.abort;for(var p in d.abort=function(){f=!0,h.call(this)},d.open(l,t,!1!==n.async,"string"==typeof n.user?n.user:void 0,"string"==typeof n.password?n.password:void 0),u&&null!=a&&!s(n,/^content-type$/i)&&d.setRequestHeader("Content-Type","application/json; charset=utf-8"),"function"==typeof n.deserialize||s(n,/^accept$/i)||d.setRequestHeader("Accept","application/json, text/*"),n.withCredentials&&(d.withCredentials=n.withCredentials),n.timeout&&(d.timeout=n.timeout),d.responseType=c,n.headers)({}).hasOwnProperty.call(n.headers,p)&&d.setRequestHeader(p,n.headers[p]);d.onreadystatechange=function(e){if(!f&&4===e.target.readyState)try{var i,l=e.target.status>=200&&e.target.status<300||304===e.target.status||/^file:\/\//i.test(t),s=e.target.response;if("json"===c?e.target.responseType||"function"==typeof n.extract||(s=JSON.parse(e.target.responseText)):c&&"text"!==c||null==s&&(s=e.target.responseText),"function"==typeof n.extract?(s=n.extract(e.target,n),l=!0):"function"==typeof n.deserialize&&(s=n.deserialize(s)),l)r(s);else{try{i=e.target.responseText}catch(e){i=s}var a=new Error(i);a.code=e.target.status,a.response=s,o(a)}}catch(e){o(e)}},"function"==typeof n.config&&(d=n.config(d,n,t)||d)!==m&&(i=d.abort,d.abort=function(){f=!0,i.call(this)}),null==a?d.send():"function"==typeof n.serialize?d.send(n.serialize(a)):a instanceof e.FormData?d.send(a):d.send(JSON.stringify(a))}),jsonp:l(function(t,n,r,i){var l=n.callbackName||"_mithril_"+Math.round(1e16*Math.random())+"_"+o++,s=e.document.createElement("script");e[l]=function(t){delete e[l],s.parentNode.removeChild(s),r(t)},s.onerror=function(){delete e[l],s.parentNode.removeChild(s),i(new Error("JSONP request failed"))},s.src=t+(t.indexOf("?")<0?"?":"&")+encodeURIComponent(n.callbackKey||"callback")+"="+encodeURIComponent(l),e.document.documentElement.appendChild(s)})}}},"../node_modules/mithril/request.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/promise/promise.js"),o=e("../node_modules/mithril/mount-redraw.js");t.exports=e("../node_modules/mithril/request/request.js")(window,r,o.redraw)},"../node_modules/mithril/querystring/parse.js":function(e,t,n){"use strict";t.exports=function(e){if(""===e||null==e)return{};"?"===e.charAt(0)&&(e=e.slice(1));for(var t=e.split("&"),n={},r={},o=0;o<t.length;o++){var i=t[o].split("="),l=decodeURIComponent(i[0]),s=2===i.length?decodeURIComponent(i[1]):"";"true"===s?s=!0:"false"===s&&(s=!1);var a=l.split(/\]\[?|\[/),u=r;l.indexOf("[")>-1&&a.pop();for(var c=0;c<a.length;c++){var d=a[c],f=a[c+1],m=""==f||!isNaN(parseInt(f,10));if(""===d)null==n[l=a.slice(0,c).join()]&&(n[l]=Array.isArray(u)?u.length:0),d=n[l]++;else if("__proto__"===d)break;if(c===a.length-1)u[d]=s;else{var h=Object.getOwnPropertyDescriptor(u,d);null!=h&&(h=h.value),null==h&&(u[d]=h=m?[]:{}),u=h}}}return r}},"../node_modules/mithril/pathname/parse.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/querystring/parse.js");t.exports=function(e){var t=e.indexOf("?"),n=e.indexOf("#"),o=n<0?e.length:n,i=t<0?o:t,l=e.slice(0,i).replace(/\/{2,}/g,"/");return l?("/"!==l[0]&&(l="/"+l),l.length>1&&"/"===l[l.length-1]&&(l=l.slice(0,-1))):l="/",{path:l,params:t<0?{}:r(e.slice(t+1,o))}}},"../node_modules/mithril/pathname/compileTemplate.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/pathname/parse.js");t.exports=function(e){var t=r(e),n=Object.keys(t.params),o=[],i=new RegExp("^"+t.path.replace(/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,function(e,t,n){return null==t?"\\"+e:(o.push({k:t,r:"..."===n}),"..."===n?"(.*)":"."===n?"([^/]+)\\.":"([^/]+)"+(n||""))})+"$");return function(e){for(var r=0;r<n.length;r++)if(t.params[n[r]]!==e.params[n[r]])return!1;if(!o.length)return i.test(e.path);var l=i.exec(e.path);if(null==l)return!1;for(r=0;r<o.length;r++)e.params[o[r].k]=o[r].r?l[r+1]:decodeURIComponent(l[r+1]);return!0}}},"../node_modules/mithril/api/router.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/render/vnode.js"),o=e("../node_modules/mithril/render/hyperscript.js"),i=e("../node_modules/mithril/promise/promise.js"),l=e("../node_modules/mithril/pathname/build.js"),s=e("../node_modules/mithril/pathname/parse.js"),a=e("../node_modules/mithril/pathname/compileTemplate.js"),u=e("../node_modules/mithril/pathname/assign.js"),c={};t.exports=function(e,t){var n;function d(t,r,o){if(t=l(t,r),null!=n){n();var i=o?o.state:null,s=o?o.title:null;o&&o.replace?e.history.replaceState(i,s,g.prefix+t):e.history.pushState(i,s,g.prefix+t)}else e.location.href=g.prefix+t}var f,m,h,p,v=c,y=g.SKIP={};function g(o,l,w){if(null==o)throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined");var b,x=0,j=Object.keys(w).map(function(e){if("/"!==e[0])throw new SyntaxError("Routes must start with a `/`");if(/:([^\/\.-]+)(\.{3})?:/.test(e))throw new SyntaxError("Route parameter names must be separated with either `/`, `.`, or `-`");return{route:e,component:w[e],check:a(e)}}),_="function"==typeof setImmediate?setImmediate:setTimeout,k=i.resolve(),E=!1;if(n=null,null!=l){var S=s(l);if(!j.some(function(e){return e.check(S)}))throw new ReferenceError("Default route doesn't match any known routes")}function C(){E=!1;var n=e.location.hash;"#"!==g.prefix[0]&&(n=e.location.search+n,"?"!==g.prefix[0]&&"/"!==(n=e.location.pathname+n)[0]&&(n="/"+n));var r=n.concat().replace(/(?:%[a-f89][a-f0-9])+/gim,decodeURIComponent).slice(g.prefix.length),o=s(r);function i(){if(r===l)throw new Error("Could not resolve default route "+l);d(l,null,{replace:!0})}u(o.params,e.history.state),function e(n){for(;n<j.length;n++)if(j[n].check(o)){var l=j[n].component,s=j[n].route,a=l,u=p=function(i){if(u===p){if(i===y)return e(n+1);f=null==i||"function"!=typeof i.view&&"function"!=typeof i?"div":i,m=o.params,h=r,p=null,v=l.render?l:null,2===x?t.redraw():(x=2,t.redraw.sync())}};return void(l.view||"function"==typeof l?(l={},u(a)):l.onmatch?k.then(function(){return l.onmatch(o.params,r,s)}).then(u,i):u("div"))}i()}(0)}return n=function(){E||(E=!0,_(C))},"function"==typeof e.history.pushState?(b=function(){e.removeEventListener("popstate",n,!1)},e.addEventListener("popstate",n,!1)):"#"===g.prefix[0]&&(n=null,b=function(){e.removeEventListener("hashchange",C,!1)},e.addEventListener("hashchange",C,!1)),t.mount(o,{onbeforeupdate:function(){return!(!(x=x?2:1)||c===v)},oncreate:C,onremove:b,view:function(){if(x&&c!==v){var e=[r(f,m.key,m)];return v&&(e=v.render(e[0])),e}}})}return g.set=function(e,t,n){null!=p&&((n=n||{}).replace=!0),p=null,d(e,t,n)},g.get=function(){return h},g.prefix="#!",g.Link={view:function(e){var t,n,r=e.attrs.options,i={};u(i,e.attrs),i.selector=i.options=i.key=i.oninit=i.oncreate=i.onbeforeupdate=i.onupdate=i.onbeforeremove=i.onremove=null;var l=o(e.attrs.selector||"a",i,e.children);return(l.attrs.disabled=Boolean(l.attrs.disabled))?(l.attrs.href=null,l.attrs["aria-disabled"]="true",l.attrs.onclick=null):(t=l.attrs.onclick,n=l.attrs.href,l.attrs.href=g.prefix+n,l.attrs.onclick=function(e){var o;"function"==typeof t?o=t.call(e.currentTarget,e):null==t||"object"!=typeof t||"function"==typeof t.handleEvent&&t.handleEvent(e),!1===o||e.defaultPrevented||0!==e.button&&0!==e.which&&1!==e.which||e.currentTarget.target&&"_self"!==e.currentTarget.target||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||(e.preventDefault(),e.redraw=!1,g.set(n,null,r))}),l}},g.param=function(e){return m&&null!=e?m[e]:m},g}},"../node_modules/mithril/route.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/mount-redraw.js");t.exports=e("../node_modules/mithril/api/router.js")(window,r)},"../node_modules/mithril/index.js":function(e,t,n){"use strict";var r=e("../node_modules/mithril/hyperscript.js"),o=e("../node_modules/mithril/request.js"),i=e("../node_modules/mithril/mount-redraw.js"),l=function(){return r.apply(this,arguments)};l.m=r,l.trust=r.trust,l.fragment=r.fragment,l.mount=i.mount,l.route=e("../node_modules/mithril/route.js"),l.render=e("../node_modules/mithril/render.js"),l.redraw=i.redraw,l.request=o.request,l.jsonp=o.jsonp,l.parseQueryString=e("../node_modules/mithril/querystring/parse.js"),l.buildQueryString=e("../node_modules/mithril/querystring/build.js"),l.parsePathname=e("../node_modules/mithril/pathname/parse.js"),l.buildPathname=e("../node_modules/mithril/pathname/build.js"),l.vnode=e("../node_modules/mithril/render/vnode.js"),l.PromisePolyfill=e("../node_modules/mithril/promise/polyfill.js"),t.exports=l},"../createInfigrid.js":function(e,t,n){t.exports=function(e){e.element.style.position="absolute",e.element.style.width="100%",e.element.style.height="100%",e.element.style.backgroundColor="yellow",e.element.style.overflow="hidden";const t=document.createElement("canvas"),n=t.getContext("2d");t.width=e.element.offsetWidth,t.height=e.element.offsetHeight,e.worldX=e.worldX||0,e.worldY=e.worldY||0,e.zoomIntensity=e.zoomIntensity||.02;let r,o,i=1,l=!0;!function r(){if(window.requestAnimationFrame(r),!l)return;l=!1,n.clearRect(0,0,t.width,t.height);const o=e.cellWidth/i,s=e.cellHeight/i,a=Math.ceil(e.element.offsetWidth/o)+2,u=Math.ceil(e.element.offsetHeight/s)+2,c=e.worldX/o,d=e.worldY/s,f=o*(c%1),m=s*(d%1),h=parseInt(c),p=parseInt(d);for(let e=-1;e<u;e++)for(let t=-1;t<a;t++){const r=f+o*t+1,i=m+s*e+1;n.beginPath(),n.lineWidth=1,n.strokeStyle="red",n.rect(r,i,o,s),n.stroke(),n.font="14px Arial",n.fillText(`${h+-1*t}:${p+-1*e}`,r+10,i+20)}window.requestAnimationFrame(r)}();let s=!1;function a(e){s=!1}function u(e){r=e.clientX||e.touches[0].clientX,o=e.clientY||e.touches[0].clientY,s=!0}function c(t){if(!s)return;const n=t.clientX||t.touches[0].clientX,i=t.clientY||t.touches[0].clientY;e.worldX=e.worldX-(r-n),e.worldY=e.worldY-(o-i),r=n,o=i,l=!0}document.addEventListener("touchend",a),e.element.addEventListener("touchstart",u),document.addEventListener("touchmove",c),document.addEventListener("mouseup",a),e.element.addEventListener("mousedown",u),document.addEventListener("mousemove",c),t.addEventListener("wheel",function(t){t.preventDefault();const n=t.offsetX,r=t.offsetY,o=t.deltaY<0?1:-1,s=Math.exp(o*e.zoomIntensity);e.worldX-=n/(i*s)-n/i,e.worldY-=r/(i*s)-r/i,i*=s,l=!0}),e.element.innerHTML="",e.element.appendChild(t)}},"./index.js":function(e,t,n){const r=e("../node_modules/mithril/index.js"),o=e("../createInfigrid.js");function i(){return{oncreate:e=>{const t=e.dom;o({element:t,cellWidth:e.attrs.cellWidth,cellHeight:e.attrs.cellHeight})},view:()=>r("div","Initialising Grid")}}document.addEventListener("DOMContentLoaded",function(){r.mount(document.body,{view:()=>r("main",r("h1","Demo of InfiGrid"),r("p",(new Date).toString()),r("div",{class:"wrapper"},r(i,{cellWidth:50,cellHeight:50})))})}),window.m=r}};function require(e){if(instances[e])return instances[e];var t={exports:{}};return modules[e](require,t,t.exports),instances[e]=t.exports,instances[e]}require("./index.js");