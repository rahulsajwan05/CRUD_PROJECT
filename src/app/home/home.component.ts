import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { RegistrationService } from '../registration.service';
import { User } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userList: any | any;

  constructor(private _service: RegistrationService, private _router: Router) { }
  ngOnInit(): void {
    this._service.homeUserFormRemote().subscribe(
      data => {
        console.log("user fetched");
        this.userList = data;
        console.log(this.userList);
      },
      error => console.log("exception Occured")
    )
  }

  deleteUser(id: number) {
    this._service.deleteUserFormRemote(id).subscribe(
      data => {
        console.log(id);
        this.userList = this.userList.filter(data.id !== id);
      }, error => {
            var data = error;
            console.log(data);
            console.log(data.status);
            if (data.status == '200') {
              this.ngOnInit();
        }
      }
    )
  }

  updateUser(id: number) {
    console.log("id" + id);
    this._router.navigate(['/update', id]);
  }
}
