import Phaser from 'phaser';

class DetailsScene extends Phaser.Scene {
    constructor() {
        super({ key: 'DetailsScene' });
        this.attempts = 0; // Track the number of attempts
        this.maxAttempts = 3; // Maximum number of attempts allowed
    }

    preload() {
        // Create a loading bar
        const { width, height } = this.sys.game.config;
        const loadingBarWidth = width * 0.6;
        const loadingBarHeight = 20;

        const loadingBarBackground = this.add.graphics();
        loadingBarBackground.fillStyle(0x222222, 1);
        loadingBarBackground.fillRect(
            (width - loadingBarWidth) / 2,
            height / 2 - loadingBarHeight / 2,
            loadingBarWidth,
            loadingBarHeight
        );

        const loadingBarFill = this.add.graphics();

        const loadingText = this.add.text(
            width / 2,
            height / 2 - 50,
            'Loading...',
            { font: '24px Arial', fill: '#ffffff' }
        ).setOrigin(0.5);

        // Update the loading bar as assets load
        this.load.on('progress', (value) => {
            loadingBarFill.clear();
            loadingBarFill.fillStyle(0xffffff, 1);
            loadingBarFill.fillRect(
                (width - loadingBarWidth) / 2,
                height / 2 - loadingBarHeight / 2,
                loadingBarWidth * value,
                loadingBarHeight
            );
        });

        // Clean up loading graphics once loading is complete
        this.load.on('complete', () => {
            loadingBarBackground.destroy();
            loadingBarFill.destroy();
            loadingText.destroy();
        });

        // Preload the background image, beehive image, and flower images from the public/assets folder
        this.load.image('bgImage', 'assets/gamebg.jpeg');
        this.load.image('beehive', 'assets/beehive.png');
        this.load.image('flower1', 'assets/flower1.png');
        this.load.image('flower2', 'assets/flower2.png');
        // this.load.image('flower3', 'assets/flower3.png');
        // this.load.image('flower4', 'assets/flower4.png');
        this.load.image('flower5', 'assets/flower5.png');
        this.load.image('flower6', 'assets/flower6.png');
        this.load.image('flower7', 'assets/flower7.png');
        this.load.image('flower8', 'assets/flower8.png');
        this.load.image('flower9', 'assets/flower9.png');
        this.load.image('flower10', 'assets/flower10.png');
        this.load.image('flower11', 'assets/flower11.png');
        this.load.image('flower12', 'assets/flower12.png');
    }

    create(data) {
         const { width, height } = this.sys.game.config;
    const correctFlower = data.correctFlower;
    this.score = data.score || 0;

    // Add the background image, scaling it to fill the screen
    this.add.image(width / 2, height / 2, 'bgImage').setDisplaySize(width, height);

    // Set the size of the beehive based on screen size
    const isBigScreen = width > 1900; // For screens larger than 1900px
    const beehiveSize = isBigScreen ? 400 : 170; // Adjust size for larger screens

    const beehiveX = width / 2 + 30;
    const beehiveY = height / 2;
    const beehive = this.add.image(beehiveX, beehiveY, 'beehive')
        .setDisplaySize(beehiveSize, beehiveSize)
        .setOrigin(0.5);

    // Set flower sizes based on screen width
    const flowerSize = isBigScreen ? 280 : 160; // Larger size for bigger screens
    const verticalSpacing = isBigScreen ? 150 : 100;
    const horizontalSpacing = isBigScreen ? 200 : 150;

    // Random flower selection logic stays the same
    const allFlowers = [
        'flower1', 'flower2',
        'flower5', 'flower6', 'flower7', 'flower8',
        'flower9', 'flower10', 'flower11', 'flower12'
    ];
    const incorrectFlowers = allFlowers.filter(flower => flower !== correctFlower);
    const randomIncorrectFlowers = Phaser.Utils.Array.Shuffle(incorrectFlowers).slice(0, 3);
    const displayedFlowers = Phaser.Utils.Array.Shuffle([correctFlower, ...randomIncorrectFlowers]);

    // Adjust positions dynamically based on screen size
    if (displayedFlowers.includes('flower1')) {
        this.createClickableFlower(width / 1.9, height / 2 - 2.4 * verticalSpacing, 'flower1', flowerSize, correctFlower);
    }
    if (displayedFlowers.includes('flower2')) {
        this.createClickableFlower(width / 1.9, height / 2 - 1.4 * verticalSpacing, 'flower2', flowerSize, correctFlower);
    }
    if (displayedFlowers.includes('flower5')) {
        this.createClickableFlower(width / 1.9, height / 2 + 1.8 * verticalSpacing, 'flower5', flowerSize, correctFlower);
    }
    if (displayedFlowers.includes('flower6')) {
        this.createClickableFlower(width / 1.9, height / 2 + 2.7 * verticalSpacing, 'flower6', flowerSize, correctFlower);
    }
    if (displayedFlowers.includes('flower7')) {
        this.createClickableFlower(width / 2 - 3 * horizontalSpacing, height / 1.85, 'flower7', flowerSize, correctFlower);
    }
    if (displayedFlowers.includes('flower8')) {
        this.createClickableFlower(width / 2 - 2 * horizontalSpacing, height / 1.85, 'flower8', flowerSize, correctFlower);
    }
    if (displayedFlowers.includes('flower9')) {
        this.createClickableFlower(width / 2 - horizontalSpacing, height / 1.85, 'flower9', flowerSize, correctFlower);
    }
    if (displayedFlowers.includes('flower10')) {
        this.createClickableFlower(width / 2 + horizontalSpacing, height / 1.85, 'flower10', flowerSize, correctFlower);
    }
    if (displayedFlowers.includes('flower11')) {
        this.createClickableFlower(width / 2 + 2 * horizontalSpacing, height / 1.85, 'flower11', flowerSize, correctFlower);
    }
    if (displayedFlowers.includes('flower12')) {
        this.createClickableFlower(width / 2 + 3 * horizontalSpacing, height / 1.85, 'flower12', flowerSize, correctFlower);
    }

        // Add Instruction Button at the top-left corner
        const instructionButton = this.add.text(20, 20, 'Instructions', {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        }).setInteractive({ useHandCursor: true });

        instructionButton.on('pointerdown', () => {
            alert("Select the correct flower based on the bee's dance to earn points!");
        });

        // Display score at the top-right corner
        this.scoreText = this.add.text(width - 150, 20, `Score: ${this.score}`, {
            fontSize: '24px',
            fontFamily: 'Arial',
            color: '#ffffff',
            backgroundColor: '#000000',
            padding: { left: 10, right: 10, top: 5, bottom: 5 }
        });
    }

    createClickableFlower(x, y, texture, size, correctFlower) {
        const flower = this.add.image(x, y, texture).setDisplaySize(size, size).setInteractive();

        flower.on('pointerdown', () => {
            let message, color;
            
            if (texture === correctFlower) {
                this.updateScore(50); // +50 for correct
                message = 'Congratulations! You are correct!';
                color = '#00FF00';
            } else {
                this.updateScore(-20); // -20 for incorrect
                message = 'Wrong! Try again!';
                color = '#FF0000';
            }

            // Show the feedback popup
            this.showPopup(message, color, true); // Add 'true' to indicate we are moving to the next stage
        });
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    showPopup(message, color, moveToNextStage = false) {
    const { width, height } = this.sys.game.config;

    // Create a semi-transparent background for the popup
    const popupBg = this.add.graphics();
    popupBg.fillStyle(0x000000, 0.6);
    popupBg.fillRect(0, 0, width, height);

    // Create the popup message text
    const feedbackText = this.add.text(width / 2, height / 2 - 50, message, {
        fontSize: '36px',
        fontFamily: 'Arial',
        color: color,
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4,
        shadow: { offsetX: 3, offsetY: 3, color: '#000000', blur: 4, fill: true }
    }).setOrigin(0.5);

    // Create the "Next Term" button with styling
    const continueButton = this.add.text(width / 2, height / 2 + 50, 'Next Term', {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: '#ffffff',
        backgroundColor: '#0000ff',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    continueButton.on('pointerdown', () => {
        popupBg.destroy();
        feedbackText.destroy();
        continueButton.destroy();

        // Update the attempts count
        this.attempts += 1;

        // Check if the player has reached the maximum number of attempts
        if (this.attempts >= this.maxAttempts) {
            // Show the final score message
            this.showFinalScore();

            // Redirect to the instruction page after 5 seconds
            this.time.delayedCall(5000, () => {
                this.scene.start('IntroScene');
            });
        } else {
            // Go to the next stage (lvl2) after the question is answered
            if (moveToNextStage) {
                this.scene.start('lvl2', { score: this.score, attempts: this.attempts });
            } else {
                // Continue to the next question, passing the score and attempts
                this.scene.start('BeeDanceGameScene', { score: this.score, attempts: this.attempts });
            }
        }
    });
}

showFinalScore() {
    const { width, height } = this.sys.game.config;

    // Create a semi-transparent background for the popup
    const finalPopupBg = this.add.graphics();
    finalPopupBg.fillStyle(0x000000, 0.6);
    finalPopupBg.fillRect(0, 0, width, height);

    // Create the final score text with cumulative score (this.score holds the total score)
    const finalScoreText = this.add.text(width / 2, height / 2, `Your score in your last attempt: ${this.score}`, {
        fontSize: '36px',
        fontFamily: 'Arial',
        color: '#ffffff',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 4,
        shadow: { offsetX: 3, offsetY: 3, color: '#000000', blur: 4, fill: true }
    }).setOrigin(0.5);

    // Reset score and attempts to their initial state
    this.score = 0;
    this.attempts = 0;

    // Show the final score for 5 seconds before redirecting to the instruction page
    this.time.delayedCall(5000, () => {
        this.scene.start('IntroScene');  // Redirect to the instruction page and reset the game
    });
}
}
export default DetailsScene;
