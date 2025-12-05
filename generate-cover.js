import { createCanvas, loadFont, registerFont } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
    const canvas = createCanvas(1280, 1710);
    const ctx = canvas.getContext('2d');

    // Set background
    ctx.fillStyle = '#faf8f3';
    ctx.fillRect(0, 0, 1280, 1710);

    // Set font (using system font as fallback)
    ctx.font = 'bold 120px serif';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    // Draw repeated "Angela Weigl" text
    const text = 'Angela Weigl';
    const positions = [
        { x: 50, y: 150, rot: -2 },
        { x: 450, y: 150, rot: 1 },
        { x: 850, y: 150, rot: -1 },
        { x: 250, y: 350, rot: 1.5 },
        { x: 650, y: 350, rot: -1.5 },
        { x: 1050, y: 350, rot: 0.5 },
        { x: 50, y: 550, rot: -0.5 },
        { x: 450, y: 550, rot: 2 },
        { x: 850, y: 550, rot: -1 },
        { x: 250, y: 750, rot: 1 },
        { x: 650, y: 750, rot: -2 },
        { x: 1050, y: 750, rot: 0.5 },
        { x: 50, y: 950, rot: -1.5 },
        { x: 450, y: 950, rot: 1 },
        { x: 850, y: 950, rot: -0.5 },
        { x: 250, y: 1150, rot: 0.5 },
        { x: 650, y: 1150, rot: -1 },
        { x: 1050, y: 1150, rot: 1.5 },
        { x: 50, y: 1350, rot: -2 },
        { x: 450, y: 1350, rot: 1 },
        { x: 850, y: 1350, rot: -1 },
        { x: 250, y: 1550, rot: 1.5 },
        { x: 650, y: 1550, rot: -1.5 },
        { x: 1050, y: 1550, rot: 0.5 },
    ];

    positions.forEach(pos => {
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.rotate(pos.rot * Math.PI / 180);
        ctx.fillText(text, 0, 0);
        ctx.restore();
    });

    // Save as PNG
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, 'public', 'textures', 'book-cover.png'), buffer);
    console.log('Successfully generated book-cover.png!');
} catch (error) {
    console.log('Error:', error.message);
    console.log('Please install canvas: npm install canvas');
    console.log('Or open generate-cover.html in your browser to download the PNG');
}

