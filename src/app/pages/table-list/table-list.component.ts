import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { ModelMateriasDocentes }  from '../../models/modelMaterias'
import { MateriasDocenteService } from '../../services/materiasDocentes.services'
import { saveAs } from 'file-saver/FileSaver';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
//import  swal from 'sweetalert';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers :[MateriasDocenteService,DatePipe]
})
export class TableListComponent implements OnInit {
  DatoPDF: Array<any>;
  faltasAtraso: Array<any>;
  faltas: Array<any>;
  visible=true;
  Cabecera:Array<any>;
  nombre:string;
  fecha:string;
  codigoPeriodo:string;
  letPeriodo:string;
  user:string;
  AlumnosCurso:Array<any>;
  bandera:string;
  codProfesor:string;
  unidad:number;
  fecha_ini:string;
  fechafin:string;
  detallesMaterias:Array<any>;
   swal: SweetAlert = _swal as any;
  ////


  constructor(private _MateriasDocentesServices: MateriasDocenteService,  private datePipe: DatePipe,) {


  }

  ngOnInit() {
     this.fecha =moment().format('L');   //
     this.fecha_ini=this.datePipe.transform(new Date(), 'yyyy-MM-dd');
     this.fechafin=this.datePipe.transform(new Date(), 'yyyy-MM-dd');

     this._MateriasDocentesServices.MateriasDocentes();
     this._MateriasDocentesServices.UnidadesDocentes();
     this.nombre=localStorage.getItem('nombre');
     this.codigoPeriodo= localStorage.getItem('cod_per'),
     this.letPeriodo= localStorage.getItem('let_per');
     this.user=localStorage.getItem('username');
     this.bandera=localStorage.getItem('bandera');
     this.codProfesor=localStorage.getItem('cod_profesor')


  }

      onSubmiLeccionario(){
       let Tipofalta=0 , nombres=[];
            if(this.bandera ==="A")
            {
               this._MateriasDocentesServices.AlumnCursosList.map((elemen)=>{
                    if(elemen.tipo_falta==0){

                    //  alert(`Debe selecionar un tipo de falta al alumno: ${elemen.nombre}`)
                        nombres.push(elemen.nombre)
                      Tipofalta++;
                    }
               })

               if(Tipofalta===0) this.GuardaFaltas();
               else    swal(`Debe selecionar un tipo de falta a los siguientes alumnos: ${nombres}`,"", "warning")//
            }
          else{
              this.GuardaFaltas();
          }
      }

        GuardaFaltas(){
          this.faltasAtraso=this._MateriasDocentesServices.AlumnCursosList
          for (let i in this.faltasAtraso) {
             this.faltasAtraso[i].cod_per =  this.codigoPeriodo;
             this.faltasAtraso[i].let_per =  this.letPeriodo;
             this.faltasAtraso[i].cod_curso =  this.Cabecera[0].codCurso;
             this.faltasAtraso[i].cod_paralelo =  this.Cabecera[0].codParalelo;
             this.faltasAtraso[i].cod_materia =  this.Cabecera[0].codMateria;
             this.faltasAtraso[i].unidad =     this.AlumnosCurso[0].unidad;
             this.faltasAtraso[i].fecha =      this.fecha;
             this.faltasAtraso[i].cod_profesor=this.AlumnosCurso[0].cod_profesor;
             this.faltasAtraso[i].usuario=this.user.trim();
             this.faltasAtraso[i].justifica= (this.faltasAtraso[i].justifica)? 1:0 ;
             this.faltasAtraso[i].asistencia= (this.faltasAtraso[i].asistencia)? 1:0 ;
          }


          this._MateriasDocentesServices.InsFaltasAtrasos(this.faltasAtraso).subscribe(
               response=>{
                     //alert("Guardado exitosamente");

                      swal("Asistencias", "Guardado exitosamente!", "success");
               },
               error=>{
                        console.log(error);
               }
            );
        }

  Cambiamodal(i){
      if(this.bandera ==="A"){
        this.faltas =[  { name: "Falta", valor:1},
                        { name: "Atraso", valor:2},
                        { name: "Retirado",valor:3},
                        { name: "Abandono", valor:4}];

      }
      else{
        this.faltas =[  { name: "Falta", valor:1},
                        { name: "Atraso", valor:2},
                        { name: "Retirado",valor:3},
                        { name: "Abandono", valor:4},
                        { name: "N/A", valor:5}];
      }



   this.Cabecera=[{
                    materia:i.Dm,
                    tipo:i.Dn,
                    curso:i.Dca,
                    cursoCompleto:i.Dc,
                    paralelo:i.Dp,
                    codMateria:i.cod_materia,
                    codCurso:i.cod_curso,
                    codParalelo:i.cod_paralelo,
                    nivel:i.nivel,
                    inspector:i.inspector,
               }];

    this.visible=false;
  }
ConsultarAlumnos(unidad:number) : void{
 this.unidad=unidad;

   this.AlumnosCurso=[{
                      cod_per: this.codigoPeriodo,///this.codigoPeriodo,<---------------------------------canmbiar
                      let_per: this.letPeriodo,
                      cod_curso: this.Cabecera[0].codCurso,
                      cod_paralelo: this.Cabecera[0].codParalelo,
                      cod_materia: this.Cabecera[0].codMateria,
                      unidad: unidad,
                      fecha:  this.fecha,
                      cod_profesor:  this.codProfesor
                    }]


   this._MateriasDocentesServices.AlumnosCurso(this.AlumnosCurso[0]);


}


DetalleAlum(codAlumno){


  const detalle = {
        cod_per:   this.codigoPeriodo,
        let_per: this.letPeriodo,
        cod_alum: codAlumno,
        cod_curso: this.Cabecera[0].codCurso[0],
        cod_paralelo:  this.Cabecera[0].codParalelo,
        cod_materia: this.Cabecera[0].codMateria,
        unidad:   this.unidad,
        fecha: this.fecha,
       cod_profesor:  this.codProfesor
    }


  this._MateriasDocentesServices.DetalleFalta(detalle)
            .subscribe(response => {

                  this.detallesMaterias = response;

                ////llenar arreglo
            },
            error=>{
                var erroMessage= <any> error;
                 if(erroMessage !=null){
                   var body =JSON.parse(error);
                  // this.aletErrorRegister=body.error;
                    console.log(error);
                 }
            })
  }


checkAll(ev) {
  if(this._MateriasDocentesServices.AlumnCursosList[ev].asistencia){
    this._MateriasDocentesServices.AlumnCursosList[ev].tipo_falta=0;
  }
  else{
    this._MateriasDocentesServices.AlumnCursosList[ev].tipo_falta=1;
  }


 }



  Atras()
  {
    this.Cabecera=null;
    this.visible=true;
    this._MateriasDocentesServices.AlumnCursosList=[];
     this.fecha =moment().format('L');   //
  }

  GeneraPDF(){
  //  this.fechafin  =this.datePipe.transform(this.fechafin, 'yyyy-MM-dd');

    this.DatoPDF=[{
                       cod_per: this.codigoPeriodo,///this.codigoPeriodo,<---------------------------------canmbiar
                       let_per: this.letPeriodo,
                       cod_curso:  this.Cabecera[0].codCurso,
                       cod_paralelo: this.Cabecera[0].codParalelo,
                       cod_materia: this.Cabecera[0].codMateria,
                       unidad: this.unidad,
                       fecha_ini:  this.fecha_ini,
                       cod_profesor:  this.codProfesor,
                       fecha_fin: this.fechafin
                     }]


  this._MateriasDocentesServices.GeneraPDFaltas(this.DatoPDF).subscribe(
        (res) => {
            saveAs(res, `Asist_${this.Cabecera[0].curso}_${this.Cabecera[0].paralelo}.pdf`); //if you want to save it - you need file-saver for this : https://www.npmjs.com/package/file-saver

    /*    var fileURL = URL.createObjectURL(res);
        window.open(fileURL);*/

        }
    );
  }

}
