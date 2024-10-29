import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authService.getToken();
        
        if (token) {
            if (this.authService.checkTokenExpired()) {
                return EMPTY;
            }

            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }

}