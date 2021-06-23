import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { errorComparator } from "tslint/lib/verify/lintError";
import { UserService } from "../Users/users.service";
import { ErrorDialogService } from './ErrorDialog.service';


@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private router : Router, private ErrorDialogService : ErrorDialogService) {

    }

    intercept(req : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
      const idToken = localStorage.getItem("token");
        if(idToken) {
            const cloned = req.clone({
                headers : req.headers.set("Authorization", idToken)
            });
            
            return next.handle(cloned).pipe(
                /*catchError((error : HttpErrorResponse) => {
                    let data = "";

                    if(error.status === 500) {data ="The server failed to fulfill your request, please try again later."; }
                    else if(error.status === 400) {data = "The request could not be fulfilled, please try again later."; }
                    else if(error.status === 401) {data = "Your request is not authorized."; }
                    else if (error.status === 404) {data = "We could not find what you were looking for, please try again later."; }
                    this.ErrorDialogService.openDialog(data);
                    return throwError(error);
                })
                */
            );
            
        } else {
            return next.handle(req);
        }
    }
}
