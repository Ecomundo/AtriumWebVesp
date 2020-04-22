import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/service.index';
import { Router } from '@angular/router';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']//,
  //providers: [UserService]
})
export class LoginComponent implements OnInit {
  public typelog:any[];
  public log:string;
  public title = 'app';
  public user: User;
  public datos: any;
  public token;
  public erroMessage;
  forma: FormGroup
  constructor(private _userService: UserService, private _router: Router) {
    this.typelog = [
      {title: "Docente", value: "d"},
      {title: "Representante", value: "r"}
    ];
    this.user = new User('', '');
  }
  ngOnInit() {
    this.forma = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      pass: new FormControl(null, Validators.required),
      typelog: new FormControl(false)
    });
  }

  public onSubmit() {
    if (this.log === 'd') {
      this._userService.signupD(this.user).subscribe(
        ok => {
          console.log("ok" + ok)
          this.user = new User('', '');

          this._router.navigate(['/dashboard']);
        },
        error => {
          let mensaje = error.json();
          swal("Opss... !", "Oops parece que esta ingresando mal tus datos :S !", "error");
          //swal("Oops parece que esta ingresando mal tus datos :S !", mensaje.message, "error");
        }
      );
    } else if (this.log === 'r') {
      this._userService.signupR(this.user).subscribe(
        ok => {
          console.log("ok" + ok)
          this.user = new User('', '');

          this._router.navigate(['/pago_online']);
        },
        error => {
          let mensaje = error.json();
          //swal("Oops parece que esta ingresando mal tus datos :S !", mensaje.message, "error");
          swal("Opss... !", "Oops parece que esta ingresando mal tus datos :S !", "error");
        }
      );
    }
  }
}