import {  Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from "../components/modal/modal.component";
@Injectable()

export class ErrorInterceptor implements HttpInterceptor{
    constructor(

        public dialog: MatDialog
        ) { }
intercept(req:HttpRequest<any>, next :HttpHandler):Observable<HttpEvent<any>>{
    return next.handle(req).pipe(
        catchError(error =>{
            if(error instanceof HttpErrorResponse){

                const applicationError= error.headers.get('Application-Error');
                if(applicationError){
                    console.error(applicationError);
                    return throwError(applicationError);
                }

                const serverError=error.error;
                let modelStateErrors='';
                if(serverError && typeof serverError=='object'){
                    for(const key in serverError){
                        if(serverError[key]){
                            modelStateErrors+=serverError[key]+'\n';
                        }
                    }
                }
                //UnAuthorizedErrors
                if(error.status===400){
                    this.openDialog("Ocurrio un error",error.error);
                }
                return throwError(modelStateErrors || serverError || 'Serve-Error');
                
            }
        })
    )
}
    openDialog(title, msg, isinfo=true): void {
    this.dialog.open( ModalComponent, 
       {
      width: '250px',
      enterAnimationDuration: '0ms',
      exitAnimationDuration: 'oms',
      data: {
        title: title,
        message: msg,
        isinfo: isinfo
     }
    }
    );
  }
    }
export const ErrorInterceptorProvidor={
    provide:HTTP_INTERCEPTORS,
    useClass:ErrorInterceptor,
    multi:true
}