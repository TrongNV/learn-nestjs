import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
const sharp = require('sharp');

@Injectable()
export class CloudinaryService {
    async uploadImage(
        file: Express.Multer.File,
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {

        const fileNew = await sharp(file.buffer).resize(300, 200).png().toBuffer();

        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream((error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
            toStream(fileNew).pipe(upload);
        });
    }
}