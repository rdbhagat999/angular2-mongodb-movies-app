import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  linkedIn: string = "https://www.linkedin.com/in/ramandeep-bhagat-9b783161/";
  github: string = "https://github.com/rdbhagat999";

}
