import { Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin =  new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('',[
      Validators.required
    ])
  })
  messageErr:any;
  constructor(private accountSer: AccountService, private router: Router) { }

  ngOnInit(): void {
  }
  login(){
    this.accountSer.login(this.formLogin.value).subscribe((data:any)=>{
      if(data.status==true){
        sessionStorage.setItem('acc_login', JSON.stringify(data.accounts));
        this.accountSer.isUserLoggedIn.next(true);
        this.router.navigate(['/']);
      }else{
        this.messageErr = data.message;
      }
    })
  }
  get form():any {
    return this.formLogin.controls;
  }
}
