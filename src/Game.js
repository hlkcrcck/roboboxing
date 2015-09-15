
BasicGame.Game = function (game) {
  // When a State is added to Phaser it automatically has the
  // following properties set on it, even if they already exist:
  this.game;       //  a reference to the currently running game
  this.add;        //  used to add sprites, text, groups, etc
  this.camera;     //  a reference to the game camera
  this.cache;      //  the game cache
  this.input;      //  the global input manager (you can access
                   //  this.input.keyboard, this.input.mouse, as well
                   //  from it)
  this.load;       //  for preloading assets
  this.math;       //  lots of useful common math operations
  this.sound;      //  the sound manager - add a sound, play one,
                   //  set-up markers, etc
  this.stage;      //  the game stage
  this.time;       //  the clock
  this.tweens;     //  the tween manager
  this.world;      //  the game world
  this.particles;  //  the particle manager
  this.physics;    //  the physics manager
  this.rnd;        //  the repeatable random number generator

 //  You can use any of these from any function within this State.
 //  But do consider them as being 'reserved words', i.e. don't create
 //  a property for your own game called "world" or you'll over-write
 //  the world reference.

};


BasicGame.Game.prototype = {

  create: function () {
	
	BasicGame.juicy = this.game.plugins.add(Phaser.Plugin.Juicy); //ekran sallama plugini
	
	this.game.add.tileSprite(0, 0, 1000, 1000, 'background');
	this.game.world.setBounds(100, 100, 800, 800);                     
	
	this.game.physics.startSystem(Phaser.Physics.P2JS);  

	this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;   //f e bastiğinda tam ekrana gec 
	fullButton = this.game.input.keyboard.addKey(Phaser.Keyboard.F);		
	fullButton.onDown.add(gofull, this);

	pauseButton = this.game.input.keyboard.addKey(Phaser.Keyboard.P);			//p e bastiğinda durdur
	pauseButton.onDown.add(gopause, this);
	
	restartButton = this.game.input.keyboard.addKey(Phaser.Keyboard.R);			//r e bastiğinda restart
	restartButton.onDown.add(BasicGame.restart, this);
		
	this.game.input.addPointer();  //dokunmatik  
	
	BasicGame.stateText = this.game.add.text(this.game.world.centerX,this.game.world.centerY,' ', { font: '84px Arial', fill: '#fff' }); //oyun bitince
    BasicGame.stateText.anchor.setTo(0.5, 0.5);
    BasicGame.stateText.visible = false;
	
	BasicGame.boxer1.create();

		//  The score
    BasicGame.boxer1.scoreString = 'Score : ';
    BasicGame.boxer1.scoreText = BasicGame.boxer1.game.add.text(10, 10, BasicGame.boxer1.scoreString + BasicGame.boxer1.score, { font: '34px Arial', fill: '#fff' });
	
    var fullscreen =
      this.add.button(this.game.width-8, this.game.height-8,
                      'fullscreen',
                      BasicGame.toggleFullscreen,
                      this,
                      'over', 'up', 'down');
    fullscreen.pivot.x = fullscreen.width;
    fullscreen.pivot.y = fullscreen.height;
	
	var restartbut =
      this.add.button(this.game.width-98, this.game.height-8,
                      'fullscreen',
                      BasicGame.restart,
                      this,
                      'over', 'up', 'down');
    restartbut.pivot.x = restartbut.width;
    restartbut.pivot.y = restartbut.height;

  },

  update: function () {

		BasicGame.boxer1.update();
		
  },
  
  quitGame: function (pointer) {

    this.state.start('MainMenu');
  }

};
