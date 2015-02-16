// Phaser.AUTO ile WebGL mi Canvas mı kullanacağına karar veriyoruz, sonraki boş parametre yerine oyunu yerleştirmek istediğimiz eleman idsi yazabiliriz. Boş kalırsa phaser ortaya yerleştirir.
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

game.state.add('Boot',LumbaiRunner.Boot);
game.state.add('Preloader',LumbaiRunner.Preload);
game.state.add('MainMenu',LumbaiRunner.MainMenu);
game.state.add('Game',LumbaiRunner.Game);

game.state.start('Boot');