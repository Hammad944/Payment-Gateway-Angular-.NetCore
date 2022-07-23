import { PaymentDetailService } from './../../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent implements OnInit {

  constructor(public service:PaymentDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    if(this.service.formData.paymentDetailId == 0){
      this.inserRecord(form)
    }
    else{
      this.updateForm(form)
    }
  }
  inserRecord(form:NgForm){
    this.service.postPaymentDetail().subscribe(
      res =>{
        this.resetForm(form);
        this.toastr.success("Submitted successfully",'Payment Detail Register')
      },
      err => {
        console.log(err)
      }
    )
  }
  updateForm(form:NgForm){
    this.service.putPaymentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList()
        this.toastr.info("Update successfully",'Payment Detail Register')
      },
      err =>{console.log(err)}
    )
  }
  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new PaymentDetail();
  }
}
