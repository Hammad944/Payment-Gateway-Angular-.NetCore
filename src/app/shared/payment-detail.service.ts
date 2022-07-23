import { PaymentDetail } from './payment-detail.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {
  list:PaymentDetail[]
  constructor(private http:HttpClient) { }
  readonly baseUrl = 'http://localhost:18128/api/PaymentDetails';
  formData:PaymentDetail = new PaymentDetail();
  postPaymentDetail(){
    return this.http.post(this.baseUrl ,this.formData)
  }
  putPaymentDetail(){
    return this.http.put(`${this.baseUrl}/${this.formData.paymentDetailId}` ,this.formData)
  }
  deletePaymentDetail(id:number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  refreshList(){
    this.http.get(this.baseUrl)
    .toPromise()
    .then(
      res => this.list = res as PaymentDetail[]
    )
  }
}
