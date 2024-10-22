import Phaser from 'phaser';

class IntroScene extends Phaser.Scene {
    constructor() {
        super('IntroScene');
    }

    preload() {
        // Load the image with the correct path
        this.load.image('tut1', 'assets/tut1.png');
    }

    create() {
        const { width, height } = this.sys.game.config;

        // Set a solid background color
        this.cameras.main.setBackgroundColor('#F0F8FF'); // Light blue background

        // Create a container to hold all content
        const content = this.add.container(0, 0);
        let currentY = 50; // Initial Y position for placing elements

        // Title text: Tutorial and Rules
        const title = this.add.text(width / 2, currentY, 'Tutorial and Rules', {
            font: '40px Arial',
            fill: '#003366', // Dark blue for the title
            fontStyle: 'bold',
            align: 'center',
        }).setOrigin(0.5);
        content.add(title);

        currentY += title.height + 10;

        // Add first tutorial image
        const tutorialImage1 = this.add.image(0, 0, 'tut1');
        const maxImageHeight = height - currentY - 200;
        const maxImageWidth = width - 100;
        const scaleFactor = Math.min(maxImageWidth / tutorialImage1.width, maxImageHeight / tutorialImage1.height);
        tutorialImage1.setScale(scaleFactor).setPosition(width / 2, currentY + (tutorialImage1.height * scaleFactor) / 2);
        content.add(tutorialImage1);

        currentY += tutorialImage1.height * scaleFactor + 50;

        // Rules in English and Marathi
        const paragraphs = [
            "1. On the game screen you’ll see a horizon with an afternoon sun, a bee hive, and some flowers scattered in a field around the hive.",
            "2. For your reference there is also an index indicating 1 second = 1 km.",
            "3. As you enter the start, a bee will perform either a round dance or a waggle dance, depending on which flower it is trying to indicate you’ll have to guess the flower.",
            "1. खेळाच्या पडद्यावर तुम्हाला क्षितिज रेषा, दुपारचा डोक्यावर आलेला सूर्य, मधमाशांचे पोळे आणि कुरणात विखुरलेली फुले दिसतील.",
            "2. तुमच्या संदर्भासाठी पडद्यावर १ सेकंद = १ किलोमीटर हे दर्शवलेले असेल.",
            "3. तुम्ही खेळायला सुरुवात केली की पडद्यावर एक मधमाशी विशिष्ट प्रकारचा नाच करून दाखवेल. त्याचे नीट निरीक्षण करून तुम्हाला ती माशी कुठल्या फुलात मध/परागकण असल्याचे सांगत आहे हे तुम्हाला ओळखायचे आहे.",
        ];

        paragraphs.forEach(paragraph => {
            const paragraphText = this.add.text(40, currentY, paragraph, {
                font: '22px Arial',
                fill: '#003366',
                wordWrap: { width: width - 80, useAdvancedWrap: true },
                align: 'justify',
                lineSpacing: 5,
            }).setOrigin(0, 0);
            content.add(paragraphText);
            currentY += paragraphText.height + 15;
        });

        const playButton = this.add.text(width / 2, currentY + 30, 'Play Game', {
            font: '26px Arial',
            fill: '#FFFFFF',
            backgroundColor: '#003366',
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            stroke: '#000000',
            strokeThickness: 2,
        }).setInteractive().setOrigin(0.5);

        content.add(playButton);
        playButton.on('pointerdown', () => {
            this.scene.start('lvl2');
        });

        const totalContentHeight = currentY + playButton.height + 30;
        const maxScrollY = totalContentHeight > height ? totalContentHeight - height : 0;

        const buttonX = width - 30;
        const scrollUpButton = this.add.text(buttonX, height / 2 - 30, '↑', {
            font: '32px Arial',
            fill: '#FFFFFF',
            backgroundColor: '#003366',
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
        }).setInteractive().setScrollFactor(0).setOrigin(0.5);

        const scrollDownButton = this.add.text(buttonX, height / 2 + 30, '↓', {
            font: '32px Arial',
            fill: '#FFFFFF',
            backgroundColor: '#003366',
            padding: { left: 10, right: 10, top: 5, bottom: 5 },
        }).setInteractive().setScrollFactor(0).setOrigin(0.5);

        scrollUpButton.on('pointerdown', () => {
            this.cameras.main.scrollY = Phaser.Math.Clamp(this.cameras.main.scrollY - 100, 0, maxScrollY);
        });

        scrollDownButton.on('pointerdown', () => {
            this.cameras.main.scrollY = Phaser.Math.Clamp(this.cameras.main.scrollY + 100, 0, maxScrollY);
        });

        if (maxScrollY > 0) {
            this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
                this.cameras.main.scrollY = Phaser.Math.Clamp(this.cameras.main.scrollY + deltaY * 0.5, 0, maxScrollY);
            });
        }

        this.cameras.main.setScroll(0, 0);

        // Quit button at top-left
        const quitButton = this.add.text(10, 10, 'Quit', {
            font: '24px Arial',
            fill: '#FFFFFF',
            backgroundColor: '#FF0000', // Red background
            padding: { left: 15, right: 15, top: 5, bottom: 5 },
        }).setInteractive().setScrollFactor(0).setOrigin(0);

        quitButton.on('pointerdown', () => {
            window.location.href = 'https://rrbcea.vercel.app'; // Navigate to external link
        });

        // Play button at top-right
        const topRightPlayButton = this.add.text(width - 10, 10, 'Play', {
            font: '24px Arial',
            fill: '#FFFFFF',
            backgroundColor: '#003366', // Dark blue background
            padding: { left: 15, right: 15, top: 5, bottom: 5 },
        }).setInteractive().setScrollFactor(0).setOrigin(1, 0);

        topRightPlayButton.on('pointerdown', () => {
            this.scene.start('lvl2');
        });
    }
}

export default IntroScene;
