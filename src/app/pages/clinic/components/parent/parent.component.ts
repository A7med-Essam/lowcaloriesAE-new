import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ClinicService } from 'src/app/services/clinic.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  currIndex:number = 1;
  Clinic:any[] = [];
  Emirate_appointments:any[] = [];
  isSelectedTime:boolean = false;
  @ViewChild('indicators') indicators!: ElementRef;
  @ViewChild('progressElm') progressElm!: ElementRef;
  @ViewChild('nextBtn') nextBtn!: ElementRef;
  constructor(
    private _ClinicService:ClinicService,
  ) {
  }

  ngOnInit(): void {
    this.getClinicAppointments()
  }
  
  next() {
    this.currIndex++;
    this.indicators.nativeElement.children[this.currIndex].style.transitionDelay = "0.6s";
    this.indicators.nativeElement.children[this.currIndex].classList.add("completed");
    this.progressElm.nativeElement.style.width = `${((this.currIndex -1) / (this.indicators.nativeElement.children.length -2)) * 100}%`;
  }

  previous() {
      this.indicators.nativeElement.children[this.currIndex].style.transitionDelay = "0s";
      this.indicators.nativeElement.children[this.currIndex].classList.remove("completed");
      this.currIndex --;
      this.progressElm.nativeElement.style.width = `${((this.currIndex-1) / (this.indicators.nativeElement.children.length - 2)) * 100}%`;
  }
  

  getClinicAppointments(){
    this._ClinicService.getEmiratesForOnline().subscribe((res:any)=>{
      this.Clinic = [...res.data]
    })
  }

  InValid:boolean = true;
  getFormStatus(isValid:boolean){
    if (isValid) {
      this.InValid = false;
      this.nextBtn?.nativeElement.classList.remove("disabled")
    } 
    else {
      this.InValid = true;
      this.nextBtn?.nativeElement.classList.add("disabled")
    }
  }

  getEmirateId(EmirateId:number){
    this.Emirate_appointments = this.Clinic.filter(e => e.id == EmirateId);
  }

  GetTimeStatus(e:boolean){
    this.isSelectedTime = e;
  }

  ClinicForm!:FormGroup;
  getClinicForm(clinicForm:FormGroup){
    this.ClinicForm = clinicForm;
  }

  SubInfo!:any;
  GetSubInfo(e:any){
    this.SubInfo = e;
  }

  getCheckOut(){
    this._ClinicService.getClinicCheckOut(this.SubInfo).subscribe((res:any)=>{
      window.location.href = res.data;
    })
  }
  
}