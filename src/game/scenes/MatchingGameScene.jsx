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

        // Adjust Y position after the title
        currentY += title.height + 10;

        // Add first tutorial image below the title and adjust its size dynamically
        const tutorialImage1 = this.add.image(0, 0, 'tut1');
        const maxImageHeight = height - currentY - 200; // Space available for the image between title and text
        const maxImageWidth = width - 100; // Padding from both sides
        const scaleFactor = Math.min(maxImageWidth / tutorialImage1.width, maxImageHeight / tutorialImage1.height);
        tutorialImage1.setScale(scaleFactor).setPosition(width / 2, currentY + (tutorialImage1.height * scaleFactor) / 2);

        content.add(tutorialImage1);
        // Adjust Y position after the image
        currentY += tutorialImage1.height * scaleFactor + 50;

        // Define the paragraphs for rules in both English and Marathi
        const paragraphs = [
            "1. On the game screen you’ll see a horizon with an afternoon sun, a bee hive, and some flowers scattered in a field around the hive.",
            "2. For your reference there is also an index indicating 1 second = 1 km.",
            "3. As you enter the start, a bee will perform either a round dance or a waggle dance, depending on which flower it is trying to indicate you’ll have to guess the flower.",
            "4. If you guess the flower correctly, you earn +50 points.",
            "5. There are 5 flowers to guess per gaming session with a maximum end total of 250 points",
            "1. खेळाच्या पडद्यावर तुम्हाला क्षितिज रेषा, दुपारचा डोक्यावर आलेला सूर्य, मधमाशांचे पोळे  आणि कुरणात विखुरलेली फुले दिसतील.",
            "2. तुमच्या संदर्भासाठी पडद्यावर १ सेकंद = १ किलोमीटर हे दर्शवलेले असेल.",
            "3. तुम्ही खेळायला सुरुवात केली की पडद्यावर एक मधमाशी विशिष्ट प्रकारचा नाच करून दाखवेल. त्याचे नीट निरीक्षण करून तुम्हाला ती माशी कुठल्या फुलात मध/परागकण असल्याचे सांगत आहे हे तुम्हाला ओळखायचे आहे.",
            "4. तुम्ही नाचायची दिशा, अंतर लक्षात घेऊन योग्य ते फूल निवडले तर तुम्हाला ५० गुण मिळतील.",
            "5. खेळाच्या प्रत्येक सत्रात जास्तीत जास्त ५ फुले तुम्ही ओळखू शकता आणि २५० गुण मिळवू शकता."
        ];

        // Add the paragraphs with justified alignment and padding
        paragraphs.forEach(paragraph => {
            const paragraphText = this.add.text(40, currentY, paragraph, {
                font: '22px Arial',
                fill: '#003366', // Dark blue for body text
                wordWrap: { width: width - 80, useAdvancedWrap: true }, // Wrap text within screen width
                align: 'justify',
                lineSpacing: 5,
            }).setOrigin(0, 0);
            content.add(paragraphText);
            currentY += paragraphText.height + 15; // Minimal spacing between paragraphs
        });

        // Add the "Play Game" button after the last paragraph
        const playButton = this.add.text(width / 2, currentY + 30, 'Play Game', {
            font: '26px Arial',
            fill: '#FFFFFF',  // White text for the button
            backgroundColor: '#003366',  // Dark blue button background
            padding: { left: 20, right: 20, top: 10, bottom: 10 },
            stroke: '#000000', // Add a stroke for better visibility
            strokeThickness: 2,
        }).setInteractive().setOrigin(0.5);

        content.add(playButton);

        // Click action for the Play button
        playButton.on('pointerdown', () => {
            this.scene.start('lvl2');  // Transition to the next game scene
        });

        // Adjust camera scroll
        const maxScrollY = currentY + playButton.height - height; // Scroll limit
        this.cameras.main.setScroll(0, 0); // Reset scroll

        // Scroll with mouse wheel
        this.input.on('wheel', (pointer, gameObjects, deltaX, deltaY) => {
            this.cameras.main.scrollY = Phaser.Math.Clamp(this.cameras.main.scrollY + deltaY * 0.5, 0, maxScrollY);
        });
    }
}



export default IntroScene;
