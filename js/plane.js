/**
 * Created by Administrator on 2015/11/3.
 */
var startBtn = document.getElementById("startBtn");
var startDiv = document.getElementById("startDiv");
var gameDiv = document.getElementById("gameDiv");
var pause = document.getElementById("pauseDiv");
var continueBtn = document.getElementById("continueBtn");
var playagain = document.getElementById("playagain");
var endBtn = document.getElementById("endBtn");
var endGame = document.getElementById("endGame");
var scoreLabel = document.getElementById("scoreLabel");
var scoreEnd = document.getElementById("scoreEnd");

/**
 * 添加小飞机
 * @param {Object} imgSrc 飞机图片
 * @param {Object} boomSrc 飞机爆炸图片
 * @param {Object} endSrc
 * @param {Object} imgWidth 飞机宽度
 * @param {Object} imgHeight 飞机高度
 * @param {Object} imgX 飞机x坐标
 * @param {Object} imgY 飞机Y坐标
 * @param {Object} imgNode
 */
function plane(imgSrc, boomSrc, endSrc, imgWidth, imgHeight, imgX, imgY, imgNode) {
	this.imgSrc = imgSrc;
	this.boomSrc = boomSrc;
	this.endSrc = endSrc;
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.imgX = imgX;
	this.imgY = imgY;
	this.imgNode = null;
	this.init = function() {
		this.imgNode = document.createElement("img");
		this.imgNode.src = this.imgSrc;
		this.imgNode.style.width = this.imgWidth + "px";
		this.imgNode.style.height = this.imgHeight + "px";
		this.imgNode.style.left = this.imgX + "px";
		this.imgNode.style.top = this.imgY + "px";
		gameDiv.appendChild(this.imgNode);
	};
	this.init();
}

var myPlane = new plane("./image/我的飞机.gif", "./image/本方飞机爆炸.gif", "./image/boom.png", 66, 80, (320 - 66) / 2, 568 - 80);
//移动我的小飞机
function movePlane(e) {
	var ev = e || window.event;
	var x = ev.clientX - window.innerWidth / 2 + 160;
	var y = ev.clientY;
	if(x < 33) {
		x = 33;
	} else if(x > 320 - 33) {
		x = 320 - 33;
	}
	if(y < 40) {
		y = 40;
	} else if(y > 568 - 40) {
		y = 568 - 40;
	}

	myPlane.imgNode.style.left = x - 33 + "px";
	myPlane.imgNode.style.top = y - 40 + "px";
}
gameDiv.addEventListener("mousemove", movePlane, true);
/**
 * 定义子弹
 * @param {Object} imgSrc
 * @param {Object} imgWidth
 * @param {Object} imgHeight
 * @param {Object} imgX
 * @param {Object} imgY
 * @param {Object} bNode
 */
function bullet(imgSrc, imgWidth, imgHeight, imgX, imgY, bNode) {
	this.imgSrc = imgSrc;
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.imgX = imgX;
	this.imgY = imgY;
	this.bNode = null;
	this.init = function() {
		this.bNode = document.createElement("img");
		this.bNode.src = this.imgSrc;
		this.bNode.style.width = this.imgWidth + "px";
		this.bNode.style.height = this.imgHeight + "px";
		this.bNode.style.left = this.imgX + "px";
		this.bNode.style.top = this.imgY + "px";
		gameDiv.appendChild(this.bNode);
	};
	this.init();
	this.bmove = function() {
		this.bNode.style.top = parseInt(this.bNode.style.top) - 5 + "px";
	}
}
/**
 * 定义敌机
 * @param {Object} imgSrc
 * @param {Object} shotSrc
 * @param {Object} boomSrc
 * @param {Object} HP
 * @param {Object} Score
 * @param {Object} dieTime
 * @param {Object} imgWidth
 * @param {Object} imgHeight
 * @param {Object} imgX
 * @param {Object} imgY
 * @param {Object} death
 * @param {Object} eNode
 */
function eplane(imgSrc, shotSrc, boomSrc, HP, Score, dieTime, imgWidth, imgHeight, imgX, imgY, death, eNode) {
	this.death = death;
	this.imgSrc = imgSrc;
	this.shotSrc = shotSrc;
	this.boomSrc = boomSrc;
	this.HP = HP;
	this.Score = Score;
	this.dieTime = dieTime;
	this.imgWidth = imgWidth;
	this.imgHeight = imgHeight;
	this.imgX = imgX;
	this.imgY = imgY;
	this.eNode = null;
	this.init = function() {
		this.eNode = document.createElement("img");
		this.eNode.src = this.imgSrc;
		this.eNode.style.width = this.imgWidth + "px";
		this.eNode.style.height = this.imgHeight + "px";
		this.eNode.style.left = this.imgX + "px";
		this.eNode.style.top = this.imgY + "px";
		gameDiv.appendChild(this.eNode);
	};
	this.init();

}
/**
 * 小飞机移动方法
 * @param {Object} imgSrc
 * @param {Object} shotSrc
 * @param {Object} boomSrc
 * @param {Object} HP
 * @param {Object} Score
 * @param {Object} dieTime
 * @param {Object} imgWidth
 * @param {Object} imgHeight
 * @param {Object} imgX
 * @param {Object} imgY
 * @param {Object} death
 * @param {Object} eNode
 */
function smallPlane(imgSrc, shotSrc, boomSrc, HP, Score, dieTime, imgWidth, imgHeight, imgX, imgY, death, eNode) {
	eplane.call(this, imgSrc, shotSrc, boomSrc, HP, Score, dieTime, imgWidth, imgHeight, imgX, imgY, death, eNode);
	this.speed = 3;
	this.smallmove = function() {
		this.eNode.style.top = parseInt(this.eNode.style.top) + this.speed + "px";
	};
}
/**
 * 中飞机移动方法
 * @param {Object} imgSrc
 * @param {Object} shotSrc
 * @param {Object} boomSrc
 * @param {Object} HP
 * @param {Object} Score
 * @param {Object} dieTime
 * @param {Object} imgWidth
 * @param {Object} imgHeight
 * @param {Object} imgX
 * @param {Object} imgY
 * @param {Object} death
 * @param {Object} eNode
 */
function midPlane(imgSrc, shotSrc, boomSrc, HP, Score, dieTime, imgWidth, imgHeight, imgX, imgY, death, eNode) {
	eplane.call(this, imgSrc, shotSrc, boomSrc, HP, Score, dieTime, imgWidth, imgHeight, imgX, imgY, death, eNode);
	this.speed = 2;
	this.smallmove = function() {
		this.eNode.style.top = parseInt(this.eNode.style.top) + this.speed + "px";
	};
}
/**
 * 大飞机移动方法
 * @param {Object} imgSrc
 * @param {Object} shotSrc
 * @param {Object} boomSrc
 * @param {Object} HP
 * @param {Object} Score
 * @param {Object} dieTime
 * @param {Object} imgWidth
 * @param {Object} imgHeight
 * @param {Object} imgX
 * @param {Object} imgY
 * @param {Object} death
 * @param {Object} eNode
 */
function bigPlane(imgSrc, shotSrc, boomSrc, HP, Score, dieTime, imgWidth, imgHeight, imgX, imgY, death, eNode) {
	eplane.call(this, imgSrc, shotSrc, boomSrc, HP, Score, dieTime, imgWidth, imgHeight, imgX, imgY, death, eNode);
	this.speed = 1;
	this.smallmove = function() {
		this.eNode.style.top = parseInt(this.eNode.style.top) + this.speed + "px";
	};
}

//点击 开始按钮 隐藏掉开始界面
var runspeed = 10;
var runner;
startBtn.onclick = function() {
	startDiv.style.display = "none";
	gameDiv.style.display = "block";
	runner = window.setInterval(run, runspeed);
};
//暂停
gameDiv.onclick = function() {
	clearInterval(runner);
	pause.style.display = "block";
	pause.style.zIndex = "999";
	//清除动画
	gameDiv.removeEventListener("mousemove", movePlane, true);
	//继续游戏
	continueBtn.onclick = function(e) {
		var ev = e || window.event;
		ev.cancelBubble = true;
		pause.style.display = "none";
		clearInterval(runner);
		runner = window.setInterval(run, runspeed);
		gameDiv.addEventListener("mousemove", movePlane, true);
	};
	//重新开始
	playagain.onclick = function() {
		location.reload();
	};
};
//背景移动
var bgy = 0;
var bullets = [];
var eplanes = [];
var tempBullet = 0;
var tempEplanes = 0;
var score = 0;

function run() {
	//移动背景
	bgy = bgy + 7;
	gameDiv.style.backgroundPosition = "0px " + bgy + "px";
	if(bgy > 568) {
		bgy = 0;
	}
	//产生子弹
	tempBullet++;
	if(tempBullet % 15 == 5) {
		var myBullet = new bullet("./image/bullet1.png", 6, 14, parseInt(myPlane.imgNode.style.left) + parseInt(myPlane.imgNode.width / 2), parseInt(myPlane.imgNode.style.top));
		bullets.push(myBullet);
	}
	//移除子弹
	for(var i = 0; i < bullets.length; i++) {
		bullets[i].bmove();
		if(bullets[i].bNode.offsetTop <= 10) {
			gameDiv.removeChild(bullets[i].bNode);
			bullets.splice(i, 1);
			i--;
		}
	}
	//产生敌机
	tempEplanes++;
	//小飞机 //(imgSrc ,shotSrc, boomSrc , HP, Score,dieTime, imgWidth , imgHeight , imgX , imgY ,death, eNode)
	if(tempEplanes % 70 == 0) {
		var small = new smallPlane("./image/enemy1_fly_1.png", null, "./image/小飞机爆炸.gif", 1, 100, 20, 34, 24, 286 * Math.random(), -24, false);
		eplanes.push(small);
	}
	//中飞机
	if(tempEplanes % 177 == 0) {
		var mid = new midPlane("./image/enemy3_fly_1.png", "./image/中飞机挨打.png", "./image/中飞机爆炸.gif", 3, 300, 30, 46, 60, 270 * Math.random(), -60, false);
		eplanes.push(mid);
	}
	//大飞机
	if(tempEplanes % 417 == 0) {
		var big = new bigPlane("./image/enemy2_fly_1.png", "./image/大飞机挨打.png", "./image/大飞机爆炸.gif", 7, 1000, 50, 110, 164, 210 * Math.random(), -164, false);
		eplanes.push(big);
	}
	//移除飞机
	for(var i = 0; i < eplanes.length; i++) {
		eplanes[i].smallmove();
		if(eplanes[i].eNode.offsetTop > 570) {
			gameDiv.removeChild(eplanes[i].eNode);
			eplanes.splice(i, 1);
			i--;
		}
	}

	//开始打飞机
	for(var a = 0; a < bullets.length; a++) {
		for(var b = 0; b < eplanes.length; b++) {
			if(bullets[a].bNode.offsetTop <= eplanes[b].eNode.offsetTop + eplanes[b].eNode.offsetHeight &&
				bullets[a].bNode.offsetTop >= eplanes[b].eNode.offsetTop &&
				eplanes[b].eNode.offsetLeft <= bullets[a].bNode.offsetLeft &&
				bullets[a].bNode.offsetLeft <= eplanes[b].eNode.offsetLeft + eplanes[b].eNode.offsetWidth &&
				eplanes[b].HP > 0 && eplanes[b].dieTime > 0) {

				//击中飞机移除子弹
				gameDiv.removeChild(bullets[a].bNode);
				bullets.splice(a, 1);
				a--;
				//击中飞机减血量
				eplanes[b].HP--;
				//如果有shotSrc属性,将图片换为shotSrc.
				if(eplanes[b].shotSrc) {
					eplanes[b].eNode.src = eplanes[b].shotSrc;
				}
				//血量为0时敌机判定为死亡,并更改图片为boomSrc
				if(eplanes[b].HP <= 0) {
					eplanes[b].death = true;
					eplanes[b].eNode.src = eplanes[b].boomSrc;
					score += parseInt(eplanes[b].Score);
					scoreLabel.innerHTML = score;
				}
				break;
			}
		}
	}
	//延时爆照,并死了的敌机 不移动
	for(var b = 0; b < eplanes.length; b++) {
		if(eplanes[b].death == true) {
			eplanes[b].dieTime--;
			eplanes[b].speed = 0;
		}
		if(eplanes[b].dieTime == 0) {
			gameDiv.removeChild(eplanes[b].eNode);
			eplanes.splice(b, 1);
			b--;
		}
	}
	//增加难度
	if(score / 10000 > 1 && score % 10000 == 0) {
		clearInterval(runner);
		runner = window.setInterval(run, runspeed - 1);
	}
	//飞机碰撞自杀
	for(var b = 0; b < eplanes.length; b++) {
		if(myPlane.imgNode.offsetTop <= eplanes[b].eNode.offsetTop + eplanes[b].eNode.offsetHeight &&
			myPlane.imgNode.offsetTop + myPlane.imgNode.offsetHeight >= eplanes[b].eNode.offsetTop &&
			eplanes[b].eNode.offsetLeft <= myPlane.imgNode.offsetLeft + myPlane.imgNode.offsetWidth &&
			myPlane.imgNode.offsetLeft <= eplanes[b].eNode.offsetLeft + eplanes[b].eNode.offsetWidth &&
			eplanes[b].death == false) {
			//最后一个判定,如果敌机为死亡,则不会有碰撞效果
			gameDiv.removeEventListener("mousemove", movePlane, true);
			clearInterval(runner);
			//死亡后,不会有点击暂停效果
			gameDiv.onclick = null;
			endGame.style.display = "block";
			endGame.style.zIndex = "999";
			endBtn.onclick = function() {
				location.reload();
			};
			//切换飞机图片
			eplanes[b].eNode.src = eplanes[b].boomSrc;
			myPlane.imgNode.src = myPlane.boomSrc;
			scoreEnd.innerHTML = scoreLabel.innerHTML;
		}
	}

}