import https from 'https';
import sharp from 'sharp';

export const handler = async (event) => {
    try {
        // 1️⃣ Parse request from CloudFront
        const request = event.Records[0].cf.request;
        const imageUrl = 'https://' + request.headers.host[0].value + request.uri;

        // Example query params like ?w=600&h=400
        const queryString = request.querystring;
        const params = new URLSearchParams(queryString);
        const width = parseInt(params.get('w')) || 1080;
        const height = parseInt(params.get('h')) || 720;

        // 2️⃣ Fetch original image (e.g., from S3 or external URL)
        const imageBuffer = await fetchImage(imageUrl);

        // 3️⃣ Convert to WebP and limit size to 50KB
        const targetSize = 50 * 1024;
        let quality = 85;
        let webpBuffer;

        for (; quality >= 30; quality -= 5) {
            const buffer = await sharp(imageBuffer)
                .resize(width, height, { fit: 'inside', withoutEnlargement: true })
                .webp({ quality })
                .toBuffer();

            if (buffer.length <= targetSize) { webpBuffer = buffer; break; } webpBuffer = buffer;
        } // 4️⃣ Return optimized image
    response return {
            status: '200', statusDescription: 'OK', headers: {
                'content-type': [{
                    key: 'Content-Type',
                    value: 'image/webp'
                }], 'cache-control': [{ key: 'Cache-Control', value: 'public, max-age=31536000' }],
            }, body:
                webpBuffer.toString('base64'), bodyEncoding: 'base64',
        };
    } catch (err) {
        console.error('Error:', err); return {
            status: '500', body: 'Error converting image',
        };
    }
}; // Helper to fetch image const fetchImage=(url)=> {
return new Promise((resolve, reject) => {
    https
        .get(url, (res) => {
            const chunks = [];
            res.on('data', (chunk) => chunks.push(chunk));
            res.on('end', () => resolve(Buffer.concat(chunks)));
        })
        .on('error', reject);
});
    };