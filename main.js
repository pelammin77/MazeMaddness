    /*   
    Author: Petri Lamminaho 
    Maze Maddness HTML 5 2.5D game 
    MArble Maddness clone
    Uses Phaser.js and Phaser isometric plugin   
    Uses mobile device's acceleration sensor  to control the ball 
    made summer/fall 2016 
   file: main.js 
*/
    
    
    var innerW = window.innerWidth;
    var innerH = window.innerHeight;
    var gameRatio = innerW/innerH;
    var game = new Phaser.Game(window.innerWidth*gameRatio, window.innerHeight*gameRatio ,Phaser.AUTO, 'gameDiv');
    var isoTiles;
    var walls;
    var maali;
    var maaliGroup;
    var ball;
    var laxtoX, lahtoY, maaliX, maaliY ;
    var player;
    var elamat;
    var kenttaNumero;
    var ajastin;
    var totalTime;
    var levelTime;
    var labelAjastin;
    var labelTotalTime;
    var labelElamat;
    var labelLevels;
    var taulunOtsikot = ["Level", "Time"];
    var tulokset =[];
    var maxLevels=11;

var style = 
    { 
    font: "100px Arial", 
    fill: "#ff0000",
    align: "center" 
    };

 var tauluStyle = 
 { 
   font: "50px Courier", fill: "#fff", 
   tabs: [ 180, 130, 80] 

}; 


/********************************
 * Define levels 
 ********************************/
var kentta2 =
    [
     "s000000000",
     "     0    ",    
     "     0    ",
     "   00000  ",
     "     0    ",    
     "     0    ",
     "     0    ",
     "     0    ",
     "     0    ",
     "     0    ",
     "    0f0   ",
    ];


var kentta1 =
    [
     "    0s0   ",
     "     0    ",    
     "     0    ",
     "  000000  ",
     "  0  0    ",    
     "  0  0    ",
     "  0  0    ",
     "  0  0    ",
     "  0  0    ",
     "  0  0    ",
     "  0  0    ",
     "  0  0    ",
     "  0  0    ",
     "  0  0    ",
     "  0  0    ",
     "  0  0    ",
     "     0    ",
     "     0    ",
     "     0    ",
     "     0    ",
     "    0f0   ",
    ];


var kentta6 =
    [
     "f000000000",
     "     0    ",    
     "     0    ",
     "   00000  ",
     "     0    ",    
     "     0    ",
     "     0    ",
     "     0    ",
     "     0    ",
     "     0    ",
     "    0s0   ",
    ];



var kentta4 =
    [
     "s        0",
     "0        0",    
     "0   000000",
     "0   0    0",
     "0   0    0",    
     "0   00   0",
     "0    0   0",
     "0    0   0",
     "0  f00   0",
     "0        0",
     "0000000000",
    ];

var kentta3 =
    [
     "s  00000000000",
     "0  0         0",
     "0  0  0000   0",    
     "0  0  0  0   0",
     "0  0  0  0   0",
     "0  0  0  0   0",    
     "0  0  0  0   0",
     "0  0  0  0   0",
     "0  0  f  0   0",
     "0  0     0   0",
     "0  0000000   0",
     "0            0",
     "00000000000000",
    ];

var kentta5 =
    [
     "f  00000000000",
     "0  0         0",
     "0  0  0000   0",    
     "0  0  0  0   0",
     "0  0  0  0   0",
     "0  0  0  0   0",    
     "0  0  0  0   0",
     "0  0  0  0   0",
     "0  0  s  0   0",
     "0  0     0   0",
     "0  0000000   0",
     "0            0",
     "00000000000000",
    ];

var kentta7 =
    [
     "s00000000      f",
     "000000000      0",    
     "       00      0",
     "        0      0",
     "        0      0",    
     "        0      0",
     "        0      0",
     "        0      0",
     "000000000      0",
     "000000000      0",
     "000000000      0",
     "      00       0",
     "      00       0",
     "     00000     0",
     "        00     0",
     "         0000000",
    ];

var kentta10 =
    [
     "s0000  f000000   ",
     "    00       0   ",    
     "    00      0    ",
     "000000     0     ",
     "0         0      ",    
     "0          0     ",
     "000         0    ",
     "   0         0   ",
     "    0         0  ",
     "     0         0 ",
     "      00000000000",
    ];


  var kentta8 =
    [
     "f         ",
     "0         ",    
     " 0        ",
     "  000      ",
     "   000    ",    
     "    000   ",
     "     00   ",
     "      00  ",
     "       00 ",
     "        00",
     "         s",
    ];


var kentta11 =
    [
     "s         ",
     "0         ",    
     " 0        ",
     "  0       ",
     "   0      ",    
     "    0     ",
     "     0    ",
     "      0   ",
     "       0  ",
     "        0 ",
     "         f",
    ];




var kentta9 =
    [
     "f        0",
     "0        0",    
     "0   000000",
     "0   0    0",
     "0   0    0",    
     "0   00   0",
     "0    0   0",
     "0    0   0",
     "0  s00   0",
     "0        0",
     "0000000000",
    ];

//-------------------------------------------------------
//levels ends 
//-------------------------------------------------------

    var nykyinenKentta;

//Phaser state bootState 
var bootState ={
};

var preloadState ={
    preload: function(){
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL ;
	  game.scale.updateLayout();    
      game.load.image('board', 'board.png');
      game.load.image('maali','finish.png')
      game.load.image('ball', 'ball.png');
      game.load.image('lippu','maali_lippu.png');   
    },

    create: function(){
        game.state.start('menu');
    },
};
var mainMenuState = {
    create: function(){
        game.world.scale.set(1);
        game.stage.backgroundColor = '#FFFFFF';
        var text = "Mace 2.5D";
        game.add.text(screen.width/2, 0, text, style);
        this.input.onTap.addOnce(this.aloitaPeli, this);
    },

   aloitaPeli: function(){
     game.state.start('main');
   },
};

var gameOverState ={ 
    create:function(){
    game.world.scale.set(1);
    game.stage.backgroundColor = 'blue';
    var text = "Game over";
    game.add.text(100, 0, text, style);
    tulostaTulokset();
    this.input.onTap.addOnce(restart, this);
     },
};

var gameState = {
    preload: function(){
      game.stage.backgroundColor='black';
      game.time.advancedTiming = true;
      game.plugins.add(new Phaser.Plugin.Isometric(game));
      game.iso.anchor.setTo(0.2, 0.1);
      game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
      game.physics.isoArcade.gravity.setTo(0, 0, -500);

  },

    create: function(){
        tulokset=[];
        kenttaNumero = 1;
        elamat = 3;
        totalTime = 0;
        game.world.setBounds(0, 0, window.innerWidth+2000, window.innerHeight+2000);
        this.luoKentta();
        this.alustaOhjaus();
        this.alustaAjastin();
        game.camera.x=game.width/2;game.camera.y=game.height/2;
        game.world.scale.set(2.0);
        if(game.device.desktop){
          game.world.scale.set(2.5);
         }
        if(game.device.iOS) {
          game.world.scale.set(1.5);
        }
    if(game.device.android) {
        game.world.scale.set(2.0);
    }

},
    alustaOhjaus: function(){
       if (window.DeviceOrientationEvent) {
          console.log("DeviceOrientation is supported");
          window.addEventListener("deviceorientation",this.handleOrientation);
         }
       else {
        console.error("This browser do not support DeviceOrientation");
            }
        this.cursors = game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.SPACEBAR
        ]);
  },

    handleOrientation: function(e){
        var x = e.gamma*9;
        var y = e.beta*9;
        player.body.velocity.x = x;
        player.body.velocity.y = y;
        player.body.maxVelocity.x= 200;
        player.body.maxVelocity.y= 200;
},
    alustaAjastin:function(){
        ajastin= game.time.create(false);
        ajastin.loop(1000, this.lisaaAikaa, this);
        ajastin.start();
    },
    lisaaAikaa:function(){
        levelTime++;
        totalTime++;
        labelAjastin.text = "Time: "+ levelTime;
        labelTotalTime.text = "Total time: "+ totalTime;        

    },
    update: function(){
      if(player.body.z<-500)
        {
          this.palloTippui();            
          }
       var speed = 400;
       player.body.acceleration.y = 0;
       player.body.acceleration.x = 0;       
        if (this.cursors.up.isDown) {
          player.body.acceleration.y -= speed;
        }
        else if (this.cursors.down.isDown) {
          player.body.acceleration.y += speed;
        }
        else {
          player.body.acceleration.y = 0;
        }
        if(this.cursors.left.isDown) {
          player.body.acceleration.x -= speed;
        }
        else if (this.cursors.right.isDown) {
          player.body.acceleration.x += speed;
        }
        else{
          player.body.acceleration.x = 0;
         }
       game.physics.isoArcade.collide(isoTiles);
       game.physics.isoArcade.overlap(maali,player,this.palloTuliMaaliin,null,this);
    },
     palloTippui:function(){
      player.body.velocity.x=0;
      player.body.velocity.y=0;
      elamat--;
      if(elamat<1)   game.state.start('gameOver');          
      player.body.x= lahtoX;
      player.body.y=lahtoY;
      player.body.z = 5;
      labelElamat.text = 'Balls:'+ elamat;
    },

    palloTuliMaaliin:function(){
      alert("Pallo maalisssa");
      var tulos = "Level" + kenttaNumero+" "+levelTime + " sec";
      tulokset.push([tulos]);
      game.world.removeAll();
      kenttaNumero++;
      this.luoKentta();
    },
    valitseKentta: function(){
      switch(kenttaNumero){
        case 1: nykyinenKentta = kentta1;
            break;
        case 2: nykyinenKentta = kentta2;
            break;
        case 3: nykyinenKentta = kentta3;
            break;
        case 4: nykyinenKentta = kentta4;
            break;
        case 5: nykyinenKentta = kentta5;
            break;
        case 6: nykyinenKentta = kentta6;
             break;
        case 7: nykyinenKentta = kentta7;
             break;
        case 8: nykyinenKentta = kentta8;
             break;
        case 9: nykyinenKentta = kentta9;
            break;
        case 10: nykyinenKentta = kentta10;
            break;    
        case 11: nykyinenKentta = kentta11;
          default:
              this.peliLapaisty();          
    }

  },
    peliLapaisty:function(){
       game.state.start('gameOver');
    },

   luoKentta:function(){
       levelTime =0;
       this.valitseKentta();
       isoTiles = game.add.group();
       ball = game.add.group();
       maaliGroup = game.add.group();
       var tile;
       var kenttaJono ="";
       for(var i=0; i<nykyinenKentta.length; i++)
       {
          var jono = nykyinenKentta[i];
       for (var j=0; j<jono.length; j++){
          var merkki = jono[j];
            if(merkki=="0"){
                tile = game.add.isoSprite(j*38,i*38,0,'board',0,isoTiles);
                game.physics.isoArcade.enable(tile);
                tile.body.moves = false;
				tile.body.immovable = true;
                tile.anchor.set(0.5, 0);
                }
            else if(merkki=='s'){
                tile = game.add.isoSprite(j*38,i*38,0,'board',0,isoTiles);
                 game.physics.isoArcade.enable(tile);
                tile.body.moves = false;
				tile.body.immovable = true;
                tile.anchor.set(0.5, 0);
                lahtoX = j*38;
                lahtoY = i*38;
                }
            else if(merkki=='f'){
              tile = game.add.isoSprite(j*38,i*38,0,'maali',0,isoTiles);
              game.physics.isoArcade.enable(tile);
              tile.body.moves = false;
			  tile.body.immovable = true;
              tile.anchor.set(0.5, 0);
              maaliX=j*38;
              maaliY=i*38;
              maali = game.add.isoSprite(maaliX,maaliY, 0,'lippu',0,maaliGroup);
              game.physics.isoArcade.enable(maali);
	          maali.body.collideWorldBounds = true;
	          maali.anchor.set(0.5, 0);
            }
        }
     }
    player = game.add.isoSprite(lahtoX, lahtoY, 15,'ball',0, isoTiles);
    game.physics.isoArcade.enable(player);
    player.body.bounce.set(0.7, 0.7);
    player.body.drag.x=50;
    player.body.drag.y=50;
    game.camera.follow(player);
    labelAjastin = game.add.text(20, 40,'Time:',{font: "30px Arial", fill: "#ffffff"});   
    labelTotalTime = game.add.text(20, 150, 'Total time:'+totalTime,{font: "20px Arial", fill: "#ffffff"});
    labelElamat = game.add.text(300,80,'Balls:' + elamat, {font: "30px Arial", fill: "#ffffff"} )
    labelLevels = game.add.text(600,80,'Level:'+kenttaNumero+" /"+maxLevels, {font: "30px Arial", fill: "#ffffff"} );
    labelAjastin.fixedToCamera = true;
    labelAjastin.cameraOffset.setTo(20,40); 
    labelTotalTime.fixedToCamera = true;
    labelTotalTime.cameraOffset.setTo(20,150);
    labelElamat.fixedToCamera = true;
    labelElamat.cameraOffset.setTo(screen.width-10,80);
    labelLevels.fixedToCamera = true;
    labelLevels.cameraOffset.setTo(screen.width-10, 150);
 },
};

    var gameCompliteState={  
       create:function(){
          game.stage.backgroundColor = '#FFFFFF';
          var textGameComplete = "Game completed";
          game.add.text(100, 0, textGameComplete, style);
          tulostaTulokset();
          var textTotalTime = "Your total time is: " + totalTime + "seconds";
          this.input.onTap.addOnce(restart, this);
    },
};

    function restart(){
     game.state.start('menu');
}

    function tulostaTulokset(){
       var otsikkoTekstit = game.add.text(300,300,'',tauluStyle);
           otsikkoTekstit.parseList(taulunOtsikot); 
       var tuloksetTekstit = game.add.text(300,450,'',tauluStyle);
           tuloksetTekstit.parseList(tulokset);      
}

    game.state.add('main', gameState);  
    game.state.add('boot', bootState);
    game.state.add('preload', preloadState);
    game.state.add('menu', mainMenuState);
    game.state.add('gameOver', gameOverState);
    game.state.add('gameComplete',gameCompliteState);
    game.state.start('preload');  
