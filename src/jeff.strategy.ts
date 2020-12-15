import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-http-bearer';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import axios from 'axios';

@Injectable()
export class JeffStrategy extends PassportStrategy(Strategy, 'jeff') {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  public async validate(token: string) {
    const user = await axios.get(
      this.configService
        .get('JEFF_AUTH_VALIDATION_URL')
        .replace(':userId', token),
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
