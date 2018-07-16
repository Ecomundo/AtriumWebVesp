export class PlanificacionCabeceraModel{
  constructor(
            public  cod_plan:  number,
            public  cod_emp:    number,
            public  cod_per: string,
            public  let_per:   string,
            public  cod_curso:  number,
            public  cod_paralelo: number,
            public  cod_mat:      number,
            public  cod_profesor:  string,
            public  unidad: number,
            public  t_unidad: string,
            public  fecha_ini: string,
            public  fecha_fin: string,
            public  usuario: string,
            public  enviado: number,
            public  necesidad_educativa: string,
            public  adaptacion_aplicada: string,
            public  observaciones: string,
            public  revisado: boolean,
            public  fecha_revisado: string,
            public  usuario_revisor: string,
            public  aprobado: boolean,
            public  fecha_aprobado: string,
            public  usuario_aprueba: string,
            public cod_paralelo_duplicado:number,
            public  estado: string

            ){

            }
    }
