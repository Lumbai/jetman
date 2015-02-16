LumbaiRunner.MainMenu = function(){}

LumbaiRunner.MainMenu.prototype = {
    create : function(){
        this.background = this.game.add.tileSprite(0, -100, this.game.width, 512, 'arkaplan');
        this.background.autoScroll(-60,0);
        
        this.foreground = this.game.add.tileSprite(0,230, this.game.width,79,'onplan');
        this.foreground.autoScroll(-130,0);
        
        this.ground = this.game.add.tileSprite(0, this.game.height -70,this.game.width,153,'yer');
        this.ground.autoScroll(-400,0);//Eklenen gorselin sola doğru kaymasını sağlıyoruz
        
        this.player = this.add.sprite(120,this.game.height/2, 'jetman');//Sprite ekliyoruz
        this.player.anchor.setTo(0.5);//Resmin merkez noktasını ayarlıyoruz
        this.player.scale.setTo(0.4);//Resim boyutunu küçültüyoruz
        
        this.player.animations.add('uc',[10,11,12,13,14,13,12,11]);//Eklediğimiz spriteda ikinci parametredeki kareler arasında animasyon oluşturuyoruz
        this.player.animations.play('uc',8,true);//Animasyonu saniyede 8 kare olacak ve tekrar edecek şekilde oynatıyoruz.
        
        this.game.add.tween(this.player).to({y:this.player.y - 20},500,Phaser.Easing.Linear.NONE,true,0,Infinity,true); // Karakteri aşağı yukarı smooth birşekilde oynatıyoruz
        this.splash = this.add.sprite(this.game.world.centerX,this.game.world.centerY,'logo');//Logomuzu tekrar yüklüyoru ekarana
        this.splash.anchor.setTo(0.5);
        this.splash.scale.setTo(0.6);
                
        this.baslaMetni = this.game.add.bitmapText(0,0, 'minecraftia','tap to start',20); // Başlama metnimizi yerleştirdik
        this.baslaMetni.x = this.game.width / 2 - this.baslaMetni.textWidth / 2 - 15 ; //Konumunu ayarlıyoruz
        this.baslaMetni.y = this.game.height / 2 + this.splash.height / 2;
    },
    update : function(){
        if(this.game.input.activePointer.justPressed()){
            this.game.state.start('Game');
        }
    }
};