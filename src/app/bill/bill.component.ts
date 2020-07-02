import { Component, OnInit } from '@angular/core';
import { Bill } from './shared/bill';
import { BillService } from './shared/bill.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  bills: Bill[] = [];
  constructor(private billService: BillService,
              private _toastr: ToastrService ) { }

  ngOnInit(): void {
    this.billService.getBills(localStorage.getItem('Username')).subscribe(
      data => {
        this.bills = data;
      },
      error => {
        this._toastr.error("Error getting bills", "Bills");
      }
    );
  }

  refresh(){
    this.billService.getBills(localStorage.getItem('Username')).subscribe(
      data => {
        this.bills = data;
      },
      error => {
        this._toastr.error("Error getting bills", "Bills");
      }
    );
  }

  pay(bill: Bill){
    this.billService.payBill(bill.id).subscribe(
      data => {
        this._toastr.success("BIll has been paid", "Bill");
        this.refresh();
      },
      error => {
        this._toastr.error("Error paying bill", "Bill");
      }
    );
  }

}
