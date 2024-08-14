import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = localStorage.getItem('token');
		if (token) {
			console.log(`Token JWT: ${token}`);
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			});
		} else {
			console.log('Token JWT absent');
		}
		return next.handle(request);
	
    }
}
