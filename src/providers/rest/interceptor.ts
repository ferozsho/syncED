import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";

@Injectable()
export class schoolHttpInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /*
    const clonedRequest = req.clone({
      headers: req.headers.set('X-API-KEY','synced-9908313427')
    })
    */
    return next.handle(req);
  }
};