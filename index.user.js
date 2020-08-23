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
// @require     http://localhost:2000/libs/others
// ==/UserScript==
window.pathname_includes = ["invite", "developers", "docs"];
for(var name of pathname_includes) if(location.pathname.includes(name)) return;


window.contex = new Map()
window.config = {
  commands:true
}

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
    this.xhr.open("POST", "https://discord.com/api/v8/channels/" + channel + "/messages");
    this.xhr.setRequestHeader("content-type", "application/json");
    this.xhr.setRequestHeader("authorization", this.token);
    this.xhr.send(JSON.stringify(body));
    try {
      this.xhr.onloadend = (_) => c(JSON.parse(this.xhr.response));
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
  self(data, xhr) {
    if(!config.commands) return;
    if (!data.content) return;
    if (data.content.length > 200) return;
    xhr.onloadend = (_) => {};
    let args = data.content.split(" ")
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
};
window._window = document.body.appendChild(document.createElement("iframe")).contentWindow;
window.storage = _window.localStorage
window.token = JSON.parse(storage.token||`""`);
window.id = atob(token.split(".")[0]);
window.css = ["HoodUI", "HoodAlert"],
window.js = ["HoodUI", "HoodAlert"]
window.version = "1.0";
window.self_url = "http://localhost:2000";

window.init_checker = (async function(){
  window.all = new HoodAlert()
  
  window.UI = new HoodUI("config");
  UI.setHeader("Hood's selfbot");
  UI.element = UI.render;
  document.body.append(UI.element);
  UI.dragElement(UI.element);
  UI.hideOnDBclick;
  
  // FETCH LATEST VERSION
  let vers = await fetch(self_url + "/version").then(r=>r.text())
  
  // CHECK IF THIS IS THE LATEST VERSION
  if(vers !== version) return setInterval(function(){
    return all.small("your selfbot is outdated")
  },60000)
  
  // CHECK IF THERE IS A TOKEN
  if(!token) return setInterval(function(){
     return all.small("enable to get token, please refresh")
  },60000)
  
  setInterval(function(){
    storage.token = JSON.stringify(token)
  })
  
  // CHECK IF IS A VALID TOKEN
  if(token.length !== 59 || token.split(".").length !== 3) return setInterval(function(){
    return all.small("invalid token type")
  },60000)
  
  // CHECK IS THERE IS A USER ID
  if(!id) return setInterval(function(){
    return all.small("enable to get user id")
  },60000)
  
  // INIT THE SELF BOT
  init()
})

async function init(){
  window.classes = {}
  window.self_bot = new Self(token)
  window.commands = await fetch(self_url + "/commands").then(r=>r.json())
  if(!commands) return setInterval(function(){
     return all.small("enable to get commands, please try and refresh")
  },60000) 
  commands.forEach(function(command, id){
    window.classes[command.file.split(".")[0]] = eval("("+command.data+")")
    contex.set(command.file.split(".")[0], new window.classes[command.file.split(".")[0]](self_bot))              
  })
  // HOOKING XMLHttpRequest
  window.hook_send = _window.XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.send = function (data) {
    let json;
    try { json = JSON.parse(data) } catch (e) {}
    if (json) if (json.nonce && json.content) self_bot.self(json, this);
    console.log(json)
    return hook_send.apply(this, [data]);
  };
}

javascript(js.map(r=>self_url+"/libs/"+r), init_checker)
stylesheet(css.map(r=>self_url+"/css/"+r), _=>{})
