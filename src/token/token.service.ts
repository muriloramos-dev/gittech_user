import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) { }

    async generateAccessToken(userId: string, username: string, email: string) {
        return await this.jwtService.signAsync({ userid: userId, username: username, email: email }, {
            expiresIn: "7d",
        });
    }

    async veririfyAccessToken(accessToken: string) {
        return await this.jwtService.verifyAsync(accessToken);
    }

    async generateRefreshToken(userId: string, username: string, email: string) {
        return await this.jwtService.signAsync({ userid: userId, username: username, email: email }, {
            expiresIn: "30d",
        });
    }

    async verifyRefreshToken(refreshToken: string): Promise<boolean> {
        try {
            await this.jwtService.verifyAsync(refreshToken);
            return true;
        } catch (err) {
            return false;
        }
    }
}
