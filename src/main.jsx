// src/main.jsx
import Phaser from 'phaser';
import MatchingGameScene from './game/scenes/MatchingGameScene'; // Make sure this path is correct
import DetailsScene from './game/scenes/DetailsScene'; // Ensure this path is correct as well
import lvl2 from './game/scenes/lvl2'; 



const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#0ec3c9', // Set your desired blueish color here
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MatchingGameScene, DetailsScene, lvl2, ]
};

const game = new Phaser.Game(config);


