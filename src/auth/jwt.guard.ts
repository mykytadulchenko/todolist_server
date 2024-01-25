import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       const request = context.switchToHttp().getRequest()
       try {
        const authToken = request.headers.authorization.split(' ')[1]
        if(!authToken) throw new UnauthorizedException({ message: 'User not authorized!'})
        request.user = this.jwtService.verify(authToken)
        return true
       } catch(err: any) {
        //throw new UnauthorizedException({ message: 'User not authorized!'})
        throw new ForbiddenException('Token auth failed!')
       }
    }
}