
/* nournia/reMarked.js@master */
reMarked=function(opts){function extend(e,t){if(!t)return e;for(var n in e)typeOf(t[n])=="Object"?extend(e[n],t[n]):typeof t[n]!="undefined"&&(e[n]=t[n])}function typeOf(e){return Object.prototype.toString.call(e).slice(8,-1)}function rep(e,t){var n="";while(t-->0)n+=e;return n}function trim12(e){var e=e.replace(/^\s\s*/,""),t=/\s/,n=e.length;while(t.test(e.charAt(--n)));return e.slice(0,n+1)}function lpad(e,t,n){return rep(t,n-e.length)+e}function rpad(e,t,n){return e+rep(t,n-e.length)}function otag(e,t){if(!e)return"";var n="<"+e;for(var r,i=0;i<t.attributes.length;i++)r=t.attributes.item(i),n+=" "+r.nodeName+'="'+r.nodeValue+'"';return n+">"}function ctag(e){return e?"</"+e+">":""}function pfxLines(e,t){return e.replace(/^/gm,t)}function nodeName(e){return(e.nodeName=="#text"?"txt":e.nodeName).toLowerCase()}function wrap(e,t){var n,r;return t instanceof Array?(n=t[0],r=t[1]):n=r=t,n=n instanceof Function?n.call(this,e):n,r=r instanceof Function?r.call(this,e):r,n+e+r}function outerHTML(e){return e.outerHTML||function(e){var t=document.createElement("div"),n;return t.appendChild(e.cloneNode(!0)),n=t.innerHTML,t=null,n}(e)}var links=[],cfg={link_list:!1,h1_setext:!0,h2_setext:!0,h_atx_suf:!1,gfm_code:["```","~~~"][0],trim_code:!0,li_bullet:"*-+"[0],hr_char:"-_*"[0],indnt_str:["    ","	","  "][0],bold_char:"*_"[0],emph_char:"*_"[1],gfm_del:!0,gfm_tbls:!0,tbl_edges:!1,hash_lnks:!1,br_only:!1,col_pre:"col ",nbsp_spc:!1,span_tags:!0,div_tags:!0,unsup_tags:{ignore:"script style noscript",inline:"span sup sub i u b center big",block2:"div form fieldset dl header footer address article aside figure hgroup section",block1c:"dt dd caption legend figcaption output",block2c:"canvas audio video iframe"},tag_remap:{i:"em",b:"strong",big:"strong"}},isIE=eval("/*@cc_on!@*/!1"),docMode=document.documentMode,ieLt9=isIE&&(!docMode||docMode<9),textContProp="textContent"in Element.prototype||!ieLt9?"textContent":"innerText";extend(cfg,opts),this.render=function(e){links=[];var t=document.createElement("div");t.innerHTML=typeof e=="string"?e:outerHTML(e);var n=new lib.tag(t,null,0),r=n.rend().replace(/^[\t ]+[\n\r]+/gm,"\n").replace(/^[\n\r]+|[\n\r]+$/g,"");if(cfg.link_list&&links.length>0){r+="\n\n";var i=0;for(var s=0;s<links.length;s++){if(!links[s].e.title)continue;var o=links[s].e.href.length;o&&o>i&&(i=o)}for(var u=0;u<links.length;u++){var a=links[u].e.title?rep(" ",i+2-links[u].e.href.length)+'"'+links[u].e.title+'"':"";r+="  ["+(+u+1)+"]: "+(nodeName(links[u].e)=="a"?links[u].e.href:links[u].e.src)+a+"\n"}}return r.replace(/^[\t ]+\n/gm,"\n")};var lib={};lib.tag=klass({wrap:"",lnPfx:"",lnInd:0,init:function(e,t,n){this.e=e,this.p=t,this.i=n,this.c=[],this.tag=nodeName(e),this.initK()},initK:function(){var e;if(this.e.hasChildNodes()){var t=cfg.unsup_tags.inline,n,r;if(nodeName(this.e)=="table"&&this.e.hasChildNodes()&&!this.e.tHead){var i=document.createElement("thead"),s=this.e.tBodies[0],o=s.rows[0],u=o.cells[0];if(nodeName(u)=="th")i.appendChild(o);else{var a,e=0,f=o.cells.length,l=i.insertRow();while(e++<f)a=document.createElement("th"),a[textContProp]=cfg.col_pre+e,l.appendChild(a)}this.e.insertBefore(i,s)}for(e in this.e.childNodes){if(!/\d+/.test(e))continue;n=this.e.childNodes[e],r=nodeName(n),r in cfg.tag_remap&&(r=cfg.tag_remap[r]);if(cfg.unsup_tags.ignore.test(r))continue;if(r=="txt"&&!nodeName(this.e).match(t)&&/^\s+$/.test(n[textContProp])){if(e==0||e==this.e.childNodes.length-1)continue;var c=this.e.childNodes[e-1],h=this.e.childNodes[e+1];if(c&&!nodeName(c).match(t)||h&&!nodeName(h).match(t))continue}var p=null;if(!lib[r]){var d=cfg.unsup_tags;d.inline.test(r)?r=="span"&&!cfg.span_tags?r="inl":r="tinl":d.block2.test(r)?r=="div"&&!cfg.div_tags?r="blk":r="tblk":d.block1c.test(r)?r="ctblk":d.block2c.test(r)?(r="ctblk",p=["\n\n",""]):r="rawhtml"}var v=new lib[r](n,this,this.c.length);p&&(v.wrap=p);if(v instanceof lib.a&&n.href||v instanceof lib.img)v.lnkid=links.length,links.push(v);this.c.push(v)}}},rend:function(){return this.rendK().replace(/\n{3,}/gm,"\n\n")},rendK:function(){var e,t="";for(var n=0;n<this.c.length;n++)e=this.c[n],t+=(e.bef||"")+e.rend()+(e.aft||"");return t.replace(/^\n+|\n+$/,"")}}),lib.blk=lib.tag.extend({wrap:["\n\n",""],wrapK:null,tagr:!1,lnInd:null,init:function(e,t,n){this.supr(e,t,n),this.lnInd===null&&(this.p&&this.tagr&&this.c[0]instanceof lib.blk?this.lnInd=4:this.lnInd=0),this.wrapK===null&&(this.tagr&&this.c[0]instanceof lib.blk?this.wrapK="\n":this.wrapK="")},rend:function(){return wrap.call(this,(this.tagr?otag(this.tag,this.e):"")+wrap.call(this,pfxLines(pfxLines(this.rendK(),this.lnPfx),rep(" ",this.lnInd)),this.wrapK)+(this.tagr?ctag(this.tag):""),this.wrap)},rendK:function(){var e=this.supr();if(this.p instanceof lib.li){var t=null,n=e.match(/^[\t ]+/gm);if(!n)return e;for(var r=0;r<n.length;r++)if(t===null||n[r][0].length<t.length)t=n[r][0];return e.replace(new RegExp("^"+t),"")}return e}}),lib.tblk=lib.blk.extend({tagr:!0}),lib.cblk=lib.blk.extend({wrap:["\n",""]}),lib.ctblk=lib.cblk.extend({tagr:!0}),lib.inl=lib.tag.extend({rend:function(){var e=this.rendK(),t=e.match(/^((?: |\t|&nbsp;)*)(.*?)((?: |\t|&nbsp;)*)$/)||[e,"",e,""];return t[1]+wrap.call(this,t[2],this.wrap)+t[3]}}),lib.tinl=lib.inl.extend({tagr:!0,rend:function(){return otag(this.tag,this.e)+wrap.call(this,this.rendK(),this.wrap)+ctag(this.tag)}}),lib.p=lib.blk.extend({rendK:function(){return this.supr().replace(/^\s+/gm,"")}}),lib.list=lib.blk.extend({wrap:[function(){return this.p instanceof lib.li?"\n":"\n\n"},""]}),lib.ul=lib.list.extend({}),lib.ol=lib.list.extend({}),lib.li=lib.cblk.extend({wrap:["\n",function(e){return this.c[0]&&this.c[0]instanceof lib.p||e.match(/\n{2}/gm)?"\n":""}],wrapK:[function(){return this.p.tag=="ul"?cfg.li_bullet+" ":this.i+1+".  "},""],rendK:function(){return this.supr().replace(/\n([^\n])/gm,"\n"+cfg.indnt_str+"$1")}}),lib.hr=lib.blk.extend({wrap:["\n\n",rep(cfg.hr_char,3)]}),lib.h=lib.blk.extend({}),lib.h_setext=lib.h.extend({}),cfg.h1_setext&&(lib.h1=lib.h_setext.extend({wrapK:["",function(e){return"\n"+rep("=",e.length)}]})),cfg.h2_setext&&(lib.h2=lib.h_setext.extend({wrapK:["",function(e){return"\n"+rep("-",e.length)}]})),lib.h_atx=lib.h.extend({wrapK:[function(e){return rep("#",this.tag[1])+" "},function(e){return cfg.h_atx_suf?" "+rep("#",this.tag[1]):""}]}),!cfg.h1_setext&&(lib.h1=lib.h_atx.extend({})),!cfg.h2_setext&&(lib.h2=lib.h_atx.extend({})),lib.h3=lib.h_atx.extend({}),lib.h4=lib.h_atx.extend({}),lib.h5=lib.h_atx.extend({}),lib.h6=lib.h_atx.extend({}),lib.a=lib.inl.extend({lnkid:null,rend:function(){var e=this.rendK(),t=this.e.getAttribute("href"),n=this.e.title?' "'+this.e.title+'"':"";return!this.e.hasAttribute("href")||t==e||t[0]=="#"&&!cfg.hash_lnks?e:cfg.link_list?"["+e+"] ["+(this.lnkid+1)+"]":"["+e+"]("+t+n+")"}}),lib.img=lib.inl.extend({lnkid:null,rend:function(){var e=this.e.alt,t=this.e.getAttribute("src");if(cfg.link_list)return"!["+e+"] ["+(this.lnkid+1)+"]";var n=this.e.title?' "'+this.e.title+'"':"";return"!["+e+"]("+t+n+")"}}),lib.em=lib.inl.extend({wrap:cfg.emph_char}),lib.del=cfg.gfm_del?lib.inl.extend({wrap:"~~"}):lib.tinl.extend(),lib.br=lib.inl.extend({wrap:["",function(){var e=cfg.br_only?"<br>":"  ";return this.p instanceof lib.h?"<br>":e+"\n"}]}),lib.strong=lib.inl.extend({wrap:rep(cfg.bold_char,2)}),lib.blockquote=lib.blk.extend({lnPfx:"> ",rend:function(){return this.supr().replace(/>[ \t]$/gm,">")}}),lib.pre=lib.blk.extend({tagr:!0,wrapK:"\n",lnInd:0}),lib.code=lib.blk.extend({tagr:!1,wrap:"",wrapK:function(e){return e.indexOf("`")!==-1?"``":"`"},lnInd:0,init:function(e,t,n){this.supr(e,t,n);if(this.p instanceof lib.pre){this.p.tagr=!1;if(cfg.gfm_code){var r=this.e.getAttribute("class");r=(r||"").split(" ")[0],r.indexOf("lang-")===0&&(r=r.substr(5)),this.wrapK=[cfg.gfm_code+r+"\n","\n"+cfg.gfm_code]}else this.wrapK="",this.p.lnInd=4}},rendK:function(){if(this.p instanceof lib.pre){var e=this.e[textContProp];return cfg.trim_code?e.trim():e}return this.supr()}}),lib.table=cfg.gfm_tbls?lib.blk.extend({cols:[],init:function(e,t,n){this.supr(e,t,n),this.cols=[]},rend:function(){for(var e=0;e<this.c.length;e++)for(var t=0;t<this.c[e].c.length;t++)for(var n=0;n<this.c[e].c[t].c.length;n++)this.c[e].c[t].c[n].prep();return this.supr()}}):lib.tblk.extend(),lib.thead=cfg.gfm_tbls?lib.cblk.extend({wrap:["\n",function(e){var t="";for(var n=0;n<this.p.cols.length;n++){var r=this.p.cols[n],i=r.a[0]=="c"?":":" ",s=r.a[0]=="r"||r.a[0]=="c"?":":" ";t+=(n==0&&cfg.tbl_edges?"|":"")+i+rep("-",r.w)+s+(n<this.p.cols.length-1||cfg.tbl_edges?"|":"")}return"\n"+trim12(t)}]}):lib.ctblk.extend(),lib.tbody=cfg.gfm_tbls?lib.cblk.extend():lib.ctblk.extend(),lib.tfoot=cfg.gfm_tbls?lib.cblk.extend():lib.ctblk.extend(),lib.tr=cfg.gfm_tbls?lib.cblk.extend({wrapK:[cfg.tbl_edges?"| ":"",cfg.tbl_edges?" |":""]}):lib.ctblk.extend(),lib.th=cfg.gfm_tbls?lib.inl.extend({guts:null,wrap:[function(){var e=this.p.p.p.cols[this.i],t=this.i==0?"":" ",n,r=e.w-this.guts.length;switch(e.a[0]){case"r":n=rep(" ",r);break;case"c":n=rep(" ",Math.floor(r/2));break;default:n=""}return t+n},function(){var e=this.p.p.p.cols[this.i],t=this.i==this.p.c.length-1?"":" |",n,r=e.w-this.guts.length;switch(e.a[0]){case"r":n="";break;case"c":n=rep(" ",Math.ceil(r/2));break;default:n=rep(" ",r)}return n+t}],prep:function(){this.guts=this.rendK(),this.rendK=function(){return this.guts};var e=this.p.p.p.cols;e[this.i]||(e[this.i]={w:null,a:""});var t=e[this.i];t.w=Math.max(t.w||0,this.guts.length);var n=this.e.align||this.e.style.textAlign;n&&(t.a=n)}}):lib.ctblk.extend(),lib.td=lib.th.extend(),lib.txt=lib.inl.extend({initK:function(){this.c=this.e[textContProp].split(/^/gm)},rendK:function(){var e=this.c.join("").replace(/\r/gm,"");return this.p instanceof lib.code||this.p instanceof lib.pre||(e=e.replace(/^\s*([#*])/gm,function(e,t){return e.replace(t,"\\"+t)})),this.i==0&&(e=e.replace(/^\n+/,"")),this.i==this.p.c.length-1&&(e=e.replace(/\n+$/,"")),e.replace(/\u00a0/gm,cfg.nbsp_spc?" ":"&nbsp;")}}),lib.rawhtml=lib.blk.extend({initK:function(){this.guts=outerHTML(this.e)},rendK:function(){return this.guts}});for(var i in cfg.unsup_tags)cfg.unsup_tags[i]=new RegExp("^(?:"+(i=="inline"?"a|em|strong|img|code|del|":"")+cfg.unsup_tags[i].replace(/\s/g,"|")+")$")},!function(e,t,n){typeof define=="function"?define(n):typeof module!="undefined"?module.exports=n():t[e]=n()}("klass",this,function(){function e(e){return i.call(t(e)?e:function(){},e,1)}function t(e){return typeof e===o}function n(e,t,n){return function(){var r=this.supr;this.supr=n[a][e];var i={}.fabricatedUndefined,s=i;try{s=t.apply(this,arguments)}finally{this.supr=r}return s}}function r(e,r,i){for(var s in r)r.hasOwnProperty(s)&&(e[s]=t(r[s])&&t(i[a][s])&&u.test(r[s])?n(s,r[s],i):r[s])}function i(e,n){function i(){}function s(){this.init?this.init.apply(this,arguments):(n||f&&o.apply(this,arguments),l.apply(this,arguments))}i[a]=this[a];var o=this,u=new i,f=t(e),l=f?e:this,c=f?{}:e;return s.methods=function(e){return r(u,e,o),s[a]=u,this},s.methods.call(s,c).prototype.constructor=s,s.extend=arguments.callee,s[a].implement=s.statics=function(e,t){return e=typeof e=="string"?function(){var n={};return n[e]=t,n}():e,r(this,e,o),this},s}var s=this,o="function",u=/xyz/.test(function(){xyz})?/\bsupr\b/:/.*/,a="prototype";return e});

/* diff_match_patch 20121119 */
(function(){function e(){this.Diff_Timeout=1,this.Diff_EditCost=4,this.Match_Threshold=.5,this.Match_Distance=1e3,this.Patch_DeleteThreshold=.5,this.Patch_Margin=4,this.Match_MaxBits=32}e.prototype.diff_main=function(e,t,n,r){"undefined"==typeof r&&(r=0>=this.Diff_Timeout?Number.MAX_VALUE:(new Date).getTime()+1e3*this.Diff_Timeout);if(null==e||null==t)throw Error("Null input. (diff_main)");if(e==t)return e?[[0,e]]:[];"undefined"==typeof n&&(n=!0);var i=n,s=this.diff_commonPrefix(e,t);n=e.substring(0,s),e=e.substring(s),t=t.substring(s);var s=this.diff_commonSuffix(e,t),o=e.substring(e.length-s);return e=e.substring(0,e.length-s),t=t.substring(0,t.length-s),e=this.diff_compute_(e,t,i,r),n&&e.unshift([0,n]),o&&e.push([0,o]),this.diff_cleanupMerge(e),e},e.prototype.diff_compute_=function(e,t,n,r){if(!e)return[[1,t]];if(!t)return[[-1,e]];var i=e.length>t.length?e:t,s=e.length>t.length?t:e,o=i.indexOf(s);return-1!=o?(n=[[1,i.substring(0,o)],[0,s],[1,i.substring(o+s.length)]],e.length>t.length&&(n[0][0]=n[2][0]=-1),n):1==s.length?[[-1,e],[1,t]]:(i=this.diff_halfMatch_(e,t))?(s=i[0],e=i[1],o=i[2],t=i[3],i=i[4],s=this.diff_main(s,o,n,r),n=this.diff_main(e,t,n,r),s.concat([[0,i]],n)):n&&100<e.length&&100<t.length?this.diff_lineMode_(e,t,r):this.diff_bisect_(e,t,r)},e.prototype.diff_lineMode_=function(e,t,n){var r=this.diff_linesToChars_(e,t);e=r.chars1,t=r.chars2,r=r.lineArray,e=this.diff_main(e,t,!1,n),this.diff_charsToLines_(e,r),this.diff_cleanupSemantic(e),e.push([0,""]);for(var i=r=t=0,s="",o="";t<e.length;){switch(e[t][0]){case 1:i++,o+=e[t][1];break;case-1:r++,s+=e[t][1];break;case 0:if(1<=r&&1<=i){e.splice(t-r-i,r+i),t=t-r-i,r=this.diff_main(s,o,!1,n);for(i=r.length-1;0<=i;i--)e.splice(t,0,r[i]);t+=r.length}r=i=0,o=s=""}t++}return e.pop(),e},e.prototype.diff_bisect_=function(e,t,n){for(var r=e.length,i=t.length,s=Math.ceil((r+i)/2),o=s,u=2*s,a=Array(u),f=Array(u),l=0;l<u;l++)a[l]=-1,f[l]=-1;a[o+1]=0,f[o+1]=0;for(var l=r-i,c=0!=l%2,h=0,p=0,d=0,v=0,m=0;m<s&&!((new Date).getTime()>n);m++){for(var g=-m+h;g<=m-p;g+=2){var y=o+g,b;b=g==-m||g!=m&&a[y-1]<a[y+1]?a[y+1]:a[y-1]+1;for(var w=b-g;b<r&&w<i&&e.charAt(b)==t.charAt(w);)b++,w++;a[y]=b;if(b>r)p+=2;else if(w>i)h+=2;else if(c&&(y=o+l-g,0<=y&&y<u&&-1!=f[y])){var E=r-f[y];if(b>=E)return this.diff_bisectSplit_(e,t,b,w,n)}}for(g=-m+d;g<=m-v;g+=2){y=o+g,E=g==-m||g!=m&&f[y-1]<f[y+1]?f[y+1]:f[y-1]+1;for(b=E-g;E<r&&b<i&&e.charAt(r-E-1)==t.charAt(i-b-1);)E++,b++;f[y]=E;if(E>r)v+=2;else if(b>i)d+=2;else if(!c&&(y=o+l-g,0<=y&&y<u&&-1!=a[y]&&(b=a[y],w=o+b-y,E=r-E,b>=E)))return this.diff_bisectSplit_(e,t,b,w,n)}}return[[-1,e],[1,t]]},e.prototype.diff_bisectSplit_=function(e,t,n,r,i){var s=e.substring(0,n),o=t.substring(0,r);return e=e.substring(n),t=t.substring(r),s=this.diff_main(s,o,!1,i),i=this.diff_main(e,t,!1,i),s.concat(i)},e.prototype.diff_linesToChars_=function(e,t){function n(e){for(var t="",n=0,s=-1,o=r.length;s<e.length-1;){s=e.indexOf("\n",n),-1==s&&(s=e.length-1);var u=e.substring(n,s+1),n=s+1;(i.hasOwnProperty?i.hasOwnProperty(u):void 0!==i[u])?t+=String.fromCharCode(i[u]):(t+=String.fromCharCode(o),i[u]=o,r[o++]=u)}return t}var r=[],i={};r[0]="";var s=n(e),o=n(t);return{chars1:s,chars2:o,lineArray:r}},e.prototype.diff_charsToLines_=function(e,t){for(var n=0;n<e.length;n++){for(var r=e[n][1],i=[],s=0;s<r.length;s++)i[s]=t[r.charCodeAt(s)];e[n][1]=i.join("")}},e.prototype.diff_commonPrefix=function(e,t){if(!e||!t||e.charAt(0)!=t.charAt(0))return 0;for(var n=0,r=Math.min(e.length,t.length),i=r,s=0;n<i;)e.substring(s,i)==t.substring(s,i)?s=n=i:r=i,i=Math.floor((r-n)/2+n);return i},e.prototype.diff_commonSuffix=function(e,t){if(!e||!t||e.charAt(e.length-1)!=t.charAt(t.length-1))return 0;for(var n=0,r=Math.min(e.length,t.length),i=r,s=0;n<i;)e.substring(e.length-i,e.length-s)==t.substring(t.length-i,t.length-s)?s=n=i:r=i,i=Math.floor((r-n)/2+n);return i},e.prototype.diff_commonOverlap_=function(e,t){var n=e.length,r=t.length;if(0==n||0==r)return 0;n>r?e=e.substring(n-r):n<r&&(t=t.substring(0,n)),n=Math.min(n,r);if(e==t)return n;for(var r=0,i=1;;){var s=e.substring(n-i),s=t.indexOf(s);if(-1==s)return r;i+=s;if(0==s||e.substring(n-i)==t.substring(0,i))r=i,i++}},e.prototype.diff_halfMatch_=function(e,t){function n(e,t,n){for(var r=e.substring(n,n+Math.floor(e.length/4)),i=-1,o="",u,a,l,c;-1!=(i=t.indexOf(r,i+1));){var h=s.diff_commonPrefix(e.substring(n),t.substring(i)),p=s.diff_commonSuffix(e.substring(0,n),t.substring(0,i));o.length<p+h&&(o=t.substring(i-p,i)+t.substring(i,i+h),u=e.substring(0,n-p),a=e.substring(n+h),l=t.substring(0,i-p),c=t.substring(i+h))}return 2*o.length>=e.length?[u,a,l,c,o]:null}if(0>=this.Diff_Timeout)return null;var r=e.length>t.length?e:t,i=e.length>t.length?t:e;if(4>r.length||2*i.length<r.length)return null;var s=this,o=n(r,i,Math.ceil(r.length/4)),r=n(r,i,Math.ceil(r.length/2)),u;if(!o&&!r)return null;u=r?o?o[4].length>r[4].length?o:r:r:o;var a;return e.length>t.length?(o=u[0],r=u[1],i=u[2],a=u[3]):(i=u[0],a=u[1],o=u[2],r=u[3]),u=u[4],[o,r,i,a,u]},e.prototype.diff_cleanupSemantic=function(e){for(var t=!1,n=[],r=0,i=null,s=0,o=0,u=0,a=0,f=0;s<e.length;)0==e[s][0]?(n[r++]=s,o=a,u=f,f=a=0,i=e[s][1]):(1==e[s][0]?a+=e[s][1].length:f+=e[s][1].length,i&&i.length<=Math.max(o,u)&&i.length<=Math.max(a,f)&&(e.splice(n[r-1],0,[-1,i]),e[n[r-1]+1][0]=1,r--,r--,s=0<r?n[r-1]:-1,f=a=u=o=0,i=null,t=!0)),s++;t&&this.diff_cleanupMerge(e),this.diff_cleanupSemanticLossless(e);for(s=1;s<e.length;){if(-1==e[s-1][0]&&1==e[s][0]){t=e[s-1][1],n=e[s][1],r=this.diff_commonOverlap_(t,n),i=this.diff_commonOverlap_(n,t);if(r>=i){if(r>=t.length/2||r>=n.length/2)e.splice(s,0,[0,n.substring(0,r)]),e[s-1][1]=t.substring(0,t.length-r),e[s+1][1]=n.substring(r),s++}else if(i>=t.length/2||i>=n.length/2)e.splice(s,0,[0,t.substring(0,i)]),e[s-1][0]=1,e[s-1][1]=n.substring(0,n.length-i),e[s+1][0]=-1,e[s+1][1]=t.substring(i),s++;s++}s++}},e.prototype.diff_cleanupSemanticLossless=function(t){function n(t,n){if(!t||!n)return 6;var r=t.charAt(t.length-1),i=n.charAt(0),s=r.match(e.nonAlphaNumericRegex_),o=i.match(e.nonAlphaNumericRegex_),u=s&&r.match(e.whitespaceRegex_),a=o&&i.match(e.whitespaceRegex_),r=u&&r.match(e.linebreakRegex_),i=a&&i.match(e.linebreakRegex_),f=r&&t.match(e.blanklineEndRegex_),l=i&&n.match(e.blanklineStartRegex_);return f||l?5:r||i?4:s&&!u&&a?3:u||a?2:s||o?1:0}for(var r=1;r<t.length-1;){if(0==t[r-1][0]&&0==t[r+1][0]){var i=t[r-1][1],s=t[r][1],o=t[r+1][1],u=this.diff_commonSuffix(i,s);if(u)var a=s.substring(s.length-u),i=i.substring(0,i.length-u),s=a+s.substring(0,s.length-u),o=a+o;for(var u=i,a=s,f=o,l=n(i,s)+n(s,o);s.charAt(0)===o.charAt(0);){var i=i+s.charAt(0),s=s.substring(1)+o.charAt(0),o=o.substring(1),c=n(i,s)+n(s,o);c>=l&&(l=c,u=i,a=s,f=o)}t[r-1][1]!=u&&(u?t[r-1][1]=u:(t.splice(r-1,1),r--),t[r][1]=a,f?t[r+1][1]=f:(t.splice(r+1,1),r--))}r++}},e.nonAlphaNumericRegex_=/[^a-zA-Z0-9]/,e.whitespaceRegex_=/\s/,e.linebreakRegex_=/[\r\n]/,e.blanklineEndRegex_=/\n\r?\n$/,e.blanklineStartRegex_=/^\r?\n\r?\n/,e.prototype.diff_cleanupEfficiency=function(e){for(var t=!1,n=[],r=0,i=null,s=0,o=!1,u=!1,a=!1,f=!1;s<e.length;){if(0==e[s][0])e[s][1].length<this.Diff_EditCost&&(a||f)?(n[r++]=s,o=a,u=f,i=e[s][1]):(r=0,i=null),a=f=!1;else if(-1==e[s][0]?f=!0:a=!0,i&&(o&&u&&a&&f||i.length<this.Diff_EditCost/2&&3==o+u+a+f))e.splice(n[r-1],0,[-1,i]),e[n[r-1]+1][0]=1,r--,i=null,o&&u?(a=f=!0,r=0):(r--,s=0<r?n[r-1]:-1,a=f=!1),t=!0;s++}t&&this.diff_cleanupMerge(e)},e.prototype.diff_cleanupMerge=function(e){e.push([0,""]);for(var t=0,n=0,r=0,i="",s="",o;t<e.length;)switch(e[t][0]){case 1:r++,s+=e[t][1],t++;break;case-1:n++,i+=e[t][1],t++;break;case 0:1<n+r?(0!==n&&0!==r&&(o=this.diff_commonPrefix(s,i),0!==o&&(0<t-n-r&&0==e[t-n-r-1][0]?e[t-n-r-1][1]+=s.substring(0,o):(e.splice(0,0,[0,s.substring(0,o)]),t++),s=s.substring(o),i=i.substring(o)),o=this.diff_commonSuffix(s,i),0!==o&&(e[t][1]=s.substring(s.length-o)+e[t][1],s=s.substring(0,s.length-o),i=i.substring(0,i.length-o))),0===n?e.splice(t-r,n+r,[1,s]):0===r?e.splice(t-n,n+r,[-1,i]):e.splice(t-n-r,n+r,[-1,i],[1,s]),t=t-n-r+(n?1:0)+(r?1:0)+1):0!==t&&0==e[t-1][0]?(e[t-1][1]+=e[t][1],e.splice(t,1)):t++,n=r=0,s=i=""}""===e[e.length-1][1]&&e.pop(),n=!1;for(t=1;t<e.length-1;)0==e[t-1][0]&&0==e[t+1][0]&&(e[t][1].substring(e[t][1].length-e[t-1][1].length)==e[t-1][1]?(e[t][1]=e[t-1][1]+e[t][1].substring(0,e[t][1].length-e[t-1][1].length),e[t+1][1]=e[t-1][1]+e[t+1][1],e.splice(t-1,1),n=!0):e[t][1].substring(0,e[t+1][1].length)==e[t+1][1]&&(e[t-1][1]+=e[t+1][1],e[t][1]=e[t][1].substring(e[t+1][1].length)+e[t+1][1],e.splice(t+1,1),n=!0)),t++;n&&this.diff_cleanupMerge(e)},e.prototype.diff_xIndex=function(e,t){var n=0,r=0,i=0,s=0,o;for(o=0;o<e.length;o++){1!==e[o][0]&&(n+=e[o][1].length),-1!==e[o][0]&&(r+=e[o][1].length);if(n>t)break;i=n,s=r}return e.length!=o&&-1===e[o][0]?s:s+(t-i)},e.prototype.diff_prettyHtml=function(e){for(var t=[],n=/&/g,r=/</g,i=/>/g,s=/\n/g,o=0;o<e.length;o++){var u=e[o][0],a=e[o][1],a=a.replace(n,"&amp;").replace(r,"&lt;").replace(i,"&gt;").replace(s,"&para;<br>");switch(u){case 1:t[o]='<ins style="background:#e6ffe6;">'+a+"</ins>";break;case-1:t[o]='<del style="background:#ffe6e6;">'+a+"</del>";break;case 0:t[o]="<span>"+a+"</span>"}}return t.join("")},e.prototype.diff_text1=function(e){for(var t=[],n=0;n<e.length;n++)1!==e[n][0]&&(t[n]=e[n][1]);return t.join("")},e.prototype.diff_text2=function(e){for(var t=[],n=0;n<e.length;n++)-1!==e[n][0]&&(t[n]=e[n][1]);return t.join("")},e.prototype.diff_levenshtein=function(e){for(var t=0,n=0,r=0,i=0;i<e.length;i++){var s=e[i][0],o=e[i][1];switch(s){case 1:n+=o.length;break;case-1:r+=o.length;break;case 0:t+=Math.max(n,r),r=n=0}}return t+=Math.max(n,r)},e.prototype.diff_toDelta=function(e){for(var t=[],n=0;n<e.length;n++)switch(e[n][0]){case 1:t[n]="+"+encodeURI(e[n][1]);break;case-1:t[n]="-"+e[n][1].length;break;case 0:t[n]="="+e[n][1].length}return t.join("	").replace(/%20/g," ")},e.prototype.diff_fromDelta=function(e,t){for(var n=[],r=0,i=0,s=t.split(/\t/g),o=0;o<s.length;o++){var u=s[o].substring(1);switch(s[o].charAt(0)){case"+":try{n[r++]=[1,decodeURI(u)]}catch(a){throw Error("Illegal escape in diff_fromDelta: "+u)}break;case"-":case"=":var f=parseInt(u,10);if(isNaN(f)||0>f)throw Error("Invalid number in diff_fromDelta: "+u);u=e.substring(i,i+=f),"="==s[o].charAt(0)?n[r++]=[0,u]:n[r++]=[-1,u];break;default:if(s[o])throw Error("Invalid diff operation in diff_fromDelta: "+s[o])}}if(i!=e.length)throw Error("Delta length ("+i+") does not equal source text length ("+e.length+").");return n},e.prototype.match_main=function(e,t,n){if(null==e||null==t||null==n)throw Error("Null input. (match_main)");return n=Math.max(0,Math.min(n,e.length)),e==t?0:e.length?e.substring(n,n+t.length)==t?n:this.match_bitap_(e,t,n):-1},e.prototype.match_bitap_=function(e,t,n){function r(e,r){var i=e/t.length,o=Math.abs(n-r);return s.Match_Distance?i+o/s.Match_Distance:o?1:i}if(t.length>this.Match_MaxBits)throw Error("Pattern too long for this browser.");var i=this.match_alphabet_(t),s=this,o=this.Match_Threshold,u=e.indexOf(t,n);-1!=u&&(o=Math.min(r(0,u),o),u=e.lastIndexOf(t,n+t.length),-1!=u&&(o=Math.min(r(0,u),o)));for(var a=1<<t.length-1,u=-1,f,l,c=t.length+e.length,h,p=0;p<t.length;p++){f=0;for(l=c;f<l;)r(p,n+l)<=o?f=l:c=l,l=Math.floor((c-f)/2+f);c=l,f=Math.max(1,n-l+1);var d=Math.min(n+l,e.length)+t.length;l=Array(d+2);for(l[d+1]=(1<<p)-1;d>=f;d--){var v=i[e.charAt(d-1)];l[d]=0===p?(l[d+1]<<1|1)&v:(l[d+1]<<1|1)&v|((h[d+1]|h[d])<<1|1)|h[d+1];if(l[d]&a&&(v=r(p,d-1),v<=o)){if(o=v,u=d-1,!(u>n))break;f=Math.max(1,2*n-u)}}if(r(p+1,n)>o)break;h=l}return u},e.prototype.match_alphabet_=function(e){for(var t={},n=0;n<e.length;n++)t[e.charAt(n)]=0;for(n=0;n<e.length;n++)t[e.charAt(n)]|=1<<e.length-n-1;return t},e.prototype.patch_addContext_=function(e,t){if(0!=t.length){for(var n=t.substring(e.start2,e.start2+e.length1),r=0;t.indexOf(n)!=t.lastIndexOf(n)&&n.length<this.Match_MaxBits-this.Patch_Margin-this.Patch_Margin;)r+=this.Patch_Margin,n=t.substring(e.start2-r,e.start2+e.length1+r);r+=this.Patch_Margin,(n=t.substring(e.start2-r,e.start2))&&e.diffs.unshift([0,n]),(r=t.substring(e.start2+e.length1,e.start2+e.length1+r))&&e.diffs.push([0,r]),e.start1-=n.length,e.start2-=n.length,e.length1+=n.length+r.length,e.length2+=n.length+r.length}},e.prototype.patch_make=function(t,n,r){var i;if("string"==typeof t&&"string"==typeof n&&"undefined"==typeof r)i=t,n=this.diff_main(i,n,!0),2<n.length&&(this.diff_cleanupSemantic(n),this.diff_cleanupEfficiency(n));else if(t&&"object"==typeof t&&"undefined"==typeof n&&"undefined"==typeof r)n=t,i=this.diff_text1(n);else if("string"==typeof t&&n&&"object"==typeof n&&"undefined"==typeof r)i=t;else{if("string"!=typeof t||"string"!=typeof n||!r||"object"!=typeof r)throw Error("Unknown call format to patch_make.");i=t,n=r}if(0===n.length)return[];r=[],t=new e.patch_obj;for(var s=0,o=0,u=0,a=i,f=0;f<n.length;f++){var l=n[f][0],c=n[f][1];!s&&0!==l&&(t.start1=o,t.start2=u);switch(l){case 1:t.diffs[s++]=n[f],t.length2+=c.length,i=i.substring(0,u)+c+i.substring(u);break;case-1:t.length1+=c.length,t.diffs[s++]=n[f],i=i.substring(0,u)+i.substring(u+c.length);break;case 0:c.length<=2*this.Patch_Margin&&s&&n.length!=f+1?(t.diffs[s++]=n[f],t.length1+=c.length,t.length2+=c.length):c.length>=2*this.Patch_Margin&&s&&(this.patch_addContext_(t,a),r.push(t),t=new e.patch_obj,s=0,a=i,o=u)}1!==l&&(o+=c.length),-1!==l&&(u+=c.length)}return s&&(this.patch_addContext_(t,a),r.push(t)),r},e.prototype.patch_deepCopy=function(t){for(var n=[],r=0;r<t.length;r++){var i=t[r],s=new e.patch_obj;s.diffs=[];for(var o=0;o<i.diffs.length;o++)s.diffs[o]=i.diffs[o].slice();s.start1=i.start1,s.start2=i.start2,s.length1=i.length1,s.length2=i.length2,n[r]=s}return n},e.prototype.patch_apply=function(e,t){if(0==e.length)return[t,[]];e=this.patch_deepCopy(e);var n=this.patch_addPadding(e);t=n+t+n,this.patch_splitMax(e);for(var r=0,i=[],s=0;s<e.length;s++){var o=e[s].start2+r,u=this.diff_text1(e[s].diffs),a,f=-1;if(u.length>this.Match_MaxBits){if(a=this.match_main(t,u.substring(0,this.Match_MaxBits),o),-1!=a&&(f=this.match_main(t,u.substring(u.length-this.Match_MaxBits),o+u.length-this.Match_MaxBits),-1==f||a>=f))a=-1}else a=this.match_main(t,u,o);if(-1==a)i[s]=!1,r-=e[s].length2-e[s].length1;else if(i[s]=!0,r=a-o,o=-1==f?t.substring(a,a+u.length):t.substring(a,f+this.Match_MaxBits),u==o)t=t.substring(0,a)+this.diff_text2(e[s].diffs)+t.substring(a+u.length);else if(o=this.diff_main(u,o,!1),u.length>this.Match_MaxBits&&this.diff_levenshtein(o)/u.length>this.Patch_DeleteThreshold)i[s]=!1;else{this.diff_cleanupSemanticLossless(o);for(var u=0,l,f=0;f<e[s].diffs.length;f++){var c=e[s].diffs[f];0!==c[0]&&(l=this.diff_xIndex(o,u)),1===c[0]?t=t.substring(0,a+l)+c[1]+t.substring(a+l):-1===c[0]&&(t=t.substring(0,a+l)+t.substring(a+this.diff_xIndex(o,u+c[1].length))),-1!==c[0]&&(u+=c[1].length)}}}return t=t.substring(n.length,t.length-n.length),[t,i]},e.prototype.patch_addPadding=function(e){for(var t=this.Patch_Margin,n="",r=1;r<=t;r++)n+=String.fromCharCode(r);for(r=0;r<e.length;r++)e[r].start1+=t,e[r].start2+=t;var r=e[0],i=r.diffs;if(0==i.length||0!=i[0][0])i.unshift([0,n]),r.start1-=t,r.start2-=t,r.length1+=t,r.length2+=t;else if(t>i[0][1].length){var s=t-i[0][1].length;i[0][1]=n.substring(i[0][1].length)+i[0][1],r.start1-=s,r.start2-=s,r.length1+=s,r.length2+=s}return r=e[e.length-1],i=r.diffs,0==i.length||0!=i[i.length-1][0]?(i.push([0,n]),r.length1+=t,r.length2+=t):t>i[i.length-1][1].length&&(s=t-i[i.length-1][1].length,i[i.length-1][1]+=n.substring(0,s),r.length1+=s,r.length2+=s),n},e.prototype.patch_splitMax=function(t){for(var n=this.Match_MaxBits,r=0;r<t.length;r++)if(!(t[r].length1<=n)){var i=t[r];t.splice(r--,1);for(var s=i.start1,o=i.start2,u="";0!==i.diffs.length;){var a=new e.patch_obj,f=!0;a.start1=s-u.length,a.start2=o-u.length,""!==u&&(a.length1=a.length2=u.length,a.diffs.push([0,u]));for(;0!==i.diffs.length&&a.length1<n-this.Patch_Margin;){var u=i.diffs[0][0],l=i.diffs[0][1];1===u?(a.length2+=l.length,o+=l.length,a.diffs.push(i.diffs.shift()),f=!1):-1===u&&1==a.diffs.length&&0==a.diffs[0][0]&&l.length>2*n?(a.length1+=l.length,s+=l.length,f=!1,a.diffs.push([u,l]),i.diffs.shift()):(l=l.substring(0,n-a.length1-this.Patch_Margin),a.length1+=l.length,s+=l.length,0===u?(a.length2+=l.length,o+=l.length):f=!1,a.diffs.push([u,l]),l==i.diffs[0][1]?i.diffs.shift():i.diffs[0][1]=i.diffs[0][1].substring(l.length))}u=this.diff_text2(a.diffs),u=u.substring(u.length-this.Patch_Margin),l=this.diff_text1(i.diffs).substring(0,this.Patch_Margin),""!==l&&(a.length1+=l.length,a.length2+=l.length,0!==a.diffs.length&&0===a.diffs[a.diffs.length-1][0]?a.diffs[a.diffs.length-1][1]+=l:a.diffs.push([0,l])),f||t.splice(++r,0,a)}}},e.prototype.patch_toText=function(e){for(var t=[],n=0;n<e.length;n++)t[n]=e[n];return t.join("")},e.prototype.patch_fromText=function(t){var n=[];if(!t)return n;t=t.split("\n");for(var r=0,i=/^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;r<t.length;){var s=t[r].match(i);if(!s)throw Error("Invalid patch string: "+t[r]);var o=new e.patch_obj;n.push(o),o.start1=parseInt(s[1],10),""===s[2]?(o.start1--,o.length1=1):"0"==s[2]?o.length1=0:(o.start1--,o.length1=parseInt(s[2],10)),o.start2=parseInt(s[3],10),""===s[4]?(o.start2--,o.length2=1):"0"==s[4]?o.length2=0:(o.start2--,o.length2=parseInt(s[4],10));for(r++;r<t.length;){s=t[r].charAt(0);try{var u=decodeURI(t[r].substring(1))}catch(a){throw Error("Illegal escape in patch_fromText: "+u)}if("-"==s)o.diffs.push([-1,u]);else if("+"==s)o.diffs.push([1,u]);else if(" "==s)o.diffs.push([0,u]);else{if("@"==s)break;if(""!==s)throw Error('Invalid patch mode "'+s+'" in: '+u)}r++}}return n},e.patch_obj=function(){this.diffs=[],this.start2=this.start1=null,this.length2=this.length1=0},e.patch_obj.prototype.toString=function(){var e,t;e=0===this.length1?this.start1+",0":1==this.length1?this.start1+1:this.start1+1+","+this.length1,t=0===this.length2?this.start2+",0":1==this.length2?this.start2+1:this.start2+1+","+this.length2,e=["@@ -"+e+" +"+t+" @@\n"];var n;for(t=0;t<this.diffs.length;t++){switch(this.diffs[t][0]){case 1:n="+";break;case-1:n="-";break;case 0:n=" "}e[t+1]=n+encodeURI(this.diffs[t][1])+"\n"}return e.join("").replace(/%20/g," ")},this.diff_match_patch=e,this.DIFF_DELETE=-1,this.DIFF_INSERT=1,this.DIFF_EQUAL=0})();


(function(){var e=/\blang(?:uage)?-(?!\*)(\w+)\b/i,t=self.Prism={util:{type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},clone:function(e){var n=t.util.type(e);switch(n){case"Object":var r={};for(var i in e)e.hasOwnProperty(i)&&(r[i]=t.util.clone(e[i]));return r;case"Array":return e.slice()}return e}},languages:{extend:function(e,n){var r=t.util.clone(t.languages[e]);for(var i in n)r[i]=n[i];return r},insertBefore:function(e,n,r,i){i=i||t.languages;var s=i[e],o={};for(var u in s)if(s.hasOwnProperty(u)){if(u==n)for(var a in r)r.hasOwnProperty(a)&&(o[a]=r[a]);o[u]=s[u]}return i[e]=o},DFS:function(e,n){for(var r in e)n.call(e,r,e[r]),t.util.type(e)==="Object"&&t.languages.DFS(e[r],n)}},highlightAll:function(e,n){var r=document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code');for(var i=0,s;s=r[i++];)t.highlightElement(s,e===!0,n)},highlightElement:function(r,i,s){var o,u,a=r;while(a&&!e.test(a.className))a=a.parentNode;a&&(o=(a.className.match(e)||[,""])[1],u=t.languages[o]);if(!u)return;r.className=r.className.replace(e,"").replace(/\s+/g," ")+" language-"+o,a=r.parentNode,/pre/i.test(a.nodeName)&&(a.className=a.className.replace(e,"").replace(/\s+/g," ")+" language-"+o);var f=r.textContent;if(!f)return;f=f.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ");var l={element:r,language:o,grammar:u,code:f};t.hooks.run("before-highlight",l);if(i&&self.Worker){var c=new Worker(t.filename);c.onmessage=function(e){l.highlightedCode=n.stringify(JSON.parse(e.data),o),t.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,s&&s.call(l.element),t.hooks.run("after-highlight",l)},c.postMessage(JSON.stringify({language:l.language,code:l.code}))}else l.highlightedCode=t.highlight(l.code,l.grammar,l.language),t.hooks.run("before-insert",l),l.element.innerHTML=l.highlightedCode,s&&s.call(r),t.hooks.run("after-highlight",l)},highlight:function(e,r,i){return n.stringify(t.tokenize(e,r),i)},tokenize:function(e,n,r){var i=t.Token,s=[e],o=n.rest;if(o){for(var u in o)n[u]=o[u];delete n.rest}e:for(var u in n){if(!n.hasOwnProperty(u)||!n[u])continue;var a=n[u],f=a.inside,l=!!a.lookbehind,c=0;a=a.pattern||a;for(var h=0;h<s.length;h++){var p=s[h];if(s.length>e.length)break e;if(p instanceof i)continue;a.lastIndex=0;var d=a.exec(p);if(d){l&&(c=d[1].length);var v=d.index-1+c,d=d[0].slice(c),m=d.length,g=v+m,y=p.slice(0,v+1),b=p.slice(g+1),w=[h,1];y&&w.push(y);var E=new i(u,f?t.tokenize(d,f):d);w.push(E),b&&w.push(b),Array.prototype.splice.apply(s,w)}}}return s},hooks:{all:{},add:function(e,n){var r=t.hooks.all;r[e]=r[e]||[],r[e].push(n)},run:function(e,n){var r=t.hooks.all[e];if(!r||!r.length)return;for(var i=0,s;s=r[i++];)s(n)}}},n=t.Token=function(e,t){this.type=e,this.content=t};n.stringify=function(e,r,i){if(typeof e=="string")return e;if(Object.prototype.toString.call(e)=="[object Array]")return e.map(function(t){return n.stringify(t,r,e)}).join("");var s={type:e.type,content:n.stringify(e.content,r,i),tag:"span",classes:["token",e.type],attributes:{},language:r,parent:i};s.type=="comment"&&(s.attributes.spellcheck="true"),t.hooks.run("wrap",s);var o="";for(var u in s.attributes)o+=u+'="'+(s.attributes[u]||"")+'"';return"<"+s.tag+' class="'+s.classes.join(" ")+'" '+o+">"+s.content+"</"+s.tag+">"};if(!self.document){self.addEventListener("message",function(e){var n=JSON.parse(e.data),r=n.language,i=n.code;self.postMessage(JSON.stringify(t.tokenize(i,t.languages[r]))),self.close()},!1);return}var r=document.getElementsByTagName("script");r=r[r.length-1],r&&(t.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&document.addEventListener("DOMContentLoaded",t.highlightAll))})();
