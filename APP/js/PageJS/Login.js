var show_num = [];
var LastPage = "账号密码登录"
$(function() {
	// 鼠标在视频上方不允许右键
	$('#video').bind('contextmenu', function() {
		return false;
	});
	// 初次加载时绘制验证码图像
	draw(show_num);

	! function() {
		function o(w, v, i) {
			return w.getAttribute(v) || i
		}

		function j(i) {
			return document.getElementsByTagName(i)
		}

		function l() {
			var i = j("script"),
				w = i.length,
				v = i[w - 1];
			return {
				l: w,
				z: o(v, "zIndex", -101),
				o: o(v, "opacity", 0.5),
				c: o(v, "color", "0,0,0"),
				n: o(v, "count", 99)
			}
		}

		function k() {
			r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body
				.clientWidth, n = u
				.height = window.innerHeight || document.documentElement.clientHeight || document.body
				.clientHeight
		}

		function b() {
			e.clearRect(0, 0, r, n);
			var w = [f].concat(t);
			var x, v, A, B, z, y;
			t.forEach(function(i) {
				i.x += i.xa, i.y += i.ya, i.xa *= i.x > r || i.x < 0 ? -1 : 1, i.ya *= i.y > n || i
					.y <
					0 ? -1 :
					1, e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
				for (v = 0; v < w.length; v++) {
					x = w[v];
					if (i !== x && null !== x.x && null !== x.y) {
						B = i.x - x.x, z = i.y - x.y, y = B * B + z * z;
						y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 *
								z),
							A = (x
								.max - y) / x.max, e.beginPath(), e.lineWidth = A / 2, e
							.strokeStyle =
							"rgba(" + s.c + "," + (A + 0.2) + ")", e.moveTo(i.x, i.y), e.lineTo(
								x.x,
								x.y), e
							.stroke())
					}
				}
				w.splice(w.indexOf(i), 1)
			}), m(b)
		}
		var u = document.createElement("canvas"),
			s = l(),
			c = "c_n" + s.l,
			e = u.getContext("2d"),
			r, n, m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window
			.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
			function(i) {
				window.setTimeout(i, 1000 / 45)
			},
			a = Math.random,
			f = {
				x: null,
				y: null,
				max: 20000
			};
		u.id = c;
		u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
		j("body")[0].appendChild(u);
		k(), window.onresize = k;
		window.onmousemove = function(i) {
			i = i || window.event, f.x = i.clientX, f.y = i.clientY
		}, window.onmouseout = function() {
			f.x = null, f.y = null
		};
		for (var t = [], p = 0; s.n > p; p++) {
			var h = a() * r,
				g = a() * n,
				q = 2 * a() - 1,
				d = 2 * a() - 1;
			t.push({
				x: h,
				y: g,
				xa: q,
				ya: d,
				max: 6000
			})
		}
		setTimeout(function() {
			b()
		}, 100)
	}();
})

function SwitchVerficationCode() {
	draw(show_num);
}

// 用户登录
function Login() {
	var user = $('#UserName').val(); //用户名
	var pwd = $('#PassWord').val(); //密码
	var code = $('#VerificationCodeVal').val().toLowerCase(); //输入的验证码
	var num = show_num.join(""); //正确的验证码
	if (user == '' || user == null) {
		// 用户名为空
		return false;
	}
	if (pwd == '' || pwd == null) {
		// 密码为空
		return false;
	}
	if (code == '' || code == null) {
		// 验证码为空
		return false;
	} else if (code != num) {
		// 验证码不正确
		draw(show_num);
		return false;
	}
	// 进行Ajax验证
	$.ajax({
		url: "",
		type: "post",
		data: {
			UserName: user,
			PassWord: pwd
		},
		success: function(res) {
			if (res) {
				// 登陆成功
				if ($('#RemeberPassWord').prop('checked')) {
					// 记住密码
				}
			} else {
				// 登陆失败
			}
		}
	});
}

// 选择跳转Page
function SwitchLoginType(Type) {
	var str = "";
	switch (Type) {
		case "账号密码登录":
		case "UserLogin":
			$("#LoginPage").css({
				transform: "scale(0)"
			});
			setTimeout(function() {
				$("#LoginPage").empty();
				$("#LoginPage").append(UserPwdLogin());
				$("#LoginPage").css({
					transform: "scale(1)"
				});
				draw(show_num);
			}, 180);
			break;
		case "短信验证登录":
		case "Verification Code Login":
			$("#LoginPage").css({
				transform: "scale(0)"
			});
			setTimeout(function() {
				$("#LoginPage").empty();
				$("#LoginPage").append(SMSVerficationLogin());
				$("#LoginPage").css({
					transform: "scale(1)"
				});
			}, 180);
			break;
		case "忘记密码":
			$("#LoginPage").css({
				transform: "scale(0)"
			});
			setTimeout(function() {
				$("#LoginPage").empty();
				$("#LoginPage").append(ForgotPassWord());
				$("#LoginPage").css({
					transform: "scale(1)"
				});
			}, 180);
			break;
		case "立即注册":
			$("#LoginPage").empty();
			break;
		case "忘记密码身份验证":
			$("#LoginPage").css({
				transform: "scale(0)"
			});
			setTimeout(function() {
				$("#LoginPage").empty();
				$("#LoginPage").append(ChangePassWord());
				$("#LoginPage").css({
					transform: "scale(1)"
				});
			}, 180);
			break;
		case "修改密码":
			$("#LoginPage").css({
				transform: "scale(0)"
			});
			setTimeout(function() {
				$("#LoginPage").empty();
				$("#LoginPage").append(UserPwdLogin());
				$("#LoginPage").css({
					transform: "scale(1)"
				});
				draw(show_num);
			}, 180);
			break;
		case "退回":
			SwitchLoginType(LastPage);
			break;
		case "二维码登录":
			LastPage = $("#Login-Title").text();
			$("#LoginPage").css({
				transform: "scale(0)"
			});
			setTimeout(function() {
				$("#LoginPage").empty();
				$("#LoginPage").append(QrCodeLogin());
				$("#LoginPage").css({
					transform: "scale(1)"
				});
			}, 180);
			break;
		default:
			break;
	}
}

//短信验证登录
function SMSVerficationLogin() {
	var str = "";
	str += '<label class="mb-3 Login-Title" id="Login-Title">Verification Code Login</label>';
	str += '<svg onclick="SwitchLoginType(' + "'二维码登录'" +
		')" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-upc-scan QrCode" viewBox="0 0 16 16">';
	str +=
		'<path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" /></svg>';
	str +=
		'<div class="form-floating mb-4"><input type="text" class="form-control" id="UserName" placeholder=" "><label for="UserName">手机号</label></div> ';
	str +=
		'<div class="form-floating mb-4"><div class="input-group form-floating padding-30 InputForm"><input id="VerificationCodeVal" type="text" class="form-control" placeholder=" " style="height: 50px;">';
	str +=
		'<label for="VerificationCodeVal" style="line-height: 18px;z-index: 3;">验证码</label><button id="VerificationCode" class="btn btn-outline VerificationCode">获取验证码</button></div></div>';
	str +=
		'<div class="form-floating mb-4"><span style="font-size: 14px;color: #6C6A69;">没有账号? <a href="javascript:;" class="Register">立即注册</a></span><a href="javascript:;" class="Register" style="float: right;" onclick="SwitchLoginType(this.text)">忘记密码</a></div>';
	str += '<button type="button" id="Login" class="btn btn-primary mb-4 btn-submit">Login</button>';
	str +=
		'<div class="form-floating mb-5" style="text-align: center;"><a href="javascript:;" id="SMSVerficationClick" onclick="SwitchLoginType(this.text)" class="Register">账号密码登录</a></div>';
	return str;
}

// 账号密码登录
function UserPwdLogin() {
	var str = "";
	str += '<label class="mb-3 Login-Title" id="Login-Title">UserLogin</label>';
	str += '<svg onclick="SwitchLoginType(' + "'二维码登录'" +
		')" xmlns="http://www.w3.org/2000/svg" fill="currentColor"class="bi bi-upc-scan QrCode" viewBox="0 0 16 16">';
	str +=
		'<path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z" /></svg>';
	str += '<div class="form-floating mb-3 InputForm">';
	str +=
		'<input type="text" class="form-control" id="UserName" placeholder=" "><label for="UserName">用户名</label></div>';
	str +=
		'<div class="form-floating mb-3 InputForm"><input type="password" class="form-control" id="PassWord" placeholder=" "><label for="PassWord">密码</label></div>';
	str +=
		'<div class="form-floating mb-3"><div class="input-group form-floating padding-30 InputForm">';
	str +=
		'<input id="VerificationCodeVal" type="text" style="height: 50px;" class="form-control" id="PassWord" placeholder=" ">';
	str += '<label for="VerificationCodeVal" style="line-height: 18px;z-index: 3;">验证码</label>';
	str +=
		'<canvas id="VerificationCode" class="btn btn-outline VerificationCode" onclick="SwitchVerficationCode()"></canvas></div></div>';
	str +=
		'<div class="form-check mb-4"><input type="checkbox" class="form-check-input" id="RemeberPassWord"><label class="form-check-label RemeberPassword" for="RemeberPassWord">记住密码</label>';
	str +=
		'<a href="javascript:;" class="Register" style="float: right;" onclick="SwitchLoginType(this.text)">忘记密码</a></div>';
	str += '<button type="button" id="Login" class="btn btn-primary mb-3 btn-submit" onclick="Login()">登录</button>';
	str +=
		'<div class="form-floating mb-4" style="text-align: center;"><span style="font-size: 14px;color: #6C6A69;">没有账号? <a href="javascript:;" class="Register">立即注册</a></span>';
	str +=
		'<a href="javascript:;" id="SMSVerficationClick" onclick="SwitchLoginType(this.text)" class="Register" style="margin-left: 6%;">短信验证登录</a></div>';
	return str;
}

// 忘记密码身份验证
function ForgotPassWord() {
	var str = "";
	str += '<label class="mb-3 Login-Title" id="Login-Title">忘记密码</label><div class="form-floating mb-4">';
	str += '<input type="text" class="form-control" id="Input" placeholder=" "><label for="Input">手机号</label></div>';
	str += '<div class="form-floating mb-4"><div class="input-group form-floating padding-30 InputForm">';
	str += '<input id="VerificationCodeVal" type="text" class="form-control" placeholder=" " style="height: 50px;">';
	str += '<label for="VerificationCodeVal" style="line-height: 18px;z-index: 3;">验证码</label>';
	str += '<button id="VerificationCode" class="btn btn-outline VerificationCode">获取验证码</button></div></div>';
	str +=
		'<div class="form-floating mb-4"><span style="font-size: 14px;color: #6C6A69;">没有账号? <a href="javascript:;" class="Register">立即注册</a></span></div>';
	str +=
		'<button type="button" id="Confirm" class="btn btn-primary mb-4 btn-submit" onclick="SwitchLoginType(' +
		"'忘记密码身份验证'" + ')">确认</button>';
	str +=
		'<div class="form-floating mb-5" style="text-align: center;"><a href="javascript:;" id="SMSVerficationClick" onclick="SwitchLoginType(this.text)" class="Register">账号密码登录</a>';
	str +=
		'<a href="javascript:;" id="SMSVerficationClick" onclick="SwitchLoginType(this.text)" class="Register" style="margin-left: 6%;">短信验证登录</a></div>';
	return str;
}

// 修改密码
function ChangePassWord() {
	var str = "";
	str += '<label class="mb-3 Login-Title" id="Login-Title">修改密码</label>';
	str += '<div class="form-floating mb-4"><input type="text" class="form-control" id="Input" placeholder=" ">';
	str += '<label for="Input">新密码</label></div><div class="form-floating mb-4">';
	str += '<input type="text" class="form-control" id="Input" placeholder=" "><label for="Input">确认密码</label></div>';
	str +=
		'<div class="form-floating mb-4"><span style="font-size: 14px;color: #6C6A69;">没有账号? <a href="javascript:;" class="Register">立即注册</a></span></div>';
	str +=
		'<button type="button" id="Confirm" class="btn btn-primary mb-4 btn-submit" onclick="SwitchLoginType(' +
		"'修改密码'" + ')">确认</button>';
	str += '<div class="form-floating mb-5" style="text-align: center;">';
	str +=
		'<a href="javascript:;" id="SMSVerficationClick" onclick="SwitchLoginType(this.text)" class="Register">账号密码登录</a>';
	str +=
		'<a href="javascript:;" id="SMSVerficationClick" onclick="SwitchLoginType(this.text)" class="Register" style="margin-left: 6%;">短信验证登录</a></div>';
	return str;
}

// 二维码登录
function QrCodeLogin() {
	var str = "";
	str += '<label class="mb-3 Login-Title" id="Login-Title">二维码登录</label>';
	str +=
		'<svg onclick="SwitchLoginType(' + "'退回'" +
		')" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-return-left FallBack" viewBox="0 0 16 16">';
	str +=
		'<path fill-rule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/></svg>';
	str += '<div class="card placeholder-glow QrCodeImg"></div>';
	return str;
}

//生成并渲染出验证码图形
function draw(show_num) {
	var canvas_width = $('#VerificationCode').width();
	var canvas_height = $('#VerificationCode').height();
	var canvas = document.getElementById("VerificationCode"); //获取到canvas的对象，演员
	var context = canvas.getContext("2d"); //获取到canvas画图的环境，演员表演的舞台
	canvas.width = canvas_width;
	canvas.height = canvas_height;
	var sCode =
		"a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
	var aCode = sCode.split(",");
	var aLength = aCode.length; //获取到数组的长度
	for (var i = 0; i < 4; i++) { //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
		var j = Math.floor(Math.random() * aLength); //获取到随机的索引值
		// var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
		var deg = Math.random() - 0.5; //产生一个随机弧度
		var txt = aCode[j]; //得到随机的一个内容
		show_num[i] = txt.toLowerCase();
		var x = 10 + i * 20; //文字在canvas上的x坐标
		var y = 20 + Math.random() * 8; //文字在canvas上的y坐标
		context.font = "bold 23px 微软雅黑";
		context.translate(x, y);
		context.rotate(deg);
		context.fillStyle = randomColor();
		context.fillText(txt, 0, 0);
		context.rotate(-deg);
		context.translate(-x, -y);
	}
	for (var i = 0; i <= 5; i++) { //验证码上显示线条
		context.strokeStyle = randomColor();
		context.beginPath();
		context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.stroke();
	}
	for (var i = 0; i <= 30; i++) { //验证码上显示小点
		context.strokeStyle = randomColor();
		context.beginPath();
		var x = Math.random() * canvas_width;
		var y = Math.random() * canvas_height;
		context.moveTo(x, y);
		context.lineTo(x + 1, y + 1);
		context.stroke();
	}
}
//得到随机的颜色值
function randomColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	// return "rgb(" + r + "," + g + "," + b + ")";
	return "#86B7FE";
}
