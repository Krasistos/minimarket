import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService:JwtService ) {
        
    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       console.log("inside the guard");
       const request = context.switchToHttp().getRequest();
       const token = request.headers.authorization.split(' ')[1];
        console.log(token);

        if(!token){
            throw new UnauthorizedException();
        }

        let payload;
        try{
            payload = this.jwtService.verify(token);
        }
        catch(error){
            console.log(error);
            throw new UnauthorizedException();
        }
        return true;
    }
}