import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { SidebarService, UserService }from 'app/services/service.index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']//,
  //providers: [UserService]
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    private toggleButton: any;
    private sidebarVisible: boolean;
    public token;
    email:string;
    nombre:string;
    username:string ;

    constructor(location: Location,  private element: ElementRef ,
              private _userService:UserService,
              public _sidebar: SidebarService) {
      this.location = location;
          this.sidebarVisible = false;
    }

    ngOnInit(){

        if(localStorage.getItem('type') ===  'D'){
            this.username=  localStorage.getItem('username');
            this.email   =  localStorage.getItem('e_mail');
            this.nombre  =  localStorage.getItem('nombre');
            this.listTitles = this._sidebar.menuD.filter(listTitle => listTitle);
            //this.menuItems = this.ROUTES.filter(menuItem => menuItem);
          }else if(localStorage.getItem('type') ===  'R'){
            this.username=  localStorage.getItem('cod_repre');
            this.email   =  localStorage.getItem('email');
            this.nombre  =  localStorage.getItem('nomrepre');
            this.listTitles = this._sidebar.menuR.filter(listTitle => listTitle);
        }

      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    getTitle(){
        let titlee = this.location.prepareExternalUrl(this.location.path());
        let title;
        if(titlee.charAt(0) === '#'){
            titlee = titlee.slice( 2 );
            
        }
        titlee = titlee.split('/').pop();
        for(var item = 0; item < this.listTitles.length; item++){
          title = this.listTitles[item].path.split('/').pop();
            if(title === titlee){
                  titlee = this.listTitles[item].title;
            }
        }
        return titlee;
      }
      
    logout(){
    this._userService.logout();
    this.token=null;
  }
    /*logout(){
        console.log("fuciona");
        localStorage.removeItem('token');
        localStorage.clear();
        this.token=null;
        this._router.navigate(['login']);
      }*/
}
