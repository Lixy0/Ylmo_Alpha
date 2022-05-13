class Dragon {

    constructor(scene, player, save, cameras) {
        this.scene = scene
        this.cameras = scene
        this.player = player
        this.save = save;
        this.cameras = cameras
        this.dragon = this.scene.physics.add.sprite(0, 750, 'dragon');
        this.dragon.setScale(1);
        this.dragon.setCollideWorldBounds(false);
        this.dragon.body.setAllowGravity(false);
        this.dragon.setImmovable(true);

        this.scene.physics.add.collider(this.player.player, this.dragon, this.playerHit.bind(this), null, this);
    }

    playerHit(player, dragon){
        let me = this;

        this.save.death();
        this.scene.pointCamera.body.x = this.player.player.body.x;
        this.scene.pointCamera.setVelocityX(0);
        this.dragon.body.x =  this.scene.pointCamera.body.x - 1200;
        window.KeyboardEnable=false;
        window.change=true;
        window.dragonEnable=false;
        setTimeout(function(){
            me.dragon.setVelocityX(300);
            setTimeout(function(){
                me.dragon.setVelocityX(0);
                me.cameras.main.shake(1500, 0.02);
                setTimeout(function(){
                    me.scene.pointCamera.setVelocityX(300);
                    window.dragonEnable = true;
                    window.KeyboardEnable=true;
                    window.change=true;
                    me.player.initKeyboard();
                },1500)
            }, 1300)
        },2000)

    }
}