import { Injectable } from '@angular/core';
import { HttpRequest, HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
		let input = new FormData();
		input.append('username', username);
		input.append('password', password);
		/*let headers = new HttpHeaders({
			'Access-Control-Allow-Origin': 'http://localhost:8080',
			'Access-Control-Request-Method': 'POST, GET',
			'Access-Control-Allow-Headers': 'Content-Type'
		});
		let options = { headers: headers };*/
        return this.http.post<any>(`http://localhost:8080/login`, input)
            .pipe(map(user => {
                if (user) {
                    user.authdata = window.btoa(username + ':' + password);
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        sessionStorage.removeItem('currentUser');
    }
}