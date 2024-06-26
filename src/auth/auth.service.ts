import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  CognitoRefreshToken,
} from 'amazon-cognito-identity-js';
import passport from 'passport';
import { LoginAuthDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { UsersService } from 'src/users/users.service';
import { AuthUserRegisterDto } from './dto/auth-user-register.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
const AWS = require('aws-sdk');

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  private userPool;
  private poolData;

  private cognitoIdentityServiceProvider;
  private userPoolId;

  constructor(private readonly usersService: UsersService) {
    this.poolData = {
      UserPoolId: process.env.AWS_COGNITO_USERPOOL_ID,
      ClientId: process.env.AWS_COGNITO_CLIENTID,
    };
    this.userPool = new CognitoUserPool(this.poolData);

    AWS.config.update({
      region: process.env.AWS_REGION,
      credentials: new AWS.Credentials({
        accessKeyId: process.env.AWS_accessKeyId,
        secretAccessKey: process.env.AWS_secretAccessKey,
      }),
    });

    this.cognitoIdentityServiceProvider =
      new AWS.CognitoIdentityServiceProvider();
    this.userPoolId = process.env.AWS_COGNITO_USERPOOL_ID;
  }

  async registerUser(dto: AuthUserRegisterDto) {
    var attributeList = [
      new CognitoUserAttribute({ Name: 'given_name', Value: dto.given_name }),
      new CognitoUserAttribute({
        Name: 'name',
        Value: `${dto.given_name} ${dto.family_name} `,
      }),

      new CognitoUserAttribute({ Name: 'middle_name', Value: dto.middle_name }),
      new CognitoUserAttribute({ Name: 'preferred_username', Value: 'N/A' }),
      new CognitoUserAttribute({ Name: 'family_name', Value: dto.family_name }),
      new CognitoUserAttribute({ Name: 'gender', Value: dto.gender }),
      new CognitoUserAttribute({ Name: 'birthdate', Value: dto.birthdate }),
      new CognitoUserAttribute({ Name: 'address', Value: dto.address }),
      new CognitoUserAttribute({ Name: 'email', Value: dto.email }),
      new CognitoUserAttribute({
        Name: 'phone_number',
        Value: dto.phone_number,
      }),
    ];

    try {
      const result: any = await new Promise((resolve, reject) => {
        this.userPool.signUp(
          dto.email,
          dto.password,
          attributeList,
          null,
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          },
        );
      });

      const newUser: CreateUserDto = {
        ...dto,
        cognito_id: result?.userSub,
      };

      return await this.usersService.create(newUser);
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException(err.message);
    }
  }

  async login(loginAuthDto: LoginAuthDto): Promise<LoginResponseDto | any> {
    const login = loginAuthDto;
    const authDetails = new AuthenticationDetails({
      Username: login.email,
      Password: login.password,
    });

    const userData = { Username: login.email, Pool: this.userPool };

    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      return cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    })
      .then((result: any) => {
        return {
          idToken: result.idToken.getJwtToken(),
          refreshToken: result.getRefreshToken().getToken(),
          exp: result.idToken.getExpiration(),
          status: 'ok',
        };
      })
      .catch((error) => {
        return {
          status: 'falied',
          message: error.message,
        };
      });
  }

  async verifyUserEmail(username) {
    const params = {
      UserPoolId: this.userPoolId,
      Username: username,
      UserAttributes: [
        {
          Name: 'email_verified',
          Value: 'true',
        },
      ],
    };

    try {
      const result = await this.cognitoIdentityServiceProvider
        .adminUpdateUserAttributes(params)
        .promise();
      console.log('Email verified successfully:', result);
    } catch (error) {
      console.error('Error verifying email:', error);
    }
  }

  async adminConfirmUser() {
    const params = {
      UserPoolId: this.userPoolId,
      Username: 'raymund.gss@gmail.com',
    };

    try {
      const confirm = await this.cognitoIdentityServiceProvider
        .adminConfirmSignUp(params)
        .promise();
      console.log('User confirmed successfully:', confirm);

      const x = {
        UserPoolId: this.userPoolId,
        Username: 'raymund.gss@gmail.com',
        UserAttributes: [
          {
            Name: 'email_verified',
            Value: 'true',
          },
        ],
      };
      const verified = await this.cognitoIdentityServiceProvider
        .adminUpdateUserAttributes(x)
        .promise();
      console.log('Email verified successfully:', verified);
    } catch (error) {
      console.error('Error confirming user:', error);
    }
  }

  async confirmSignUp() {
    var userData = {
      Username: 'raymundcuizon07@gmail.com',
      Pool: this.userPool,
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration;

    //   cognitoUser.confirmRegistration('401014', true, function (err, result) {
    //     if (err) {
    //       alert(err.message || JSON.stringify(err));
    //       return;
    //     }
    //     console.log('call result: ' + result);
    //   });
  }
  async confirmRegistration() {
    var userData = {
      Username: 'raymundcuizon07@gmail.com',
      Pool: this.userPool,
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration('401014', true, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log('call result: ' + result);
    });
  }

  refreshToken(username: string, refreshTokenString: string) {
    const userData = {
      Username: 'raymundcuizon07@gmail.com',
      Pool: this.userPool,
    };

    const cognitoUser = new CognitoUser(userData);
    const refreshToken = new CognitoRefreshToken({
      RefreshToken:
        'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.HydNyfUtD5N7fRSdv06-HHBQIe7v1ka7gNVFj81HPrTUc_kAnaSGVydvdD12vV1J4NbLRA1YXwLNrhP_sip16uqeFcT9h4UVXxTN0A5yn3wV38MbjV9pLBbEbe-hfZlDXqJaXCTGkU1xM3FydDM0stmfgOduVNS_koxTKzJlcKSPQ5kf1XageuPmlNYf1RrV_bJ7_4P81z6luns4tWDcO2OJWXuCuz4Bbh6H6w_pVWotfI_9BzUKAhT5x-Zgaj7BFr4As_4mePZe4emTtAyMUvJrkXbcnIckAf6qzk0N1B71pnLJWSgwa6k8DpWnsteBuFL2cgeThQP-oIlncBKOoQ.7LJUD8_X7sNmApf8.wbLYO6On6dNTDLlM8ZcpeccCk21tMqJM7cqCdNGByuPZauFqbDI5yyKvDCjb-F4wJTT-9mc6wRXaCIyeKpRVe0KXEANWifA1AiTS67Sbh-astQ1WZxQVo07yskZ-q31LRiqpBuGGOA3A7iESBC_G0L4Dy2zfFL0-OHubFahLWjxNzEy2lRjtCkKvCTZLE_CtdyJdhYLW7LZMwC56UKimqvfURcaUreqzGtiGP3w9B9B7JdD_HGZeGYiQSOgUIorebxlzUZx-Vf2NzNfaa4SInwZXQlDZRS9uIBLTWlIbuFkaQsKJG_A352GL1M-SMg2lzivEq_tDQMpN3RaHbWVgif1RuBkbj8HD0IOybdZQwgAuSYW2Uwo0yBoPNsVww1SW5QG2GDvUJPBf6JMzcK6M_B5yogtLidPct_UuMLxHhElp59M1aVDYRwk0VRioSThs1qBE1U0vkrJMTVLXk243C5hBOVI4FvrjvDK2I7IUhmBiZDV5xHoq3_q-AdbJUr1H2QmijXT_0KJ1fT2-AAOkFjvhEeGt_KABZEis4jR0hautl8KX-vkST_D1SpebvcYOTqF5EiM6V6fkV3mfppqB3iHDPI58H5FdJryqqXfsZuOXHZcn2bMb6LuB0_781EGnipwrbyg0MbehV8zqZtEkSbLoUI539cFm1kIotWCxaa63eJLBscy1BuKDbO4IW8_-890U3xJsLI6UJ2tTU1Aupn7Wv9qywATf7hL3qPRv6yViNftxGQ-UDQ7_Vt9y377cpLRuzbX85cPPtfb9AzQNyTaYiobnZexEF8Ao-IAam9cNXsS7bHUpgKPmswtbzOKabAzzbhIvprmxJCbof1Z9wC94XkQ705zgymIt76IAfu0r8bYaXUKvPHjPUV8vB4KAlxEf3SYbn4AAJ-eVuPCkW9VG3wPsqx0d8UE2DKOXdJhyfHiXF4zYpgrreEPSn9VLZmoPINRManG0intPRKneV5Fc6m61lhoEkk3fz0kXfRXmI3I9JvO2MwKHh1_Fo1lrn3cvVnDkD8Ji5NBpj6ZqiB4KGfKoHR2LtYmU2Bigmuxqf-nFv_zJmapn6G5ygjj7JF5pVOKRHKWzMVFhipLULEm5x-0N3lOAkjL9Jbn72LJedVWa88Wrc23uthVWMKbBjI7YjLyx8SSbt5QP240oZlhFeNFYS9h3ZDc8swMuRQl8ZP3HPlECSxZSNGfj3eTnNv-dJhgmXZZu9EA6G7ToBahnHfK2YANVAoekN6RQEgDZWaLwKYS0tnnO386cMS4Pdj7yx8cGyIqa4rsEe5yQ5d7AEut5o8wgIbjhIGNPuH-XTtxo_iz2jMbw5-u2irFX16LdjUVpo853.2kqiOFrZzUz9E8PFuZt-mg',
    });

    return new Promise((resolve, reject) => {
      cognitoUser.refreshSession(refreshToken, (err, session) => {
        if (err) {
          reject(err);
        } else {
          console.log('Session refreshed:', session);
          resolve(session);
        }
      });
    }).then((result: any) => {
      return {
        idToken: result.idToken.getJwtToken(),
        refreshToken: result.getRefreshToken().getToken(),
        exp: result.idToken.getExpiration(),
      };
    });
  }
}
