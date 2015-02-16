LumbaiRunner.Preload = function(){
    this.ready = false;
};

LumbaiRunner.Preload.prototype = {
    preload : function(){
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);
        
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 100,'preloaderBar');
        this.preloadBar.anchor.setTo(0.59);
        
        this.load.setPreloadSprite(this.preloadBar);
        
        this.load.image('yer', 'assets/images/yer.png');
        this.load.image('yer3', 'assets/images/yer3.png');
        this.load.image('arkaplan', 'assets/images/arkaplan.png');
        this.load.image('arkaplan2', 'assets/images/arkaplan2.png');
        this.load.image('arkaplan3', 'assets/images/arkaplan3.png');
        this.load.image('onplan', 'assets/images/onplan.png');
        this.load.image('onplan2', 'assets/images/onplan2.png');
        this.load.image('onplan3', 'assets/images/onplan3.png');
        this.load.image('varil', 'assets/images/sprites/varil.png');
        this.load.image('bombaIkon', 'assets/images/sprites/bombaIkon.png');
        this.load.image('yumrukIkon', 'assets/images/sprites/yumrukBtn.png');
        
        this.load.spritesheet('para','assets/images/sprites/para2f.png',96,93,4);
        this.load.spritesheet('jetman','assets/images/sprites/lumbaijetman.png',177,170,5);
        this.load.spritesheet('duman','assets/images/sprites/patladi.png',125,126);
        this.load.spritesheet('roket','assets/images/sprites/roket.png',183,55,6);
        this.load.spritesheet('elektirik','assets/images/sprites/elektirik.png',52,252);
        this.load.spritesheet('bomba','assets/images/sprites/bomba.png',78,64,4);
        this.load.spritesheet('yumruk','assets/images/sprites/yumruk.png',282,50,4);
        
        //this.load.audio('uc',['assets/audio/uc.mp3','assets/audio/uc.ogg']);// mp3 çalmayanlar için ogg yedek
        this.load.audio('basla','assets/audio/basla.wav');
        this.load.audio('bitti',['assets/audio/bitti.mp3']);
        this.load.audio('altin','assets/audio/altin.wav');
        this.load.audio('ates','assets/audio/ates.wav');
        this.load.audio('duvaracarp','assets/audio/duvaracarp.wav');
        this.load.audio('elektirikcarp','assets/audio/elektirikcarp.wav');
        this.load.audio('elektirikol','assets/audio/elektirikol.wav');
        this.load.audio('fuze','assets/audio/fuze.wav');
        this.load.audio('in','assets/audio/in.wav');
        this.load.audio('kalk','assets/audio/kalk.wav');
        this.load.audio('patla','assets/audio/patla.wav');
        this.load.audio('oyun',['assets/audio/oyun.mp3']);
        
        this.load.bitmapFont('minecraftia','assets/fonts/minecraftia/minecraftia.png','assets/fonts/minecraftia/minecraftia.xml');
        
        this.load.onLoadComplete.add(this.onLoadComplete, this);
    },
    create : function(){
        this.preloadBar.cropEnabled = false; //
        
    },
    update : function(){
        if(this.cache.isSoundDecoded('basla') && this.ready === true){
            this.state.start('MainMenu');
        }
    },
    onLoadComplete : function(){
        this.ready = true;
    }
};