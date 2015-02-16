var Para = function(game,x,y,key,frame){
    key = 'para';
    Phaser.Sprite.call(this,game,x,y,key,frame);
    
    this.scale.setTo(0.35);
    this.anchor.setTo(0.5);
    
    this.animations.add('don');
    
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    
    this.checkWorldBounds = true;
    this.onOutOfBoundsKill = true;
    
    this.events.onKilled.add(this.onKilled,this);
    this.events.onRevived.add(this.onRevived,this);
    this.hiz = -400 ;
};
Para.prototype = Object.create(Phaser.Sprite.prototype);
Para.prototype.constructor = Para ;

Para.prototype.onRevived = function(){
    this.body.velocity.x = this.hiz;
    this.animations.play('don',10,true);
}

Para.prototype.onKilled = function(){
    this.animations.frame = 0 ;
}