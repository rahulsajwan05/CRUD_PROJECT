import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { RegistrationService } from '../registration.service';
import { User } from '../user';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  registerForm: FormGroup;
  submitted = false;

  stateLists:any|any;
  districtList:any|any;
  user = new User();
  msg='';
  stateId:number|number;
  districtId:number|number;
  currentDate : Date =new Date();
  
  constructor(private _service: RegistrationService, private _router: Router , 
    private formBuilder: FormBuilder) {
      this._service.getStateList().subscribe(
        data => {
                this.stateLists=data;
                console.log(this.stateLists)
        },
        error => console.log("exception occured in state list")
      );
    
      }


  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        firstName:['',[Validators.required,Validators.pattern(/^[A-Za-z -]+$/)]],
        dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
        email: ['', [Validators.required, Validators.email]],
        phone:['',Validators.required,Validators.pattern(/^[6-9]\d{9}$/)],
        state:['',Validators.required],
        district:['',Validators.required],
        address:['',Validators.required]
         
      });
     
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  registerUser(){
  this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
  
        else {
          // console.log(JSON.stringify(this.registerForm.value, null, 4));
          // console.log(this.registerForm);
          this.user.districtId=this.registerForm.value.district;
          this.user.stateId=this.registerForm.value.state;
          this.user.userEmail=this.registerForm.value.email;
          this.user.userName=this.registerForm.value.firstName;
          this.user.userPhone=this.registerForm.value.phone;
          this.user.userAddress=this.registerForm.value.address;
          this.user.userDOB=this.registerForm.value.dob;
          console.log(this.user);
          this._service.registerUserFormRemote(this.user).subscribe(
            data =>{
        console.log("user Registered");
        this._router.navigate(['']);
      },
      error =>{
        // console.log("Excception Ocuured in Registration");
        this.msg=error.error;
        this._router.navigate(['']);
      }
    
    )
    }
}

  selectState($event:any) {
    // console.log(this.registerForm.value);
   
    console.log(this.user);
   
    console.log($event.target.value);
      this._service.getDistrictList($event.target.value).subscribe(
        data => {
                this.districtList=data;
                console.log(this.districtList)
        },
        error => console.log("exception occured in state list")
      )
  }
  selectDistrict($event:any) {
   // this.user.districtId=$event.target.value;
    console.log(this.user);
   // this.districtId=$event.target.value;
    console.log($event.target.value);  
  }
}
