
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
	this.p_number = p_number;
	this.startX = startX;
	this.startY = startY;
};
Boxer.prototype = {
 
    preload: function () {
		this.game.load.image('player_body','assets/boxer/body.png');
		this.game.load.image('player_top_left','assets/boxer/toparm.png');
		this.game.load.image('player_top_right','assets/boxer/toparm.png');
		this.game.load.image('player_bottom_left','assets/boxer/bottomarm.png');
		this.game.load.image('player_bottom_right','assets/boxer/bottomarm.png');
		this.game.load.image('player_glove_left','assets/boxer/glove.png');
		this.game.load.image('player_glove_right','assets/boxer/glove.png');
    },
 
    create: function () {
			
		if(this.p_number==1)
			{this.cursors = this.game.input.keyboard.createCursorKeys();
			}
		if(this.p_number==2)
			{
			this.cursors = {up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
							down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
							left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
							right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)};				
			}

		this.sprite = this.game.add.sprite(this.startX,this.startY, 'player_body');  //boksörün ana vücudu
		this.game.physics.p2.enable(this.sprite);
		
		var maxForce = 20000;
		
		this.topleftarm = this.game.add.sprite(this.startX-60,this.startY, 'player_top_left');  //sol kol vücud bağlantısı
		//this.game.physics.p2.enable(this.topleftarm);
		//this.game.physics.p2.createRevoluteConstraint(this.sprite, [-10, 0], this.topleftarm, [10, 0], maxForce);
		
		
		
		this.game.camera.follow(this.sprite);                //oyuncuyu takip et
		
		var edge = 100;
		this.game.camera.deadzone = new Phaser.Rectangle(edge, edge, this.game.camera.width - (edge * 2), this.game.camera.height - (edge * 2));   
		this.sprite.body.collideWorldBounds = true;

		
		//this.sprite.body.setSize(70, 70, 0, 0);
		
		//this.sprite.body.bounce.set(0.8);
		//this.sprite.body.maxVelocity.set(160);
		//this.sprite.body.drag.set(50);
    },
 
    update: function() {
		
	  this.sprite.body.setZeroVelocity();

		if (this.cursors.up.isDown)
		{
			this.sprite.body.moveUp(300)
		}
		else if (this.cursors.down.isDown)
		{
			this.sprite.body.moveDown(300);
		}

		if (this.cursors.left.isDown)
		{
			this.sprite.body.velocity.x = -300;
		}
		else if (this.cursors.right.isDown)
		{
			this.sprite.body.moveRight(300);
		}

    },
	
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

			BasicGame.boxer1 = new Boxer(this,1,300,300);
			BasicGame.boxer1.preload();
			
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
