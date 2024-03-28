import fs from 'fs';
import path from 'path';

export default async function fileReader() {
    const directoryPath = './images';
    const files = await fs.promises.readdir(directoryPath);

    const base64Uris = await Promise.all(files.map(async (file) => {
        const filePath = path.join(directoryPath, file);
        const fileBuffer = await fs.promises.readFile(filePath);
        const base64Uri = `data:image/${path.extname(file).slice(1)};base64,${fileBuffer.toString('base64')}`;
        return base64Uri;
    }));

    return base64Uris;
}



console.log(await fileReader())