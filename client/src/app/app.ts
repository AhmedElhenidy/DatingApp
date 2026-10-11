import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { Home } from '../features/home/home';
import { User } from '../types/user';

@Component({
  imports: [Nav, Home],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy{
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  protected readonly title = signal('Dating App');
  protected members = signal<User[]>([]);
  // Old fashined Dependency injection style
  // constructor(private http: HttpClient) {}

   async ngOnInit() {
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }
  setCurrentUser(){
    const userString = localStorage.getItem('user');
    console.log("user from local storage is " + userString);
    if(!userString)return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

   ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  } 

  async getMembers(){
    try{
      return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
    }catch (error){
      console.log(error);
      throw error;
    }
   
  }
}
