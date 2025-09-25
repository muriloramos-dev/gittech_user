import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { TokenService } from 'src/token/token.service';
import { CookieService } from 'src/cookie/cookie.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService, CookieService, PrismaService],
})
export class AuthModule {}
