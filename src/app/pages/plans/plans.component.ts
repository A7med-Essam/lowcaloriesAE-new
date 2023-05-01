import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/plans/plans.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {
  skeletonMode:boolean = false
  constructor(private _PlansService:PlansService) { }

  ngOnInit(): void {
    this.getPrograms();
  }

  
  programs:any[] = []
  getPrograms(){
    this.skeletonMode = true;
    this.programs = []
    this._PlansService.getPrograms_custom().subscribe({
      next:res=>{
        this.skeletonMode = false;
        this.programs.push(...res.data)
        this._PlansService.getPrograms_normal().subscribe({
          next:res=>{
            this.programs.push(...res.data)
            console.log(this.programs);
          }
        })
      }
    })
  }
}
