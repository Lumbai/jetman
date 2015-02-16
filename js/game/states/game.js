LumbaiRunner.Game = function(){
    this.bombaFiyat = 20;
    this.yumrukFiyat = 10;
    this.yumrukDurum = 'off';
    
    this.playerMinAngle = -20;
    this.playerMaxAngle = 20 ;
    
    this.paraOrani = 1000 ;
    this.paraTimer = 0;
    
    this.varilRate = 6000;
    this.varilTimer = 0;
    
    this.roketRate = 10000;
    this.roketTimer = 3000;
    
    this.elektirikRate = 4000;
    this.elektirikTimer = 5000;
    
    this.oncekiParaTipi = null;
    this.paraKonumX = null;
    this.paraAralikX = 10;
    this.paraAralikY = 10;
    
    this.mesafe = 0;
    this.oyunDurum = true;
    
    this.level2 = true;
    this.level3 = true;
    
    this.zorluk = 1;
    this.hiz = -400;
    
    this.tekrar = false;
    this.sonBackground = new Array() ;
    this.sonForeGround = new Array();
    this.sonGround = new Array();
    
    this.skor = 0;
}
LumbaiRunner.Game.prototype = {
    create : function(){        
        this.oyunDurum = true;
        this.level2 = true;
        this.level3 = true;
        this.hiz = -400;
        this.zorluk = 1;
        
        this.game.world.bounds = new Phaser.Rectangle(0,0,this.game.width + 300,this.game.height);        
        
        this.background3 = this.game.add.tileSprite(0, -100, this.game.width, 510, 'arkaplan3');
        this.foreground3 = this.game.add.tileSprite(0,195, this.game.width,182,'onplan3');
        
        this.background2 = this.game.add.tileSprite(0, -100, this.game.width, 510, 'arkaplan2');
        this.foreground2 = this.game.add.tileSprite(0,150, this.game.width,420,'onplan2');

        this.background = this.game.add.tileSprite(0, -100, this.game.width, 512, 'arkaplan');
        this.background.autoScroll(-60,0);
        
        this.foreground = this.game.add.tileSprite(0,230, this.game.width,79,'onplan');
        this.foreground.autoScroll(-130,0);
        
        this.ground3 = this.game.add.tileSprite(0, this.game.height -70,this.game.width,153,'yer3');
        this.ground = this.game.add.tileSprite(0, this.game.height -70,this.game.width,153,'yer');
        this.ground.autoScroll(-400,0);//Eklenen gorselin sola doğru kaymasını sağlıyoruz
                
        this.player = this.add.sprite(50,this.game.height/2, 'jetman');//Sprite ekliyoruz
        this.player.anchor.setTo(0.5);//Resmin merkez noktasını ayarlıyoruz
        this.player.scale.setTo(0.4);//Resim boyutunu küçültüyoruz
                
        this.player.animations.add('uc');//Eklediğimiz spriteda ikinci parametredeki kareler arasında animasyon oluşturuyoruz
        this.player.animations.play('uc',8,true);//Animasyonu saniyede 8 kare olacak ve tekrar edecek şekilde oynatıyoruz
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 400;
        
        this.game.physics.arcade.enableBody(this.ground);
        this.ground.body.allowGravity = false;
        this.ground.body.immovable = true;

        
        this.game.physics.arcade.enableBody(this.player);
        this.player.body.collideWorldBounds = true ;
        this.player.body.bounce.set(0.1);
        
        this.paralar = this.game.add.group();
        this.variller = this.game.add.group();
        this.roketler = this.game.add.group();
        this.elektirikler = this.game.add.group();
        
        this.skorYazi = this.game.add.bitmapText(10,10,'minecraftia','Coins: 0',16);
        this.mesafeYazi = this.game.add.bitmapText(10,40,'minecraftia','Score: 0 mt',16);
        
        this.jetSesi = this.game.add.audio('kalk');
        this.paraSesi = this.game.add.audio('altin');
        this.patlaSesi = this.game.add.audio('patla');
        this.bittiSesi = this.game.add.audio('bitti');
        this.oyunSesi = this.game.add.audio('oyun');
        this.oyunSesi.play('',2,true);
        
        this.paraKonumX = this.game.width + 64;
        
        this.sonBackground[0] = this.background;
        this.sonForeGround[0] = this.foreground;
        this.sonGround[0] = this.ground;
    
        this.bombaBtn = this.game.add.button(this.game.width-100,10,'bombaIkon',this.bombaAt,this,1,1,1);
        this.bombaBtn.scale.setTo(0.6);
        
        this.yumrukBtn = this.game.add.button(this.game.width-50,20,'yumrukIkon',this.yumrukAt,this,1,1,1);
        this.yumrukBtn.scale.setTo(0.6);
    },
    update : function(){        
        if(this.game.input.activePointer.isDown){
            this.player.body.velocity.y -= 25 ;
            if(!this.jetSesi.isPlaying){
                this.jetSesi.play('',0,true,0.5);
            }
        }else{
            this.jetSesi.stop();
        }
        
        if(this.player.body.velocity.y < 0 || this.game.input.activePointer.isDown){
            if(this.player.angle > 0){
                this.player.angle = 0;
            }
            if(this.player.angle > this.playerMinAngle){
                this.player.angle -= 0.5;
            }
        }else if(this.player.body.velocity.y >= 0 && !this.game.input.activePointer.isDown){
            if(this.player.angle < this.playerMaxAngle){
                this.player.angle += 0.5;
            }
        }
        if(this.paraTimer < this.game.time.now){
            this.paraUret();
            this.paraTimer = this.game.time.now + this.paraOrani;
        }
        if(this.varilTimer < this.game.time.now){
            this.varilYap();
            this.varilTimer = this.game.time.now + this.varilRate;
        }
        
        if(this.roketTimer < this.game.time.now){
            this.roketYap();
            this.roketTimer = this.game.time.now + this.roketRate;
        }
        
        if(this.elektirikTimer < this.game.time.now){
            this.elektirikYap();
            this.elektirikTimer = this.game.time.now + this.elektirikRate;
        }
        if(this.skor < this.bombaFiyat){
            this.bombaBtn.alpha = 0.4;
        }else{
            this.bombaBtn.alpha = 1;
        }
        if(this.skor < this.yumrukFiyat){
            this.yumrukBtn.alpha = 0.4;
        }else{
            this.yumrukBtn.alpha = 1;
        }
        if(this.yumrukDurum == 'on'){
            this.yumruk.y = this.player.y - 38;
            this.yumruk.x = this.player.x + 24;
        }
        this.game.physics.arcade.collide(this.player,this.ground, this.yereVurduAga, null, this);
        this.game.physics.arcade.collide(this.player,this.ground3, this.yereVurduAga, null, this);
        this.game.physics.arcade.overlap(this.player,this.paralar, this.paraAl, null, this);
        this.game.physics.arcade.overlap(this.player,this.variller, this.varilCarp, null, this);
        this.game.physics.arcade.overlap(this.player,this.roketler,this.roketCarp,null,this);
        this.game.physics.arcade.overlap(this.player,this.elektirikler,this.elektirikCarp,null,this);
        this.game.physics.arcade.overlap(this.bomba,this.ground,this.bombaPatlar,null,this);
        this.game.physics.arcade.overlap(this.bomba,this.ground3,this.bombaPatlar,null,this);
        this.game.physics.arcade.overlap(this.bomba,this.variller,this.bombaCarpar,null,this);
        this.game.physics.arcade.overlap(this.bomba,this.roketler,this.bombaCarpar,null,this);
        this.game.physics.arcade.overlap(this.bomba,this.elektirikler,this.bombaCarpar,null,this); 
        this.game.physics.arcade.overlap(this.yumruk,this.variller,this.yumrukPatlar,null,this);
        this.game.physics.arcade.overlap(this.yumruk,this.roketler,this.yumrukPatlar,null,this);
        this.game.physics.arcade.overlap(this.yumruk,this.elektirikler,this.yumrukPatlar,null,this);
        
        if(this.oyunDurum){
            this.mesafe += 0.1 ;
            this.mesafeYazi.text = "Score : "+this.mesafe.toFixed(0)+" mt";
        }
        if(this.mesafe > 250 && this.level2){
            this.level2 = false;
            this.levelAtla(2);
        }else if(this.mesafe > 500 && this.level3){
            this.level3 = false;
            this.levelAtla(3);
        }
    },
    tahsilat : function(tutar){
        if(tutar <= this.skor){
            this.skor -= tutar;
            this.skorYazi.text = 'Coins: ' + this.skor;
            return true;
        }else{
            return false;
        }
    },
    bombaAt : function(){
        if(this.tahsilat(this.bombaFiyat)){
            this.bomba = this.add.sprite(this.player.x + 30,this.player.y - 10,'bomba');
            this.bomba.scale.setTo(0.4);
            var anim = this.bomba.animations.add('bomba');
            this.bomba.animations.play('bomba',4,false);
            this.game.physics.arcade.enableBody(this.bomba);
            this.bomba.body.allowGravity = true;

            this.bomba.checkWorldBounds = true ;
            this.bomba.onOutOfBoundsKill = true;

            anim.onComplete.add(this.bombaPatlar, this);
        }
    },
    yumrukAt : function(){
        if(this.tahsilat(this.yumrukFiyat)){
            this.yumruk = this.add.sprite(this.player.x + 34,this.player.y - 38,'yumruk');
            this.yumruk.scale.setTo(0.3);
            var anim = this.yumruk.animations.add('yumruk',[0,1,2,3,2,1,0]);
            this.yumruk.animations.play('yumruk',24,false);
            this.game.physics.arcade.enableBody(this.yumruk);
            this.yumruk.body.allowGravity = false;

            this.yumruk.checkWorldBounds = true ;
            this.yumruk.onOutOfBoundsKill = true;
            
            this.yumrukDurum = 'on';
            anim.onComplete.add(function(){
                this.yumruk.kill();
            }, this);
        }
    },
    bombaCarpar : function(bomba,engel){
        this.dumanEfekti(bomba.x,bomba.y);  
        this.bomba.kill();
        this.patlaSesi.play();
        bomba.kill();
        engel.kill();
    },
    yumrukPatlar : function(yumruk,engel){
        this.dumanEfekti(engel.x - 40,engel.y - 20);  
        this.patlaSesi.play();
        engel.kill();
    },
    bombaPatlar : function(sprite,animation){
        this.dumanEfekti(sprite.x,sprite.y);  
        this.bomba.kill();
        this.patlaSesi.play();
    },
    hepsiniOldur : function(){
        
    },
    levelAtla : function(level){
        this.paralar.destroy();
        this.paralar = this.game.add.group();
        switch(level){
            case 2 :
                this.hiz = -550;
                this.zorluk = 1.3;
                
                this.background.destroy();
                this.foreground.destroy();
                
                this.background2.autoScroll(-160,0);
                this.foreground2.autoScroll(-300,0);
                this.ground.autoScroll(this.hiz,0);
                
                this.sonBackground[0] = this.background2;
                this.sonForeGround[0] = this.foreground2;                
            break;
            case 3 :
                this.hiz = -750;
                this.zorluk = 2;
                this.ground.destroy();
                this.background2.destroy();
                this.foreground2.destroy();
                
                this.background3.autoScroll(-220,0);
                this.foreground3.autoScroll(-400,0);
                this.ground3.autoScroll(this.hiz,0);
                
                this.game.physics.arcade.enableBody(this.ground3);
                this.ground3.body.allowGravity = false;
                this.ground3.body.immovable = true;
                
                this.sonBackground[0] = this.background3;
                this.sonForeGround[0] = this.foreground3 ;
                this.sonGround[0] = this.ground3;
            break;
        }
    },
    shutdown : function(){        
        this.paralar.destroy();
        this.variller.destroy();
        this.roketler.destroy();
        this.elektirikler.destroy();
        
        this.skor = 0;
        this.mesafe = 0;
        this.paraTimer = 0;
        this.varilTimer = 0;
        this.roketTimer = 0;
        this.elektirikTimer = 0;
    },
    paraUret : function(){
        if(!this.oncekiParaTipi || this.oncekiParaTipi < 3){
            var paraTipi = this.game.rnd.integer() % 5;
            switch(paraTipi){
                case 0:
                break;
                case 1:
                case 2:
                    this.paraUret();
                break;
                case 3:
                    this.paraGrupUret(2,2);
                break;
                case 4:
                    this.paraGrupUret(6,2);
                break;
                default : 
                    this.oncekiParaTipi = 0;
                break;
            }
            this.oncekiParaTipi = paraTipi;
        }else{
            if(this.oncekiParaTipi === 4){
                this.oncekiParaTipi = 3;
            }else{
                this.oncekiParaTipi = 0;
            }
        }
    },
    paraGrupUret : function(sutun,satir){
        var paraKonumY = this.game.rnd.integerInRange(50,this.game.world.height - 192);
        var paraSatirSayac = 0;
        var paraSutunSayac = 0;
        var para;
        for(var i = 0;i < sutun * satir;i++){
            para = this.paraYap(this.paraKonumX,paraKonumY);
            para.x = para.x + (paraSutunSayac * para.width) + (paraSutunSayac * this.paraAralikX);
            para.y = paraKonumY + (paraSatirSayac * para.height) + (paraSatirSayac * this.paraAralikY);
            paraSutunSayac++;
            if(i+1 >= sutun && (i+1) % sutun ===0){
                paraSatirSayac++;
                paraSutunSayac = 0;
            }
        }
    },
    paraYap : function(){
        var x = this.game.width;
        var y = this.game.rnd.integerInRange(50,this.game.world.height - 192);
        
        var para = this.paralar.getFirstExists(false);
        if(!para){
            para = new Para(this.game,0,0);
            para.hiz = this.hiz;
            this.paralar.add(para);
        }
        para.reset(x,y);
        para.revive();
        return para;
    },
    varilYap : function(){
        if(this.tekrar){
            this.tekrar = false;
        }else{
            var x = this.game.width;
            var y = this.game.world.height - 80;

            var varil = this.variller.getFirstExists(false);
            if(!varil){
                varil = new Varil(this.game,0,0);
                varil.hiz = this.hiz;
                this.variller.add(varil);
            }
            varil.reset(x,y);
            varil.revive();
        }
    },
    elektirikYap : function(){
        var x = this.game.width;
        var y = this.game.rnd.integerInRange(50,this.game.world.height - 190);
        
        var elektirik = this.elektirikler.getFirstExists(false);
        if(!elektirik){
            elektirik = new Elektirik(this.game,0,0);
            elektirik.hiz = this.hiz;
            this.elektirikler.add(elektirik);
        }
        elektirik.reset(x,y);
        elektirik.revive();
    },
    roketYap : function(){
        if(this.tekrar){
            this.tekrar = false;
        }else{
            var x = this.game.width;
            var y = this.game.rnd.integerInRange(50,this.game.world.height - 120);

            var roket = this.roketler.getFirstExists(false);
            if(!roket){
                roket = new Roket(this.game,0,0);
                roket.zorluk = this.zorluk;
                this.roketler.add(roket);
            }
            roket.reset(x,y);
            roket.revive();
        }
    },
    yereVurduAga : function(karakter,zemin){
        karakter.body.velocity.y = -100;
    },
    paraAl : function(karakter,para){
        this.skor++;
        this.paraSesi.play();
        para.kill();
        var bosPara = new Para(this.game, para.x, para.y);
        
        this.game.add.existing(bosPara);
        var skorTween = this.game.add.tween(bosPara).to({x:50,y:50},300,Phaser.Easing.Linear.None,true);
        skorTween.onComplete.add(function(){
            bosPara.destroy();
            this.skorYazi.text = 'Coins: ' + this.skor;
        },this);
    },
    dumanEfekti : function(x,y){
        if(x){
            this.duman = this.add.sprite(x,y,'duman');   
        }else{
            this.duman = this.add.sprite(this.player.x - this.player.width/2,this.player.y - this.player.height/2,'duman');
        }
        this.duman.animations.add('duman');
        this.duman.animations.play('duman',40,false);
    },
    oyunuBitir : function(){
        this.oyunDurum = false;
        this.tekrar = true ;
        this.patlaSesi.play();
        this.oyunSesi.stop();
        this.bittiSesi.play();
        
        this.sonBackground[0].stopScroll();
        this.sonGround[0].stopScroll();
        this.sonForeGround[0].stopScroll();
        
        this.variller.setAll('body.velocity.x',0);
        this.paralar.setAll('body.velocity.x',0);
        this.roketler.setAll('body.velocity.x',0);
        this.elektirikler.setAll('body.velocity.x',0);
        
        this.varilTimer = Number.MAX_VALUE;
        this.paraTimer = Number.MAX_VALUE;
        this.roketTimer = Number.MAX_VALUE;
        this.elektirikTimer = Number.MAX_VALUE;
        
        var skorboard = new SkorBoard(this.game);
        skorboard.show(this.mesafe.toFixed(0));
    },
    roketCarp : function(karakter,roket){
        this.dumanEfekti();   
        roket.kill();
        karakter.kill();
        this.oyunuBitir();
    },
    varilCarp : function(karakter,varil){
        this.dumanEfekti();
        varil.kill();
        karakter.kill();
        this.oyunuBitir();
    },
    elektirikCarp : function(karakter,elektirik){
        this.dumanEfekti();
        elektirik.kill();
        karakter.kill();
        this.oyunuBitir();
    }
}