class scene extends Phaser.Scene {

    constructor() {
        super('game');
    }

    preload() {
        this.load.image('background', 'Alpha wtf/assets/images/background.png');
        this.load.image('tiles', 'Alpha wtf/assets/tilesets/platformPack_tilesheet_test.png');
        this.load.image('tilesP4', 'Alpha wtf/assets/tilesets/plan4_tilesheet.png');
        this.load.image('tilesP5', 'Alpha wtf/assets/tilesets/plan5_tilesheet.png');
        this.load.image('tilesP6', 'Alpha wtf/assets/tilesets/plan6_tilesheet.png');
        this.load.image('tilesP7', 'Alpha wtf/assets/tilesets/plan7_tilesheet.png');
        this.load.image('degrade', 'Alpha wtf/assets/images/degradé.png');
        this.load.image('vignette', 'Alpha wtf/assets/images/effetVignette.png');

        this.load.image('spike', 'Alpha wtf/assets/images/spike.png');
        this.load.image('player', 'Alpha wtf/assets/images/player_base.png');
        this.load.image('fireBall', 'Alpha wtf/assets/images/boule_de_feu_base.png');
        this.load.image('ennemy', 'Alpha wtf/assets/images/Ennemy.png');
        this.load.image('ghost', 'Alpha wtf/assets/images/ghost.png');
        this.load.image('dragon', 'Alpha wtf/assets/images/dragon_base.png');
        this.load.image('save', 'Alpha wtf/assets/images/Save.png');
        this.load.spritesheet('player_right', 'Alpha wtf/assets/images/player_base.png', {frameWidth: 40, frameHeight: 48});
        this.load.spritesheet('idle','Alpha wtf/assets/images/spritesheet_idle.png', {frameWidth: 40, frameHeight: 48});
        this.load.spritesheet('turn','Alpha wtf/assets/images/spritesheet_turn.png', {frameWidth: 40, frameHeight: 48});
        this.load.spritesheet('jump','Alpha wtf/assets/images/spritesheet_jump.png', {frameWidth: 40, frameHeight: 48});
        this.load.spritesheet('dash','Alpha wtf/assets/images/spritesheet_dash.png', {frameWidth: 40, frameHeight: 48});

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'Alpha wtf/assets/tilemaps/Alpha1.json');
    }


    create() {
        let me =this;
        this.Pauseflag = false;

        // Tiled / Plan
        this.backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.backgroundImage.setScale(1, 1.2);

        const map = this.make.tilemap({key: 'map'});

        const tileset = map.addTilesetImage('platformPack_tilesheet_test', 'tiles');
        const tilesetP4 = map.addTilesetImage('plan4_tilesheet', 'tilesP4');
        const tilesetP5 = map.addTilesetImage('plan5_tilesheet', 'tilesP5');
        const tilesetP6 = map.addTilesetImage('plan6_tilesheet', 'tilesP6');
        const tilesetP7 = map.addTilesetImage('plan7_tilesheet', 'tilesP7');

        // LAYER
        this.Plan7Ground = map.createLayer('Plan7Ground', tilesetP7);
        this.Plan7Fixe = map.createLayer('Plan7Fixe', tilesetP7);

        this.Plan6Ground = map.createLayer('Plan6Ground', tilesetP6);
        this.Plan6Fixe = map.createLayer('Plan6Fixe', tilesetP6);

        this.Plan5Fixe = map.createLayer('Plan5Fixe', tilesetP5);
        this.Plan5FixeBis = map.createLayer('Plan5FixeBis', tilesetP5);

        this.Plan4Ground = map.createLayer('Plan4Ground', tilesetP4);
        this.Plan4Fixe = map.createLayer('Plan4Fixe', tilesetP4);
        this.Brume = map.createLayer('Brume', tilesetP4);

        this.vignette = this.add.image(0,0,'vignette').setOrigin(0,0);

        this.Plan3Fixe = map.createLayer('Plan3Fixe', tileset);
        this.Plan3Fixe.setPipeline('Light2D');

        this.Plan3Platforms = map.createLayer('Plan3Platforms', tileset);
        this.Plan3Platforms.setPipeline('Light2D');

        this.water = map.createLayer('Water', tileset);
        this.water.setPipeline('Light2D');

        //PLAYER
        this.player = new Player(this);

        // SAVE
        this.save = new Save(this, this.player);

        //DRAGON
        this.dragon = new Dragon(this, this.player, this.save, this.cameras);

        // BONUS FLAME
        new BonusFlame(this, this.player);

        //Portes
        this.portes = new Portes(this, this.player);

        //ENNEMY
        this.ennemy = new Ennemies(this, this.player, this.save);

        //BOXOVERLAP
        this.box = new BoxOverlap(this, this.player, this.cameras, this.dragon);

        this.Plan2Fixe = map.createLayer('Plan2Fixe', tileset);
        this.Plan2Fixe.setPipeline('Light2D');

        this.degrade = this.add.image(0,0,'degrade');

        //PARALLAXE
        this.backgroundImage.scrollFactorX=0;
        this.backgroundImage.scrollFactorY=0;

        this.vignette.scrollFactorX=0;
        this.vignette.scrollFactorY=0.9;

        this.Plan3Fixe.scrollFactorX=1;
        this.Plan3Fixe.scrollFactorY=1;

        this.Plan3Platforms.scrollFactorX=1;
        this.Plan3Platforms.scrollFactorY=1;

        this.water.scrollFactorX=1;
        this.water.scrollFactorY=1;

        this.Plan2Fixe.scrollFactorX=1;
        this.Plan2Fixe.scrollFactorY=1;

        this.Plan4Fixe.scrollFactorX=0.8;
        this.Plan4Fixe.scrollFactorY=0.9;
        this.Plan4Ground.scrollFactorX=0.8;
        this.Plan4Ground.scrollFactorY=0.9;
        this.Brume.scrollFactorX=0.8;
        this.Brume.scrollFactorY=0.9;

        this.Plan5Fixe.scrollFactorX=0.7;
        this.Plan5Fixe.scrollFactorY=0.7;
        this.Plan5FixeBis.scrollFactorX=0.7;
        this.Plan5FixeBis.scrollFactorY=0.7;

        this.Plan6Fixe.scrollFactorX=0.6;
        this.Plan6Fixe.scrollFactorY=0.6;
        this.Plan6Ground.scrollFactorX=0.6;
        this.Plan6Ground.scrollFactorY=0.6;

        this.Plan7Fixe.scrollFactorX=0.5;
        this.Plan7Fixe.scrollFactorY=0.5;
        this.Plan7Ground.scrollFactorX=0.5;
        this.Plan7Ground.scrollFactorY=0.5;


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

        // CAMERA
        this.pointCamera = this.physics.add.sprite(600,1000);
        this.pointCamera.body.setAllowGravity(false);
        this.pointCamera.setImmovable(true);
        this.cameras.main.startFollow(this.player.player,true,1,1,0,150);


        // COLLIDER
        this.collider = new Collide(this, this.player, this.save);

        // LIGHT
        this.lights.enable();
        this.lights.setAmbientColor(0xbbbbbb);
        this.light = this.lights.addLight(this.player.player.body.x, this.player.player.body.y, 380).setIntensity(3);
        this.light.setColor(0x0f6fbf);

        // FONCTIONS
        this.input.mouse.disableContextMenu();

    }


    update()
    {
        if (this.player.Pdown){

            if (this.Pauseflag){

            }else {
                this.scene.pause();
                this.scene.launch('pause');
                this.Pauseflag = true;
            }
        }
        if (window.change) {
                this.player.initKeyboard();
                window.change=false;
        }


        this.cursorBox.body.x = this.game.input.mousePointer.x + this.cameras.main.worldView.x
        this.cursorBox.body.y = this.game.input.mousePointer.y + this.cameras.main.worldView.y

        this.player.move();
        this.ennemy.IaGesttion();

        if (window.dragonEnable){
            this.dragon.dragon.body.x = this.pointCamera.body.x - 800;
        }

        this.light.x = this.player.player.body.x +15;
        this.light.y = this.player.player.body.y + 15;

    }
}