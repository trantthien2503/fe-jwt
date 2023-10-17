import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Nếu nhận được mã trạng thái 401 (Unauthorized), thực hiện refresh token
          return this.authService.refreshToken().pipe(
            switchMap((response: any) => {
              // Lưu trữ access token mới trong local storage hoặc cookie
              this.authService.saveToken(response.access_token);

              // Cập nhật request với access token mới
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.access_token}`
                }
              });

              // Gửi lại yêu cầu ban đầu với access token mới
              return next.handle(newRequest);
            }),
            catchError((error: any) => {
              // Nếu refresh token thất bại, chuyển hướng người dùng đến trang đăng nhập
              this.authService.logout();
              return throwError(error);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
