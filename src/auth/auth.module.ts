import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CognitoAuthModule } from '@nestjs-cognito/auth';
import { AuthConfiguration } from './auth.configuration';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from 'src/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`stage.${process.env.STAGE}.env`],
      validationSchema: configValidationSchema,
      isGlobal: true,
      cache: true,
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CognitoAuthModule.register({
      jwtVerifier: {
        userPoolId: process.env.AWS_COGNITO_USERPOOL_ID,
        clientId: process.env.AWS_COGNITO_CLIENTID,
        tokenUse: 'id',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthConfiguration],
})
export class AuthModule {}
