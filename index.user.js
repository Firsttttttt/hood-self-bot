// ==UserScript==
// @name        Hood's selfbot
// @namespace   Hoodgail scripts
// @match       *://discord.com/*
// @website     https://github.com/hoodJS/hood-self-bot
// @grant       none
// @version     1.0
// @author      Hoodgail Benjamin
// @description a selfbot for discord to do cool stuff
// @icon        https://cdn.discordapp.com/attachments/713693326884339723/746382349880655892/image_2.png
// ==/UserScript==
!function(){"use strict";function t(t,e){this.options=e||{},this.reset(t)}var e=Array.prototype.slice,i=Object.prototype.toString;t.VERSION="0.0.8",t.LEFT=0,t.CENTER=1,t.RIGHT=2,t.factory=function(e,i){return new t(e,i)},t.align=function(e,i,r,n){return e===t.LEFT?t.alignLeft(i,r,n):e===t.RIGHT?t.alignRight(i,r,n):e===t.CENTER?t.alignCenter(i,r,n):t.alignAuto(i,r,n)},t.alignLeft=function(t,e,i){if(!e||0>e)return"";(void 0===t||null===t)&&(t=""),"undefined"==typeof i&&(i=" "),"string"!=typeof t&&(t=t.toString());var r=e+1-t.length;return 0>=r?t:t+Array(e+1-t.length).join(i)},t.alignCenter=function(e,i,r){if(!i||0>i)return"";(void 0===e||null===e)&&(e=""),"undefined"==typeof r&&(r=" "),"string"!=typeof e&&(e=e.toString());var n=e.length,o=Math.floor(i/2-n/2),s=Math.abs(n%2-i%2),i=e.length;return t.alignRight("",o,r)+e+t.alignLeft("",o+s,r)},t.alignRight=function(t,e,i){if(!e||0>e)return"";(void 0===t||null===t)&&(t=""),"undefined"==typeof i&&(i=" "),"string"!=typeof t&&(t=t.toString());var r=e+1-t.length;return 0>=r?t:Array(e+1-t.length).join(i)+t},t.alignAuto=function(e,r,n){(void 0===e||null===e)&&(e="");var o=i.call(e);if(n||(n=" "),r=+r,"[object String]"!==o&&(e=e.toString()),e.length<r)switch(o){case"[object Number]":return t.alignRight(e,r,n);default:return t.alignLeft(e,r,n)}return e},t.arrayFill=function(t,e){for(var i=new Array(t),r=0;r!==t;r++)i[r]=e;return i},t.prototype.reset=t.prototype.clear=function(e){return this.__name="",this.__nameAlign=t.CENTER,this.__rows=[],this.__maxCells=0,this.__aligns=[],this.__colMaxes=[],this.__spacing=1,this.__heading=null,this.__headingAlign=t.CENTER,this.setBorder(),"[object String]"===i.call(e)?this.__name=e:"[object Object]"===i.call(e)&&this.fromJSON(e),this},t.prototype.setBorder=function(t,e,i,r){return this.__border=!0,1===arguments.length&&(e=i=r=t),this.__edge=t||"|",this.__fill=e||"-",this.__top=i||".",this.__bottom=r||"'",this},t.prototype.removeBorder=function(){return this.__border=!1,this.__edge=" ",this.__fill=" ",this},t.prototype.setAlign=function(t,e){return this.__aligns[t]=e,this},t.prototype.setTitle=function(t){return this.__name=t,this},t.prototype.getTitle=function(){return this.__name},t.prototype.setTitleAlign=function(t){return this.__nameAlign=t,this},t.prototype.sort=function(t){return this.__rows.sort(t),this},t.prototype.sortColumn=function(t,e){return this.__rows.sort(function(i,r){return e(i[t],r[t])}),this},t.prototype.setHeading=function(t){return(arguments.length>1||"[object Array]"!==i.call(t))&&(t=e.call(arguments)),this.__heading=t,this},t.prototype.getHeading=function(){return this.__heading.slice()},t.prototype.setHeadingAlign=function(t){return this.__headingAlign=t,this},t.prototype.addRow=function(t){return(arguments.length>1||"[object Array]"!==i.call(t))&&(t=e.call(arguments)),this.__maxCells=Math.max(this.__maxCells,t.length),this.__rows.push(t),this},t.prototype.getRows=function(){return this.__rows.slice().map(function(t){return t.slice()})},t.prototype.addRowMatrix=function(t){for(var e=0;e<t.length;e++)this.addRow(t[e]);return this},t.prototype.addData=function(t,e,r){if("[object Array]"!==i.call(t))return this;for(var n=0,o=t.length;o>n;n++){var s=e(t[n]);r?this.addRowMatrix(s):this.addRow(s)}return this},t.prototype.clearRows=function(){return this.__rows=[],this.__maxCells=0,this.__colMaxes=[],this},t.prototype.setJustify=function(t){return 0===arguments.length&&(t=!0),this.__justify=!!t,this},t.prototype.toJSON=function(){return{title:this.getTitle(),heading:this.getHeading(),rows:this.getRows()}},t.prototype.parse=t.prototype.fromJSON=function(t){return this.clear().setTitle(t.title).setHeading(t.heading).addRowMatrix(t.rows)},t.prototype.render=t.prototype.valueOf=t.prototype.toString=function(){for(var e,i=this,r=[],n=this.__maxCells,o=t.arrayFill(n,0),s=3*n,h=this.__rows,a=this.__border,l=this.__heading?[this.__heading].concat(h):h,_=0;_<l.length;_++)for(var u=l[_],g=0;n>g;g++){var p=u[g];o[g]=Math.max(o[g],p?p.toString().length:0)}this.__colMaxes=o,e=this.__justify?Math.max.apply(null,o):0,o.forEach(function(t){s+=e?e:t+i.__spacing}),e&&(s+=o.length),s-=this.__spacing,a&&r.push(this._seperator(s-n+1,this.__top)),this.__name&&(r.push(this._renderTitle(s-n+1)),a&&r.push(this._seperator(s-n+1))),this.__heading&&(r.push(this._renderRow(this.__heading," ",this.__headingAlign)),r.push(this._rowSeperator(n,this.__fill)));for(var _=0;_<this.__rows.length;_++)r.push(this._renderRow(this.__rows[_]," "));a&&r.push(this._seperator(s-n+1,this.__bottom));var f=this.options.prefix||"";return f+r.join("\n"+f)},t.prototype._seperator=function(e,i){return i||(i=this.__edge),i+t.alignRight(i,e,this.__fill)},t.prototype._rowSeperator=function(){var e=t.arrayFill(this.__maxCells,this.__fill);return this._renderRow(e,this.__fill)},t.prototype._renderTitle=function(e){var i=" "+this.__name+" ",r=t.align(this.__nameAlign,i,e-1," ");return this.__edge+r+this.__edge},t.prototype._renderRow=function(e,i,r){for(var n=[""],o=this.__colMaxes,s=0;s<this.__maxCells;s++){var h=e[s],a=this.__justify?Math.max.apply(null,o):o[s],l=a,_=this.__aligns[s],u=r,g="alignAuto";"undefined"==typeof r&&(u=_),u===t.LEFT&&(g="alignLeft"),u===t.CENTER&&(g="alignCenter"),u===t.RIGHT&&(g="alignRight"),n.push(t[g](h,l,i))}var p=n.join(i+this.__edge+i);return p=p.substr(1,p.length),p+i+this.__edge},["Left","Right","Center"].forEach(function(i){var r=t[i.toUpperCase()];["setAlign","setTitleAlign","setHeadingAlign"].forEach(function(n){t.prototype[n+i]=function(){var t=e.call(arguments).concat(r);return this[n].apply(this,t)}})}),"undefined"!=typeof exports?module.exports=t:this.AsciiTable=t}.call(window);
(function (){
window.self_url = "http://hood-self-bot.herokuapp.com";
var pathname_includes = ["invite", "developers", "docs"];
for(var name of pathname_includes) if(location.pathname.includes(name)) return;

window.contex = new Map();
window.config = {
  Prefix:">",
  Commands: true,
  Version(){
    all.small(window.version)
  }
};

  
class Self {
  constructor(token) {
    this.token = token;
    this.v = "";
    this.tokens = [];
    this.xhr = new XMLHttpRequest();
  }
  get channel() {
    return location.pathname.split("/").pop();
  }
  send(channel, body = {}, c = function () {}) {
    this.send_binary(channel, JSON.stringify(body), c)
  }
  send_binary(channel, body = {}, c = function () {}){
    this.xhr.open("POST", "https://discord.com/api/v8/channels/" + channel + "/messages");
    this.xhr.setRequestHeader("content-type", "application/json");
    this.xhr.setRequestHeader("authorization", this.token);
    this.xhr.send(body);
    try {
      this.xhr.onloadend = (_) => c(JSON.parse(this.xhr.response?this.xhr.response:"null"));
    } catch (e) {
      console.log(this.xhr.response);
      console.error(e);
    }
  }
  edit(data) {
    if ((!data.channel_id || !data.id) &&(data.data.content || data.data.embed)) return;
    this.xhr.open("PATCH","https://discord.com/api/v8/channels/" +data.channel_id +"/messages/" + data.id );
    this.xhr.setRequestHeader("content-type", "application/json");
    this.xhr.setRequestHeader("authorization", this.token);
    this.xhr.send(JSON.stringify(data.data));
  }
  removeEmbed(data) {
    if ((!data.channel_id || !data.id)) return;
    this.xhr.open("PATCH","https://discord.com/api/v8/channels/" +data.channel_id +"/messages/" + data.id );
    this.xhr.setRequestHeader("content-type", "application/json");
    this.xhr.setRequestHeader("authorization", this.token);
    this.xhr.send(JSON.stringify({
      flags:4
    }));
  }
  delete(data) {
    if (!data.channel_id || !data.id) return;
    this.xhr.open("DELETE", "https://discord.com/api/v8/channels/" + data.channel_id + "/messages/" + data.id);
    this.xhr.setRequestHeader("content-type", "application/json");
    this.xhr.setRequestHeader("authorization", this.token);
    this.xhr.send(JSON.stringify(this.token));
  }
  react(data, emojie) {
    if (!data.channel_id || !data.id) return;
    this.xhr.open("PUT", "https://discord.com/api/v8/channels/" + data.channel_id + "/messages/" + data.id + "/reactions/" + encodeURIComponent(emojie) + "/" + encodeURIComponent("@me"));
    this.xhr.setRequestHeader("content-type", "application/json");
    this.xhr.setRequestHeader("authorization", this.token);
    this.xhr.send(JSON.stringify(this.token));
  }
  self(data, xhr) {
    if(!window.config.Commands) return;
    if (!data.content) return;
    if (data.content.length > 200) return;
    xhr.onloadend = (_) => {};
    let args = data.content.split(" ")
    if(args[0].split("")[0] !== config.Prefix) return;
    args[0] = args[0].match(new RegExp(`\\${config.Prefix}(.*)`))[1]
    if(!contex.has(args[0])) return;
    contex.get(args[0]).run(this, data, args)
    xhr.onloadend = (_) => this.delete(JSON.parse(xhr.response));
  }
  register(body) {
    this.xhr.open("POST", "https://discord.com/api/v8/auth/register");
    this.xhr.setRequestHeader("content-type", "application/json");
    this.xhr.send(JSON.stringify(body));
    this.xhr.onloadend = (_) => this.tokens.push(JSON.parse(this.xhr.response));
  }
  info(then){
    this.xhr.open("GET", "https://discord.com/api/v8/users/@me");
    this.xhr.setRequestHeader("content-type", "application/json");
    this.xhr.setRequestHeader("authorization", this.token);
    this.xhr.onloadend = (_) => then(this.xhr.response?JSON.parse(this.xhr.response):null);
    this.xhr.send()
  }
  dms(then){
    this.xhr.open("GET", "https://discord.com/api/v8/users/@me/channels");
    this.xhr.setRequestHeader("content-type", "application/json");
    this.xhr.setRequestHeader("authorization", this.token);
    this.xhr.onloadend = (_) => then(this.xhr.response?JSON.parse(this.xhr.response):null);
    this.xhr.send()
  }
  guilds(then){
    this.xhr.open("GET", "https://discord.com/api/v8/users/@me/guilds?with_counts=true");
    this.xhr.setRequestHeader("content-type", "application/json");
    this.xhr.setRequestHeader("authorization", this.token);
    this.xhr.onloadend = (_) => then(this.xhr.response?JSON.parse(this.xhr.response):null);
    this.xhr.send()
  }
  custom_status(emojie, text){
    this.xhr.open("PATCH", "https://discord.com/api/v8/users/@me/settings");
    this.xhr.setRequestHeader("content-type", "application/json");
    this.xhr.setRequestHeader("authorization", this.token);
    this.xhr.send(JSON.stringify({
      custom_status:{
        emoji_name:emojie,
        text:text
      }
    }));
  }
};
window._window = document.body.appendChild(document.createElement("iframe")).contentWindow;
window.storage = _window.localStorage
window.token = JSON.parse(storage.token||`""`);
window.id = atob(token.split(".")[0]);
window.css = ["HoodUI", "HoodAlert"];
window.js = ["others", "HoodUI", "HoodAlert"]
window.version = "1.1";

window.logBody = document.createElement("div")
window.logHide = document.createElement("button")
window.logClear = document.createElement("button")
window.logElement = document.createElement("div")
logHide.innerHTML = "hide"
logClear.innerHTML = "clear"
logHide.style.marginBottom = "10px"
logBody.append(logHide, logElement)
logHide.addEventListener("click", function () {
  this.dataHidden = !this.dataHidden;
  logElement.style.display = this.dataHidden ? "block" : "none"
})
logClear.addEventListener("click", function(){
  logElement.innerHTML = ""
})
window.log = function (text) {
  var el = document.createElement("div")
  el.innerHTML = text
  logElement.append(el)
};
logBody.className = "logBody"
document.body.append(logBody)
  
async function init_checker(){
  window.all = new HoodAlert()
  window.UI = new HoodUI("config");
  window.UI.setHeader("Hood's selfbot");
  window.UI.element = window.UI.render;
  document.body.append(window.UI.element);
  window.UI.dragElement(window.UI.element);
  window.UI.hideOnDBclick;
  
  // WHEN UI IS CHANGED
  UI.onChange = function(name){
    switch(name){
        case"Prefix":
         if(config[name].length > 1) window.all.small("Prefix can only have one character");
        break;
    }
  };
  
  // FETCH LATEST VERSION
  let vers = await fetch(window.self_url + "/version").then(r=>r.text())
  
  // CHECK IF THIS IS THE LATEST VERSION
  if(vers !== window.version) return setInterval(function(){
    return all.small("your selfbot is outdated")
  },6000)
  
  // CHECK IF THERE IS A TOKEN
  if(!token) return setInterval(function(){
     return all.small("enable to get token, please refresh")
  },6000)
  
  setInterval(function(){
    storage.token = JSON.stringify(token)
  })
  
  // CHECK IF IS A VALID TOKEN
  if(token.length !== 59 || token.split(".").length !== 3) return setInterval(function(){
    return all.small("invalid token type")
  },6000)
  
  // CHECK IS THERE IS A USER ID
  if(!id) return setInterval(function(){
    return all.small("enable to get user id")
  },6000)
  
  // INIT THE SELF BOT
  init()
}

async function init(){
  var classes = {}
  window.self_bot = new Self(token)
  var commands = await fetch(self_url + "/commands").then(r=>r.json())
  if(!commands) return setInterval(function(){
     return all.small("enable to get commands, please try and refresh")
  },60000) 
  commands.forEach(function(command, id){
    contex.set(command.file.split(".")[0], new (eval("("+command.data+")"))(self_bot))              
  })
  // HOOKING XMLHttpRequest
  var hook_send = _window.XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (data) {
    let json;
    try { json = JSON.parse(data) } catch (e) {}
    if (json) if (json.nonce && json.content) self_bot.self(json, this);
    console.log(json)
    return hook_send.apply(this, [data]);
  };
}

// FOR LOADING JAVASCRIPTS
function javascript(data, then){
  if(!Array.isArray(data)&&!typeof data !== "string"){
    throw `Type of "${typeof data}" is not defiend`;
  }
  var parent = document.head || document.body || document.getElementsByTagName('head')[0];
  data = [...data].map(function(url, id){
    var script = document.createElement("script")
    script.src = url
    script.setAttribute("data-id", id)
    return script
  })
  data.forEach(function(script, id){
    parent.append(script)
    script.onload = function(){
      if(id !== data.length-1||id < data.length-1) return;
      setTimeout(function(){
        then(data)
      },10)
    }
  })
}

// FOR LOADING STYLESHEETS
function stylesheet(data, then){
  if(!Array.isArray(data)&&!typeof data !== "string"){
    throw `Type of "${typeof data}" is not defiend`;
  }
  var parent = document.head || document.body || document.getElementsByTagName('head')[0];
  data = [...data].map(function(url, id){
    var link = document.createElement("link")
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';
    link.setAttribute("data-id", id)
    return link
  })
  data.forEach(function(link, id){
    parent.append(link)
    link.onload = function(){
      if(id !== data.length-1||id < data.length-1) return;
      then(data)
    }
  })
}

// LOADS THE SCIPTS AND THE STYELS
javascript(js.map(r=>self_url+"/libs/"+r), init_checker)
stylesheet(css.map(r=>self_url+"/css/"+r), _=>{})
})();
