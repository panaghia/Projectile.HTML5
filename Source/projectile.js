
var Projectile = new Class({
	Implements: [Options, Events],
	options:
	{
		inity: null,
		initx: null,
		v0x: null,
		v0y: null,
		posx: 0,
		posy: 0,
		radius: 15,
		vel: 40,
		angle:45,
		context: null,
		frameCount: 0,
		gravity: 9.8,
		moving: false,
		start: null
	},
	initialize: function(options)
	{
		this.setOptions(options);
		this.options.v0x = this.options.vel * Math.cos(this.options.angle * Math.PI/180);
		this.options.v0y = this.options.vel * Math.sin(this.options.angle * Math.PI/180);
		this.options.inity = this.options.posy;
		this.options.initx = this.options.posx;
		
		this.render();
	},
	render: function()
	{
		if(this.options.moving)
		{
			var currentTime = new Date().getTime()/100;
			var delta = currentTime - this.options.start;
			this.options.frameCount = delta;
		}
		else
			this.options.frameCount = 0;
		
		ctx.beginPath();
			ctx.fillStyle = "rgba(0, 200, 0, 0.6)";
			ctx.arc(this.options.posx,this.options.posy,this.options.radius,0,Math.PI*2,true);
			ctx.fill();
			ctx.stroke();
		ctx.closePath();
		if(this.options.moving)
		{
		
			this.options.posx = this.options.initx + this.options.v0x * this.options.frameCount;
						
			var py =  (this.options.v0y * this.options.frameCount) - (1/2*this.options.gravity*(this.options.frameCount*this.options.frameCount));
			this.options.posy = this.options.inity - py;		
			
			var res = new Number(py);
			
			if(this.options.posy >= document.id('canv').getSize().y - this.options.radius) //this.options.inity && this.options.frameCount>0)
			{
				this.stop();
				this.options.posy = document.id('canv').getSize().y - this.options.radius
			}
			
			var currentVY = this.options.vel * Math.sin(this.options.angle * Math.PI/180) - this.options.gravity * this.options.frameCount;
			
			/*var dm =  'posx: '+this.options.posx+
						'<br/>posy: '+this.options.posy+
						'<br/>time: '+this.options.frameCount+
						'<br/>vel: '+this.options.v0x+
						'<br/>vely: '+currentVY;
						
			document.id('debug').set('html', dm);*/

		}
		
	},
	start: function()
	{
		this.options.moving = true;
		var time = new Date();
		this.options.start =  time.getTime()/100;
	},
	stop: function()
	{
		this.options.moving = false;
	},
	setVelocity: function(newVel)
	{
		this.options.vel = newVel;
		this.options.v0x = this.options.vel * Math.cos(this.options.angle * Math.PI/180);
		this.options.v0y = this.options.vel * Math.sin(this.options.angle * Math.PI/180); 
	},
	setAngle: function(newAngle)
	{
		this.options.angle = newAngle;
	}
});