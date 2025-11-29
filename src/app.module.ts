import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { TokenService } from './token/token.service';
import { CookieService } from './cookie/cookie.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, JwtModule],
  controllers: [],
  providers: [PrismaService, TokenService, CookieService],
})
export class AppModule {}
