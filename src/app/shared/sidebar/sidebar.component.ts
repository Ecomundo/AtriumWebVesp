import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService, UserService } from 'app/services/service.index';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  cam = 'collapse';
  pro = false;
  hij = false;
  // tslint:disable-next-line: radix
  alum = parseInt(localStorage.getItem('cod_alum'));
  menuItems: any[];
  username: string;
  email: string;
  nombre: string;
  hijoList: any;
  constructor(private _userService: UserService, public _sidebar: SidebarService) { }

  ngOnInit() {
    this.hijoList = {
      cedu_pas: localStorage.getItem('cod_repre'),
      cod_per: localStorage.getItem('cod_per'),
      let_per: localStorage.getItem('let_per')
    }

    if (localStorage.getItem('type') ===  'D'){
      this.username = localStorage.getItem('username');
      this.email = localStorage.getItem('e_mail');
      this.nombre = localStorage.getItem('nombre');
      this.menuItems = this._sidebar.menuD.filter( (menuItem: any) => menuItem );
    } else if (localStorage.getItem('type') ===  'R'){
      this.username = localStorage.getItem('cod_repre');
      this.email = localStorage.getItem('email');
      this.nombre = localStorage.getItem('nomrepre');
      this.menuItems = this._sidebar.menuR.filter( (menuItem: any) => menuItem );
      this.pro = true;
      this._sidebar.datosHijos(this.hijoList);
      if ( localStorage.getItem('hijos') === '1') {
        this.hij = true;
      }
    }
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout() {
  this._userService.logout();
  }

  cambio() {
    if ( this.cam === 'collapse') {
      this.cam = 'collapse show';
    } else {
      this.cam = 'collapse';
    }
  }

  change(cod_alum: any) {
    localStorage.removeItem('cod_alum');
    localStorage.setItem('cod_alum', cod_alum);
    location.reload();
  }


}
