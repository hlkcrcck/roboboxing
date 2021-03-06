BasicGame = {
	stateText:null,
	juicy:null,
	shield:false,
    music: null,
	orientated: false,
	fullscreen: false,
	boxersList:{},
	boxer1:null,
	myID:null,
	ready:null,
	eurecaServer:null,
};

BasicGame.toggleFullscreen = function() {
  if (this.scale.isFullScreen) {
    this.scale.stopFullScreen(false);
  } else {
    this.scale.startFullScreen(false);
  }
}

BasicGame.restart = function() {
	this.state.restart();
};


BasicGame.Boot = function(game) {
};

BasicGame.Boot.prototype = {

  init: function() {

    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    this.stage.backgroundColor = '#336699';

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    if (this.game.device.desktop) {
    } else {            
      this.scale.forceOrientation(true, false);
      this.scale.enterIncorrectOrientation
        .add(this.enterIncorrectOrientation, this);
      this.scale.leaveIncorrectOrientation
        .add(this.leaveIncorrectOrientation, this);
    }
	
	this.game.scale.pageAlignHorizontally = true;
	this.game.scale.pageAlignVertically = true;
	this.game.scale.refresh();
    this.scale.refresh();

  },

  preload: function() {

	
    this.load.image('preloader-bar', 'assets/ui/preloader-bar.png');
  },

  create: function() {

    this.state.start('Preloader');

  },

  enterIncorrectOrientation: function() {
    BasicGame.orientated = false;
    document.getElementById('orientation').style.display = 'block';
  },

  leaveIncorrectOrientation: function() {
    BasicGame.orientated = true;
    document.getElementById('orientation').style.display = 'none';
  }

};
