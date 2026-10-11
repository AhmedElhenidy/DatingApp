import { Component, Input, signal } from '@angular/core';
import { Register } from '../account/register/register';
import { User } from '../../types/user';

@Component({
  imports: [Register],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  @Input({required: true}) membersFomApp : User[] = [];
 protected registerMode = signal(false);

 toggleRegister(value: boolean){
  this.registerMode.set(value);
 }
}
