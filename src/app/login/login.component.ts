import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
localStorageData;
errorMessage = '';
errorFlag = false;

loginFormGroup: FormGroup = this.fb.group({
      email: ['', [Validators.required] ],
      password: ['', [Validators.required] ]
});

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
  	/*get data of users */
  	this.localStorageData = localStorage.getItem("loginDetail") ?  JSON.parse(localStorage.getItem("loginDetail")) : ""; 
  }

  loginForm() {
  	/*check user is exist or not and show error message and Redirect to book page */
  	this.errorMessage = '';
  	this.errorFlag = false;
  	if(this.localStorageData) {
  		this.localStorageData.map(data => {
  			if(data.emailId === this.loginFormGroup.value.email && data.password === this.loginFormGroup.value.password) {
  				this.router.navigate(['/user']);
          localStorage.setItem("loginFlag", JSON.stringify(true));
  			} else {
  				this.errorFlag = true;
  				this.errorMessage = "Username and Password doesn't match."
  			}
  		})
  	} else {
  		this.errorFlag = true;
  		this.errorMessage = "User doesn't exist, please register user";
  	}
  }

}
