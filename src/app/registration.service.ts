import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

const baseUrl="http://localhost:8090/";


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {


    //Dependies injection done by the constructor
    constructor(private _http: HttpClient) { }

    public homeUserFormRemote():Observable<any>{
      return this._http.get<any>(baseUrl)
    }  

    public registerUserFormRemote(user :User):Observable<any>{
      return this._http.post<any>(baseUrl+"saveData" , user)
    }

    // public updateUserFormRemote(user :User ):Observable<any>{
    //   return this._http.post<any>(baseUrl+"updateData/" , user)
    // }

    public updateUserFormRemoteById(id: number ):Observable<any>{
      return this._http.get<any>(baseUrl+"update/"+id)
    }

    public deleteUserFormRemote(userId:number):Observable<any>{
      console.log(userId);
     return this._http.delete<any>(baseUrl+"deleteData/"+userId) 
    }

    public getStateList():Observable<any>{
      return this._http.get<any>(baseUrl+"getState")
    }

    public getDistrictList(stateId:number):Observable<any>{
      // console.log(stateId)
      return this._http.get<any>(baseUrl+"getDistrict/"+stateId)
    }

}

