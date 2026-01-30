import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
    try {
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json({ message: 'No image provided' }, { status: 400 });
        }

        const uploadDir = path.join(process.cwd(), 'public', 'uploads');

        // Ensure directory exists
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        // Handle base64 image
        if (image.startsWith('data:image')) {
            const base64Data = image.split(',')[1];
            const mimeType = image.split(';')[0].split(':')[1];
            const extension = mimeType.split('/')[1] || 'jpg';
            const fileName = `upload_${Date.now()}.${extension}`;

            const filePath = path.join(uploadDir, fileName);
            await fs.writeFile(filePath, base64Data, 'base64');

            return NextResponse.json({ url: `/uploads/${fileName}` });
        }

        // Handle external URL - auto download if requested or by default for local storage
        if (image.startsWith('http')) {
            try {
                const response = await fetch(image);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                const contentType = response.headers.get('content-type') || 'image/jpeg';
                const extension = contentType.split('/')[1] || 'jpg';
                const fileName = `downloaded_${Date.now()}.${extension}`;

                const filePath = path.join(uploadDir, fileName);
                await fs.writeFile(filePath, buffer);

                return NextResponse.json({ url: `/uploads/${fileName}` });
            } catch (err) {
                console.error('Failed to download image:', err);
                // Fallback to original URL if download fails
                return NextResponse.json({ url: image });
            }
        }

        return NextResponse.json({ url: image });

    } catch (error: any) {
        console.error('Local upload error:', error);
        return NextResponse.json({ message: error.message || 'Upload failed' }, { status: 500 });
    }
}
