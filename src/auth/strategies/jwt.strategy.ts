import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '@src/interfaces/jwt-payload.interface';
import { UserService } from '@src/schemas/user/user.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('PRIVATE_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    // return this.userService.getOne(payload.id);
    return this.userService.getOneByEmail(payload.email);
  }

  private getTokenFromCookie(req: Request): string | null {
    if (req?.cookies) {
      return req.cookies['AuthorizationToken'] || null;
    }
    return null;
  }

  authenticate(req: Request, options?: any): any {
    const token = this.getTokenFromCookie(req);
    if (token) {
      req.headers['authorization'] = `Bearer ${token}`;
    }
    return super.authenticate(req, options);
  }
}
