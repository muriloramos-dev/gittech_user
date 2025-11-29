import { Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class CookieService {
    async sendCookie(key: string, token: string, response: Response) {
        response.cookie(key, token, {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
            secure: false, // true em produção com HTTPS
            httpOnly: true,
            sameSite: 'lax', // Permite cookies entre localhost:3000 e localhost:8080
        });
    }
}
