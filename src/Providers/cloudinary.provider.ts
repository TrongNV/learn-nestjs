import { v2 } from 'cloudinary';

export const CLOUDINARY = 'Cloudinary';

export const CloudinaryProvider = {
    provide: CLOUDINARY,
    useFactory: (): void => {
        v2.config({
            cloud_name: process.env.CLOUDNAME,
            api_key: process.env.APIKEY,
            api_secret: process.env.APISECRET,
        });
    },
};