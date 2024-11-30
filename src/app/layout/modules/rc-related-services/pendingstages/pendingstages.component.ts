import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,FormGroup, Validators,FormArray} from '@angular/forms';

@Component({
  selector: 'app-pendingstages',
  templateUrl: './pendingstages.component.html',
  styleUrls: ['./pendingstages.component.css']
})
export class PendingstagesComponent implements OnInit {
  pendingList:any;
  pendingListParent: any;
  pendingListChild:any;
 
  constructor(private _formBuilder: FormBuilder) {    
  }
 

  ngOnInit(): void {
    
    this.pendingListParent=JSON.parse(localStorage.getItem('pendiblistparent'));
    this.pendingListChild=JSON.parse(localStorage.getItem('pendiblistchild'));
   
    console.log("ttttttttttttttt"+this.pendingList);
    console.log(this.pendingListChild);
   
  }

}
