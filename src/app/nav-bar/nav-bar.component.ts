import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
/*On logout click navigate to login page and set false value on local storage */
  logout() {
  	this.router.navigate(['/login']);
  	localStorage.setItem("loginFlag", JSON.stringify(false));
  }

}
