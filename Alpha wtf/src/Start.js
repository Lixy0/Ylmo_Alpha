class Start extends Phaser.Scene {

    constructor() {
        super('start');
    }

    preload(){
        this.load.image('ecranTitre', 'Alpha wtf/assets/images/ecran_titre.png');
        this.load.image('fireBall', 'Alpha wtf/assets/images/boule_de_feu_base.png');
        this.load.image('feuille', 'Alpha wtf/assets/images/feuille.png');
        this.load.audio('Theme', 'Alpha wtf/assets/sounds/MainTheme.mp3');
        this.load.audio('clic', 'Alpha wtf/assets/sounds/clic.wav');
        this.load.image('fireBall', 'Alpha wtf/assets/images/boule_de_feu_base.png');
        this.load.spritesheet('titre','Alpha wtf/assets/images/spritesheet_titre.png', {frameWidth: 428, frameHeight: 272});
    }

    create(){
        let me = this;
        const {width, height}= this.scale

        //ECRAN TITRE
        this.ecranTitre = this.add.image(0, 0, 'ecranTitre').setOrigin(0, 0);

        /*this.titre = this.add.sprite(640,160,'');
        this.anims.create(
            {
                key: 'titre',
                frames: this.anims.generateFrameNumbers('titre', { start: 0, end: 6 }),
                frameRate: 10,
                repeat: -1
            });
        this.titre.anims.play('titre');*/


        //SOUNDS
        this.theme = this.sound.add('Theme',{volume: 0.3}).play();
        this.clic = this.sound.add('clic');

        //PARTICLES
        var particles = this.add.particles('feuille');
        var feu = this.add.particles('fireBall');

        particles.createEmitter({
            x: 0,
            y: { min: 300, max: 620 },
            lifespan: 5000,
            speedX: { min: 150, max: 200},
            scale: { start: 0.4, end: 0.1 },
            quantity: 1,
            rotate: { start: -180, end: 180 },
            frequency: 1500,
        });

        particles.createEmitter({
            x: 300,
            y: { min: 400, max: 550 },
            lifespan: 5000,
            speedX: { min: 150, max: 200},
            scale: { start: 0.2, end: 0.1 },
            quantity: 1,
            rotate: { start: -180, end: 180 },
            frequency: 700,
        });

        feu.createEmitter({
            x: { min: 450, max: 800 },
            y: 100,
            lifespan: 2000,
            speedY: { min: -50, max: -100},
            speedX: { min: 120, max: 160},
            scale: { start: 0.2, end: 0.1 },
            quantity: 1,
            frequency: 400,
        });


        this.Play = this.add.text(width*0.5,height*0.55,'Lancer la partie',{
            color: '#ffffff',
            fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'
        })
            .setOrigin(0.5)
            .setScale(2)
            .setAlpha(0.7);


        this.button = this.add.rectangle( this.Play.x, this.Play.y,300,75,0xffffff, 0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP,()=> {
                this.scene.start('game')
            })
            .on('pointerover', function () {
               me.Play.setAlpha(1)
                me.clic.play();
            })
            .on('pointerout', function () {
                me.Play.setAlpha(0.7)
            })

//CURSOR
        this.cursorBox = this.physics.add.sprite(0,0).setOrigin(0.1,0.3);

        this.test = this.add.particles('fireBall');
        this.test.createEmitter({
            speed: 50,
            lifespan : 100,
            gravity: { x: 0, y: 0 },
            scale: { start: 0.3, end: 0.1 },
            follow: this.cursorBox
        });
        this.input.setDefaultCursor('url(arrow.cur), pointer');
    }
    update(){
        this.cursorBox.body.x = this.game.input.mousePointer.x + this.cameras.main.worldView.x
        this.cursorBox.body.y = this.game.input.mousePointer.y + this.cameras.main.worldView.y
    }
}