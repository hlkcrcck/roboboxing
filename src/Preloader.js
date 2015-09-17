
function gofull() {

    if (this.game.scale.isFullScreen)
    {
        this.game.scale.stopFullScreen();
    }
    else
    {
        this.game.scale.startFullScreen(false);
    }

}

function gopause() {

    if (this.game.paused==true)
    {
        this.game.paused=false;
    }
    else
    {
        this.game.paused=true;
		
    }

}


Boxer = function(game,p_number,startX,startY) {
	this.score=0;
	this.scoreString='';
	this.scoreText='';
    this.game = game;
	this.cursors = null;
	this.input = null;
	this.p_number = p_number;
	this.startX = startX;
	this.startY = startY;
	this.life = 100;
};
Boxer.prototype = {
     kill: function () {
		this.sprite.kill();
		this.vu1.kill();
		this.vu2.kill();
		this.vu3.kill();
		this.vu4.kill();
		this.vu5.kill();
		this.vu6.kill();
		this.vu7.kill();		
		
		
    },
	
    preload: function () {
		this.game.load.image('player_body','assets/boxer/body.png');
		this.game.load.image('player_top_left','assets/boxer/toparm.png');
		this.game.load.image('player_top_right','assets/boxer/toparm.png');
		this.game.load.image('player_bottom_left','assets/boxer/bottomarm.png');
		this.game.load.image('player_bottom_right','assets/boxer/bottomarm.png');
		this.game.load.image('player_glove_left','assets/boxer/glove.png');
		this.game.load.image('player_glove_right','assets/boxer/glove.png');
		this.game.load.image('player_head','assets/boxer/head.png');
    },
 
    create: function () {
			
		if(this.p_number==BasicGame.myID)
			{
				this.cursors = this.game.input.keyboard.createCursorKeys();
				this.cursors.lp = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
				this.cursors.rp = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
			}

			this.input = {up: false,
							down: false,
							left: false,
							right: false,
							lp: false,
							rp: false};


			    //  Add 2 sprites which we'll join with a constraint
    this.sprite = this.game.add.sprite(this.startX, this.startY, 'player_body');
	this.sprite.anchor.setTo(0.5,0.5);
	
    this.vu1 = this.game.add.sprite(this.startX/2, this.startY, 'player_top_left');
	this.vu1.anchor.setTo(0.5,1);
	
	this.vu2 = this.game.add.sprite(this.startX*1.5, this.startY*1.5, 'player_top_right');
	this.vu2.anchor.setTo(0.5,1);
	
	this.vu3 = this.game.add.sprite(this.startX/3, this.startY*1.5, 'player_bottom_left');
	this.vu3.anchor.setTo(0.5,1);
	
	this.vu4 = this.game.add.sprite(this.startX*1.5, this.startY*1.5, 'player_bottom_right');
	this.vu4.anchor.setTo(0.5,1);
	
	this.vu5 = this.game.add.sprite(this.startX/3, this.startY*1.5, 'player_glove_left');
	this.vu5.anchor.setTo(0.5,0.5);
	
	this.vu6 = this.game.add.sprite(this.startX*1.5, this.startY*1.5, 'player_glove_right');
	this.vu6.anchor.setTo(0.5,0.5);
	
	this.vu7 = this.game.add.sprite(this.startX*1.5, this.startY*1.5, 'player_head');
	this.vu7.anchor.setTo(0.5,0.5);
	
	this.game.physics.p2.enable([this.sprite, this.vu1,this.vu2,this.vu3,this.vu4,this.vu5,this.vu6,this.vu7]);
	this.sprite.body.mass = 1000;
	this.vu1.body.mass = 3;
	this.vu2.body.mass = 3;
	this.vu3.body.mass = 2;
	this.vu4.body.mass = 2;
	this.vu5.body.mass = 50;
	this.vu6.body.mass = 50;
	this.vu7.body.mass = 2;
    //  Lock the two bodies together. The [0, 50] sets the distance apart (y: 80)
	var maxForce = 500000
    var constraint1 = this.game.physics.p2.createRevoluteConstraint(this.vu1, [0, 45],this.sprite,[-95, -20] ,maxForce);
	constraint1.collideConnected = false;
	constraint1.setLimits(0.1,1.2);
	constraint1.setStiffness(5000000);
	var constraint2 = this.game.physics.p2.createRevoluteConstraint(this.vu2, [0, 45],this.sprite,[95, -20] ,maxForce);
	constraint2.collideConnected = false;
	constraint2.setLimits(-1.2,-0.1);
	constraint2.setStiffness(5000000);
	var constraint3 = this.game.physics.p2.createRevoluteConstraint(this.vu1,[0, -45], this.vu3, [0, 50],maxForce);
	constraint3.collideConnected = false;
	constraint3.setLimits(1.7,2.5);
	constraint3.setStiffness(5000000);
	constraint3.setRelaxation(1);
	var constraint4 = this.game.physics.p2.createRevoluteConstraint(this.vu2,[0, -45], this.vu4, [0, 50],maxForce);
	constraint4.collideConnected = false;
	constraint4.setLimits(-2.5,-1.7);
	constraint4.setStiffness(5000000);
	constraint4.setRelaxation(1);
	var constraint5 = this.game.physics.p2.createRevoluteConstraint(this.vu3,[0, -45], this.vu5, [0, 17],maxForce);
	constraint5.collideConnected = false;
	constraint5.setLimits(-0.1,0.1);
	var constraint6 = this.game.physics.p2.createRevoluteConstraint(this.vu4,[0, -45], this.vu6, [0, 17],maxForce);
	constraint6.collideConnected = false;
	constraint6.setLimits(-0.1,0.1);
	var constraint7 = this.game.physics.p2.createRevoluteConstraint(this.sprite,[0, 0], this.vu7, [0, 0],maxForce);
	constraint7.collideConnected = false;
	constraint7.setLimits(-0.1,0.1);
		
	this.game.camera.follow(this.sprite);                //oyuncuyu takip et
	var edge = 200;
	this.game.camera.deadzone = new Phaser.Rectangle(edge*2, edge, this.game.camera.width - (edge * 4), this.game.camera.height - (edge * 2));   

    },
 
    update: function() {if(this.p_number==BasicGame.myID)
				{if(this.cursors.down.isDown!=this.input.down||this.cursors.up.isDown!=this.input.up||this.cursors.right.isDown!=this.input.right||this.cursors.left.isDown!=this.input.left||this.cursors.lp.isDown!=this.input.lp||this.cursors.rp.isDown!=this.input.rp)
{
			this.input = {
				up:this.cursors.up.isDown,
				down:this.cursors.down.isDown,
				left:this.cursors.left.isDown,
				right:this.cursors.right.isDown,
				lp:this.cursors.lp.isDown,
				rp:this.cursors.rp.isDown,
				x:this.sprite.body.x,
				y:this.sprite.body.y,
				angle:this.sprite.body.angle
			};
			BasicGame.eurecaServer.handleKeys(this.input);
		}}
	  this.sprite.body.setZeroVelocity();
	  this.sprite.body.setZeroRotation();
	  this.vu1.body.setZeroRotation();
	  this.vu2.body.setZeroRotation();
	  this.vu3.body.setZeroRotation();
	  this.vu4.body.setZeroRotation();
	  this.vu5.body.setZeroRotation();
	  this.vu6.body.setZeroRotation();
		if (this.input.up)
		{
			this.sprite.body.moveForward(250);
		}
		else if (this.input.down)
		{
			this.sprite.body.moveBackward(250);
		}

		if (this.input.left)
		{
			this.sprite.body.rotateLeft(50);
		}
		else if (this.input.right)
		{
			this.sprite.body.rotateRight(50);
		}
		
		if (this.input.lp)
		{
			this.leftPunch(500000);  //sol at yumruk güç değeri
		}
		else if (this.input.rp)
		{
			this.rightPunch(500000);   //sağ at yumruk güç değeri
		}
		else{
			this.leftGuard(2000);
			this.rightGuard(2000);
		}

    },
	leftPunch: function(punchForce) {  //sol yumruk atma fonksiyonu
		this.vu5.body.force.x = Math.cos(this.sprite.body.rotation-this.game.math.degToRad(60)) * punchForce;
		this.vu5.body.force.y = Math.sin(this.sprite.body.rotation-this.game.math.degToRad(60)) * punchForce;
	},    
	rightPunch: function(punchForce) {  //sağ yumruk atma fonksiyonu
		this.vu6.body.force.x = Math.cos(this.sprite.body.rotation-this.game.math.degToRad(120)) * punchForce; 
		this.vu6.body.force.y = Math.sin(this.sprite.body.rotation-this.game.math.degToRad(120)) * punchForce;
	},   
	leftGuard: function(punchForce) {  //sol gard fonksiyonu
		this.vu5.body.force.x = Math.cos(this.sprite.body.rotation+this.game.math.degToRad(60)) * punchForce;
		this.vu5.body.force.y = Math.sin(this.sprite.body.rotation+this.game.math.degToRad(60)) * punchForce;
	},    
	rightGuard: function(punchForce) {  //sağ gard fonksiyonu
		this.vu6.body.force.x = Math.cos(this.sprite.body.rotation+this.game.math.degToRad(120)) * punchForce; 
		this.vu6.body.force.y = Math.sin(this.sprite.body.rotation+this.game.math.degToRad(120)) * punchForce;
	},
	headDamage: function(){
		
	}
	
};

BasicGame.Preloader = function (game) {

  this.preloadBar = null;

  this.ready = false;

};

BasicGame.Preloader.prototype = {

  preload: function () {
	
    // Create a progress bar based on cropping on image
    this.preloadBar =
      this.add.sprite(this.game.width/2, this.game.height/2, 'preloader-bar');
    this.preloadBar.pivot.x = this.preloadBar.width/2;
    this.preloadBar.pivot.y = this.preloadBar.height/2;

    this.load.setPreloadSprite(this.preloadBar);
			//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.

    // Load game assets here...

    this.load.atlasJSONHash('playnow',
                            'assets/ui/playnow.png',
                            'assets/ui/playnow.json');
    this.load.atlasJSONHash('start',
                            'assets/ui/start.png',
                            'assets/ui/start.json');
    this.load.atlasJSONHash('fullscreen',
                            'assets/ui/fullscreen.png',
                            'assets/ui/fullscreen.json');
							
	this.load.atlasJSONHash('logo',
                            'assets/logo.png',
                            'assets/logo.json');


		this.game.load.image('background','assets/arena.png');

			/*BasicGame.boxer1 = new Boxer(this,1,400,400);
			BasicGame.boxer1.preload();
			
			BasicGame.boxer2 = new Boxer(this,2,700,700);
			BasicGame.boxer2.preload();*/
			BasicGame.boxer1 = new Boxer(this,BasicGame.myID,400,400);
			BasicGame.boxer1.preload();
			
			for (var i in BasicGame.boxersList){
				BasicGame.boxersList[i].preload();
			}
			
		//	+ lots of other required assets here
		this.load.image('splash_image',"assets/start.png");

		this.load.image('company', 'assets/ui/icons/company4.png');
		this.load.image('shadow', 'assets/ui/icons/shadow.png');

  },

  create: function () {
  
    var item;
    var shadow;
    var tween;

    this.preloadBar.cropEnabled = false;
	
	this.preloadBar.visible = false;
	
	this.game.stage.backgroundColor = '#ffffff';
	
	shadow = this.game.add.sprite(this.game.width/2, this.game.height/2, 'shadow');
	shadow.scale.setTo(0.0, 0.0);
	shadow.anchor.setTo(0.5, 0.5);
	this.game.add.tween(shadow.scale).to({x: 0.95, y: 0.95}, 2400, Phaser.Easing.Bounce.Out, true);
	item = this.game.add.sprite(this.game.width/2, -150, 'company');
	item.anchor.setTo(0.5, 0.5);
	tween = this.game.add.tween(item).to( { y: this.game.height/2-35 }, 2400, Phaser.Easing.Bounce.Out, true);
	
	this.game.input.onTap.addOnce(function(){this.state.start('MainMenu');},this);
	

	
    var fullscreen =
      this.add.button(this.game.width-8, this.game.height-8,
                      'fullscreen',
                      BasicGame.toggleFullscreen,
                      this,
                      'over', 'up', 'down');
    fullscreen.pivot.x = fullscreen.width;
    fullscreen.pivot.y = fullscreen.height;

  },

};
