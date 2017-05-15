window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          }
})()

	var canvas=document.getElementById('canvas');
	var ctx=canvas.getContext("2d");
	var particle = [], w,h;
	var delay = 200,tid;
	var option = {
		particleAmount:60,
		defaultSpeed:1,
		varientSpeed:1,
		defaultRadius:6,
		varientRadius:2,
		particleColor: "rgb(32,245,245)",       //粒子的颜色
        lineColor:"rgb(32,245,245)",
        minDistance: 200 
    }; 
    var line=option.lineColor.match(/\d+/g);
	function getSize(){
        w = canvas.width = document.body.scrollWidth;
        h = canvas.height = document.body.scrollHeight;
    }
		function Partical(x,y){
        this.x=Math.random()*x;
        this.y=Math.random()*y;
        this.speed=option.defaultSpeed+option.varientSpeed*Math.random();
        this.radius=option.defaultRadius+option.varientRadius*Math.random();
        this.angle=Math.floor(Math.random()*360);
        this.color=option.particleColor;
        this.vector={
        	x:this.speed*Math.cos(this.angle),
        	y:this.speed*Math.sin(this.angle)
        }
       
		}
      Partical.prototype.draw=function(ctx){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius ,0 ,Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = this.color;
            ctx.fill();

}
        Partical.prototype.update=function(){
        	this.border();
        	this.x += this.vector.x;
        	this.y += this.vector.y;
        }
        Partical.prototype.border=function(){
        	if(this.x>=w||this.x<=0) this.vector.x*= -1;
        	if(this.y >= h || this.y <= 0) this.vector.y *= -1;
            if(this.x>w) this.x=w;
            if(this.x<0) this.x=0;
            if(this.y>h) this.y=h;
            if(this.y<0) this.y=0;
        }

        Partical.prototype.drawline=function(ctx,p){
            var dx = this.x - p.x 
	        var dy = this.y - p.y
	        var d = Math.sqrt(dx * dx + dy * dy)
	        if(d < 200) {
		     var opacity = (200 - d) / 200 * 1 
		      ctx.beginPath()
		      ctx.moveTo(this.x, this.y)
		      ctx.lineTo(p.x, p.y)
		      ctx.closePath()
		      ctx.strokeStyle = "rgba("+line[0]+","+line[1]+","+line[2]+","+opacity+")";
		      ctx.strokeWidth = 2
		      ctx.stroke()
	        }
        }

        function init(){
        getSize();
        for(let i = 0;i<option.particleAmount; i++){
            particle.push(new Partical(w,h));
        }
        loop();
    }
init()
    function loop(){
        ctx.clearRect(0,0,w,h);
        for(var i = 0;i<particle.length; i++){
            particle[i].update();
            particle[i].draw(ctx);
            for(var j = i+1;j<particle.length; j++){
            particle[i].drawline(ctx,particle[j])
        }
        }
        
        requestAnimationFrame(loop);
    }
  function winResize(){
        clearTimeout(tid);
        tid = setTimeout(function(){
            getSize();
        },delay)
    }    
window.addEventListener('load', loop())
window.addEventListener('resize', function() {
	 winResize()
},false)
