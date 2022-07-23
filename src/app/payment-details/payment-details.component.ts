import { PaymentDetail } from './../shared/payment-detail.model';
import { PaymentDetailService } from './../shared/payment-detail.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service:PaymentDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(pd:PaymentDetail){
    this.service.formData = Object.assign({},pd);
  }
  onDelete(id:number){
    if(confirm("Are you sure to delete this data?"))
    this.service.deletePaymentDetail(id)
    .subscribe(
      res => {
        this.service.refreshList()
        this.toastr.error("Record has been deleted!","Payment Detail Register")
      },
      err => {console.log(err)}
    )
  }
}
