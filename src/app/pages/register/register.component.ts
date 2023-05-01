import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  gender:string[] = []
  emirates:any[] = []
  constructor() { 
    this.gender = [
      "Male","Female"
    ]
    this.emirates = [
      {name:"ABU DHABI",id:1},
      {name:"DUBAI",id:2},
      {name:"SHARJAH",id:3},
      {name:"AL-AIN",id:4},
    ]
  }

  ngOnInit(): void {
  }

}
