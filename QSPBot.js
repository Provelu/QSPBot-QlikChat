/*************************************************************************************************************************************\                                                                                                                           
*                                                                                                                                     *
*          QQQQQQQQQ        SSSSSSSSSSSSSSS PPPPPPPPPPPPPPPPP        BBBBBBBBBBBBBBBBB                             tttt               *
*        QQ:::::::::QQ    SS:::::::::::::::SP::::::::::::::::P       B::::::::::::::::B                         ttt:::t               *
*      QQ:::::::::::::QQ S:::::SSSSSS::::::SP::::::PPPPPP:::::P      B::::::BBBBBB:::::B                        t:::::t               *
*     Q:::::::QQQ:::::::QS:::::S     SSSSSSSPP:::::P     P:::::P     BB:::::B     B:::::B                       t:::::t               *
*     Q::::::O   Q::::::QS:::::S              P::::P     P:::::P       B::::B     B:::::B   ooooooooooo   ttttttt:::::ttttttt         *
*     Q:::::O     Q:::::QS:::::S              P::::P     P:::::P       B::::B     B:::::B oo:::::::::::oo t:::::::::::::::::t         *
*     Q:::::O     Q:::::Q S::::SSSS           P::::PPPPPP:::::P        B::::BBBBBB:::::B o:::::::::::::::ot:::::::::::::::::t         *
*     Q:::::O     Q:::::Q  SS::::::SSSSS      P:::::::::::::PP         B:::::::::::::BB  o:::::ooooo:::::otttttt:::::::tttttt         *
*     Q:::::O     Q:::::Q    SSS::::::::SS    P::::PPPPPPPPP           B::::BBBBBB:::::B o::::o     o::::o      t:::::t               *
*     Q:::::O     Q:::::Q       SSSSSS::::S   P::::P                   B::::B     B:::::Bo::::o     o::::o      t:::::t               *
*     Q:::::O  QQQQ:::::Q            S:::::S  P::::P                   B::::B     B:::::Bo::::o     o::::o      t:::::t               *
*     Q::::::O Q::::::::Q            S:::::S  P::::P                   B::::B     B:::::Bo::::o     o::::o      t:::::t    tttttt     *
*     Q:::::::QQ::::::::QSSSSSSS     S:::::SPP::::::PP               BB:::::BBBBBB::::::Bo:::::ooooo:::::o      t::::::tttt:::::t     *
*      QQ::::::::::::::Q S::::::SSSSSS:::::SP::::::::P               B:::::::::::::::::B o:::::::::::::::o      tt::::::::::::::t     *
*        QQ:::::::::::Q  S:::::::::::::::SS P::::::::P               B::::::::::::::::B   oo:::::::::::oo         tt:::::::::::tt     *
*          QQQQQQQQ::::QQ SSSSSSSSSSSSSSS   PPPPPPPPPP               BBBBBBBBBBBBBBBBB      ooooooooooo             ttttttttttt       *
*                  Q:::::Q                                                                                                            *
*                   QQQQQQ                                                                                                            *
*                                                                                                        							  *
*                                                              www.qspbot.com                                                         *
*                                                                                                                                     *
*                                          					  Copyright 2020 ©                               						  *
\*************************************************************************************************************************************/

var setup = true;
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
var emojis = ['😀', '😆', '😂', '😅', '🙂', '😉', '👍', '👋', '😍', '💖', '😜', '🤑', '🤔', '😐', '🙄', '😔', '😴', '🤢', '🤠', '😎', '😕', '😦', '😰', '😭', '😓', '😠', '😡', '🤖', '😺', '👻'];

define([
	"qlik",
	'text!./style.css',
],
	function (qlik, cssContent) {
		$('<style>').html(cssContent).appendTo('head');
		return {
			support: {
				snapshot: false,
				export: false,
				exportData: false
			},
			definition: {
				type: "items",
				component: "accordion",
				items: {
					qspbotSection: {
						component: "expandable-items",
						label: "QSP Bot",
						items: {
							appearanceHeader: {
								type: "items",
								label: "Appearance",
								items: {
									company: {
										ref: "qspbot.comp",
										label: "Name company:",
										type: "string",
										maxlength: "26"
									},
									colorbox1: {
										ref: "qspbot.main.color",
										label: "Chatbox color:",
										component: "color-picker",
										type: "object",
										defaultValue: {
											color: "009844",
											index: "-1"
										}
									},
									colorbox2: {
										ref: "qspbot.txt.color",
										label: "Chatbox text color:",
										component: "color-picker",
										type: "object",
										defaultValue: {
											color: "ffffff",
											index: "-1"
										}
									},
									radiusbox: {
										type: "boolean",
										component: "switch",
										label: "Rounded borders:",
										ref: "qspbot.radius",
										options: [{
											value: true,
											label: "On"
										}, {
											value: false,
											label: "Off"
										}],
										defaultValue: false
									},
									imgbox1: {
										ref: "qspbot.image",
										label: "Button Image:",
										component: "media",
										layoutRef: "iconBot",
										type: "string"
									}
								}
							},
							settingsHeader: {
								type: "items",
								label: "Settings",
								items: {
									textbox1: {
										ref: "qspbot.host",
										label: "Host:",
										type: "string"
									},
									textbox2: {
										ref: "qspbot.port",
										label: "Port:",
										type: "number"
									},
									textbox3: {
										ref: "qspbot.secret",
										label: "Secret:",
										type: "string"
									},
									textbox4: {
										ref: "qspbot.usehttps",
										label: "Use https:",
										type: "boolean"
									}
								}
							},
							infoHeader: {
								label: "Info",
								items: {
									title1: {
										label: "",
										component: "text"
									},
									textbox5: {
										label: "Thank you for choosing the QSP Bot! We appreciate that you chose us as your data-driven conversational analytics tool.",
										component: "text"
									},
									textbox6: {
										label: "If you have any questions about the extension, the bot itself or one of its capabilities. Then you can chat with us on our website or mail at support@qspbot.com.",
										component: "text"
									},
									MyLink: {
										label: "Visit our website",
										component: "link",
										url: "https://www.qspbot.com/"
									}
								}
							}
						}
					}
				}
			},
			paint: function ($element, layout) {

				var host = layout.qspbot.host;
				var port = layout.qspbot.port;
				var secret = layout.qspbot.secret;
				var useHttps = layout.qspbot.usehttps;
				var primColor = layout.qspbot.main.color.color;
				var txtColor = layout.qspbot.txt.color.color;
				var radius = layout.qspbot.radius;
				var image = layout.qspbot.image;
				var compName = layout.qspbot.comp;

				if (host === null || port === null || secret === null || useHttps === null || host === "" || port === 0 || secret === "")
					return;

				if (!primColor) primColor = "#009844";
				if (!txtColor) txtColor = "#ffffff";
				if (!image) image = "/extensions/QSPBot/Bot-Logo.png";
				if (!compName || compName === "")
					compName = "QSP Bot";
				else
					compName = "QSP Bot - " + compName;

				if (!setup) {
					if (window.location.href.indexOf("edit") != -1) {
						$("#qspbot").fadeOut(800);
					} else {
						$("#qspbot").fadeIn(800);
					};

					Redraw();
				} else {
					$('<style>').html('div[tid="imgbox1"] > div[class="ng-isolate-scope"] > div[class="pp-component pp-media-component ng-scope"] > div[class="value"] > div[class="placeholder"] { background: #009844 url("' + image + '") no-repeat center !important;background-size: contain !important}').appendTo('head');
					Setup(qlik, host, port, secret, useHttps, primColor, txtColor, radius, image, compName);
				}

				return qlik.Promise.resolve();
			}
		};
	});

function Setup(qlik, host, port, secret, useHttps, primColor, txtColor, radius, image, compName) {
	qlik.getGlobal().getAuthenticatedUser((reply) => {
		var username = reply.qReturn.split("UserId=")[1];
		var currentApp = qlik.currApp(this);
		SetApp(currentApp, username, host, port, secret, useHttps);

		var qspbot = document.createElement("div");
		qspbot.id = "qspbot";

		var chat = document.createElement("div");
		chat.id = "qspbot-chat";
		chat.style.border = "2px solid " + primColor;
		chat.style.display = "none";

		var chatTitleBar = document.createElement("div");
		chatTitleBar.id = "qspbot-chatTitleBar";
		chatTitleBar.style.backgroundColor = primColor;
		chatTitleBar.style.color = txtColor;
		chat.appendChild(chatTitleBar);

		if (radius == true) {
			chatTitleBar.style.borderRadius = "15px 15px 0 0";
			chat.style.borderRadius = "18px 18px 0 0";
		} else {
			chatTitleBar.style.borderRadius = "0px";
			chat.style.borderRadius = "0px";
		}

		var chatTitleContainer = document.createElement("div");
		chatTitleContainer.id = "qspbot-chatTitleContainer";
		chatTitleBar.appendChild(chatTitleContainer);

		var chatTitle = document.createTextNode(compName);
		chatTitleContainer.appendChild(chatTitle);

		var chatCloseButton = document.createElement("span");
		chatCloseButton.className = "lui-icon lui-icon--close qspbot-chatCloseButton";
		chatCloseButton.setAttribute('aria-hidden', 'true');
		chatCloseButton.onclick = () => {
			chat.style.display = "none";
		};
		chatTitleBar.appendChild(chatCloseButton);

		var chatFullScreen = document.createElement("span");
		chatFullScreen.className = "lui-icon lui-icon--expand qspbot-fullscreen";
		chatFullScreen.onclick = () => {

			if (chatFullScreen.className == "lui-icon lui-icon--expand qspbot-fullscreen") {
				chat.style.width = "calc(100% - 16px)";
				chat.style.height = "calc(100% - 16px)";
				chat.style.bottom = "6px";
				chat.style.right = "6px";
				chat.style.top = "6px";
				chat.style.left = "6px";
				if (chat.style.display == "block") {
					chat.style.animation = "expand 0.4s";
					setTimeout(() => { chat.style.animation = ""; }, 500);
				} else if (chat.style.display == "none") {
					return;
				}
				chatFullScreen.className = "lui-icon lui-icon--collapse qspbot-fullscreen";
			} else {
				chat.style.width = "400px";
				chat.style.height = "600px";
				chat.style.bottom = "6px";
				chat.style.right = "6px";
				chat.style.top = "calc(100% - 610px )";
				chat.style.left = "calc(100% - 410px )";
				chat.style.animation = "collapse 0.4s";
				setTimeout(() => { chat.style.animation = ""; }, 500);

				chatFullScreen.className = "lui-icon lui-icon--expand qspbot-fullscreen";
			}
		};
		chatTitleBar.appendChild(chatFullScreen);

		var chatWindow = document.createElement("div");
		chatWindow.id = "qspbot-chatWindow";
		chat.appendChild(chatWindow);

		var messageWindow = document.createElement("div");
		messageWindow.id = "qspbot-messageWindow";

		var messageInput = document.createElement("input");
		messageInput.id = "qspbot-messageInput";
		messageInput.setAttribute("type", "text");
		messageInput.onkeypress = (event) => {
			if (event.keyCode == 13) {
				SendMessage(username, host, port, secret, useHttps);
			}
		};
		messageWindow.appendChild(messageInput);

		// Emoji button					
		var emojiTable = document.createElement("div");
		emojiTable.id = "qspbot-emojiTable";
		emojiTable.style.borderColor = primColor;
		chat.appendChild(emojiTable);

		$(document).mouseup(function (e) {
			var container = $("#qspbot-emojiTable");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				container.fadeOut();
			}
		});

		for (var e in emojis) {
			var emoji = document.createElement('div');
			emoji.id = emojis[e]; emoji.className = "qspbot-emojis";
			emoji.innerHTML = emojis[e];
			emojiTable.appendChild(emoji);
		};

		var emojiInputButton = document.createElement("div");
		emojiInputButton.onclick = () => {
			emojiTable.style.display = "block";
		};
		emojiInputButton.id = "qspbot-emojiInputButton";
		emojiInputButton.style.backgroundColor = primColor;
		emojiInputButton.style.color = txtColor;
		messageWindow.appendChild(emojiInputButton);

		var emojiButtonText = document.createElement("span");
		emojiButtonText.innerHTML = "☺";
		emojiButtonText.className = "emoji-button";
		emojiButtonText.setAttribute('aria-hidden', 'true');
		emojiInputButton.appendChild(emojiButtonText);

		// Send button
		var messageSendButton = document.createElement("div");
		messageSendButton.onclick = () => {
			SendMessage(username, host, port, secret, useHttps);
		};
		messageSendButton.id = "qspbot-messageSendButton";
		messageSendButton.style.backgroundColor = primColor;
		messageSendButton.style.color = txtColor;

		var sendButtonText = document.createElement("span");
		sendButtonText.className = "lui-icon lui-icon--arrow-right  send-button";
		sendButtonText.setAttribute('aria-hidden', 'true');
		messageSendButton.appendChild(sendButtonText);

		messageWindow.appendChild(messageSendButton);

		chat.appendChild(messageWindow);

		var button = document.createElement("div");
		button.id = "qspbot-button";
		button.style.background = '#c4c4c4 url("' + image + '") no-repeat';
		button.style.backgroundSize = "75px 75px";
		button.onclick = () => {
			var currStyle = chat.style.display;
			if (currStyle !== "none") {
				chat.style.display = "none";
			} else {
				chat.style.display = "block";
			}
		};

		qspbot.appendChild(chat);
		qspbot.appendChild(button);

		Poll(username, host, port, secret, useHttps);

		$('body').append(qspbot);

		dragElement();

		document.body.addEventListener("mouseup", function (e) {
			var t = e.target.id;

			if (emojis.includes(t)) {
				var input = document.getElementById('qspbot-messageInput');
				input.value = input.value + t;
			} else {
				return;
			}
		});

		setup = false;
	});
}

function Redraw() {
	var qspChat = document.getElementById("qspbot-chat");
	var qspChatTitleBar = document.getElementById("qspbot-chatTitleBar");
	var qspChatTitleContainer = document.getElementById("qspbot-chatTitleContainer");
	var qspEmojiInputButton = document.getElementById("qspbot-emojiInputButton");
	var qspMessageSendButton = document.getElementById("qspbot-messageSendButton");
	var qspEmojiTable = document.getElementById("qspbot-emojiTable");
	var qspButton = document.getElementById("qspbot-button");

	qspChat.style.border = "2px solid " + primColor;
	qspChat.style.borderRadius = radius ? "18px 18px 0 0" : "0px";

	qspChatTitleBar.style.borderRadius = radius ? "15px 15px 0 0" : "0px"
	qspChatTitleBar.style.backgroundColor = primColor;
	qspChatTitleBar.style.color = txtColor;

	while (qspChatTitleContainer.firstChild)
		qspChatTitleContainer.removeChild(qspChatTitleContainer.firstChild);
	qspChatTitleContainer.appendChild(document.createTextNode(compName));

	qspEmojiInputButton.style.backgroundColor = primColor;
	qspEmojiInputButton.style.color = txtColor;

	qspMessageSendButton.style.backgroundColor = primColor;
	qspMessageSendButton.style.color = txtColor;

	qspEmojiTable.style.borderColor = primColor;

	qspButton.style.background = "#c4c4c4 url('" + image + "') no-repeat";
	qspButton.style.backgroundSize = "75px 75px";
}

function SetApp(currentApp, username, host, port, secret, useHttps) {
	if (currentApp === null || username === null || host === null || port === null || secret === null || useHttps === null) { return; }

	var xhr = new XMLHttpRequest();
	var data = new FormData();
	data.append('appname', currentApp.model.layout.qTitle);
	data.append('appid', currentApp.id);
	data.append('secret', secret);
	data.append('id', "qlikchat " + username);
	xhr.open('POST', (useHttps ? 'https://' : "http://") + host + ':' + port + '/api/setapp', true);
	xhr.send(data);
}

function Poll(username, host, port, secret, useHttps) {
	if (username === null || host === null || port === null || secret === null || useHttps === null) { setTimeout(() => { Poll(username, host, port, secret, useHttps) }, 1000); return; }

	var xhr = new XMLHttpRequest();
	var data = new FormData();
	data.append("id", "qlikchat " + username);
	data.append('secret', secret);
	xhr.open('post', (useHttps ? 'https://' : "http://") + host + ':' + port + '/api/messages', true);
	xhr.onload = function (e) {
		if (xhr.readyState === 4 && xhr.status === 200) {
			PollResonse(xhr.responseText);
		}
	}
	xhr.send(data);
	setTimeout(() => { Poll(username, host, port, secret, useHttps) }, 1000);
}

function PollResonse(response) {
	var json = JSON.parse(response);
	for (var i = 0; i < json.messages.length; i++) {
		const message = json.messages[i];
		var chatWindow = document.getElementById("qspbot-chatWindow");
		chatWindow.innerHTML += "<div class='qspbot-message' style='margin-left: 12px;'><div class='qspbot-messageTitle'>QSP Bot<span class='qspbot-messageSubTitle'>" + GetCurrentTime() + "</span></div>" + message + "</div>";
		chatWindow.scrollTop = chatWindow.scrollHeight;
	}
}

function SendMessage(username, host, port, secret, useHttps) {
	var messageInput = document.getElementById("qspbot-messageInput");
	if (username === null || host === null || port === null || secret === null || useHttps === null || messageInput.value == "") { return; }
	var chatWindow = document.getElementById("qspbot-chatWindow");

	var xhr = new XMLHttpRequest();
	var data = new FormData();
	data.append('message', messageInput.value);
	data.append('id', "qlikchat " + username);
	data.append('secret', secret);
	xhr.open('POST', (useHttps ? 'https://' : "http://") + host + ':' + port + '/api/send', true);
	xhr.onload = function (e) {
		if (xhr.readyState === 4 && xhr.status === 200) {
			if (xhr.responseText.indexOf("not ok") >= 0) {
				chatWindow.innerHTML += "<div class='qspbot-message' style='margin-left: 12px;'><div class='qspbot-messageTitle'>QSP Bot<span class='qspbot-messageSubTitle'>" + GetCurrentTime() + "</span></div>It seems that the secret does not match with the secret in the QSP Management Portal <br/><br />Please contact a QSP Bot administrator.</div>";
			}
		}
	}
	xhr.send(data);

	chatWindow.innerHTML += "<div class='qspbot-message' style='background-color: #efefef; margin-right: 12px;'><div class='qspbot-messageTitle'>" + username + "<span class='qspbot-messageSubTitle'>" + GetCurrentTime() + "</span></div>" + messageInput.value + "</div>";
	chatWindow.scrollTop = chatWindow.scrollHeight;
	messageInput.value = "";
}

function GetCurrentTime() {
	var now = new Date();
	var x = now.getHours().toString();
	var y = now.getMinutes().toString();

	return (x.length === 1 ? "0" + x : x) + ":" + (y.length === 1 ? "0" + y : y);
}

function dragElement(elmnt) {
	var elmnt = document.getElementById("qspbot-chat");
	document.getElementById("qspbot-chatTitleBar").onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}