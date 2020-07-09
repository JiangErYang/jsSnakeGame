//测试gmme


var TCS = {
	param: {
		canvasObj: document.getElementById('webbitmap'),
		canvasContext: null,
		pointSize: 40, //坐标点宽高
		maxWidth: 1000,
		maxHeight: 800,
		direction: 'down',
		gameStart: true, //是否开始有戏
		randPoint: {} //随机出现的点
	},
	init: function() {
		console.log('tanchishe start1');
		var self = this;
		self.param.canvasContext = self.param.canvasObj.getContext('2d');

		document.addEventListener('keyup', function(e) {
			var key = e.keyCode;

			if (key == 38)
				self.param.direction = 'up';
			else if (key == 40) {
				self.param.direction = 'down';
			} else if (key == 37) {
				self.param.direction = 'left';
			} else if (key == 39) {
				self.param.direction = 'right';
			}
		}, false);

		document.getElementById('btn_start').addEventListener('click', function() {
			//开始有戏
			self.param.gameStart = true;
			this.innerHTML = "停止游戏";
			if (self.param.gameStart) {

			}


		});

		self.fillRectStart();
		self.generateRandp();


	},
	fillRectTest: function() { //画矩形
		var self = this;
		var index = -1;

		return function run() {

			var t = window.setInterval(function() {
				index += 1;
				if (index * self.param.pointSize > self.param.maxHeight || index * self.param.pointSize > self.param.maxWidth) {
					window.clearInterval(t);
					return;
				}
				if (index % 2 == 0) {
					self.param.canvasContext.fillStyle = "#ff0000";
				} else {
					self.param.canvasContext.fillStyle = "green";
				}

				self.param.canvasContext.fillRect(index * self.param.pointSize, index * self.param.pointSize, self.param.pointSize, self.param.pointSize);

			}, 500);
		}
	},
	fillRectStart: function() {
		var self = this;
		var context = self.param.canvasContext;

		var list = [];
		list.push({
			x: 80,
			y: 200,
			h: 40,
			w: 40
		});
		list.push({
			x: 120,
			y: 200,
			h: 40,
			w: 40
		});
		list.push({
			x: 160,
			y: 200,
			h: 40,
			w: 40
		});

		list.push({
			x: 200,
			y: 200,
			h: 40,
			w: 40
		});
		list.push({
			x: 240,
			y: 200,
			h: 40,
			w: 40
		});

		list.forEach(function(t, i) {
			if (i % 2 == 0) {
				context.fillStyle = "blue";
			} else {
				context.fillStyle = "red";
			}
			context.fillRect(t.x, t.y, t.w, t.h);
		});
		//return;
		//上 下 左 右
		//方向 下的操作

		function loop() {
			if (!self.param.gameStart) {
				return;
			}
			var first = list[0];
			var len = list.length,
				timer = null,
				direction = self.param.direction;
			if (first.y + 40 >= self.param.maxHeight && direction == 'down') {
				//往下走
				console.log('game over down!!!');
				clearTimeout(timer);
				return;
			}
			if (first.y - 40 < 0 && direction == 'up') {
				//往上走
				console.log('game over up!!!');
				clearTimeout(timer);
				return;
			}
			if (first.x + 40 >= self.param.maxWidth && direction == 'right') {
				//往右走
				console.log('game over right!!!');
				clearTimeout(timer);
				return;
			}
			if (first.x - 40 < 0 && direction == 'left') {
				//往左走
				console.log('game over left!!!');
				clearTimeout(timer);
				return;
			}

			if (first.x == self.param.randPoint.x && first.y == self.param.randPoint.y) {
				//坐标重合 贝齿
				console.log('吃了吃了吃了');
				var last = list[list.length - 1];
				if (list.length > 1) {
					if (list[list.length - 1].y == list[list.length - 2].y) {
						//证明是横着的
						//需要区分蛇头是左 是右
						if (list[0].x < list[1].x) {
							//左
							list.push({
								h: 40,
								w: 40,
								x: last.x + 40,
								y: last.y
							})
						} else {
							//右
							list.push({
								h: 40,
								w: 40,
								x: last.x - 40,
								y: last.y
							})
						}

					} else { //是竖着的
						if (list[0].y < list[1].y) {
							//上
							list.push({
								h: 40,
								w: 40,
								x: last.x,
								y: last.y + 40
							})

						} else {
							list.push({
								h: 40,
								w: 40,
								x: last.x,
								y: last.y - 40
							})
						}

					}
				} else { //需要做的判断仍然很多
					list.push({
						h: 40,
						w: 40,
						x: last.x + 40,
						y: last.y
					})
				}

			}

			for (var i = len - 1; i >= 0; i--) {
				var obj = list[i];
				context.clearRect(obj.x, obj.y, obj.w, obj.h);
				if (i == 0) {
					break;
				}
				list[i] = list[i - 1];
			}
			switch (direction) {
				case 'down':
					list[0] = {
						x: first.x,
						y: first.y + 40,
						h: 40,
						w: 40
					}
					break;
				case 'up':
					list[0] = {
						x: first.x,
						y: first.y - 40,
						h: 40,
						w: 40
					}

					break;
				case 'right':
					list[0] = {
						x: first.x + 40,
						y: first.y,
						h: 40,
						w: 40
					}

					break;
				case 'left':
					list[0] = {
						x: first.x - 40,
						y: first.y,
						h: 40,
						w: 40
					}

					break;
			}


			list.forEach(function(t, i) {
				if (i % 2 == 0) {
					context.fillStyle = "blue";
				} else {
					context.fillStyle = "red";
				}
				context.fillRect(t.x, t.y, t.w, t.h);
			});

			clearTimeout(timer);
			timer = window.setTimeout(function() {
				loop(direction);
			}, 300);
		}

		loop();
	},
	generateRandp: function() {

		var self = this;
		var num = GetRandomNum(0, 7),
			arrX = [0, 40, 200, 400, 600, 240, 280, 360],
			arrY = [0, 80, 120, 160, 200, 800, 360, 200];


		if (self.param.randPoint.x && self.param.randPoint.y) {
			self.param.canvasContext.clearRect(self.param.randPoint.x, self.param.randPoint.y, 40, 40);
		}

		self.param.randPoint = {
			x: arrX[num],
			y: arrY[num]
		}

		if (self.param.gameStart) {
			console.log('生成虫子');
			console.log(self.param.randPoint);

			self.param.canvasContext.fillStyle = '#000000';
			self.param.canvasContext.fillRect(self.param.randPoint.x, self.param.randPoint.y, 40, 40);
		}

		clearTimeout(t);
		var t = window.setTimeout(function() {
			self.generateRandp();
		}, 6000);

		function GetRandomNum(Min, Max) {
			var Range = Max - Min;
			var Rand = Math.random();
			return (Min + Math.round(Rand * Range));
		}
	},


}

TCS.init();