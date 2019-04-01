import { Component,Renderer2, ViewChild ,ElementRef  , OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { PlanificacionCabeceraModel  } from '../../../models/planificacion.cabecera.models';
import { NgForm } from '@angular/forms'
import * as moment from 'moment';
import { extendMoment } from 'moment-range';
import { Planificacion  } from '../../../models/planificacion';
//import {DetallePlanAdmin} from '../models/DetallePlanAdmin.models';

import { saveAs } from 'file-saver/FileSaver';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

import { PlanificacionServices, MateriasDocenteService, LeccionarioServices } from 'app/services/service.index';
@Component({
  selector: 'app-planifi-semanal',
  templateUrl: './planifi-semanal.component.html',
  styleUrls: ['./planifi-semanal.component.scss']//,
  //providers :[PlanificacionServices,MateriasDocenteService, DatePipe,LeccionarioServices]
})
export class PlanifiSemanalComponent implements OnInit {
  @ViewChild("guardarModal") guardarModal: ElementRef;
  @ViewChild("guardaTodo") guardaTodo: ElementRef;
    @ViewChild("guardaDuplica") guardaDuplica: ElementRef;
    @ViewChild("modal") modal: ElementRef;
  ///  public DetallePlanAdminModel:  DetallePlanAdmin;
  public planificacionCabeceraModel: PlanificacionCabeceraModel;
  public planificacionDetalleModel:Planificacion;
  visible=true;
  addtable=false;
  bloquedoModal=false;
  ObservacionAdmin:string;
  bandera:string;
  itemsPlan: Array<any>;
    ArregloFechas: Array<any>=[];
  tablaAministrador: Array<any>;
  accion:string;
  index:number;
  indexAdmin:number;
  nombre:string;
  fechain:string;
  fechafin:string;
  codigoPeriodo:string;
  letPeriodo:string;
  user:string;
  materia:string;
  paralelo:string;
  curso:string;
  Paralelos: Array<any>;
  todosPlanes: Array<any>;
   swal: SweetAlert = _swal as any;
   cod_paralelo_duplicado:string;
   cod_deta_dias;
  constructor(public _PlanificacionServices: PlanificacionServices,
              private _MateriasDocentesServices: MateriasDocenteService,
              private renderer: Renderer2,
              private datePipe: DatePipe,
                private _LeccionarioServices:LeccionarioServices,
            )
              {
      this.planificacionCabeceraModel=  new PlanificacionCabeceraModel(0,0,'','',0,0,0,'',0,'','','','',0,'','','',false,'','',false,'','',0,'');
    this.planificacionDetalleModel= new Planificacion(0,0,'','','','','','','','','');
    //this.DetallePlanAdminModel=
              }

  ngOnInit() {

    this.resetForm();



    /////////
    this._MateriasDocentesServices.MateriasDocentes('P');
    this._MateriasDocentesServices.UnidadesDocentes();
    this.nombre=localStorage.getItem('nombre');
    this.bandera =localStorage.getItem('bandera');
    //////////model///////////
     this.IniciaCabcera();
  }

  fecha(){

    this.fechain  =this.datePipe.transform(this.fechain, 'yyyy-MM-dd');
    this.fechafin  =this.datePipe.transform(this.fechafin, 'yyyy-MM-dd');

  }
  IniciaCabcera(){
    this.planificacionCabeceraModel.cod_per =localStorage.getItem('cod_per');
    this.planificacionCabeceraModel.let_per = localStorage.getItem('let_per');
    this.planificacionCabeceraModel.usuario= localStorage.getItem('username');
    this.planificacionCabeceraModel.cod_profesor = localStorage.getItem('cod_profesor');
    this.fechain  =this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.fechafin =this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    /*this.planificacionCabeceraModel.fecha_ini =moment().format('L');
      this.planificacionCabeceraModel.fecha_fin =moment().format('L');*/
    this.planificacionCabeceraModel.cod_emp=3;
  }

  Cambiamodal(i){
    this.ArregloFechas=[];
    this.visible=false;
    this.materia=i.Dm;
    this.paralelo=i.Dp;
    this.curso=i.Dca;
    this.planificacionCabeceraModel.cod_curso= (this.bandera==='A')?i.cod_curso[0]:i.cod_curso;
    this.planificacionCabeceraModel.cod_paralelo= i.cod_paralelo;
    this.planificacionCabeceraModel.cod_mat= i.cod_materia;
   this.planificacionCabeceraModel.cod_paralelo_duplicado=this.planificacionCabeceraModel.cod_paralelo;
    this.cod_paralelo_duplicado=i.cod_paralelo;
         this.cod_deta_dias=  i.cod_paralelo;
///////////////////////////Hacer la consulta al sps de los paralelos y llenarlo////////
        this._PlanificacionServices.ConsultaParalelo(this.planificacionCabeceraModel).subscribe(
                         response=>{
                              this.Paralelos=response;
                              if(this.Paralelos.length>0){
                                 this.renderer.removeAttribute(this.guardaDuplica.nativeElement, "disabled");///Habilita boton de guardas
                              }

                               },
                         error=>{
                              console.log(error);
                            }
                      );
     }



      Duplica(){
       if(this.planificacionCabeceraModel.cod_paralelo_duplicado>0)
        {
          this.GuardaTodo()
          this._PlanificacionServices.InsertDuplica(this.planificacionCabeceraModel).subscribe(
                           response=>{
                                swal("Planificación", "Sea Duplicado con Exito!", "success");//warning

                                   },
                           error=>{
                               swal("Opss... !", "Algo salio mal, vuelve intertar porfavor :(", "error");
                                console.log(error);
                              }
                        );
          }
          else{
              swal("Planificación -.-", `Debe selecionar un paralelo`, "warning")//
          }
      }

  Atras()
  {
       this._PlanificacionServices.ListDetallePlanAdmin=[];
       this.planificacionCabeceraModel=  new PlanificacionCabeceraModel(0,0,'','',0,0,0,'',0,'','','','',0,'','','',false,'','',false,'','',0,'');
       this.IniciaCabcera();
       this.planificacionDetalleModel= new Planificacion(0,0,'','','','','','','','','');
    this.visible=true;

    this._PlanificacionServices.ListPlanificacion =[];
      this.bloquedoModal=false;
      this.resetForm();
  }

      CreaDias(cod_deta){

        /**********************Fechas**************************************************/

           this.cod_deta_dias=  cod_deta ;

           this.ArregloFechas=[];
            moment.locale('es');//español
            const momentrange = extendMoment(moment);

            let startfecha = moment(this.fechain);
            let endfecha = moment(this.fechafin);
            let range = momentrange.range(startfecha, endfecha);

            const dias = Array.from(range.by('days'));
            let arrfechas=dias.filter(m => m.format('dddd')!="domingo" && m.format('dddd')!="sábado");


           this._LeccionarioServices.HorariosDocentes();
        /*****************************Datos para consultar***************************************/
        let datos= new Object();
            datos=this.planificacionCabeceraModel
            datos["cod_detalle"]=cod_deta;
            datos["date_ini"]= this.fechain;
            datos["date_fin"]= this.fechafin;
            datos["cod_paralelo_nuevo"]=this.cod_paralelo_duplicado;
          /****************************************************************/

          this._PlanificacionServices.ConsultaPlanificacionDiaria(datos).subscribe(
                     response=>{
                              if(response.length>0){
                                   this.ArregloFechas=response;

                                   this.ArregloFechas.map((elem)=>{
                                     elem["cod_plan"]=this.planificacionCabeceraModel.cod_plan
                                     elem["cod_detalle"]=cod_deta;
                                     elem["cod_paralelo"]= this.planificacionCabeceraModel.cod_paralelo
                                     elem["dias"]=moment(elem.fecha_hora).format('dddd')
                                     elem["paralelo_nuevo"]=this.cod_paralelo_duplicado
                                     elem["cod_materia"]=this.planificacionCabeceraModel.cod_mat
                                     elem["fecha_ini"]=this.fechain
                                     elem["fecha_fin"]=this.fechafin
                                     elem.estado=(elem.estado==='A')? true: false;
                                   })
                                     console.log(`cod detalle :${cod_deta}`);
                                    console.log(this.ArregloFechas);
                              }
                             else{
                                arrfechas.map(m =>{
                                        this.ArregloFechas.push({
                                          "cod_emp":this.planificacionCabeceraModel.cod_emp,
                                          "cod_per":this.planificacionCabeceraModel.cod_per,
                                          "let_per":this.planificacionCabeceraModel.let_per ,
                                          "cod_plan":this.planificacionCabeceraModel.cod_plan,
                                          "cod_detalle":cod_deta,
                                          "codhorario":0,/////todo la columna cambiar par consultar
                                          "unidad":this.planificacionCabeceraModel.unidad,
                                          "curso":this.planificacionCabeceraModel.cod_curso,
                                          "cod_paralelo": this.planificacionCabeceraModel.cod_paralelo,
                                          "cod_hora":0,
                                          "cod_materia":this.planificacionCabeceraModel.cod_mat,
                                          "cod_profe":this.planificacionCabeceraModel.cod_profesor,
                                          "usuario":  this.planificacionCabeceraModel.usuario,
                                          "dias" :m.format('dddd'),
                                          "estado":false,
                                          "fecha_ini": this.fechain,
                                          "fecha_fin": this.fechafin,
                                          "fecha_hora": m.format('YYYY-MM-DD'),
                                          "paralelo_nuevo":  this.cod_paralelo_duplicado

                                          })
                                      })
                             }

                     },
                     error=>{
                         console.log(error);
                      }
                  );

      }
      /**********************Elimina Dias**************************************/
    /* no lo puse por que falta funcionalidad
    DeleteDias(i){
      console.log(i);
         this.ArregloFechas.splice(i, 1);
      }*
      /**********************Duplica el dia y la hora para el leccionario *************************************/
      DuplicaHora(posicion,item){
          console.log(item);
            let objetoduplicar= new Object();
            objetoduplicar= Object.assign({}, objetoduplicar , item );
            objetoduplicar["codhorario"]=0;
            console.log(objetoduplicar);
           this.ArregloFechas.splice(posicion+1,0,objetoduplicar)
      }
   /****************************************************************/
 /********************************Guarda Dias de leccionario *********************************************************/
       GuardaDiaLeccionario(){

        this.ArregloFechas.map((elem)=>{elem.paralelo_nuevo=this.cod_paralelo_duplicado});
        console.log(this.ArregloFechas);

        this._PlanificacionServices.InsertaPlanificacionDiaria(this.ArregloFechas).subscribe(
                   response=>{

                     swal("Planificación", "Cambios Guardados correctamente :)!", "success")
                   },
                   error=>{
                       console.log(error);
                      swal("Opss... !", "Algo salio mal, vuelve intertar porfavor :(", "error");
                            console.log(error);

                    }
                );
       }
   /****************************************************************/

    ConsultaAdmin(){

      if(this.planificacionCabeceraModel.unidad===0)
      {
       swal(`No ha seleccionado la unidad -.-`,"", "warning")//
      }
      else
     {
       this.planificacionCabeceraModel.fecha_ini =this.fechain;
        this.planificacionCabeceraModel.fecha_fin =this.fechafin;

       if(this.bandera==='A'){
          this._PlanificacionServices.ConsultaPlanAdmin(this.planificacionCabeceraModel);

          //falta validacion cuando alla datos en la tabla que muestra admin
          this.renderer.removeAttribute(this.guardaTodo.nativeElement, "disabled");///Habilita boton de guardas
       }
       else
          {
          this._PlanificacionServices.ListPlanificacion =[];///Limpia la tabla de los detalles
           let cabecera;
            this._PlanificacionServices.ConsultaPlanDocente(this.planificacionCabeceraModel)
                          .subscribe(response=>{

                            cabecera=response;
                            if(cabecera!=null){

                                //LLeno la cabera del plan
                                this.planificacionCabeceraModel=cabecera;///

                                this._PlanificacionServices.ConsultaPlanDocenteDetalle(this.planificacionCabeceraModel.cod_plan);
                              }
                              else
                              {
                                 this.planificacionCabeceraModel.t_unidad="";
                                 this.planificacionCabeceraModel.necesidad_educativa="";
                                 this.planificacionCabeceraModel.adaptacion_aplicada="";
                                 this.planificacionCabeceraModel.observaciones="";
                                 this.planificacionCabeceraModel.usuario_revisor="";
                                 this.planificacionCabeceraModel.usuario_revisor="";
                                 this.planificacionCabeceraModel.revisado=false;
                                 this.planificacionCabeceraModel.aprobado=false;

                            }

                          });
                          ///Habilita boton de guardas
             this.renderer.removeAttribute(this.guardaTodo.nativeElement, "disabled");
          }

        }
    }


      ConsultaTodosPlan(){
        if(this.planificacionCabeceraModel.unidad!=0)
        {
          this.planificacionCabeceraModel.fecha_ini =this.fechain;
          this.planificacionCabeceraModel.fecha_fin =this.fechafin;
          this._PlanificacionServices.ConsultaPlanTodos(this.planificacionCabeceraModel)
                        .subscribe(response=>{
                        this.todosPlanes=response});
        }

      }




  delete(cod_deta,i){
  //  this.planificacionDetalleModel.cod_deta =cod_deta;
  swal({
    title: "¿Esta seguro de eliminar?",
    text: "Al hacer click en Ok se eliminara de detalle de la Planificación ¿Esta seguo?",
    icon: "warning",
    buttons: {
         cancel: true,
         confirm: true,
       }
  })
  .then(willDelete => {
    if (willDelete) {

      this._PlanificacionServices.ListPlanificacion[i].estado="E";
      this._PlanificacionServices.InsertDetalle(this._PlanificacionServices.ListPlanificacion[i]).subscribe(
                 response=>{
                     this._PlanificacionServices.ListPlanificacion.splice(i, 1);
                     swal("Eliminado!", "El detalle de Planificación se ah eliminado con exito!", "success");
                 },
                 error=>{
                        swal("Opss... !", "Algo salio mal, vuelve intertar porfavor :(", "error");
                        console.log(error);

                      });
    }
  });


  }


EditAdmin(Itemplan,i) {

  this.ObservacionAdmin=Itemplan.observaciones;
   //this._PlanificacionServices.ListDetallePlanAdmin[i].observaciones=Itemplan;

    this.indexAdmin=i;
  }
GuardarModalAdmin(){

  this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].fecha_ini=moment(this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].fecha_ini).format("YYYY-MM-DD");
  this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].fecha_fin=moment(this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].fecha_fin).format("YYYY-MM-DD");
  if(this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].revisado){
      this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].usuario_revisor =localStorage.getItem('username')
  }

  if(this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].aprobado){
      this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].usuario_aprueba =localStorage.getItem('username')
  }
  this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].cod_profesor =localStorage.getItem('cod_profesor')
  this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].observaciones=this.ObservacionAdmin;
  this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin].fecha_revisado=moment().format('L');

this._PlanificacionServices.InsertCabecera(this._PlanificacionServices.ListDetallePlanAdmin[this.indexAdmin]).subscribe(
           response=>{
                  swal("Planificación", "Cambios Guardados con Exito!", "success");//warning
           },
           error=>{
                  swal("Opss... !", "Algo salio mal, vuelve intertar porfavor :(", "error");
                  console.log(error);
              }
        );

}
GeneraPDF(i){
  if(this.bandera==="P"){
    this.planificacionCabeceraModel.fecha_ini =this.fechain;
    this.planificacionCabeceraModel.fecha_fin =this.fechafin;
  }

let ususario =(this.bandera==="A")? this._PlanificacionServices.ListDetallePlanAdmin[i].usuario:this.planificacionCabeceraModel.usuario;

  this._PlanificacionServices.GeneraPDFAdmin(
      (this.bandera==="A")? this._PlanificacionServices.ListDetallePlanAdmin[i]:this.planificacionCabeceraModel
      ).subscribe(
        (res) => {
            saveAs(res, `Plan_${ususario}.pdf`); //if you want to save it - you need file-saver for this : https://www.npmjs.com/package/file-saver

      /*  var fileURL = URL.createObjectURL(res);
        window.open(fileURL);*/

        }
    );
}

  Edit(Itemplan,i) {
    this.bloquedoModal=true;///Habilita modal
    this.renderer.removeAttribute(this.guardarModal.nativeElement, "disabled");///Habilita boton de guardas
      this.accion="u";/// u de update
      this.planificacionDetalleModel =Itemplan;
      this.index=i;
    }
    guardar(form: NgForm){

        this.planificacionDetalleModel.cod_plan=this.planificacionCabeceraModel.cod_plan;

         this.GuardarDetalle();


      }

  /*  GenerarCodigo(){

          this._PlanificacionServices.GeneraCodigo().subscribe(
               response=>{

                  this.planificacionCabeceraModel.cod_plan=response;
                  this.planificacionDetalleModel.cod_plan=this.planificacionCabeceraModel.cod_plan;
                   console.log(this.planificacionCabeceraModel);
                    this.planificacionCabeceraModel.estado ="A";
                  this._PlanificacionServices.InsertCabecera(this.planificacionCabeceraModel).subscribe(
                             response=>{},
                             error=>{
                                  swal("Opss... !", "Algo salio mal, vuelve intertar porfavor :(", "error");
                               console.log(`Error al inserta cabecera ${error}`);
                             });
                 });
        }*/

    GuardarDetalle(){
      this._PlanificacionServices.InsertDetalle(this.planificacionDetalleModel).subscribe(
                     response=>{
                                 if(this.accion==="u")
                                 {
                                       this.ConsultaAdmin();
                                    this.resetForm();
                                     swal("Planificación", "Detalle de Planificación Actulizado :)!", "success");//warning
                                 }
                                 else{

                                       this.ConsultaAdmin();
                                     this.resetForm();
                                        swal("Planificación", "Detalle de Planificación Guardado :)!", "success");//warning

                                 }

                     },
                     error=>{
                         swal("Opss... !", "Algo salio mal, vuelve intertar porfavor :(", "error");
                              console.log(error);
                        }
                  );
    }


    insertaCabcera(GuardTo=false){

        if(this.planificacionCabeceraModel.unidad===0)
        {
          this.renderer.setAttribute(this.guardarModal.nativeElement, "disabled", "true");//Desabilita
        }
        else
        {
          this.planificacionCabeceraModel.fecha_ini =this.fechain;
          this.planificacionCabeceraModel.fecha_fin =this.fechafin;

                ///habilita la pnatalla para ingresar los detalles
                this.bloquedoModal=true;
                ///Habilita boton de guardas
                this.renderer.removeAttribute(this.guardarModal.nativeElement, "disabled");
                //if(this.planificacionCabeceraModel.cod_plan===0) this.GenerarCodigo();


                     this.planificacionCabeceraModel.estado="A";
                      console.log(this.planificacionCabeceraModel.cod_plan);
                   this._PlanificacionServices.InsertCabecera(this.planificacionCabeceraModel).subscribe(
                              response=>{
                                    console.log(response);
                                     this.planificacionCabeceraModel.cod_plan=response.cod_plan;

                                  if(GuardTo){
                                 swal("Planificación", "Planificacion guardada exitosamente :D !", "success")
                                 };
                              },
                               error=>{
                                  // swal("Opss... !", "Algo salio mal, vuelve intertar porfavor :( plan", "error");
                                 console.log(`Error al inserta cabecera ${error}`);
                               });


          }

     this.resetForm();

    }

      GuardaTodo(){

        if(this.bandera==="A")
          {    if(this._PlanificacionServices.ListDetallePlanAdmin.length>0)
              {
                      this._PlanificacionServices.ListDetallePlanAdmin.map((elemen)=>{
                        elemen.fecha_ini=moment(elemen.fecha_ini).format("YYYY-MM-DD");
                        elemen.fecha_fin=moment(elemen.fecha_fin).format("YYYY-MM-DD");
                        if(elemen.revisado){
                            elemen.usuario_revisor =localStorage.getItem('username')
                        }
                        if(elemen.aprobado){
                            elemen.usuario_aprueba =localStorage.getItem('username')
                        }
                        elemen.cod_profesor =localStorage.getItem('cod_profesor');

                          elemen.fecha_revisado=moment().format('L');

                      })

                      this._PlanificacionServices.InsertCabecera(this._PlanificacionServices.ListDetallePlanAdmin).subscribe(
                                 response=>{
                                  ///   console.log(response.cod_plan);
                                       //this.planificacionCabeceraModel.cod_plan=response.cod_plan;
                                       swal("Planificación", "Cambios Guardados correctamente :)!", "success")
                                 },
                                 error=>{
                                     swal("Opss... !", "Algo salio mal, vuelve intertar porfavor :(", "error");
                                        console.log(error);
                                    }
                              );

                    }
            }
            else
            {
              this.insertaCabcera(true);
            }
      }

      Enviar(i=0){

        if(this.bandera==="P"){
          this.planificacionCabeceraModel.fecha_ini =this.fechain;
          this.planificacionCabeceraModel.fecha_fin =this.fechafin;
        }
         this._PlanificacionServices.SendEmail(
                    (this.bandera==="A")? this._PlanificacionServices.ListDetallePlanAdmin[i]:this.planificacionCabeceraModel
                ).subscribe(
                    response=>{

                          swal("Planificación", response.message, "success")

                          },
                    error=>{
                        swal("Opss... !", "Algo salio mal, vuelve intertar porfavor :(", "error");
                         console.log(error);
                       }
                 );
      }


  resetForm(form?: NgForm) {
              this.accion=null;
              this.index=null;
              if (form != null)
                form.reset();

      this.planificacionDetalleModel= new Planificacion(0,0,'','','','','','','','','');

      }

        DeletePlan(){

      //  console.log(this._PlanificacionServices.ListDetallePlanAdmin);
        swal({
          title: "¿Esta seguro de eliminar?",
          text: "Al hacer click en Ok se eliminara ¿Esta seguo?",
          icon: "warning",
          buttons: {
               cancel: true,
               confirm: true,
             }
        })
        .then(willDelete => {
          if (willDelete) {

              this._PlanificacionServices.deletePlan(this.planificacionCabeceraModel).subscribe(
                          response=>{
                          swal("Planificación", "La Planificación ha sido eliminada", "success")
                            this.ConsultaAdmin();
                          },
                          error=>{
                      swal("Opss... !", "Algo salio mal, vuelve intertar porfavor :(", "error");
                            console.log(error);
                          });
          }
        });
        }


      ConsultaPlanes(item){
        this.fechain  =moment(item.fecha_ini).format("YYYY-MM-DD");
        this.fechafin  =moment(item.fecha_fin).format("YYYY-MM-DD");
        this.ConsultaAdmin();
      }

  }
