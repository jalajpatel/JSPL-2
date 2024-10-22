import Phaser from 'phaser';

class BeeDanceGameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'lvl2' });
    }

    preload() {
        // Load all the videos from the assets folder
        this.load.video('Down-Short', 'public/assets/Down-Short.mp4');
        this.load.video('Left-Short', 'public/assets/Left-Short.mp4');
        this.load.video('Down-Long', 'public/assets/Down-Long.mp4');
        this.load.video('Left-Long', 'public/assets/Left-Long.mp4');
        this.load.video('Right-Long', 'public/assets/Right-Long.mp4');
        this.load.video('Right-Short', 'public/assets/Right-Short.mp4');
        this.load.video('Round-Left', 'public/assets/Round-Left.mp4');
        this.load.video('Round-Right', 'public/assets/Round-Right.mp4');
        this.load.video('Up-Long', 'public/assets/Up-Long.mp4');
        this.load.video('Up-Short', 'public/assets/Up-Short.mp4');
    }

    create() {
        const { width, height } = this.sys.game.config;

        // Display "BEE DANCE GAME" at the top center
        this.add.text(width / 2, 30, 'BEE DANCE GAME', {
            fontSize: '52px',
            fontFamily: 'Arial',
            color: '#ffdf00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6,
            shadow: { offsetX: 4, offsetY: 4, color: '#000000', blur: 6, fill: true }
        }).setOrigin(0.5);

        // Add instruction text on the left side
        this.add.text(50, height / 2 - 50, 'Watch the dance and\nchoose the correct flower:', {
            fontSize: '50px',
            fontFamily: 'Arial',
            color: '#ffffff',
            align: 'left',
            lineSpacing: 10
        }).setOrigin(0);

        // Draw a rectangle on the right side for the video
        const rectWidth = width / 3.55;
        const rectHeight = height / 2;
        const rectX = width - rectWidth - 50;
        const rectY = height / 2 - rectHeight / 2;

        const graphics = this.add.graphics();
        graphics.fillStyle(0x222222, 0.8); // Semi-transparent background
        graphics.fillRoundedRect(rectX, rectY, rectWidth, rectHeight, 20); // Rounded rectangle

        // Add a border around the rectangle
        graphics.lineStyle(5, 0xffdf00);
        graphics.strokeRoundedRect(rectX, rectY, rectWidth, rectHeight, 20);

        // Array of all video keys and the corresponding correct flower
        const videoFlowerMap = {
            'Down-Short': 'flower5',
            'Left-Short': 'flower8',
            'Down-Long': 'flower6',
            'Left-Long': 'flower7',
            'Right-Long': 'flower12',
            'Right-Short': 'flower11',
            'Round-Right': 'flower10',
            'Round-Left': 'flower9',
            'Up-Long': 'flower1',
            'Up-Short': 'flower2'
        };

        // Pick a random video key from the object keys
        const randomVideoKey = Phaser.Utils.Array.GetRandom(Object.keys(videoFlowerMap));

        // Add the random video inside the rectangle
        const video = this.add.video(rectX + rectWidth / 2, rectY + rectHeight / 2, randomVideoKey);

        // Once the video is loaded, resize it to fit within the rectangle while maintaining the aspect ratio
        video.on('play', () => {
            const videoAspectRatio = video.width / video.height;
            const rectAspectRatio = rectWidth / rectHeight;

            if (videoAspectRatio > rectAspectRatio) {
                video.setDisplaySize(rectWidth, rectWidth / videoAspectRatio);
            } else {
                video.setDisplaySize(rectHeight * videoAspectRatio, rectHeight);
            }
        });

        // Play the video
        video.play(true); // Looping video

        // Add "Choose the Flower" button at the bottom of the screen
        const button = this.add.text(width / 2, height - 50, 'Choose the Flower', {
            fontSize: '40px',
            fontFamily: 'Arial',
            color: '#ffdf00',
            backgroundColor: '#000000',
            padding: { left: 20, right: 20, top: 10, bottom: 10 }
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // Button hover effect
        button.on('pointerover', () => {
            button.setStyle({ fill: '#ffffff' });
        });
        button.on('pointerout', () => {
            button.setStyle({ fill: '#ffdf00' });
        });

        // On button click, transition to DetailsScene and pass the correct flower
        button.on('pointerdown', () => {
            this.scene.start('DetailsScene', { correctFlower: videoFlowerMap[randomVideoKey], score: this.score });
        });

        // Add Instruction Button at the top-left corner
        const instructionButton = this.add.text(20, 20, 'Instructions', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive({ useHandCursor: true });

        instructionButton.on('pointerdown', () => {
            alert("Watch the bee's dance closely and select the correct flower from the garden!");
        });

        // Add Quit Button at the top-right corner
        const quitButton = this.add.text(width - 100, 20, 'Quit', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#ff0000',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive({ useHandCursor: true });

        quitButton.on('pointerdown', () => {
            // Display a custom confirmation text
            const confirmationText = this.add.text(width / 2, height / 2, 'Are you sure you want to quit?', {
                fontSize: '32px',
                fontFamily: 'Arial',
                color: '#ff0000',
                backgroundColor: '#000000',
                padding: { left: 20, right: 20, top: 10, bottom: 10 }
            }).setOrigin(0.5);

            // Add Yes and No buttons for the user to select
            const yesButton = this.add.text(width / 2 - 100, height / 2 + 50, 'Yes', {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#00ff00',
                backgroundColor: '#000000',
                padding: { left: 10, right: 10, top: 5, bottom: 5 }
            }).setInteractive({ useHandCursor: true }).setOrigin(0.5);

            const noButton = this.add.text(width / 2 + 100, height / 2 + 50, 'No', {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: '#ff0000',
                backgroundColor: '#000000',
                padding: { left: 10, right: 10, top: 5, bottom: 5 }
            }).setInteractive({ useHandCursor: true }).setOrigin(0.5);

            // Handle Yes click: Restart the game
            yesButton.on('pointerdown', () => {
                this.scene.start('IntroScene'); // Restart the game by going back to IntroScene
            });

            // Handle No click: Remove the confirmation dialog
            noButton.on('pointerdown', () => {
                confirmationText.destroy();
                yesButton.destroy();
                noButton.destroy();
            });
        });
    }

    // Function to update score
    updateScore(points) {
        this.score += points;
        this.scoreText.setText(`Score: ${this.score}`);
    }
}

export default BeeDanceGameScene;
