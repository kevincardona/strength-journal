import { Controller, Request, Response, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Request() req,
    @Response() res,
  ) {
    const token = await this.authService.login(req.user)
    res.cookie('access-token', token, { httpOnly: true, sameSite: 'strict' });
    return res.send({success: true})
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth-test')
  getProfile() {
    return "Success!";
  }
}