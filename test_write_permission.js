import fs from 'fs';
import path from 'path';

const testDir = path.join(process.cwd(), 'data', 'inquiries');
const testFile = path.join(testDir, 'test_write.txt');

try {
    if (!fs.existsSync(testDir)) {
        fs.mkdirSync(testDir, { recursive: true });
    }
    fs.writeFileSync(testFile, 'Test content ' + new Date().toISOString());
    console.log('Successfully wrote to ' + testFile);
} catch (err) {
    console.error('Failed to write:', err);
}
