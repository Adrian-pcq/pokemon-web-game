import React,{useEffect} from "react";
import Phaser from 'phaser'


function Game() {
    let player;
    let isWalking = false;
    let anyArrowKeyPressed = false;
    useEffect(() => {
        // Function declarations
        function preload() {
            this.load.image('tiles', 'assets/Noueau projet.png')
            this.load.tilemapTiledJSON('map', 'assets/map_0.json')
            this.load.spritesheet('playerSprite', 'assets/sprites/hero_01_red_m_walk.png', { 
                frameWidth: 24,   // Specify the width of each frame
                frameHeight: 32   // Specify the height of each frame
            })
        }

        function create() {
            this.physics.world.setBounds(0, 0, 800, 600)
            const map = this.make.tilemap({ key: 'map' })
            const tileset = map.addTilesetImage('pokemon', 'tiles');
            const layer = map.createLayer('ground', tileset)

            player = this.physics.add.sprite(100, 100, 'playerSprite')

            // Set properties of the player sprite
            

            // Define animations for each direction
            this.anims.create({
                key: 'up',
                frames: this.anims.generateFrameNumbers('playerSprite', { start: 12, end: 15 }), 
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'down',
                frames: this.anims.generateFrameNumbers('playerSprite', { start: 0, end: 3 }), 
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('playerSprite', { start: 4, end: 7 }), 
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('playerSprite', { start: 8, end: 11 }), 
                frameRate: 10,
                repeat: -1
            });

            // Play default animation (e.g., 'down' animation)
            player.anims.play('down');
        }

        function update() {
            const cursors = this.input.keyboard.createCursorKeys();
            // Reset player's velocity
            player.setVelocity(0)
            anyArrowKeyPressed = cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown;

            // Check for arrow key presses and move player accordingly
            if (cursors.left.isDown) {
                player.setVelocityX(-100);
                if (!isWalking) {
                    isWalking = true;
                    player.anims.play('left', true);
                    console.log('Walking left');
                }
            } else if (cursors.right.isDown) {
                player.setVelocityX(100);
                if (!isWalking) {
                    isWalking = true;
                    player.anims.play('right', true);
                    console.log('Walking right');
                }
            } else if (cursors.up.isDown) {
                player.setVelocityY(-100);
                if (!isWalking) {
                    isWalking = true;
                    player.anims.play('up', true);
                    console.log('Walking up');
                }
            } else if (cursors.down.isDown) {
                player.setVelocityY(100);
                if (!isWalking) {
                    isWalking = true;
                    player.anims.play('down', true);
                    console.log('Walking down');
                }
            } 
            else if (!anyArrowKeyPressed && isWalking) {
                player.anims.stop();
                isWalking = false;
                console.log('Stopped walking');
            }else {
                // Stop the animation if no arrow key is pressed
                player.anims.stop();
            }
        }

        // Create and configure the Phaser game
        const config = {
            type: Phaser.WEBGL,
            width: 800,
            height: 600,
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 },
                    debug: false
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            }
        }

        const game = new Phaser.Game(config);

        return () => {
            // Cleanup function (optional)
            game.destroy(true);
        };
    }, []);

    return <div id="game-container" />;
}
    
export default Game
