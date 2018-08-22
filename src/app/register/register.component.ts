import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
formValidationFlag = false;
userData = [];
emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

signupFormGroup: FormGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)] ],
      lastName: ['', Validators.maxLength(25)],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)] ],
      confirmPassword: ['', Validators.required ],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)] ],
      address: ['', Validators.minLength(5)]
});

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
  }
/*use for register user and save to localstorage and navigate to login page */
  registerForm() {
  	this.formValidationFlag = false
  	if(this.signupFormGroup && this.signupFormGroup.valid && 
      this.signupFormGroup.value.password == this.signupFormGroup.value.confirmPassword) {
  		this.userData.push({"emailId": this.signupFormGroup.value.email, "password": this.signupFormGroup.value.password});
  		localStorage.setItem("loginDetail", JSON.stringify(this.userData))
  		this.router.navigate(['/login']);
  	} else {
  		this.formValidationFlag = true;
  	}
  }

/*set username in lower case */
  userNameLowerCase() {
    this.signupFormGroup.patchValue({userName : this.signupFormGroup.value.userName.toLowerCase()});
  }

}
