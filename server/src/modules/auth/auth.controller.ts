import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { IAuthRequest } from './interfaces/auth-request.interface';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register user' })
  @Post('register')
  register(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(createUserDto);

    res.status(HttpStatus.OK);
    return this.authService.register(createUserDto);
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  login(@Body() authDto: AuthDto, @Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return this.authService.login(authDto);
  }

  @ApiOperation({ summary: 'Logout' })
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: IAuthRequest, @Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    this.authService.logout(req.user['sub']);
  }

  @ApiOperation({ summary: 'Refresh Token' })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(
    @Req() req: IAuthRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    res.status(HttpStatus.OK);
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
