import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  imports: [FormsModule, RouterLink, RouterLinkActive],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastService);
  protected creds: any = {};
  
  login(){
    this.accountService.login(this.creds).subscribe({
      next:() => {
        this.router.navigateByUrl('/members');
         this.toast.error('Logged in successfully');
        this.creds ={};
        
      },
      error:error => {
        console.log(error);
        // alert(error.error);
        this.toast.error(error.error.errors.Email);
      },
    }); 
  }

  logout(){
     this.accountService.logout();
      this.router.navigateByUrl('/');
  }
}
