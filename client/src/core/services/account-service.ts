import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AccountService {
    constructor() { }
    private http = inject(HttpClient);
    currentUser = signal<User | null>(null);
    baseUrl = "https://localhost:5001/api/";

    register(creds: RegisterCreds) {
        return this.http.post<User>(this.baseUrl + 'account/register', creds).pipe(
            // tap function allow us to use a side effect on what we get from the api without modifying the actual data
            tap(user => {
                if (user) {
                    this.setCurrntUser(user);
                }
            })
        )
    }

    login(creds: LoginCreds) {
        return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
            // tap function allow us to use a side effect on what we get from the api without modifying the actual data
            tap(user => {
                if (user) {
                    this.setCurrntUser(user);
                }
            })
        )
    }

    setCurrntUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user))
        this.currentUser.set(user)
    }
    logout() {
        localStorage.removeItem('user');
        this.currentUser.set(null);
    }
}
