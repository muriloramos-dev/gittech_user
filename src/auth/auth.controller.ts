import { TokenAuth } from './dto/token-auth';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, InternalServerErrorException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import express from 'express';
import { CookieService } from 'src/cookie/cookie.service';
import { AuthLocally } from './dto/auth-locally';
import { RegisterUserFisicaDto, RegisterUserJuridicaDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly cookieService: CookieService) { }

  @Post("login")
  async loginLocally(@Body() authLocally: AuthLocally, @Res() response: express.Response) {
    const tokens: TokenAuth = await this.authService.loginLocally(authLocally.email, authLocally.password);
    await this.cookieService.sendCookie("accessToken", tokens.accessToken, response);
    await this.cookieService.sendCookie("refreshToken", tokens.refreshToken, response);

    response.status(200).json({ message: 'Login successful' });
  }

  @Post("register/pf")
  async registerUserPF(@Body() userEntity: RegisterUserFisicaDto) {
    await this.authService.registerUserPF(userEntity);
  }

  @Post("register/pj")
  async registerUserPJ(@Body() userEntity: RegisterUserJuridicaDto) {
    await this.authService.registerUserPJ(userEntity);
  }
}
