class Player {

    constructor(scene, start) {
        this.scene = scene
        this.cameras = scene
        this.start = start
        window.KeyboardEnable = true;

        let me = this;
        this.fireBall = this.scene.add.particles('fireBall');
        this.ghost = this.scene.add.particles('ghost');
        this.ghostRight = this.scene.add.particles('ghost');
        this.ghostLeft = this.scene.add.particles('ghost');
        this.player = this.scene.physics.add.sprite(1250, 1100, 'player');
        this.player.setScale(1);
        this.player.setCollideWorldBounds(false);
        this.player.body.setMaxSpeed(1200);
        this.player.body.setSize(this.player.sourceWidth, this.player.sourceHeight, true);

        this.dejaAppuye = false;
        this.doubleJump = 1;

        this.player.speedFactor = 900
        this.dashIsUp = false;

        this.fireBall.createEmitter({
            speed: 100,
            lifespan: 700,
            quantity: 70,
            alpha: 0.2,
            gravity: {x: 0, y: 0},
            scale: {start: 0.3, end: 0},
            follow: this.player,
            on: false
        });

        this.ghost.createEmitter({
            lifespan: 300,
            speed: 100,
            angle: { min: 65, max: 115 },
            quantity: 20,
            scale: {start: 0.3, end: 0},
            follow: this.player,
            on: false
        });
        this.ghostRight.createEmitter({
            lifespan: 300,
            speed: 100,
            angle: { min: 105, max: 155 },
            quantity: 20,
            scale: {start: 0.3, end: 0},
            follow: this.player,
            on: false
        });
        this.ghostLeft.createEmitter({
            lifespan: 300,
            speed: 100,
            angle: { min: 25, max: 75 },
            quantity: 20,
            scale: {start: 0.3, end: 0},
            follow: this.player,
            on: false
        });

        this.createAnims();

        this.initKeyboard();

    }

    createAnims(){

            this.scene.anims.create(
                {
                    key: 'idle',
                    frames: this.scene.anims.generateFrameNumbers('idle', { start: 0, end: 7 }),
                    frameRate: 10,
                    repeat: -1
                });

            this.scene.anims.create(
                {
                    key: 'turnIn',
                    frames: this.scene.anims.generateFrameNumbers('turn', { start: 0, end: 4 }),
                    frameRate: 12,
                    repeat: 0,
                });

            this.scene.anims.create(
                {
                    key: 'turnOut',
                    frames: this.scene.anims.generateFrameNumbers('turn', { start: 4, end: 0 }),
                    frameRate: 18,
                    repeat: 0,
                });

            this.scene.anims.create(
                {
                    key: 'right',
                    frames: this.scene.anims.generateFrameNumbers('player_right', { start: 0, end: 0 }),
                    frameRate: 10,
                    repeat: -1
                });


            this.scene.anims.create(
                {
                    key: 'jump',
                    frames: this.scene.anims.generateFrameNumbers('jump', { start: 0, end: 4 }),
                    frameRate: 10,
                    repeat: 0
                });

            this.scene.anims.create(
                {
                    key: 'fall',
                    frames: this.scene.anims.generateFrameNumbers('jump', { start: 5, end: 7 }),
                    frameRate: 10,
                    repeat: -1
                });

            this.scene.anims.create(
                {
                    key: 'tuchGroundIdle',
                    frames: this.scene.anims.generateFrameNumbers('jump', { start: 8, end: 19}),
                    frameRate: 14
                });

            this.scene.anims.create(
                {
                    key: 'tuchGroundWalk',
                    frames: this.scene.anims.generateFrameNumbers('jump', { start: 20, end: 27}),
                    frameRate: 14,
                    repeat: 0
                });

            this.scene.anims.create(
                {
                    key: 'dash',
                    frames: this.scene.anims.generateFrameNumbers('dash', { start: 0, end: 8}),
                    frameRate: 16,
                    repeat: 0
                });
        }

    initKeyboard() {
        let me = this;

            this.scene.input.on('pointerdown', function (pointer) {
                if (window.KeyboardEnable) {
                    if (pointer.rightButtonDown()) {
                        me.rightMouseDown = true;
                    }
                }
            });
            this.scene.input.on('pointerup', function (pointer) {
                if (window.KeyboardEnable) {
                    if (pointer.rightButtonReleased()) {
                        me.rightMouseDown = false;

                    }
                }
            });

            this.scene.input.keyboard.on('keydown', function (kevent) {
                if (window.KeyboardEnable) {
                    switch (kevent.keyCode) {
                        case Phaser.Input.Keyboard.KeyCodes.SPACE:
                            me.spaceDown = true;
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                            me.shiftDown = true;
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.UP:
                            me.upDown = true;
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.D:
                            me.dDown = true;
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.Q:
                            if (window.keyboard_AZERTY) {
                                me.qDown = true;
                            }
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.A:
                            if (window.keyboard_QWERTY) {
                                me.qDown = true;
                            }
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.DOWN:
                            me.downDown = true;
                            break;
                    }
                }
            });
            this.scene.input.keyboard.on('keyup', function (kevent) {
                    switch (kevent.keyCode) {
                        case Phaser.Input.Keyboard.KeyCodes.SPACE:
                            me.spaceDown = false;
                            this.animsJump = false;
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                            me.shiftDown = false;
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.UP:
                            me.upDown = false;
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.D:
                            me.dDown = false;
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.Q:
                            if (window.keyboard_AZERTY) {
                                me.qDown = false;
                            }
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.A:
                            if (window.keyboard_QWERTY) {
                                me.qDown = false;
                            }
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.DOWN:
                            me.downDown = false;
                            break;
                        case Phaser.Input.Keyboard.KeyCodes.ESC:
                            me.Pdown = true;
                            me.scene.Pauseflag = false;
                            break;
                    }
            });
    }

    dashDirection(){
        let me = this;

        if (this.dashIsUp) {
            if (this.flagDash) {

            } else {
                me.player.body.setAllowGravity(false);
                me.player.body.setMaxVelocityY(1000);
                me.player.setVelocityY(0);
                me.player.setVelocityX(0);
                this.dashIsUp = false;
                this.flagDash = true;
                this.isDashing =true;
                this.fireBall.emitParticleAt(me.player.body.x, me.player.body.y);
                this.player.anims.play('dash');

                let angle = Phaser.Math.Angle.Between(
                    me.player.body.x,
                    me.player.body.y,
                    me.scene.game.input.mousePointer.x + me.scene.cameras.main.worldView.x,
                    me.scene.game.input.mousePointer.y + me.scene.cameras.main.worldView.y,
                );
                console.log(angle);
                console.log(me.direction);
                if (me.direction===-1){
                    this.player.setFlipX(false);
                }
                this.player.setAngle(angle * 60 + 90);

                console.log("start dash");
                    me.scene.physics.moveTo(
                        me.player,
                        me.scene.game.input.mousePointer.x + me.scene.cameras.main.worldView.x,
                        me.scene.game.input.mousePointer.y + me.scene.cameras.main.worldView.y,
                        860);

                setTimeout(function () {
                    me.player.body.setAllowGravity(true);
                    me.player.setVelocityY(me.player.body.velocity.y * 0.3)
                    me.player.setVelocityX(me.player.body.velocity.x * 0.3)
                    me.isDashing = false;
                    me.player.setAngle(0);
                    me.player.anims.play('fall');
                    if (me.direction===-1){
                        me.player.setFlipX(true);
                    }
                    console.log("dash terminé");
                }, 300)
            }
        }
    }

    dash (){
        if (this.rightMouseDown){
            this.dashDirection()
        } else {
            this.flagDash = false;
        }

        if (this.player.body.velocity.y === 0 && this.player.body.onFloor()){
            this.dashIsUp = true;
        }
    }

    jump(){
        if (this.dejaAppuye) {

        }
        else {
            this.dejaAppuye = true;
            this.player.body.setMaxVelocityY(1000);
            if (this.player.body.onFloor()){
                this.player.setVelocityY(-520);
                console.log('jump');
                this.player.anims.play('jump');

                if (this.qDown){
                    this.player.setAngle(-40);
                    this.ghostLeft.emitParticleAt(this.player.body.x, this.player.body.y);
                }
                else if (this.dDown){
                    this.player.setAngle(40);
                    this.ghostRight.emitParticleAt(this.player.body.x , this.player.body.y);
                } else {
                    this.ghost.emitParticleAt(this.player.body.x, this.player.body.y);
                }
            }
            else if (this.doubleJump === 1
                    && !this.player.body.onFloor()) {
                this.player.setVelocityY(-520);
                this.doubleJump = 0;
                console.log('double jump');
                this.player.anims.play('jump');

                if (this.qDown){
                    this.player.setAngle(-40);
                    this.ghostLeft.emitParticleAt(this.player.body.x, this.player.body.y);
                }
                else if (this.dDown){
                    this.player.setAngle(40);
                    this.ghostRight.emitParticleAt(this.player.body.x , this.player.body.y);
                } else {
                    this.ghost.emitParticleAt(this.player.body.x, this.player.body.y);
                }
            }
        }
    }

    jumpRelease(){
        // ralenti saut
        switch(true){
            case this.flag:
                // fais rien
                break;
            case !this.spaceDown && !this.isDashing:
                this.player.setAngle(0);
                if (!this.player.body.onFloor()){
                    this.player.setVelocityY(
                        this.player.body.velocity.y * 0.6);
                }
                this.dejaAppuye=false;
                this.flag=true;
                break;
            default:
                break;

        }
        if (this.player.body.onFloor()){
            this.doubleJump=1;
        }
    }

    moveRight(){
        if(!this.isDashing){
            this.player.setVelocityX(300);
            this.direction=1;
            this.player.setFlipX(false);
        }
    }

    moveRightRelease(){
        // ralenti droite
        switch(true){
            case this.flagright:
                // fais rien
                break;
            case !this.dDown && !this.player.body.onFloor():
                this.player.setVelocityX(this.player.body.velocity.x * 0.6);
                this.flagright=true;
                break;
            default:
                break;
        }
    }

    moveLeft(){
        if(!this.isDashing) {
            this.player.setVelocityX(-300);
            this.direction = -1;
            this.player.setFlipX(true);
        }
    }

    moveLeftRelease(){
        // ralenti gauche
        switch(true){
            case this.flagleft:
                // fais rien
                break;
            case !this.qDown && !this.player.body.onFloor():
                this.player.setVelocityX(this.player.body.velocity.x * 0.6);
                this.flagleft=true;
                break;
            default:
                break;
        }
    }

    planer(){

        if (this.spaceDown){
            if (this.player.body.velocity.y > 20){
                this.player.body.setMaxVelocityY(100);
            }
        } else if (this.player.body.velocity.y !== 1000){
            this.player.body.setMaxVelocityY(1000);
        }
    }

    stop(){
        if (this.player.body.onFloor()) {
            this.player.setVelocityX(0);
        } else {
            this.player.setVelocityX(this.player.body.velocity.x * 0.6);
            this.player.setVelocityY(this.player.body.velocity.y * 0.6);
        }
    }

    animation(){
        if (!this.isDashing){
            if (this.player.body.velocity.y > 20 && !this.player.body.onFloor()) {
                this.player.anims.play('fall', true);
                this.player.setAngle(0);
                this.fall=true;
            }
            if (this.player.body.onFloor() && this.fall){
                if (this.player.body.velocity.x !==0){
                    this.player.anims.play('tuchGroundWalk');
                    console.log('spoingwalk2')
                    this.spoingWalk = true;

                } else {
                    this.player.anims.play('tuchGroundIdle');
                    this.spoingIdle = true;
                }
                this.fall = false;
            }
            if (this.spoingIdle && this.player.body.velocity.x ===0 && this.player.anims.currentFrame.index === 8){
                this.spoingIdle = false;
                this.player.anims.play('idle',true);
                this.idle=true;
            }
            if (this.spoingIdle && this.player.body.velocity.x !==0){
                this.spoingIdle = false;
                this.spoingWalk = true;
                this.player.anims.play('tuchGroundWalk',true);
                console.log('spoingwalk1')
            }
            if (this.spoingWalk && !this.spoingIdle && this.player.anims.currentFrame.index === 7){
                this.spoingWalk = false;
                this.player.anims.play('right',true);
                console.log('walk1')
                this.turnIn=false;
                this.idle=false;
            }
            if (this.player.body.onFloor() && !this.spoingIdle && !this.spoingWalk){
                if (this.player.body.velocity.x===0){
                    this.turnOut=false;
                    if(this.turnIn){

                    } else if (!this.idle){
                        this.player.anims.play('turnIn');
                        this.turnIn=true;
                        this.idle = true;
                        console.log('turnIn')
                    }
                    if (this.player.anims.currentFrame.index === 4){
                        this.player.anims.play('idle',true);
                        console.log('idle')
                    }
                } else {
                    this.turnIn=false;
                    if (this.turnOut){
                    }
                    else if (this.idle){
                        this.player.anims.play('turnOut',true)
                        this.turnOut=true;
                        this.idle=false;
                        console.log('turnOut')
                    }
                    if (this.player.anims.currentFrame.index === 0){
                        this.player.anims.play('right',true);
                        console.log('walk')
                    }
                }
            }
        }
    }

    move(){
        if (!this.isDashing){
            this.planer();
            if (this.spaceDown){
                this.jump();
                this.flag=false;
            }

            switch (true) {
                case this.qDown:
                    this.moveLeft()
                    this.flagleft=false;
                    break;
                case this.dDown:
                    this.moveRight();
                    this.flagright=false;
                    break;
                case this.player.body.onFloor():
                    this.stop();
                    break;
            }
        }

        this.animation();
        this.dash();
        this.jumpRelease();
        this.moveRightRelease();
        this.moveLeftRelease();
    }
}



