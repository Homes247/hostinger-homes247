import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable()
export class ApiLoggerInterceptor implements HttpInterceptor {
    private callCount: Map<string, number> = new Map();

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // ✅ Full URL with query params
        const fullUrl = req.urlWithParams;
        const key = `${req.method} ${fullUrl}`;
        const count = (this.callCount.get(key) || 0) + 1;
        this.callCount.set(key, count);

        if (count > 1) {
            console.warn(`⚠️ DUPLICATE #${count} → ${key}`);
            console.trace('📍 Called from:'); // shows exact call stack
        } else {
            console.log(`✅ #${count} → ${key}`);
        }

        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    if (count > 1) {
                        console.warn(`⚠️ DUPLICATE RESPONSE #${count} → ${key}`);
                    }
                }
            })
        );
    }
}