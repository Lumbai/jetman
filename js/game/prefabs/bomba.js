var Bomba = function(game,x,y,key,frame){
    key = 'bomba';
    Phaser.Sprite.call(this,game,x,y,key,frame);
    
    this.scale.setTo(0.8);
    this.anchor.setTo(0.5);
    
    this.animations.add('at');
    this.animations.play('at',8,true);
    
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = true;
    
    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;
    
    this.events.onKilled.add(this.onKilled,this);
    this.events.onRevived.add(this.onRevived,this);
    this.hiz = 50 ;
};
Bomba.prototype = Object.create(Phaser.Sprite.prototype);
Bomba.prototype.constructor = Bomba ;

Bomba.prototype.onRevived = function(){
    this.body.velocity.x = this.hiz;
    this.animations.play('at',10,true);
}

Bomba.prototype.onKilled = function(){
    this.animations.frame = 0 ;
}