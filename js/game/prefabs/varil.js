var Varil = function(game, x, y, key, frame){
    key = 'varil';
    Phaser.Sprite.call(this,game,x,y,key,frame);
    
    this.scale.setTo(0.7);
    this.anchor.setTo(0.5);

    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    
    this.checkWorldBounds = true ;
    this.onOutOfBoundsKill = true;
    
    this.events.onRevived.add(this.onRevived,this);
    this.hiz = -400;
};
Varil.prototype = Object.create(Phaser.Sprite.prototype);
Varil.prototype.constructor = Varil;

Varil.prototype.onRevived = function(){
    this.body.velocity.x = this.hiz;
};
