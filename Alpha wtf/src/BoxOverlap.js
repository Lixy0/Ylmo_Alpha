class BoxOverlap {


    constructor(scene, player, camera, dragon) {
        this.scene = scene
        this.player = player
        this.cameras = camera
        this.dragon = dragon
        const map = this.scene.make.tilemap({key: 'map'});

        this.box = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });

        map.getObjectLayer('BoxOverlap').objects.forEach((box) => {
            this.boxSprite = this.scene.physics.add.sprite(box.x+(box.width*0.5), box.y+(box.height*0.5)).setSize(box.width, box.height);
            this.box.add(this.boxSprite)
        });
        this.scene.physics.add.overlap(this.player.player, this.box, this.collectCollectible.bind(this))

    }

    collectCollectible(player, bonus){
        let me = this
        console.log('tuch')
        bonus.destroy();
        me.scene.pointCamera.body.x = me.player.player.body.x;
        me.scene.pointCamera.body.y = me.player.player.body.y - 100;
        me.dragon.dragon.body.x = me.player.player.body.x - 1500;
        me.dragon.dragon.body.y = me.player.player.body.y - 200;
        me.scene.pointCamera.setVelocityX(0);
        window.KeyboardEnable=false;
        window.change=true;
        me.player.player.setVelocityX(0);
        me.player.dDown=false;
        me.player.initKeyboard();
        this.cameras.main.shake(1500, 0.02);
        setTimeout(function(){
            me.scene.pointCamera.setVelocityX(-150);
            me.cameras.main.startFollow(me.scene.pointCamera,false);

            setTimeout(function(){
                me.scene.pointCamera.setVelocityX(0);
                me.dragon.dragon.setVelocityX(300);
                setTimeout(function(){
                    me.dragon.dragon.setVelocityX(0);
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

        },1500)
    }
}
