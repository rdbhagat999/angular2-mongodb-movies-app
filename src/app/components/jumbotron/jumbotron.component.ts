import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.css']
})
export class JumbotronComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  title:string = 'MEAN App';
  aboutUrl:string = 'howitworks';
  description:string = 'An app built on top of latest stack of technologies such as MongoDB, Angular2, Express and NodeJs.';

}
