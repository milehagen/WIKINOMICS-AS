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
                catchError((error : HttpErrorResponse) => {
                    let data = {};

                    if(error.status === 500) {data = {error : error.status, message : "The server failed to fulfill your request, please try again later."}}
                    else if(error.status === 400) {data = {error : error.status, message : "The request could not be fulfilled, please try again later."}}
                    else if(error.status === 401) {data = {error : error.status, message : "Your request is not authorized."}}

                    this.ErrorDialogService.openDialog(data);
                    return throwError(error);
                })
            );
            
        } else {
            return next.handle(req);
        }
    }
}
