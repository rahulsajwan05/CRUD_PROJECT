import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  user = new User();
  
  id: number|number;
  constructor(private _service: RegistrationService, private _router: Router , 
    private _activatedRotue : ActivatedRoute) {}

  ngOnInit(): void {
    var id:number|any=  this._activatedRotue.snapshot.paramMap.get('id');
    console.log(id);
    this._service.updateUserFormRemoteById(id).subscribe(
      data => {
        console.log("data Received");
        this.user=data;
      },
      error => console.log("Exception Occured")
    )
  }

  updateUser(){
    this._service.registerUserFormRemote(this.user).subscribe(
      data =>{
        console.log("user updated");
        this._router.navigate(['']);
      },
      error =>{
        // console.log("Excception Occured in Registration");
        this._router.navigate(['']);
      }
    )
  }


}
