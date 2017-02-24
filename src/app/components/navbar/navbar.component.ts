import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isOpen: boolean = false;
  isCollapse: boolean = false;
  navbarHeight: string ="1px";

  toggleClass() {
  	this.isOpen = !this.isOpen;
  }

  colapseMenuBar(){
    this.isCollapse = false;
  }

  toggleMobileNav() {
  	this.isCollapse = !this.isCollapse;
  	this.navbarHeight = "";
  }

}
