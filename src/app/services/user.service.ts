import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`http://localhost:8080/api/users`);
    }
	
	getByName(name: String){
        return this.http.get<User>(`http://localhost:8080/api/users/${name}`);
	}
}