var Roket = function(game, x, y, key, frame){
    key = 'roket';
    Phaser.Sprite.call(this,game,x,y,key,frame);
    
    this.scale.setTo(0.3);
    this.anchor.setTo(0.5);
    this.animations.add('roket');
    this.animations.play('roket',8,true);
    
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    
    this.checkWorldBounds = true ;
    this.onOutOfBoundsKill = true;
    
    this.events.onRevived.add(this.onRevived,this);
    this.zorluk = 1;
};
Roket.prototype = Object.create(Phaser.Sprite.prototype);
Roket.prototype.constructor = Roket;

Roket.prototype.onRevived = function(){
    this.body.velocity.x = -550 * this.zorluk;
};
