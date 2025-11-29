import { TokenAuth } from './dto/token-auth';
import { Controller, Get, Post, Body, UseGuards, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { Response, Request } from 'express';
import { CookieService } from 'src/cookie/cookie.service';
import { AuthLocally } from './dto/auth-locally';
import { RegisterUserFisicaDto, RegisterUserJuridicaDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly cookieService: CookieService) { }

  @Post("login")
  async loginLocally(@Body() authLocally: AuthLocally, @Res() response: Response) {
    const tokens: TokenAuth = await this.authService.loginLocally(authLocally.email, authLocally.password);
    await this.cookieService.sendCookie("accessToken", tokens.accessToken, response);
    await this.cookieService.sendCookie("refreshToken", tokens.refreshToken, response);
    console.log(tokens.userId);
    response.status(200).json({ userId: tokens.userId });
  }

  @Post('logout')
  logout(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.json({ message: 'Logout successful' });
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async getMe(@Req() req: Request) {
    const user = req['user']; // Dados do JWT decodificado
    
    // O JWT usa 'userid' não 'sub'
    const fullUser = await this.authService.findUserById(user.userid);
    
    if (!fullUser) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: fullUser.id,
      username: fullUser.username,
      email: fullUser.email,
    };
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
