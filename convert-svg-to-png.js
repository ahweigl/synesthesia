import fs from 'fs';
import { createRequire } from 'module';

// Try to use sharp if available, otherwise provide instructions
try {
    const sharp = await import('sharp').catch(() => null);

    if (sharp) {
        const svgBuffer = fs.readFileSync('./public/textures/book-cover.svg');
        await sharp.default(svgBuffer)
            .resize(1280, 1710)
            .png()
            .toFile('./public/textures/book-cover.png');
        console.log('Converted SVG to PNG successfully!');
    } else {
        console.log('Sharp not available. Please install it: npm install sharp');
        console.log('Or use an online converter to convert book-cover.svg to book-cover.png at 1280x1710');
    }
} catch (error) {
    console.log('Error:', error.message);
    console.log('Please install sharp: npm install sharp');
    console.log('Or manually convert book-cover.svg to book-cover.png at 1280x1710 resolution');
}

