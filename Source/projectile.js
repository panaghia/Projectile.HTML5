var pro = {
				x:50,
				y:380,
				r:15,
				v:80,
				theta: 45
				};
				
				var canvas = document.getElementById('surface');
				var ctx = canvas.getContext('2d');
				
				var frameCount = 0;
				var v0x = pro.v * Math.cos(pro.theta * Math.PI/180);
				var v0y = pro.v * Math.sin(pro.theta * Math.PI/180);
				var startX = pro.x;
				var startY = pro.y;
				var g = 9.8;
				setInterval(function()
				{
					//smooth clear
					ctx.save();
						ctx.fillStyle = "rgba(0, 0, 0, .3)";
						ctx.fillRect(0, 0, canvas.width, canvas.height);
					ctx.restore();
					
					if(pro.y<canvas.height - pro.r && pro.x < canvas.width - pro.r)
					{
						pro.y = startY - ( v0y * frameCount - (1/2 * g * Math.pow(frameCount,2)) );
						pro.x = startX + v0x * frameCount;
					}
						
					ctx.save();
						ctx.beginPath();
						ctx.fillStyle = "rgba(0, 200, 0, 0.6)";
						ctx.arc(pro.x,pro.y,pro.r,0,Math.PI*2,true);
						ctx.fill();
						ctx.stroke();
						ctx.closePath();
					ctx.restore();
					frameCount+=.1;
						
				}, 1000 / 77);