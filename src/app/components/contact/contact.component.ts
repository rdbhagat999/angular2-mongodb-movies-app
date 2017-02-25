import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  linkedIn: string = "https://www.linkedin.com/in/ramandeep-bhagat-9b783161/";
  github: string = "https://github.com/rdbhagat999";

}
