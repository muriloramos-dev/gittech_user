import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
    async sendCookie(key: string, token: string, response: Response) {
        response.cookie(key, token, {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 20,
            secure: false,
            httpOnly: true
        });
    }
}
