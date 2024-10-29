import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Login } from './models/login.interface';
import { Token } from './models/token.interface';
import jwt_decode from 'jwt-decode';
import { LoggedUser } from './models/logged-user.interface';
import { BehaviorSubject } from 'rxjs';
import { RegisterDTO } from './models/register-dto.interface';

const BACKEND_URL = environment.BACKEND_URL;
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedUserSubject!: BehaviorSubject<LoggedUser | null>;

  constructor(
    private http: HttpClient
  ) { 
    this.loggedUserSubject = new BehaviorSubject<LoggedUser | null>(this.getLoggedUser());
  }


  login(login: Login) {
    return this.http.post<Token>(`${BACKEND_URL}/login`, login);
  }

  register(registerDTO: RegisterDTO) {
    return this.http.post(`${BACKEND_URL}/register`, registerDTO);
  }

  logout() {
    sessionStorage.removeItem(TOKEN_KEY);
    this.loggedUserSubject.next(null);
  }

  setToken(token: Token) {
    sessionStorage.setItem(TOKEN_KEY, token.token);
    this.loggedUserSubject.next(this.getLoggedUser());
  }

  getLoggedUser() {
    const token = this.getToken()

    if (!token)
      return null;

    return jwt_decode(token) as LoggedUser;
  }

  getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  checkTokenExpired() {
    const token = this.getToken();
        
    if (token) {
      const tokenDecoded: any = jwt_decode(token);
      const tokenExpirado = Date.now() > tokenDecoded.exp * 1000;
      if (tokenExpirado) {
          this.logout();
          return true;
      }
    }

    return false;
  } 

}

