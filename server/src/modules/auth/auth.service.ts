import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { hash, compare } from 'bcrypt';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const userExisted = await this.usersService.findByUsername(
      createUserDto.username,
    );
    if (userExisted) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hash(createUserDto.password, 10);

    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(newUser);
    await this.updateRefreshToken(newUser._id, tokens.refreshToken);
    return tokens;
  }

  async login(authDto: AuthDto) {
    const user = await this.usersService.findByUsername(authDto.username);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordMatches = await compare(authDto.password, user.password);
    if (!passwordMatches) {
      throw new BadRequestException('Password is incorrect');
    }

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: string) {
    return this.usersService.update(userId, { refreshToken: null });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    console.log(user);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await compare(refreshToken, user.refreshToken);

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken, 10);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(user) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: user._id, username: user.username },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('ACCESS_EXPIRES_IN'),
        },
      ),
      this.jwtService.signAsync(
        { sub: user._id, username: user.username },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('REFRESH_EXPIRES_IN'),
        },
      ),
    ]);

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      accessToken,
      refreshToken,
    };
  }
}
