const {ipcRenderer} = require('electron'),
	fs = require("fs"),
	util = require("util"),
	_ = require("lodash"),
	path = require('path'),
	_p = require("./common")

let _this = {
	stepName:"init",
	ready(win){
		console.log("preload injected!")
		_this.window = win
		_this.hackJSON(win["JSON"])
		_this.timer = setInterval(_this.check,100)
	},
	hackJSON(json){
		json.hack_parse = json.parse
		json.parse = function(a,b){
			// ipcRenderer.send("ebjJSONGet", {msg:a,type:_this.stepName})
			let ret = json.hack_parse.apply(json,arguments)

			if(ret.auth_info && _this.contentId) {
				console.log("token:",ret)
				ipcRenderer.send('tokenChange', {id: _this.contentId,token:ret.auth_info})
				// console.log(ret)
			} else if(ret.configuration) {
				console.log("configuration:",ret)
				_this.configuration = ret
			}
			return ret
		}
	},
	check(){
		if(_this.window["NFBR"] !== undefined){
			// console.log("got NFBR")
			if(_this.window.NFBR["a5n"] !== undefined){
				// console.log("44444444444444444444",_this.window.NFBR)
				// console.log("11111111111111", arguments)
				var p = _this.window.NFBR["a5n"].prototype['a5s']

				var func = function () {
					var args = arguments[2]
					var keys = arguments[0]
					var _d = p.apply(_this.window.NFBR["a5n"].prototype, arguments)
					_d.done(function() {
						console.log('got json')
						console.log(keys)
						console.log(args)
						if(!args.model.get('a2u')) {
							let timer = setInterval(function() {
								let a2u = args.model.get('a2u')
								if(a2u){
									clearInterval(timer)
									// console.log(a2u)
									// let pages = []
									// a2u.B3n.forEach((v) => {
									// 	if(v.right && v.right['url']) {
									// 		pages.push(v.right)
									// 	}
									// 	if(v.left && v.left['url']) {
									// 		pages.push(v.left)
									// 	}
									// })
									let surl = keys['url']
									console.log(surl)
									let contentId = args.model.get('contentId')
									let title = args.model.get('contentTitle')
									let token = args.model.get('queryParamForContentUrl')
									let B2L = keys['b9W']
									let b5u = keys['b8B']
									let b5w = keys['b8e']
									let b6q = keys['b8S']
									let b5G = keys['b4V']
									let B0Q = keys['b9K']
									let B0r = keys['b9l']
									let B0R = keys['b9L']
									_this.contentId = contentId
									let configuration = _this.configuration
									// let data = {
									//  	pages, token, url:surl, contentId, title, B2L, b5u, b5w, b6q
									// }
									// let B1v = 128
									// let B1Z = 1024
									// console.log(data)
									// _this.download({
									// 	pages, token, url:surl, contentId, title, B2L, b5u, b5w, b6q
									// })
									_this.download({
										configuration, token, url:surl, contentId, title,
										B2L, b5u, b5w, b6q, b5G, B0Q, B0r, B0R
									})
								}
							},100)
						}

						
						// [2].model.attributes.a2u.B2g
					})
					return _d
				}
				_this.window.NFBR["a5n"].prototype['a5s'] = func
				console.log("a5s Hacked")
				
				clearInterval(_this.timer)
				//_this.window.document.write('<script src="https://www.ebookjapan.jp/ebj/ej/javascript/jquery/jquery-2.0.3.min.js"></script>')
			}
			
		}
	},
	download (data) {
		ipcRenderer.send('downloadStart', data)
	},
	init(){
		global["mtdEbjTools"] = _this

		// _this.canvasElement = global.HTMLCanvasElement.prototype
		//window.require = require

		console.log("preload insert")

		if(_this.locationCheck(window.location)) _this.ready(window)
		else{
			_this.hackOpen = window.open
			window.open = (u) => {
				if(u !== "") window.location.assign(u)
				else return window
			}
		}
	},
	locationCheck(up){
		return up.hostname == "pcreader.bookwalker.com.tw" && (up.pathname.indexOf("/viewer.html") > -1)
	}
}

_this.init()
