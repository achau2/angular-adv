import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient, private router: Router) {
  }

  logout(){
    localStorage.removeItem('token');
    google.accounts.id.revoke('achau2@gmail.com');
  }

  validarToken(): Observable<boolean>{
    const token = localStorage.getItem('token') || '';
    const url = `${environment.baseUrl}/login/renew`;
    return this.http.get(url, {
      headers:{
        'x-token': token
      }}
    ).pipe(
      tap((resp: any) => {
        localStorage.setItem('token',resp.token)
      }),
      map(resp => true),
      catchError(error => of(false))
    )
  }

  crearUsuario(formData: RegisterForm){
    const url = `${environment.baseUrl}/usuarios`;

    return this.http.post(url, formData)
          .pipe(
            tap((resp: any) => {
              localStorage.setItem('token',resp.token)
            })
          )
  }

  loginUsuario(formData: LoginForm){
    const url = `${environment.baseUrl}/login`;
    return this.http.post(url, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token',resp.token)
        })
      )
  }

  loginGoogle( token: string){
    const url = `${environment.baseUrl}/login/google`;
    //Envío de token como Payload
    return this.http.post(url, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token',resp.token)
        })
      )
  }
}
