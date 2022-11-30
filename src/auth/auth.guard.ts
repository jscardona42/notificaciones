
import { Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import * as jwt from 'jsonwebtoken'
import * as CryptoJS from 'crypto-js'
type getPermission = { userId: number };

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {

  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const ctx = GqlExecutionContext.create(context);
    let query = context.getHandler().name;
    let req = ctx.getContext().req;

    if (req.headers.authorization_url !== undefined) {
      let referer = CryptoJS.AES.decrypt(req.headers.authorization_url, process.env.KEY_CRYPTO_ADMIN).toString(CryptoJS.enc.Utf8);

      try {
        let url = jwt.verify(referer, process.env.JWT_SECRET_URL);
        if (url === process.env.JWT_URL) {
          return true;
        }
      } catch (error) {
        throw new UnauthorizedException("Unauthorized");
      }
    } else {
      throw new UnauthorizedException("Unauthorized");
    }
  }

  async setUserId(authorization, req) {
    let tmp = jwt.verify(authorization.split(" ")[1], process.env.JWT_SECRET) as getPermission;
    let userId = tmp.userId;
    req.userId = userId;
  }
}