import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit, OnChanges {
emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
formValidationFlag: boolean = false;

userFormGroup: FormGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(25)] ],
      lastName: ['', [Validators.minLength(5), Validators.maxLength(25)]],
      age: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)] ]
});
users = [];
@Output() sendData = new EventEmitter();
@Input() editData;
uniqueId: any;

  constructor(private fb: FormBuilder, private route: Router) { }

  ngOnInit() {
  	this.users = localStorage.getItem("userDetail") ?  JSON.parse(localStorage.getItem("userDetail")) : [];
  }

  ngOnChanges() {
    /*Set data in form on edit */
  	if (this.editData) {
	  	this.uniqueId = this.editData.id || '';

	    this.userFormGroup.setValue({
	      firstName: this.editData.firstName, 
	      lastName: this.editData.lastName || '', 
	      email: this.editData.email,
	      age: this.editData.age || ''
	    })
	}
  }

  /*Save and update users details and save into local storage and redirect to user page */
  saveUserForm() {
  	this.formValidationFlag = true;
  	if(this.userFormGroup && this.userFormGroup.valid) {
  		if(this.uniqueId) {
	  		let index = this.users.findIndex(data => data.id === this.uniqueId);
	  		this.users.splice(index, 1);
	  	}
	  	this.users.push(
        {
          id: this.users.length + 1, 
          firstName: this.userFormGroup.value.firstName, 
          lastName: this.userFormGroup.value && this.userFormGroup.value.lastName, 
          email: this.userFormGroup.value.email,
          age: this.userFormGroup.value && this.userFormGroup.value.age
        });
	  	localStorage.setItem("userDetail", JSON.stringify(this.users));
	  	this.sendData.emit(true);
	  	this.route.navigate(['./user']);
  	}
  }

/*On cancel button click redirect to user page */
  cancelUser() {
    this.uniqueId = '';
   this.sendData.emit(true);
   this.route.navigate(['./user']);
  }

}
