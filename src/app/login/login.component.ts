import { Component, OnInit } from '@angular/core';
import { User  } from '../models/user';
import {UserService}from '../services/user.service';
import {Router} from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public title = 'app';
    public user: User;
public datos:any;
    public token;
   public  erroMessage;
    constructor( private _userService:UserService, private _router: Router){
       this.user =new User('','');
    }
    ngOnInit(){

    //  this.token =this._userService.getToken();


    }

    public onSubmit(){

     this._userService.signup(this.user).subscribe(
         ok=>{//console.log("ok"+ok)
         this.user =new User('','');
         this._router.navigate(['/Asistencias']);
       },
       error=>{
               let mensaje=error.json()
               swal("Oops parece que esta ingresando mal tus datos :S !", mensaje.message, "error");

       }

      );
    }



}
