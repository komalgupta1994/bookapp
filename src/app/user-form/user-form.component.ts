import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
users = [];
showDetailsFlag = false;
indexValue;
openPopupFlag = false;
showCreateForm: boolean = false;
showButton: boolean = false;
emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
editData: any;

userFormGroup: FormGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(25)] ],
      lastName: ['', Validators.maxLength(25)],
      age: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)] ]
});
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  	this.getUserData();
  }

/*get users data from local storage */
  getUserData() {
  	this.users = localStorage.getItem("userDetail") ?  JSON.parse(localStorage.getItem("userDetail")) : []; 
  }

/*call get data function on save or edit user detail and hide form */
  callGetData(e) {
    if (e) {
      this.getUserData();
      this.showCreateForm = false;
    }
  }

/*Show Details on click of row */
  showDetails(data, index) {
  	this.showDetailsFlag  = true;
    this.showCreateForm = true;
   this.editData = data;
  }

/*call when click delete button of popup yes and delete particular data */
  onDelete() {
  	this.users.splice(this.indexValue, 1);
  	localStorage.setItem("userDetail", JSON.stringify(this.users));
  	this.openPopupFlag = false;
  }

/*call when click on delete button and show confirmation popup */
  openDeletePopup(index) {
    this.showCreateForm = false;
    this.indexValue = index;
    this.openPopupFlag = true;
  }

}
