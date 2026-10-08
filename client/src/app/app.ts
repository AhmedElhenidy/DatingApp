import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';

@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit, OnDestroy{

  private http = inject(HttpClient);
  protected readonly title = signal('Dating App');
  protected members = signal<any>([]);
  // Old fashined Dependency injection style
  // constructor(private http: HttpClient) {}

   async ngOnInit() {
    this.members.set(await this.getMembers());
  }

   ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  } 

  async getMembers(){
    try{
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    }catch (error){
      console.log(error);
      throw error;
    }
   
  }
}
