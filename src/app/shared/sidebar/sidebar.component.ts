import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService, UserService }from 'app/services/service.index';
declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  username:string;
  email:string;
  nombre:string;
  constructor(private _userService:UserService, public _sidebar: SidebarService) { }

  ngOnInit() {
    if(localStorage.getItem('type') ===  'D'){
      this.username=  localStorage.getItem('username');
      this.email   =  localStorage.getItem('e_mail');
      this.nombre  =  localStorage.getItem('nombre');
      this.menuItems = this._sidebar.menuD.filter(menuItem => menuItem);
    }else if(localStorage.getItem('type') ===  'R'){
      this.username=  localStorage.getItem('cod_repre');
      this.email   =  localStorage.getItem('email');
      this.nombre  =  localStorage.getItem('nomrepre');
      this.menuItems = this._sidebar.menuR.filter(menuItem => menuItem);
    }
}
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  logout(){
  this._userService.logout();

}

}
