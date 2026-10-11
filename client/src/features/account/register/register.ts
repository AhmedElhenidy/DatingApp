import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  imports: [FormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
})
export class Register {
  membersFromHome = input.required<User[]>();
  cancerlRegister = output<boolean>();
  protected accountService = inject(AccountService);
  protected creds = {} as RegisterCreds;

   register(){
    this.accountService.register(this.creds).subscribe({
      next:response=>{
        console.log(response);
        this.cancel();
      },
      error: error=>console.log(error),
    });
   }

   cancel(){
    console.log('cancelled');
    this.cancerlRegister.emit(false);
   }
}
