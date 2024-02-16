import React,{useEffect} from "react";
import Phaser from 'phaser'

function Game(){
    useEffect(() => {
        // Create and configure the Phaser game
        const config = {
          type: Phaser.AUTO,
          width: 800,
          height: 600,
          scene: {
            preload: preload,
            create: create,
            update: update
          }
        }
    
        const game = new Phaser.Game(config);
    
        function preload() {
            this.load.image('tiles', 'assets/Noueau projet.png')
            this.load.tilemapTiledJSON('map', 'assets/map_0.json')
            this.load.image('playerSprite', 'assets/sprites/hero_01_red_m_walk.png')
        }
    
        function create() {
            const map = this.make.tilemap({ key: 'map' })
            const tileset = map.addTilesetImage('pokemon', 'tiles');
            const layer = map.createLayer('ground', tileset)

            const player = this.physics.add.sprite(100, 100, 'playerSprite')

            // Set properties of the player sprite
            player.setCollideWorldBounds(true);
            player.setBounce(0.2);

            // Define animations for each direction
            this.anims.create({
                key: 'up',
                frames: this.anims.generateFrameNumbers('playerSprite', { start: 0, end: 3 }), // Assuming frames 0-3 represent player facing up
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'down',
                frames: this.anims.generateFrameNumbers('playerSprite', { start: 4, end: 7 }), // Assuming frames 4-7 represent player facing down
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('playerSprite', { start: 8, end: 11 }), // Assuming frames 8-11 represent player facing left
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('playerSprite', { start: 12, end: 15 }), // Assuming frames 12-15 represent player facing right
                frameRate: 10,
                repeat: -1
            });

            // Play default animation (e.g., 'down' animation)
            player.anims.play('down');
        
        }
    
        function update() {
          // Update game logic (e.g., handle user input, collision detection)
        }
    
        return () => {
          // Cleanup function (optional)
          game.destroy(true);
        };
      }, []);
    
      return <div id="game-container" />;
    }
    
export default Game
