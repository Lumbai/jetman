var LumbaiRunner = function(){};

LumbaiRunner.Boot = function(){};

LumbaiRunner.Boot.prototype = {
    preload : function(){
        this.load.image('logo','assets/images/logo.png');
        this.load.image('preloaderBar','assets/images/preloader-bar.png');
    },
    create : function(){
        this.game.stage.backgroundColor = '#fff' ;
        //Aynı anda bir tıklama yapılacak ve tek cursor olacak
        this.input.maxPointers = 2;
        if(this.game.device.desktop){//desktopta çalışıyorsa oyunu ortalar
            this.scale.pageAlignHorizontally = true;
        }else{//Desktop değilse
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; //Phaser oyunu otomatik olarak boyutlandıracak
            this.scale.minWidth = 568;//en küçük boyut(bu çözünürlükler iphone un minumum boyutları)
            this.scale.minHeight = 600;
            this.scale.maxWidth = 2048; //en büyük boyut(bu çözünürlükler ipad'in maksimum boyutları)
            this.scale.maxHeight = 1536;
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
            this.scale.setScreenSize(true);
        }
        //Oyunun ölçüleri ve kullanacağım assetler yüklendi, sıradaki state i çağırıyoruz.
        this.state.start('Preloader');
    }
};