import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { KnowYourComplainStatusService } from './know-your-complain-status.service';

@Component({
  selector: 'app-know-your-complain-status',
  templateUrl: './know-your-complain-status.component.html',
  styleUrls: ['./know-your-complain-status.component.css'],
})
export class KnowYourComplainStatusComponent implements OnInit {
  complatstatusform: NgForm;
  submitted: boolean = false;
  complaintID: string;
  complaintDto: any;
  @ViewChild('complaintStatus', { static: true }) complaintStatus: TemplateRef<any>
  constructor(private router: Router, private dialog: MatDialog,
    private knowyourComplaintSts: KnowYourComplainStatusService) { }

  ngOnInit(): void {
  }
  credential = {
    complaint_id: ""
  }
  submitComplaint() {
    this.submitted = true;
    if (this.submitted && this.credential.complaint_id != "") {
      this.knowyourComplaintSts.knowyourComplaintStatus(this.credential).subscribe({next:(res: any) => {
        this.complaintDto = res;
        if ((this.complaintDto.problem_descr != "" && this.complaintDto.problem_descr != null) &&
          this.complaintDto.submitted_on != "" && this.complaintDto.submitted_on != null) {
          this.dialog.open(this.complaintStatus);
        }
      },
       error:error => {
          console.log(error);
        }})
    }
  }
  redirectHome() {
    this.router.navigate(['']);
  }
  reset() {
    this.complatstatusform.reset();
  }

}
