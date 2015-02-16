var SkorBoard = function(game){
    Phaser.Group.call(this, game);
}

SkorBoard.prototype = Object.create(Phaser.Group.prototype);
SkorBoard.prototype.constructor = SkorBoard;

SkorBoard.prototype.show = function(skor){
    skor = parseFloat(skor);
    var bmd,background,gameoverText,scoreText,highScoreText,newHighScoreText,startText;
    bmd = this.game.add.bitmapData(this.game.width,this.game.height);
    bmd.ctx.fillStyle = '#000';
    bmd.ctx.fillRect(0,0,this.game.width,this.game.height);
    
    background = this.game.add.sprite(0,0,bmd);
    background.alpha = 0.5;
    
    this.add(background);
    
    var isNewHighScore = false;
    var highscore = parseFloat(localStorage.getItem('highscore'));
    
    if(!highscore || highscore < skor){
        isNewHighScore = true ;
        highscore = skor;
        localStorage.setItem('highscore',highscore);
    }
    
    this.y = this.game.height;
    
    gameoverText = this.game.add.bitmapText(0,100,'minecraftia','You Died.',18);
    gameoverText.x = this.game.width/2 - (gameoverText.textWidth/2);
    this.add(gameoverText);
    
    scoreText = this.game.add.bitmapText(0,140,'minecraftia','Your Score: ' + skor + ' mt',18);
    scoreText.x = this.game.width/2 - (scoreText.textWidth/2);
    this.add(scoreText);
    
    highScoreText = this.game.add.bitmapText(0,180,'minecraftia','Your High Score: ' + localStorage.getItem('highscore') + ' mt',18);
    highScoreText.x = this.game.width/2 - (highScoreText.textWidth/2);
    this.add(highScoreText);
    
    startText = this.game.add.bitmapText(0,220,'minecraftia','Tap to play again!',18);
    startText.x = this.game.width/2 - (startText.textWidth/2);
    this.add(startText);
    
    if(isNewHighScore){
        newHighScoreText = this.game.add.bitmapText(0,100,'minecraftia','New High Score!',12);
        newHighScoreText.tint = 0x4ebef7;//#4ebef7
        newHighScoreText.x = gameoverText.x + gameoverText.textWidth + 40;
        newHighScoreText.angle = 45;
        this.add(newHighScoreText);
    }
    
    this.game.add.tween(this).to({y:0},1000,Phaser.Easing.Bounce.Out,true);
    
    this.game.input.onDown.addOnce(this.restart,this);
};

SkorBoard.prototype.restart = function(skor){
    this.game.state.start('Game',true,false);
};