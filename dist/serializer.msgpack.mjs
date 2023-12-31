function e(e,t,n,i){Object.defineProperty(e,t,{get:n,set:i,enumerable:!0,configurable:!0})}var t,n,i,r,o,s,a,c,h,l,u,f,d,p,y,v,w,g,b,m,U={};e(U,"decodeMultiStream",()=>es);var E={};function S(e){return"".concat(e<0?"-":"","0x").concat(Math.abs(e).toString(16).padStart(2,"0"))}e(E,"Decoder",()=>Q);// ExtensionCodec to handle MessagePack extensions
/**
 * ExtData is used to handle Extension Types that are not registered to ExtensionCodec.
 */var C=function(e,t){this.type=e,this.data=t},_={};e(_,"DecodeError",()=>I);var x=(t=function(e,n){return(t=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,n)},function(e,n){if("function"!=typeof n&&null!==n)throw TypeError("Class extends value "+String(n)+" is not a constructor or null");function i(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i)}),I=/** @class */function(e){function t(n){var i=e.call(this,n)||this;return Object.setPrototypeOf(i,Object.create(t.prototype)),Object.defineProperty(i,"name",{configurable:!0,enumerable:!1,value:t.name}),i}return x(t,e),t}(Error);function T(e,t,n){var i=Math.floor(n/4294967296);e.setUint32(t,i),e.setUint32(t+4,n)}function D(e,t){return 4294967296*e.getInt32(t)+e.getUint32(t+4)}var A={type:-1,encode:function(e){var t,n,i,r;return e instanceof Date?function(e){var t=e.sec,n=e.nsec;if(t>=0&&n>=0&&t<=17179869183){// Here sec >= 0 && nsec >= 0
if(0===n&&t<=4294967295){// timestamp 32 = { sec32 (unsigned) }
var i=new Uint8Array(4),r=new DataView(i.buffer);return r.setUint32(0,t),i}// timestamp 64 = { nsec30 (unsigned), sec34 (unsigned) }
var o=t/4294967296,s=4294967295&t,i=new Uint8Array(8),r=new DataView(i.buffer);return(// nsec30 | secHigh2
r.setUint32(0,n<<2|3&o),// secLow32
r.setUint32(4,s),i)}// timestamp 96 = { nsec32 (unsigned), sec64 (signed) }
var i=new Uint8Array(12),r=new DataView(i.buffer);return r.setUint32(0,n),T(r,4,t),i}((n=Math.floor((t=e.getTime())/1e3),r=Math.floor((i=(t-1e3*n)*1e6)/1e9),{sec:n+r,nsec:i-1e9*r})):null},decode:function(e){var t=function(e){var t=new DataView(e.buffer,e.byteOffset,e.byteLength);// data may be 32, 64, or 96 bits
switch(e.byteLength){case 4:// timestamp 32 = { sec32 }
var n=t.getUint32(0),i=0;return{sec:n,nsec:0};case 8:// timestamp 64 = { nsec30, sec34 }
var r=t.getUint32(0),n=(3&r)*4294967296+t.getUint32(4),i=r>>>2;return{sec:n,nsec:i};case 12:// timestamp 96 = { nsec32 (unsigned), sec64 (signed) }
var n=D(t,4),i=t.getUint32(0);return{sec:n,nsec:i};default:throw new _.DecodeError("Unrecognized data size for timestamp (expected 4, 8, or 12): ".concat(e.length))}}(e);return new Date(1e3*t.sec+t.nsec/1e6)}},k=/** @class */function(){function e(){// built-in extensions
this.builtInEncoders=[],this.builtInDecoders=[],// custom extensions
this.encoders=[],this.decoders=[],this.register(A)}return e.prototype.register=function(e){var t=e.type,n=e.encode,i=e.decode;if(t>=0)// custom extensions
this.encoders[t]=n,this.decoders[t]=i;else{// built-in extensions
var r=1+t;this.builtInEncoders[r]=n,this.builtInDecoders[r]=i}},e.prototype.tryToEncode=function(e,t){// built-in extensions
for(var n=0;n<this.builtInEncoders.length;n++){var i=this.builtInEncoders[n];if(null!=i){var r=i(e,t);if(null!=r){var o=-1-n;return new C(o,r)}}}// custom extensions
for(var n=0;n<this.encoders.length;n++){var i=this.encoders[n];if(null!=i){var r=i(e,t);if(null!=r){var o=n;return new C(o,r)}}}return e instanceof C?e:null},e.prototype.decode=function(e,t,n){var i=t<0?this.builtInDecoders[-1-t]:this.decoders[t];return i?i(e,t,n):new C(t,e)},e.defaultCodec=new e,e}(),B={},L=(null===(l=null==B?void 0:B.env)||void 0===l?void 0:l.TEXT_ENCODING)!=="never"&&"undefined"!=typeof TextEncoder&&"undefined"!=typeof TextDecoder;function O(e){for(var t=e.length,n=0,i=0;i<t;){var r=e.charCodeAt(i++);if((4294967168&r)==0){// 1-byte
n++;continue}if((4294965248&r)==0)n+=2;else{// handle surrogate pair
if(r>=55296&&r<=56319&&i<t){var o=e.charCodeAt(i);(64512&o)==56320&&(++i,r=((1023&r)<<10)+(1023&o)+65536)}(4294901760&r)==0?n+=3:n+=4}}return n}var R=L?new TextEncoder:void 0,M=L?(null===(u=null==B?void 0:B.env)||void 0===u?void 0:u.TEXT_ENCODING)!=="force"?200:0:4294967295,z=(null==R?void 0:R.encodeInto)?function(e,t,n){R.encodeInto(e,t.subarray(n))}:function(e,t,n){t.set(R.encode(e),n)};function F(e,t,n){for(var i=t,r=i+n,o=[],s="";i<r;){var a=e[i++];if((128&a)==0)o.push(a);else if((224&a)==192){// 2 bytes
var c=63&e[i++];o.push((31&a)<<6|c)}else if((240&a)==224){// 3 bytes
var c=63&e[i++],h=63&e[i++];o.push((31&a)<<12|c<<6|h)}else if((248&a)==240){// 4 bytes
var c=63&e[i++],h=63&e[i++],l=(7&a)<<18|c<<12|h<<6|63&e[i++];l>65535&&(l-=65536,o.push(l>>>10&1023|55296),l=56320|1023&l),o.push(l)}else o.push(a);o.length>=4096&&(s+=String.fromCharCode.apply(String,o),o.length=0)}return o.length>0&&(s+=String.fromCharCode.apply(String,o)),s}var P=L?new TextDecoder:null,W=L?(null===(f=null==B?void 0:B.env)||void 0===f?void 0:f.TEXT_DECODER)!=="force"?200:0:4294967295;function N(e){return e instanceof Uint8Array?e:ArrayBuffer.isView(e)?new Uint8Array(e.buffer,e.byteOffset,e.byteLength):e instanceof ArrayBuffer?new Uint8Array(e):Uint8Array.from(e)}var j=/** @class */function(){function e(e,t){void 0===e&&(e=16),void 0===t&&(t=16),this.maxKeyLength=e,this.maxLengthPerKey=t,this.hit=0,this.miss=0,// avoid `new Array(N)`, which makes a sparse array,
// because a sparse array is typically slower than a non-sparse array.
this.caches=[];for(var n=0;n<this.maxKeyLength;n++)this.caches.push([])}return e.prototype.canBeCached=function(e){return e>0&&e<=this.maxKeyLength},e.prototype.find=function(e,t,n){var i=this.caches[n-1];e:for(var r=0;r<i.length;r++){for(var o=i[r],s=o.bytes,a=0;a<n;a++)if(s[a]!==e[t+a])continue e;return o.str}return null},e.prototype.store=function(e,t){var n=this.caches[e.length-1],i={bytes:e,str:t};n.length>=this.maxLengthPerKey?// Set `record` to an arbitrary position.
n[Math.random()*n.length|0]=i:n.push(i)},e.prototype.decode=function(e,t,n){var i=this.find(e,t,n);if(null!=i)return this.hit++,i;this.miss++;var r=F(e,t,n),o=Uint8Array.prototype.slice.call(e,t,t+n);return this.store(o,r),r},e}(),$=function(e,t){var n,i,r,o,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw TypeError("Generator is already executing.");for(;s;)try{if(n=1,i&&(r=2&o[0]?i.return:o[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,o[1])).done)return r;switch(i=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,i=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(r=(r=s.trys).length>0&&r[r.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){s.label=o[1];break}if(6===o[0]&&s.label<r[1]){s.label=r[1],r=o;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(o);break}r[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],i=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},K=function(e){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var t,n=e[Symbol.asyncIterator];return n?n.call(e):(e="function"==typeof __values?__values(e):e[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(n){t[n]=e[n]&&function(t){return new Promise(function(i,r){!function(e,t,n,i){Promise.resolve(i).then(function(t){e({value:t,done:n})},t)}(i,r,(t=e[n](t)).done,t.value)})}}},V=function(e){return this instanceof V?(this.v=e,this):new V(e)},H=function(e,t,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var i,r=n.apply(e,t||[]),o=[];return i={},s("next"),s("throw"),s("return"),i[Symbol.asyncIterator]=function(){return this},i;function s(e){r[e]&&(i[e]=function(t){return new Promise(function(n,i){o.push([e,t,n,i])>1||a(e,t)})})}function a(e,t){try{var n;(n=r[e](t)).value instanceof V?Promise.resolve(n.value.v).then(c,h):l(o[0][2],n)}catch(e){l(o[0][3],e)}}function c(e){a("next",e)}function h(e){a("throw",e)}function l(e,t){e(t),o.shift(),o.length&&a(o[0][0],o[0][1])}},X=function(e){var t=typeof e;return"string"===t||"number"===t},G=new DataView(new ArrayBuffer(0)),Y=new Uint8Array(G.buffer),Z=function(){try{// IE11: The spec says it should throw RangeError,
// IE11: but in IE11 it throws TypeError.
G.getInt8(0)}catch(e){return e.constructor}throw Error("never reached")}(),q=new Z("Insufficient data"),J=new j,Q=/** @class */function(){function e(e,t,n,i,r,o,s,a){void 0===e&&(e=k.defaultCodec),void 0===t&&(t=void 0),void 0===n&&(n=4294967295),void 0===i&&(i=4294967295),void 0===r&&(r=4294967295),void 0===o&&(o=4294967295),void 0===s&&(s=4294967295),void 0===a&&(a=J),this.extensionCodec=e,this.context=t,this.maxStrLength=n,this.maxBinLength=i,this.maxArrayLength=r,this.maxMapLength=o,this.maxExtLength=s,this.keyDecoder=a,this.totalPos=0,this.pos=0,this.view=G,this.bytes=Y,this.headByte=-1,this.stack=[]}return e.prototype.reinitializeState=function(){this.totalPos=0,this.headByte=-1,this.stack.length=0;// view, bytes, and pos will be re-initialized in setBuffer()
},e.prototype.setBuffer=function(e){this.bytes=N(e),this.view=function(e){if(e instanceof ArrayBuffer)return new DataView(e);var t=N(e);return new DataView(t.buffer,t.byteOffset,t.byteLength)}(this.bytes),this.pos=0},e.prototype.appendBuffer=function(e){if(-1!==this.headByte||this.hasRemaining(1)){var t=this.bytes.subarray(this.pos),n=N(e),i=new Uint8Array(t.length+n.length);i.set(t),i.set(n,t.length),this.setBuffer(i)}else this.setBuffer(e)},e.prototype.hasRemaining=function(e){return this.view.byteLength-this.pos>=e},e.prototype.createExtraByteError=function(e){var t=this.view,n=this.pos;return RangeError("Extra ".concat(t.byteLength-n," of ").concat(t.byteLength," byte(s) found at buffer[").concat(e,"]"))},/**
     * @throws {@link DecodeError}
     * @throws {@link RangeError}
     */e.prototype.decode=function(e){this.reinitializeState(),this.setBuffer(e);var t=this.doDecodeSync();if(this.hasRemaining(1))throw this.createExtraByteError(this.pos);return t},e.prototype.decodeMulti=function(e){return $(this,function(t){switch(t.label){case 0:this.reinitializeState(),this.setBuffer(e),t.label=1;case 1:if(!this.hasRemaining(1))return[3/*break*/,3];return[4/*yield*/,this.doDecodeSync()];case 2:return t.sent(),[3/*break*/,1];case 3:return[2/*return*/]}})},e.prototype.decodeAsync=function(e){var t,n,i,r,o,s,a,c;return o=this,s=void 0,a=void 0,c=function(){var o,s,a,c,h,l,u;return $(this,function(f){switch(f.label){case 0:o=!1,f.label=1;case 1:f.trys.push([1,6,7,12]),t=K(e),f.label=2;case 2:return[4/*yield*/,t.next()];case 3:if((n=f.sent()).done)return[3/*break*/,5];if(a=n.value,o)throw this.createExtraByteError(this.totalPos);this.appendBuffer(a);try{s=this.doDecodeSync(),o=!0}catch(e){if(!(e instanceof Z))throw e;// rethrow
// fallthrough
}this.totalPos+=this.pos,f.label=4;case 4:return[3/*break*/,2];case 5:return[3/*break*/,12];case 6:return i={error:f.sent()},[3/*break*/,12];case 7:if(f.trys.push([7,,10,11]),!(n&&!n.done&&(r=t.return)))return[3/*break*/,9];return[4/*yield*/,r.call(t)];case 8:f.sent(),f.label=9;case 9:return[3/*break*/,11];case 10:if(i)throw i.error;return[7/*endfinally*/];case 11:return[7/*endfinally*/];case 12:if(o){if(this.hasRemaining(1))throw this.createExtraByteError(this.totalPos);return[2/*return*/,s]}throw c=this,h=c.headByte,l=c.pos,u=c.totalPos,RangeError("Insufficient data in parsing ".concat(S(h)," at ").concat(u," (").concat(l," in the current buffer)"))}})},new(a||(a=Promise))(function(e,t){function n(e){try{r(c.next(e))}catch(e){t(e)}}function i(e){try{r(c.throw(e))}catch(e){t(e)}}function r(t){var r;t.done?e(t.value):((r=t.value)instanceof a?r:new a(function(e){e(r)})).then(n,i)}r((c=c.apply(o,s||[])).next())})},e.prototype.decodeArrayStream=function(e){return this.decodeMultiAsync(e,!0)},e.prototype.decodeStream=function(e){return this.decodeMultiAsync(e,!1)},e.prototype.decodeMultiAsync=function(e,t){return H(this,arguments,function(){var n,i,r,o,s,a,c,h;return $(this,function(l){switch(l.label){case 0:n=t,i=-1,l.label=1;case 1:l.trys.push([1,13,14,19]),r=K(e),l.label=2;case 2:return[4/*yield*/,V(r.next())];case 3:if((o=l.sent()).done)return[3/*break*/,12];if(s=o.value,t&&0===i)throw this.createExtraByteError(this.totalPos);this.appendBuffer(s),n&&(i=this.readArraySize(),n=!1,this.complete()),l.label=4;case 4:l.trys.push([4,9,,10]),l.label=5;case 5:return[4/*yield*/,V(this.doDecodeSync())];case 6:return[4/*yield*/,l.sent()];case 7:if(l.sent(),0==--i)return[3/*break*/,8];return[3/*break*/,5];case 8:return[3/*break*/,10];case 9:if(!((a=l.sent())instanceof Z))throw a;// rethrow
return[3/*break*/,10];case 10:this.totalPos+=this.pos,l.label=11;case 11:return[3/*break*/,2];case 12:return[3/*break*/,19];case 13:return c={error:l.sent()},[3/*break*/,19];case 14:if(l.trys.push([14,,17,18]),!(o&&!o.done&&(h=r.return)))return[3/*break*/,16];return[4/*yield*/,V(h.call(r))];case 15:l.sent(),l.label=16;case 16:return[3/*break*/,18];case 17:if(c)throw c.error;return[7/*endfinally*/];case 18:return[7/*endfinally*/];case 19:return[2/*return*/]}})})},e.prototype.doDecodeSync=function(){t:for(;;){var e=this.readHeadByte(),t=void 0;if(e>=224)t=e-256;else if(e<192){if(e<128)t=e;else if(e<144){// fixmap (1000 xxxx) 0x80 - 0x8f
var n=e-128;if(0!==n){this.pushMapState(n),this.complete();continue}t={}}else if(e<160){// fixarray (1001 xxxx) 0x90 - 0x9f
var n=e-144;if(0!==n){this.pushArrayState(n),this.complete();continue}t=[]}else{// fixstr (101x xxxx) 0xa0 - 0xbf
var i=e-160;t=this.decodeUtf8String(i,0)}}else if(192===e)t=null;else if(194===e)t=!1;else if(195===e)t=!0;else if(202===e)t=this.readF32();else if(203===e)t=this.readF64();else if(204===e)t=this.readU8();else if(205===e)t=this.readU16();else if(206===e)t=this.readU32();else if(207===e)t=this.readU64();else if(208===e)t=this.readI8();else if(209===e)t=this.readI16();else if(210===e)t=this.readI32();else if(211===e)t=this.readI64();else if(217===e){// str 8
var i=this.lookU8();t=this.decodeUtf8String(i,1)}else if(218===e){// str 16
var i=this.lookU16();t=this.decodeUtf8String(i,2)}else if(219===e){// str 32
var i=this.lookU32();t=this.decodeUtf8String(i,4)}else if(220===e){// array 16
var n=this.readU16();if(0!==n){this.pushArrayState(n),this.complete();continue}t=[]}else if(221===e){// array 32
var n=this.readU32();if(0!==n){this.pushArrayState(n),this.complete();continue}t=[]}else if(222===e){// map 16
var n=this.readU16();if(0!==n){this.pushMapState(n),this.complete();continue}t={}}else if(223===e){// map 32
var n=this.readU32();if(0!==n){this.pushMapState(n),this.complete();continue}t={}}else if(196===e){// bin 8
var n=this.lookU8();t=this.decodeBinary(n,1)}else if(197===e){// bin 16
var n=this.lookU16();t=this.decodeBinary(n,2)}else if(198===e){// bin 32
var n=this.lookU32();t=this.decodeBinary(n,4)}else if(212===e)t=this.decodeExtension(1,0);else if(213===e)t=this.decodeExtension(2,0);else if(214===e)t=this.decodeExtension(4,0);else if(215===e)t=this.decodeExtension(8,0);else if(216===e)t=this.decodeExtension(16,0);else if(199===e){// ext 8
var n=this.lookU8();t=this.decodeExtension(n,1)}else if(200===e){// ext 16
var n=this.lookU16();t=this.decodeExtension(n,2)}else if(201===e){// ext 32
var n=this.lookU32();t=this.decodeExtension(n,4)}else throw new _.DecodeError("Unrecognized type byte: ".concat(S(e)));this.complete();for(var r=this.stack;r.length>0;){// arrays and maps
var o=r[r.length-1];if(0/* State.ARRAY */===o.type){if(o.array[o.position]=t,o.position++,o.position===o.size)r.pop(),t=o.array;else continue t}else if(1/* State.MAP_KEY */===o.type){if(!X(t))throw new _.DecodeError("The type of key must be string or number but "+typeof t);if("__proto__"===t)throw new _.DecodeError("The key __proto__ is not allowed");o.key=t,o.type=2/* State.MAP_VALUE */;continue t}else if(// it must be `state.type === State.MAP_VALUE` here
o.map[o.key]=t,o.readCount++,o.readCount===o.size)r.pop(),t=o.map;else{o.key=null,o.type=1/* State.MAP_KEY */;continue t}}return t}},e.prototype.readHeadByte=function(){return -1===this.headByte&&(this.headByte=this.readU8()),this.headByte},e.prototype.complete=function(){this.headByte=-1},e.prototype.readArraySize=function(){var e=this.readHeadByte();switch(e){case 220:return this.readU16();case 221:return this.readU32();default:if(e<160)return e-144;throw new _.DecodeError("Unrecognized array type byte: ".concat(S(e)))}},e.prototype.pushMapState=function(e){if(e>this.maxMapLength)throw new _.DecodeError("Max length exceeded: map length (".concat(e,") > maxMapLengthLength (").concat(this.maxMapLength,")"));this.stack.push({type:1/* State.MAP_KEY */,size:e,key:null,readCount:0,map:{}})},e.prototype.pushArrayState=function(e){if(e>this.maxArrayLength)throw new _.DecodeError("Max length exceeded: array length (".concat(e,") > maxArrayLength (").concat(this.maxArrayLength,")"));this.stack.push({type:0/* State.ARRAY */,size:e,array:Array(e),position:0})},e.prototype.decodeUtf8String=function(e,t){if(e>this.maxStrLength)throw new _.DecodeError("Max length exceeded: UTF-8 byte length (".concat(e,") > maxStrLength (").concat(this.maxStrLength,")"));if(this.bytes.byteLength<this.pos+t+e)throw q;var n,i,r,o=this.pos+t;return this.stateIsMapKey()&&(null===(i=this.keyDecoder)||void 0===i?void 0:i.canBeCached(e))?r=this.keyDecoder.decode(this.bytes,o,e):e>W?(n=this.bytes.subarray(o,o+e),r=P.decode(n)):r=F(this.bytes,o,e),this.pos+=t+e,r},e.prototype.stateIsMapKey=function(){return this.stack.length>0&&1/* State.MAP_KEY */===this.stack[this.stack.length-1].type},e.prototype.decodeBinary=function(e,t){if(e>this.maxBinLength)throw new _.DecodeError("Max length exceeded: bin length (".concat(e,") > maxBinLength (").concat(this.maxBinLength,")"));if(!this.hasRemaining(e+t))throw q;var n=this.pos+t,i=this.bytes.subarray(n,n+e);return this.pos+=t+e,i},e.prototype.decodeExtension=function(e,t){if(e>this.maxExtLength)throw new _.DecodeError("Max length exceeded: ext length (".concat(e,") > maxExtLength (").concat(this.maxExtLength,")"));var n=this.view.getInt8(this.pos+t),i=this.decodeBinary(e,t+1/* extType */);return this.extensionCodec.decode(i,n,this.context)},e.prototype.lookU8=function(){return this.view.getUint8(this.pos)},e.prototype.lookU16=function(){return this.view.getUint16(this.pos)},e.prototype.lookU32=function(){return this.view.getUint32(this.pos)},e.prototype.readU8=function(){var e=this.view.getUint8(this.pos);return this.pos++,e},e.prototype.readI8=function(){var e=this.view.getInt8(this.pos);return this.pos++,e},e.prototype.readU16=function(){var e=this.view.getUint16(this.pos);return this.pos+=2,e},e.prototype.readI16=function(){var e=this.view.getInt16(this.pos);return this.pos+=2,e},e.prototype.readU32=function(){var e=this.view.getUint32(this.pos);return this.pos+=4,e},e.prototype.readI32=function(){var e=this.view.getInt32(this.pos);return this.pos+=4,e},e.prototype.readU64=function(){var e,t,n=(e=this.view,t=this.pos,4294967296*e.getUint32(t)+e.getUint32(t+4));return this.pos+=8,n},e.prototype.readI64=function(){var e=D(this.view,this.pos);return this.pos+=8,e},e.prototype.readF32=function(){var e=this.view.getFloat32(this.pos);return this.pos+=4,e},e.prototype.readF64=function(){var e=this.view.getFloat64(this.pos);return this.pos+=8,e},e}(),ee={};e(ee,"ensureAsyncIterable",()=>er);// utility for whatwg streams
var et=function(e,t){var n,i,r,o,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function a(o){return function(a){return function(o){if(n)throw TypeError("Generator is already executing.");for(;s;)try{if(n=1,i&&(r=2&o[0]?i.return:o[0]?i.throw||((r=i.return)&&r.call(i),0):i.next)&&!(r=r.call(i,o[1])).done)return r;switch(i=0,r&&(o=[2&o[0],r.value]),o[0]){case 0:case 1:r=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,i=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(r=(r=s.trys).length>0&&r[r.length-1])&&(6===o[0]||2===o[0])){s=0;continue}if(3===o[0]&&(!r||o[1]>r[0]&&o[1]<r[3])){s.label=o[1];break}if(6===o[0]&&s.label<r[1]){s.label=r[1],r=o;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(o);break}r[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],i=0}finally{n=r=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}},en=function(e){return this instanceof en?(this.v=e,this):new en(e)},ei=function(e,t,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var i,r=n.apply(e,t||[]),o=[];return i={},s("next"),s("throw"),s("return"),i[Symbol.asyncIterator]=function(){return this},i;function s(e){r[e]&&(i[e]=function(t){return new Promise(function(n,i){o.push([e,t,n,i])>1||a(e,t)})})}function a(e,t){try{var n;(n=r[e](t)).value instanceof en?Promise.resolve(n.value.v).then(c,h):l(o[0][2],n)}catch(e){l(o[0][3],e)}}function c(e){a("next",e)}function h(e){a("throw",e)}function l(e,t){e(t),o.shift(),o.length&&a(o[0][0],o[0][1])}};function er(e){return null!=e[Symbol.asyncIterator]?e:function(e){return ei(this,arguments,function(){var t,n,i,r;return et(this,function(o){switch(o.label){case 0:t=e.getReader(),o.label=1;case 1:o.trys.push([1,,9,10]),o.label=2;case 2:return[4/*yield*/,en(t.read())];case 3:if(i=(n=o.sent()).done,r=n.value,!i)return[3/*break*/,5];return[4/*yield*/,en(void 0)];case 4:return[2/*return*/,o.sent()];case 5:return!function(e){if(null==e)throw Error("Assertion Failure: value must not be null nor undefined")}(r),[4/*yield*/,en(r)];case 6:return[4/*yield*/,o.sent()];case 7:return o.sent(),[3/*break*/,2];case 8:return[3/*break*/,10];case 9:return t.releaseLock(),[7/*endfinally*/];case 10:return[2/*return*/]}})})}(e)}var eo={};function es(e,t){void 0===t&&(t=eo);var n=(0,ee.ensureAsyncIterable)(e);return new E.Decoder(t.extensionCodec,t.context,t.maxStrLength,t.maxBinLength,t.maxArrayLength,t.maxMapLength,t.maxExtLength).decodeStream(n)}var ea=/** @class */function(){function e(e,t,n,i,r,o,s,a){void 0===e&&(e=k.defaultCodec),void 0===t&&(t=void 0),void 0===n&&(n=100),void 0===i&&(i=2048),void 0===r&&(r=!1),void 0===o&&(o=!1),void 0===s&&(s=!1),void 0===a&&(a=!1),this.extensionCodec=e,this.context=t,this.maxDepth=n,this.initialBufferSize=i,this.sortKeys=r,this.forceFloat32=o,this.ignoreUndefined=s,this.forceIntegerToFloat=a,this.pos=0,this.view=new DataView(new ArrayBuffer(this.initialBufferSize)),this.bytes=new Uint8Array(this.view.buffer)}return e.prototype.reinitializeState=function(){this.pos=0},/**
     * This is almost equivalent to {@link Encoder#encode}, but it returns an reference of the encoder's internal buffer and thus much faster than {@link Encoder#encode}.
     *
     * @returns Encodes the object and returns a shared reference the encoder's internal buffer.
     */e.prototype.encodeSharedRef=function(e){return this.reinitializeState(),this.doEncode(e,1),this.bytes.subarray(0,this.pos)},/**
     * @returns Encodes the object and returns a copy of the encoder's internal buffer.
     */e.prototype.encode=function(e){return this.reinitializeState(),this.doEncode(e,1),this.bytes.slice(0,this.pos)},e.prototype.doEncode=function(e,t){if(t>this.maxDepth)throw Error("Too deep objects in depth ".concat(t));null==e?this.encodeNil():"boolean"==typeof e?this.encodeBoolean(e):"number"==typeof e?this.encodeNumber(e):"string"==typeof e?this.encodeString(e):this.encodeObject(e,t)},e.prototype.ensureBufferSizeToWrite=function(e){var t=this.pos+e;this.view.byteLength<t&&this.resizeBuffer(2*t)},e.prototype.resizeBuffer=function(e){var t=new ArrayBuffer(e),n=new Uint8Array(t),i=new DataView(t);n.set(this.bytes),this.view=i,this.bytes=n},e.prototype.encodeNil=function(){this.writeU8(192)},e.prototype.encodeBoolean=function(e){!1===e?this.writeU8(194):this.writeU8(195)},e.prototype.encodeNumber=function(e){Number.isSafeInteger(e)&&!this.forceIntegerToFloat?e>=0?e<128?this.writeU8(e):e<256?(// uint 8
this.writeU8(204),this.writeU8(e)):e<65536?(// uint 16
this.writeU8(205),this.writeU16(e)):e<4294967296?(// uint 32
this.writeU8(206),this.writeU32(e)):(// uint 64
this.writeU8(207),this.writeU64(e)):e>=-32?this.writeU8(224|e+32):e>=-128?(// int 8
this.writeU8(208),this.writeI8(e)):e>=-32768?(// int 16
this.writeU8(209),this.writeI16(e)):e>=-2147483648?(// int 32
this.writeU8(210),this.writeI32(e)):(// int 64
this.writeU8(211),this.writeI64(e)):this.forceFloat32?(// float 32
this.writeU8(202),this.writeF32(e)):(// float 64
this.writeU8(203),this.writeF64(e))},e.prototype.writeStringHeader=function(e){if(e<32)this.writeU8(160+e);else if(e<256)// str 8
this.writeU8(217),this.writeU8(e);else if(e<65536)// str 16
this.writeU8(218),this.writeU16(e);else if(e<4294967296)// str 32
this.writeU8(219),this.writeU32(e);else throw Error("Too long string: ".concat(e," bytes in UTF-8"))},e.prototype.encodeString=function(e){if(e.length>M){var t=O(e);this.ensureBufferSizeToWrite(5+t),this.writeStringHeader(t),z(e,this.bytes,this.pos),this.pos+=t}else{var t=O(e);this.ensureBufferSizeToWrite(5+t),this.writeStringHeader(t),function(e,t,n){for(var i=e.length,r=n,o=0;o<i;){var s=e.charCodeAt(o++);if((4294967168&s)==0){// 1-byte
t[r++]=s;continue}if((4294965248&s)==0)t[r++]=s>>6&31|192;else{// handle surrogate pair
if(s>=55296&&s<=56319&&o<i){var a=e.charCodeAt(o);(64512&a)==56320&&(++o,s=((1023&s)<<10)+(1023&a)+65536)}(4294901760&s)==0?// 3-byte
t[r++]=s>>12&15|224:(// 4-byte
t[r++]=s>>18&7|240,t[r++]=s>>12&63|128),t[r++]=s>>6&63|128}t[r++]=63&s|128}}(e,this.bytes,this.pos),this.pos+=t}},e.prototype.encodeObject=function(e,t){// try to encode objects with custom codec first of non-primitives
var n=this.extensionCodec.tryToEncode(e,this.context);if(null!=n)this.encodeExtension(n);else if(Array.isArray(e))this.encodeArray(e,t);else if(ArrayBuffer.isView(e))this.encodeBinary(e);else if("object"==typeof e)this.encodeMap(e,t);else throw Error("Unrecognized object: ".concat(Object.prototype.toString.apply(e)))},e.prototype.encodeBinary=function(e){var t=e.byteLength;if(t<256)// bin 8
this.writeU8(196),this.writeU8(t);else if(t<65536)// bin 16
this.writeU8(197),this.writeU16(t);else if(t<4294967296)// bin 32
this.writeU8(198),this.writeU32(t);else throw Error("Too large binary: ".concat(t));var n=N(e);this.writeU8a(n)},e.prototype.encodeArray=function(e,t){var n=e.length;if(n<16)this.writeU8(144+n);else if(n<65536)// array 16
this.writeU8(220),this.writeU16(n);else if(n<4294967296)// array 32
this.writeU8(221),this.writeU32(n);else throw Error("Too large array: ".concat(n));for(var i=0;i<e.length;i++){var r=e[i];this.doEncode(r,t+1)}},e.prototype.countWithoutUndefined=function(e,t){for(var n=0,i=0;i<t.length;i++)void 0!==e[t[i]]&&n++;return n},e.prototype.encodeMap=function(e,t){var n=Object.keys(e);this.sortKeys&&n.sort();var i=this.ignoreUndefined?this.countWithoutUndefined(e,n):n.length;if(i<16)this.writeU8(128+i);else if(i<65536)// map 16
this.writeU8(222),this.writeU16(i);else if(i<4294967296)// map 32
this.writeU8(223),this.writeU32(i);else throw Error("Too large map object: ".concat(i));for(var r=0;r<n.length;r++){var o=n[r],s=e[o];this.ignoreUndefined&&void 0===s||(this.encodeString(o),this.doEncode(s,t+1))}},e.prototype.encodeExtension=function(e){var t=e.data.length;if(1===t)this.writeU8(212);else if(2===t)this.writeU8(213);else if(4===t)this.writeU8(214);else if(8===t)this.writeU8(215);else if(16===t)this.writeU8(216);else if(t<256)// ext 8
this.writeU8(199),this.writeU8(t);else if(t<65536)// ext 16
this.writeU8(200),this.writeU16(t);else if(t<4294967296)// ext 32
this.writeU8(201),this.writeU32(t);else throw Error("Too large extension object: ".concat(t));this.writeI8(e.type),this.writeU8a(e.data)},e.prototype.writeU8=function(e){this.ensureBufferSizeToWrite(1),this.view.setUint8(this.pos,e),this.pos++},e.prototype.writeU8a=function(e){var t=e.length;this.ensureBufferSizeToWrite(t),this.bytes.set(e,this.pos),this.pos+=t},e.prototype.writeI8=function(e){this.ensureBufferSizeToWrite(1),this.view.setInt8(this.pos,e),this.pos++},e.prototype.writeU16=function(e){this.ensureBufferSizeToWrite(2),this.view.setUint16(this.pos,e),this.pos+=2},e.prototype.writeI16=function(e){this.ensureBufferSizeToWrite(2),this.view.setInt16(this.pos,e),this.pos+=2},e.prototype.writeU32=function(e){this.ensureBufferSizeToWrite(4),this.view.setUint32(this.pos,e),this.pos+=4},e.prototype.writeI32=function(e){this.ensureBufferSizeToWrite(4),this.view.setInt32(this.pos,e),this.pos+=4},e.prototype.writeF32=function(e){this.ensureBufferSizeToWrite(4),this.view.setFloat32(this.pos,e),this.pos+=4},e.prototype.writeF64=function(e){this.ensureBufferSizeToWrite(8),this.view.setFloat64(this.pos,e),this.pos+=8},e.prototype.writeU64=function(e){var t,n,i;this.ensureBufferSizeToWrite(8),t=this.view,n=this.pos,i=e/4294967296,t.setUint32(n,i),t.setUint32(n+4,e),this.pos+=8},e.prototype.writeI64=function(e){this.ensureBufferSizeToWrite(8),T(this.view,this.pos,e),this.pos+=8},e}();(n=d||(d={}))[n./**
	 * Prints no logs.
	 */Disabled=0]="Disabled",n[n./**
	 * Prints only errors.
	 */Errors=1]="Errors",n[n./**
	 * Prints errors and warnings.
	 */Warnings=2]="Warnings",n[n./**
	 * Prints all logs.
	 */All=3]="All";var ec=new class{get logLevel(){return this._logLevel}set logLevel(e){this._logLevel=e}log(...e){this._logLevel>=d.All&&this._print(d.All,...e)}warn(...e){this._logLevel>=d.Warnings&&this._print(d.Warnings,...e)}error(...e){this._logLevel>=d.Errors&&this._print(d.Errors,...e)}setLogFunction(e){this._print=e}_print(e,...t){let n=["PeerJS: ",...t];for(let e in n)n[e]instanceof Error&&(n[e]="("+n[e].name+") "+n[e].message);e>=d.All?console.log(...n):e>=d.Warnings?console.warn("WARNING",...n):e>=d.Errors&&console.error("ERROR",...n)}constructor(){this._logLevel=d.Disabled}};(i=p||(p={})).Data="data",i.Media="media",(r=y||(y={}))./**
	 * The client's browser does not support some or all WebRTC features that you are trying to use.
	 */BrowserIncompatible="browser-incompatible",r./**
	 * You've already disconnected this peer from the server and can no longer make any new connections on it.
	 */Disconnected="disconnected",r./**
	 * The ID passed into the Peer constructor contains illegal characters.
	 */InvalidID="invalid-id",r./**
	 * The API key passed into the Peer constructor contains illegal characters or is not in the system (cloud server only).
	 */InvalidKey="invalid-key",r./**
	 * Lost or cannot establish a connection to the signalling server.
	 */Network="network",r./**
	 * The peer you're trying to connect to does not exist.
	 */PeerUnavailable="peer-unavailable",r./**
	 * PeerJS is being used securely, but the cloud server does not support SSL. Use a custom PeerServer.
	 */SslUnavailable="ssl-unavailable",r./**
	 * Unable to reach the server.
	 */ServerError="server-error",r./**
	 * An error from the underlying socket.
	 */SocketError="socket-error",r./**
	 * The underlying socket closed unexpectedly.
	 */SocketClosed="socket-closed",r./**
	 * The ID passed into the Peer constructor is already taken.
	 *
	 * :::caution
	 * This error is not fatal if your peer has open peer-to-peer connections.
	 * This can happen if you attempt to {@apilink Peer.reconnect} a peer that has been disconnected from the server,
	 * but its old ID has now been taken.
	 * :::
	 */UnavailableID="unavailable-id",r./**
	 * Native WebRTC errors.
	 */WebRTC="webrtc",(o=v||(v={})).NegotiationFailed="negotiation-failed",o.ConnectionClosed="connection-closed",(s=w||(w={})).NotOpenYet="not-open-yet",s.MessageToBig="message-too-big",(a=g||(g={})).Binary="binary",a.BinaryUTF8="binary-utf8",a.JSON="json",a.None="raw",(c=b||(b={})).Message="message",c.Disconnected="disconnected",c.Error="error",c.Close="close",(h=m||(m={})).Heartbeat="HEARTBEAT",h.Candidate="CANDIDATE",h.Offer="OFFER",h.Answer="ANSWER",h.Open="OPEN",h.Error="ERROR",h.IdTaken="ID-TAKEN",h.InvalidKey="INVALID-KEY",h.Leave="LEAVE",h.Expire="EXPIRE";class eh{constructor(e){this.connection=e}/** Returns a PeerConnection object set up correctly (for data, media). */startConnection(e){let t=this._startPeerConnection();// What do we need to do now?
if(// Set the connection's PC.
this.connection.peerConnection=t,this.connection.type===p.Media&&e._stream&&this._addTracksToConnection(e._stream,t),e.originator){let n=this.connection,i={ordered:!!e.reliable},r=t.createDataChannel(n.label,i);n._initializeDataChannel(r),this._makeOffer()}else this.handleSDP("OFFER",e.sdp)}/** Start a PC. */_startPeerConnection(){ec.log("Creating RTCPeerConnection.");let e=new RTCPeerConnection(this.connection.provider.options.config);return this._setupListeners(e),e}/** Set up various WebRTC listeners. */_setupListeners(e){let t=this.connection.peer,n=this.connection.connectionId,i=this.connection.type,r=this.connection.provider;ec.log("Listening for ICE candidates."),e.onicecandidate=e=>{e.candidate&&e.candidate.candidate&&(ec.log(`Received ICE candidates for ${t}:`,e.candidate),r.socket.send({type:m.Candidate,payload:{candidate:e.candidate,type:i,connectionId:n},dst:t}))},e.oniceconnectionstatechange=()=>{switch(e.iceConnectionState){case"failed":ec.log("iceConnectionState is failed, closing connections to "+t),this.connection.emitError(v.NegotiationFailed,"Negotiation of connection to "+t+" failed."),this.connection.close();break;case"closed":ec.log("iceConnectionState is closed, closing connections to "+t),this.connection.emitError(v.ConnectionClosed,"Connection to "+t+" closed."),this.connection.close();break;case"disconnected":ec.log("iceConnectionState changed to disconnected on the connection with "+t);break;case"completed":e.onicecandidate=()=>{}}this.connection.emit("iceStateChanged",e.iceConnectionState)},ec.log("Listening for data channel"),// Fired between offer and answer, so options should already be saved
// in the options hash.
e.ondatachannel=e=>{ec.log("Received data channel");let i=e.channel,o=r.getConnection(t,n);o._initializeDataChannel(i)},ec.log("Listening for remote stream"),e.ontrack=e=>{ec.log("Received remote stream");let i=e.streams[0],o=r.getConnection(t,n);o.type===p.Media&&this._addStreamToMediaConnection(i,o)}}cleanup(){ec.log("Cleaning up PeerConnection to "+this.connection.peer);let e=this.connection.peerConnection;if(!e)return;this.connection.peerConnection=null,//unsubscribe from all PeerConnection's events
e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=()=>{};let t="closed"!==e.signalingState,n=!1,i=this.connection.dataChannel;i&&(n=!!i.readyState&&"closed"!==i.readyState),(t||n)&&e.close()}async _makeOffer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let n=await e.createOffer(this.connection.options.constraints);ec.log("Created offer."),this.connection.options.sdpTransform&&"function"==typeof this.connection.options.sdpTransform&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await e.setLocalDescription(n),ec.log("Set localDescription:",n,`for:${this.connection.peer}`);let i={sdp:n,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata};if(this.connection.type===p.Data){let e=this.connection;i={...i,label:e.label,reliable:e.reliable,serialization:e.serialization}}t.socket.send({type:m.Offer,payload:i,dst:this.connection.peer})}catch(e){// TODO: investigate why _makeOffer is being called from the answer
"OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"!=e&&(t.emitError(y.WebRTC,e),ec.log("Failed to setLocalDescription, ",e))}}catch(e){t.emitError(y.WebRTC,e),ec.log("Failed to createOffer, ",e)}}async _makeAnswer(){let e=this.connection.peerConnection,t=this.connection.provider;try{let n=await e.createAnswer();ec.log("Created answer."),this.connection.options.sdpTransform&&"function"==typeof this.connection.options.sdpTransform&&(n.sdp=this.connection.options.sdpTransform(n.sdp)||n.sdp);try{await e.setLocalDescription(n),ec.log("Set localDescription:",n,`for:${this.connection.peer}`),t.socket.send({type:m.Answer,payload:{sdp:n,type:this.connection.type,connectionId:this.connection.connectionId},dst:this.connection.peer})}catch(e){t.emitError(y.WebRTC,e),ec.log("Failed to setLocalDescription, ",e)}}catch(e){t.emitError(y.WebRTC,e),ec.log("Failed to create answer, ",e)}}/** Handle an SDP. */async handleSDP(e,t){t=new RTCSessionDescription(t);let n=this.connection.peerConnection,i=this.connection.provider;ec.log("Setting remote description",t);try{await n.setRemoteDescription(t),ec.log(`Set remoteDescription:${e} for:${this.connection.peer}`),"OFFER"===e&&await this._makeAnswer()}catch(e){i.emitError(y.WebRTC,e),ec.log("Failed to setRemoteDescription, ",e)}}/** Handle a candidate. */async handleCandidate(e){ec.log("handleCandidate:",e);try{await this.connection.peerConnection.addIceCandidate(e),ec.log(`Added ICE candidate for:${this.connection.peer}`)}catch(e){this.connection.provider.emitError(y.WebRTC,e),ec.log("Failed to handleCandidate, ",e)}}_addTracksToConnection(e,t){if(ec.log(`add tracks from stream ${e.id} to peer connection`),!t.addTrack)return ec.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(n=>{t.addTrack(n,e)})}_addStreamToMediaConnection(e,t){ec.log(`add stream ${e.id} to media connection ${t.connectionId}`),t.addStream(e)}}var el={},eu=Object.prototype.hasOwnProperty,ef="~";/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */function ed(){}/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */function ep(e,t,n){this.fn=e,this.context=t,this.once=n||!1}/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */function ey(e,t,n,i,r){if("function"!=typeof n)throw TypeError("The listener must be a function");var o=new ep(n,i||e,r),s=ef?ef+t:t;return e._events[s]?e._events[s].fn?e._events[s]=[e._events[s],o]:e._events[s].push(o):(e._events[s]=o,e._eventsCount++),e}/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */function ev(e,t){0==--e._eventsCount?e._events=new ed:delete e._events[t]}/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */function ew(){this._events=new ed,this._eventsCount=0}Object.create&&(ed.prototype=Object.create(null),new ed().__proto__||(ef=!1)),/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */ew.prototype.eventNames=function(){var e,t,n=[];if(0===this._eventsCount)return n;for(t in e=this._events)eu.call(e,t)&&n.push(ef?t.slice(1):t);return Object.getOwnPropertySymbols?n.concat(Object.getOwnPropertySymbols(e)):n},/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */ew.prototype.listeners=function(e){var t=ef?ef+e:e,n=this._events[t];if(!n)return[];if(n.fn)return[n.fn];for(var i=0,r=n.length,o=Array(r);i<r;i++)o[i]=n[i].fn;return o},/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */ew.prototype.listenerCount=function(e){var t=ef?ef+e:e,n=this._events[t];return n?n.fn?1:n.length:0},/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */ew.prototype.emit=function(e,t,n,i,r,o){var s=ef?ef+e:e;if(!this._events[s])return!1;var a,c,h=this._events[s],l=arguments.length;if(h.fn){switch(h.once&&this.removeListener(e,h.fn,void 0,!0),l){case 1:return h.fn.call(h.context),!0;case 2:return h.fn.call(h.context,t),!0;case 3:return h.fn.call(h.context,t,n),!0;case 4:return h.fn.call(h.context,t,n,i),!0;case 5:return h.fn.call(h.context,t,n,i,r),!0;case 6:return h.fn.call(h.context,t,n,i,r,o),!0}for(c=1,a=Array(l-1);c<l;c++)a[c-1]=arguments[c];h.fn.apply(h.context,a)}else{var u,f=h.length;for(c=0;c<f;c++)switch(h[c].once&&this.removeListener(e,h[c].fn,void 0,!0),l){case 1:h[c].fn.call(h[c].context);break;case 2:h[c].fn.call(h[c].context,t);break;case 3:h[c].fn.call(h[c].context,t,n);break;case 4:h[c].fn.call(h[c].context,t,n,i);break;default:if(!a)for(u=1,a=Array(l-1);u<l;u++)a[u-1]=arguments[u];h[c].fn.apply(h[c].context,a)}}return!0},/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ew.prototype.on=function(e,t,n){return ey(this,e,t,n,!1)},/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */ew.prototype.once=function(e,t,n){return ey(this,e,t,n,!0)},/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */ew.prototype.removeListener=function(e,t,n,i){var r=ef?ef+e:e;if(!this._events[r])return this;if(!t)return ev(this,r),this;var o=this._events[r];if(o.fn)o.fn!==t||i&&!o.once||n&&o.context!==n||ev(this,r);else{for(var s=0,a=[],c=o.length;s<c;s++)(o[s].fn!==t||i&&!o[s].once||n&&o[s].context!==n)&&a.push(o[s]);//
// Reset the array, or remove it completely if we have no more listeners.
//
a.length?this._events[r]=1===a.length?a[0]:a:ev(this,r)}return this},/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */ew.prototype.removeAllListeners=function(e){var t;return e?(t=ef?ef+e:e,this._events[t]&&ev(this,t)):(this._events=new ed,this._eventsCount=0),this},//
// Alias methods names because people roll like that.
//
ew.prototype.off=ew.prototype.removeListener,ew.prototype.addListener=ew.prototype.on,//
// Expose the prefix.
//
ew.prefixed=ef,//
// Allow `EventEmitter` to be imported as module namespace.
//
ew.EventEmitter=ew,el=ew;class eg extends el.EventEmitter{/**
	 * Emits a typed error message.
	 *
	 * @internal
	 */emitError(e,t){ec.error("Error:",t),// @ts-ignore
this.emit("error",new eb(`${e}`,t))}}class eb extends Error{/**
	 * @internal
	 */constructor(e,t){"string"==typeof t?super(t):(super(),Object.assign(this,t)),this.type=e}}class em extends eg{/**
	 * Whether the media connection is active (e.g. your call has been answered).
	 * You can check this if you want to set a maximum wait time for a one-sided call.
	 */get open(){return this._open}constructor(e,t,n){super(),this.peer=e,this.provider=t,this.options=n,this._open=!1,this.metadata=n.metadata}}let eU=()=>Math.random().toString(36).slice(2);class eE extends em{static #e=(()=>{this.ID_PREFIX="dc_"})();static #t=(()=>{this.MAX_BUFFERED_AMOUNT=8388608})();get type(){return p.Data}constructor(e,t,n){super(e,t,n),this.connectionId=this.options.connectionId||eE.ID_PREFIX+eU(),this.label=this.options.label||this.connectionId,this.reliable=!!this.options.reliable,this._negotiator=new eh(this),this._negotiator.startConnection(this.options._payload||{originator:!0,reliable:this.reliable})}/** Called by the Negotiator when the DataChannel is ready. */_initializeDataChannel(e){this.dataChannel=e,this.dataChannel.onopen=()=>{ec.log(`DC#${this.connectionId} dc connection success`),this._open=!0,this.emit("open")},this.dataChannel.onmessage=e=>{ec.log(`DC#${this.connectionId} dc onmessage:`,e.data);// this._handleDataMessage(e);
},this.dataChannel.onclose=()=>{ec.log(`DC#${this.connectionId} dc closed for:`,this.peer),this.close()}}/**
	 * Exposed functionality for users.
	 *//** Allows user to close connection. */close(e){if(e?.flush){this.send({__peerData:{type:"close"}});return}this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.dataChannel&&(this.dataChannel.onopen=null,this.dataChannel.onmessage=null,this.dataChannel.onclose=null,this.dataChannel=null),this.open&&(this._open=!1,super.emit("close"))}/** Allows user to send data. */send(e,t=!1){if(!this.open){this.emitError(w.NotOpenYet,"Connection is not open. You should listen for the `open` event before sending messages.");return}return this._send(e,t)}async handleMessage(e){let t=e.payload;switch(e.type){case m.Answer:await this._negotiator.handleSDP(e.type,t.sdp);break;case m.Candidate:await this._negotiator.handleCandidate(t.candidate);break;default:ec.warn("Unrecognized message type:",e.type,"from peer:",this.peer)}}}class eS extends eE{constructor(e,t,n){super(e,t,{...n,reliable:!0}),this._CHUNK_SIZE=32768,this._splitStream=new TransformStream({transform:(e,t)=>{for(let n=0;n<e.length;n+=this._CHUNK_SIZE)t.enqueue(e.subarray(n,n+this._CHUNK_SIZE))}}),this._rawSendStream=new WritableStream({write:async(e,t)=>{let n=new Promise(e=>this.dataChannel.addEventListener("bufferedamountlow",e,{once:!0}));// if we can send the chunk now, send it
// if not, we wait until at least half of the sending buffer is free again
await (this.dataChannel.bufferedAmount<=eE.MAX_BUFFERED_AMOUNT-e.byteLength||n);// TODO: what can go wrong here?
try{this.dataChannel.send(e)}catch(e){ec.error(`DC#:${this.connectionId} Error when sending:`,e),t.error(e),this.close()}}}),this.writer=this._splitStream.writable.getWriter(),this._rawReadStream=new ReadableStream({start:e=>{this.once("open",()=>{this.dataChannel.addEventListener("message",t=>{e.enqueue(t.data)})})}}),this._splitStream.readable.pipeTo(this._rawSendStream)}_initializeDataChannel(e){super._initializeDataChannel(e),this.dataChannel.binaryType="arraybuffer",this.dataChannel.bufferedAmountLowThreshold=eE.MAX_BUFFERED_AMOUNT/2}}class eC extends eS{constructor(e,t,n){super(e,t,n),this.serialization="MsgPack",this._encoder=new ea,(async()=>{for await(let e of(0,U.decodeMultiStream)(this._rawReadStream)){// @ts-ignore
if(e.__peerData?.type==="close"){this.close();return}this.emit("data",e)}})()}_send(e){return this.writer.write(this._encoder.encode(e))}}export{eC as MsgPack};//# sourceMappingURL=serializer.msgpack.mjs.map

//# sourceMappingURL=serializer.msgpack.mjs.map
