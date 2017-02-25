import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  features: Object[] = [
  	{name:'Backend', desc:'Node | Express backend server.'},
  	{name:'Frontend', desc:'Angular-cli | to generate components, services and more.'},
  	{name:'Database', desc:'MongoDB | to store data.'}
  ];

}
