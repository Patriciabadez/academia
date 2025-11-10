import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class LoginService {
  constructor(private http: HttpClient) {}
  private url = environment.PATH_API;

  login(username: string, password: string): Observable<any> {
    const url = this.url + 'Login';

    return this.http.post<any>(url, { email: username, pwd: password }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
