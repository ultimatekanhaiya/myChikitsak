import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public postUser(user: any) {
    return this.http.post('http://localhost:8899/user/', user);
  }
  public getUser() {
    return this.http.get<any>('http://localhost:8899/user/');
  }
  public getUserById(id: String) {
    return this.http.get<any>('http://localhost:8899/user/' + id);
  }

  public loginUser(data: any) {
    localStorage.setItem('userInfo', data);
  }
}
