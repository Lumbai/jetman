var Elektirik = function(game, x, y, key, frame){
    key = 'elektirik';
    Phaser.Sprite.call(this,game,x,y,key,frame);
    
    this.scale.setTo(0.25);
    this.anchor.setTo(0.5);
    
    this.animations.add('elektirik');
    this.animations.play('elektirik',8,true);

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    
    this.checkWorldBounds = true ;
    this.onOutOfBoundsKill = true;
    
    this.events.onRevived.add(this.onRevived,this);
    this.hiz = -400;
};
Elektirik.prototype = Object.create(Phaser.Sprite.prototype);
Elektirik.prototype.constructor = Elektirik;

Elektirik.prototype.onRevived = function(){
    this.body.velocity.x = this.hiz;
};
