import { Component, OnInit } from '@angular/core';
import { FaqServiceService } from './faq-service.service';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor(private faqServiceService: FaqServiceService) { }

  ngOnInit(): void {
    this.getfaqdetails();
    
  }
  faqdetails: any;
  faqcodelist: any;
  panelOpenState = false;

  getfaqdetails() {
    this.faqServiceService.getfaqdetails().subscribe({next:(desc: any[]) => {
      this.faqdetails = desc
      console.log(`faq list are ${this.faqdetails}`);
    },
      error:err => {
        console.log(err);
      }}
    )
  };

  getfaqcode(servi_code: number) {
    debugger
    this.faqServiceService.getfaqcode(servi_code).subscribe({next:(faqcode: any) => {
      this.faqcodelist = faqcode
    },
      error:err => {
        console.log(err);
      }}
    )
  }
}
