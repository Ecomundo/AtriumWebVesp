import { Component, OnInit } from '@angular/core';
import { PagoOnlineService } from 'app/services/service.index';
import * as $ from 'jquery';
import { ModelFacConsul } from 'app/models/repre/datosFacConsul.models';
import { ModelRepreConsul } from 'app/models/repre/datosRepreConsul.models';
@Component({
  selector: 'app-pago-online',
  templateUrl: './pago-online.component.html',
  styleUrls: ['./pago-online.component.scss'],
})
export class PagoOnlineComponent implements OnInit {
  public ModelFacConsul: ModelFacConsul;
  public ModelRepreConsul: ModelRepreConsul;
  dl: boolean = false;
  letivoPeriodo: string;
  codigoPeriodo: string;
  codigoAlumno: string;
  datoActuFac: Array<any>;
  deudaList: Array<any>;
  repreDatoConsul: Array<any>;
  content: boolean = false;
  pr: boolean = false;

  constructor(private _pagoOnlineService: PagoOnlineService) { }

  ngOnInit() {

    this.codigoPeriodo = localStorage.getItem('cod_per') + localStorage.getItem('let_per');
    this.codigoAlumno = localStorage.getItem('cod_alum');
    this.deudaList = [{
      cod_per: this.codigoPeriodo,
      cod_alum: this.codigoAlumno
    }]

    this.repreDatoConsul = [{
      cod_per: this.codigoPeriodo,
      cod_alum: this.codigoAlumno
    }]

    this._pagoOnlineService.DatosFacConsul(this.repreDatoConsul[0]);
    this._pagoOnlineService.DatosRepreConsul(this.repreDatoConsul[0]);
    this._pagoOnlineService.DeudaLista(this.deudaList[0]);
    this.ModelRepreConsul = this._pagoOnlineService.datoRepreConsul[0];

  }

  pagosPendientes() {
    this.content = true;
    if (this._pagoOnlineService.deudasList.length > 0) {
      this.dl = true;
      this._pagoOnlineService.deudasList[0].ACTIVE = true;
    }
  }

  inicio() {
    this.content = false
  }

  checkAll(ck) {
    if (this._pagoOnlineService.deudasList[ck].ACCEPT == true) {
      if (ck != 0) {
        this._pagoOnlineService.deudasList[ck - 1].ACTIVE = false;
      } if (ck < this._pagoOnlineService.deudasList.length - 1) {
        this._pagoOnlineService.deudasList[ck + 1].ACTIVE = true;
      }
    } else {
      if (ck != 0) {
        this._pagoOnlineService.deudasList[ck - 1].ACTIVE = true;
      } if (ck < this._pagoOnlineService.deudasList.length - 1) {
        this._pagoOnlineService.deudasList[ck + 1].ACTIVE = false;
      }
    }
  }

  actualizar() {
    if ((this._pagoOnlineService.datoFacConsul[0].representante == "" || this._pagoOnlineService.datoFacConsul[0].representante == null) ||
      (this._pagoOnlineService.datoFacConsul[0].cedula == "" || this._pagoOnlineService.datoFacConsul[0].cedula == null) ||
      (this._pagoOnlineService.datoFacConsul[0].telefono == "" || this._pagoOnlineService.datoFacConsul[0].telefono == null) ||
      (this._pagoOnlineService.datoFacConsul[0].direccion == "" || this._pagoOnlineService.datoFacConsul[0].direccion == null)) {
      swal("Hey... !", "Parece que has dejado algún campo vacio", "warning");
    } else {
      this.datoActuFac = [{
        let_per: localStorage.getItem('let_per'),
        cod_per: localStorage.getItem('cod_per') + localStorage.getItem('let_per'),
        cod_alum: parseInt(localStorage.getItem('cod_alum')),
        cedula: this._pagoOnlineService.datoFacConsul[0].cedula,
        representa: this._pagoOnlineService.datoFacConsul[0].representante,
        email: this._pagoOnlineService.datoFacConsul[0].email,
        telefono: this._pagoOnlineService.datoFacConsul[0].telefono,
        direccion: this._pagoOnlineService.datoFacConsul[0].direccion
      }]

      this._pagoOnlineService.DatosFacActu(this.datoActuFac[0]).subscribe(
        response => {
          swal("Actualizado", "Cambios Guardados con Exito!", "success");//warning
        },
        error => {
          swal("Opss... !", "Algo salio mal, vuelve intertar porfavor :(", "error");
          console.log(error);
        }
      );
    }
  }

  pagar() {
    if((this._pagoOnlineService.datoFacConsul[0].representante == "" || this._pagoOnlineService.datoFacConsul[0].representante == null) ||
    (this._pagoOnlineService.datoFacConsul[0].cedula == "" || this._pagoOnlineService.datoFacConsul[0].cedula == null) ||
    (this._pagoOnlineService.datoFacConsul[0].telefono == "" || this._pagoOnlineService.datoFacConsul[0].telefono == null) ||
    (this._pagoOnlineService.datoFacConsul[0].direccion == "" || this._pagoOnlineService.datoFacConsul[0].direccion == null)){
      swal("Hey... !", "Parece que has dejado algún campo vacio", "warning");
    }else{
    this.pr = true
    }
  }

}
