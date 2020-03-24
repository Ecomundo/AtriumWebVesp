import { Component, OnInit } from '@angular/core';
import { PagoOnlineService } from 'app/services/service.index';
import * as $ from 'jquery';
// import swal from 'sweetalert';
import { ModelFacConsul } from 'app/models/repre/datosFacConsul.models';
import { ModelRepreConsul } from 'app/models/repre/datosRepreConsul.models';
import * as postscribe from 'postscribe';
import { Global } from '../../../services/global';

@Component({
  selector: 'app-pago-online',
  templateUrl: './pago-online.component.html',
  styleUrls: ['./pago-online.component.scss'],
})

export class PagoOnlineComponent implements OnInit {
  public ModelFacConsul: ModelFacConsul;
  public ModelRepreConsul: ModelRepreConsul;
  public url: string;

  dl = false;
  total: any = '';
  letivoPeriodo: string;
  codigoPeriodo: string;
  codigoAlumno: string;
  datoActuFac: Array<any>;
  deudaList: Array<any>;
  repreDatoConsul: Array<any>;
  content = false;
  pr = false;
  reference = '';
  descrip = '';

  constructor(public _pagoOnlineService: PagoOnlineService) {
    this.url = Global.url;
  }

  ngOnInit() {
    this.letivoPeriodo = localStorage.getItem('let_per');
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
    if (this._pagoOnlineService.deudasList[ck].ACCEPT === true) {
      if (ck !== 0) {
        this._pagoOnlineService.deudasList[ck - 1].ACTIVE = false;
      } if (ck < this._pagoOnlineService.deudasList.length - 1) {
        this._pagoOnlineService.deudasList[ck + 1].ACTIVE = true;
        this.total += this._pagoOnlineService.deudasList[ck].CFAC_VALOR;
      }
    } else {
      if (ck !== 0) {
        this._pagoOnlineService.deudasList[ck - 1].ACTIVE = true;
        this.total -= this._pagoOnlineService.deudasList[ck].CFAC_VALOR;
      } if (ck < this._pagoOnlineService.deudasList.length - 1) {
        this._pagoOnlineService.deudasList[ck + 1].ACTIVE = false;
      }
    }
  }

  actualizar() {
    if (
      (this._pagoOnlineService.datoFacConsul[0].representante === '' || this._pagoOnlineService.datoFacConsul[0].representante === null) ||
      (this._pagoOnlineService.datoFacConsul[0].cedula === '' || this._pagoOnlineService.datoFacConsul[0].cedula === null) ||
      (this._pagoOnlineService.datoFacConsul[0].telefono === '' || this._pagoOnlineService.datoFacConsul[0].telefono === null) ||
      (this._pagoOnlineService.datoFacConsul[0].direccion === '' || this._pagoOnlineService.datoFacConsul[0].direccion === null)) {
      swal('Hey... !', 'Parece que has dejado algún campo vacio', 'warning');
    } else {
      this.datoActuFac = [{
        let_per: localStorage.getItem('let_per'),
        cod_per: localStorage.getItem('cod_per') + localStorage.getItem('let_per'),
        cod_alum: parseInt(localStorage.getItem('cod_alum'), 10),
        cedula: this._pagoOnlineService.datoFacConsul[0].cedula,
        representa: this._pagoOnlineService.datoFacConsul[0].representante,
        email: this._pagoOnlineService.datoFacConsul[0].email,
        telefono: this._pagoOnlineService.datoFacConsul[0].telefono,
        direccion: this._pagoOnlineService.datoFacConsul[0].direccion
      }]

      this._pagoOnlineService.DatosFacActu(this.datoActuFac[0]).subscribe(
        response => {
          swal("Actualizado", "Cambios Guardados con Exito!", "success");//warning
          console.log(response);
        },
        error => {
          swal("Opss... !", "Algo salio mal, vuelve intertar porfavor :(", "error");
          console.log(error);
        }
      );
    }
  }

  pagar() {
    this.referencia();
    postscribe('#response',
      `<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>
      <script type="text/javascript" src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
      <script>
      var paymentezCheckout = new PaymentezCheckout.modal({
          client_app_code: 'ECOMUNDO-EC-CLIENT',
          client_app_key: 'nis24EWnymqMJ1Hn4UumxXJw4Kk38R'',
          locale: 'es',
          env_mode: 'stg',
          onOpen: function() {
              console.log('modal open');
          },
          onClose: function() {
              console.log('modal closed');
          },
          onResponse: function(response) {
            console.log(response);
            const estado = response.transaction.status;
            const id_tran = response.transaction.id;
            let tran = true;
            if (estado == 'success') {
                const subdatos = {
                    descr: '${this.descrip}',
                    refe: '${this.reference}',
                    cod_alum: '${this.codigoAlumno}',
                    total: '${this.total}',
                    cliente: '${localStorage.getItem('nomrepre')}',
                    email: '${this._pagoOnlineService.datoFacConsul[0].email}',
                    authorization_code: response.transaction.authorization_code,
                    id: response.transaction.id
                };
                console.log(subdatos);
                $.ajax({
                type: 'post',
                url: '${this.url}debitDebtBase',
                async: true,
                contentType: 'application/json',
                headers: {'Authorization': 'Bearer ${localStorage.getItem('token')}'},
                data: JSON.stringify(subdatos),
                success: function(data){
                    if(data.estado == 0){
                    Swal.fire({
                        type: 'success',
                        title: '!Exito!',
                        text: 'Su pago se realiza con éxito',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        onAfterClose: () => {
                          location.reload();
                        }
                    });
                    } else if(data.estado == 04 || data.estado == 28){
                    Swal.fire({
                        type: 'warning',
                        title: '!Hey!',
                        text: 'Tuvimos un inconveniente con el pago, por favor comunicarse con el departamento financiero.',
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                        onAfterClose: () => {
                          location.reload();
                        }
                    });
                }
            },
                error: function(data){
                    Swal.fire({
                    type: 'warning',
                    title: '!Hey!',
                    text: 'Tuvimos un inconveniente con el pago, por favor comunicarse con el departamento financiero.',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    onAfterClose: () => {
                      location.reload();
                    }
                    });
                }
            })
            } else if (estado == 'failure') {
                Swal.fire({
                  type: 'error',
                  title: '!Opss...!',
                  text: 'Tuvimos problemas al realizar el pago, intenta nuevamente en unos minutos',
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  onAfterClose: () => {
                    location.reload();
                  }
                });
            } else if (estado == 'pending') {

              (async () => {
                const { value: estado } = await Swal.fire({
                  title: 'OTP',
                  input: 'text',
                  text: 'Favor ingresar el Código que le llegó a su email o SMS del Banco emisor de su tarjeta.',
                  inputAttributes: {
                    maxlength: 6,
                    style: 'text-align:center',
                    onkeypress: 'return event.charCode >= 48 && event.charCode <= 57',
                  },
                  confirmButtonText: 'Enviar',
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  inputValidator: (value) => {
                    return new Promise((resolve) => {

                      if (value.length < 6){
                        resolve('El código OTP no puede contener menos de 6 dígitos');
                      } else {
                        const datos = {
                          user_id: '${localStorage.getItem('cod_repre')}',
                          transaction_id: id_tran,
                          type: 'BY_OTP',
                          value: value
                      };
                        $.ajax({
                          type: 'post',
                          url: '${this.url}verifyCreditCart',
                          async: true,
                          contentType: 'application/json',
                          headers: {'Authorization': 'Bearer ${localStorage.getItem('token')}'},
                          data: JSON.stringify(datos),
                          success: function(data){
                            if(data.transaction.status_detail == 3){
                              const subdatos = {
                                descr: '${this.descrip}',
                                refe: '${this.reference}',
                                cod_alum: '${this.codigoAlumno}',
                                total: '${this.total}',
                                cliente: '${localStorage.getItem('nomrepre')}',
                                email: '${this._pagoOnlineService.datoFacConsul[0].email}',
                                authorization_code: data.transaction.authorization_code,
                                id: data.transaction.id
                              };
                              console.log(subdatos);
                              $.ajax({
                                type: 'post',
                                url: '${this.url}debitDebtBase',
                                async: true,
                                contentType: 'application/json',
                                headers: {'Authorization': 'Bearer ${localStorage.getItem('token')}'},
                                data: JSON.stringify(subdatos),
                                success: function(data){
                                  if(data.estado == 0){
                                    Swal.fire({
                                      type: 'success',
                                      title: '!Exito!',
                                      text: 'Su pago se realiza con éxito',
                                      allowOutsideClick: false,
                                      allowEscapeKey: false,
                                      onAfterClose: () => {
                                        location.reload();
                                      }
                                    });
                                  } else if(data.estado == 04 || data.estado == 28){
                                    Swal.fire({
                                      type: 'warning',
                                      title: '!Hey!',
                                      text: 'Tuvimos un inconveniente con el pago, por favor comunicarse con el departamento financiero.',
                                      allowOutsideClick: false,
                                      allowEscapeKey: false,
                                      onAfterClose: () => {
                                        location.reload();
                                      }
                                    });
                                  }
                                },
                                error: function(data){
                                  Swal.fire({
                                    type: 'warning',
                                    title: '!Hey!',
                                    text: 'Tuvimos un inconveniente con el pago, por favor comunicarse con el departamento financiero.',
                                    allowOutsideClick: false,
                                    allowEscapeKey: false,
                                    onAfterClose: () => {
                                      location.reload();
                                    }
                                  });
                                }
                            })
                            } else if (data.transaction.status_detail == 33){
                              resolve('El código es invalido, escriba correctamente el código')
                            } else {
                              console.log('else');
                              Swal.fire({
                                type: 'error',
                                title: '!Opss...!',
                                text: 'Tuvimos problemas al realizar el pago, intenta nuevamente en unos minutos',
                                allowOutsideClick: false,
                                allowEscapeKey: false,
                                onAfterClose: () => {
                                  location.reload();
                                }
                            })
                            }
                          },
                          error: function(){
                            console.log('error');
                            Swal.fire({
                              type: 'error',
                              title: '!Opss...!',
                              text: 'Tuvimos problemas al realizar el pago, intenta nuevamente en unos minutos',
                              allowOutsideClick: false,
                              allowEscapeKey: false,
                              onAfterClose: () => {
                                location.reload();
                              }
                            })
                          }
                        });
                      }
                    })
                  }
                })
                })()
              }
        }
      });

      var btnOpenCheckout = document.querySelector('.js-paymentez-checkout');

      btnOpenCheckout.addEventListener('click', function() {
          // Open Checkout with further options:
          paymentezCheckout.open({
              user_id: '${localStorage.getItem('cod_repre')}',
              user_email: '',
              user_phone: '',
              order_description: '${this.descrip}',
              order_taxable_amount: 0,
              order_tax_percentage: 0,
              order_amount: ${this.total},
              order_vat: 0,
              order_reference: '${this.reference}',
          });
      });

      // Close Checkout on page navigation:
      window.addEventListener('popstate', function() {
          paymentezCheckout.close();
      });
    </script>`);

    if ((this._pagoOnlineService.datoFacConsul[0].representante === '' || this._pagoOnlineService.datoFacConsul[0].representante == null) ||
      (this._pagoOnlineService.datoFacConsul[0].cedula === '' || this._pagoOnlineService.datoFacConsul[0].cedula == null) ||
      (this._pagoOnlineService.datoFacConsul[0].telefono === '' || this._pagoOnlineService.datoFacConsul[0].telefono == null) ||
      (this._pagoOnlineService.datoFacConsul[0].direccion === '' || this._pagoOnlineService.datoFacConsul[0].direccion == null)) {
      swal('Hey... !', 'Parece que has dejado algún campo vacio', 'warning');
    } else {
    }
  }

  referencia() {
    this.reference = '';
    this.total = 0;
    this.descrip = '';
    for (let i = 0; i < this._pagoOnlineService.deudasList.length; i++) {
      if (this._pagoOnlineService.deudasList[i].ACCEPT === true) {
        if (this.reference === '' || this.total === 0) {
          this.reference = `${this._pagoOnlineService.deudasList[i].CFAC_COD}`;
          this.total = this._pagoOnlineService.deudasList[i].CFAC_VALOR;
          this.descrip = `${this._pagoOnlineService.deudasList[i].DESCRIPCION}`;
          console.log(this.total);
        } else {
          this.reference = `${this.reference};${this._pagoOnlineService.deudasList[i].CFAC_COD}`;
          this.total = this.total + this._pagoOnlineService.deudasList[i].CFAC_VALOR;
          this.descrip = `${this.descrip};${this._pagoOnlineService.deudasList[i].DESCRIPCION}`;
          console.log(this.total);
        }
      }
    }
  }

}
