import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { displayError } from './state/actions/weather.actions';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private store : Store) {}

    dispatchError(msg:string){
        this.store.dispatch(displayError({msg}))
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {

                        console.log('this is client side error');
                        this.dispatchError(`Something went wrong - Please try agian`);
                    }
                    else {
                        errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                        this.dispatchError(`Api Server Error`);
                    }
                    console.log(errorMsg);
                    throw errorMsg;
                })
            )
    }
}