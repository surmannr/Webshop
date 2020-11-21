import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token') != null) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
      });
      return next.handle(clonedRequest).pipe(tap(
        succ => { },
        err => {
          //Ha nincs bejelentkezve akkor átnavigáljuk a login felületre
          if (err.status == 401) {
            localStorage.removeItem('token');
            this.toastr.error("Your session has ended", "Please log in again");
            this.router.navigateByUrl('/login');
          }
          //Ha nincs megfelelő jogosultsága akkor átnavigáljuk egy forbidden oldalra.
          else if (err.status == 403) {           
            this.router.navigateByUrl('/forbidden');
            this.toastr.error("You dont have permittion to do that","Access denied");
          }
        }
      ));
    }
    else {    
      return next.handle(req.clone());
    }
  }
}
