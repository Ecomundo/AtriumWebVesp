export class ModelLeccionarioDocente{
   constructor(
    public cod_leccionario :number,
    public cod_emp    :number,
    public cod_per   :number,
    public let_per    :string,
    public cod_curso  :number,
    public cod_paralelo :number,
    public cod_mat  :number,
    public unidad   :number,
    public des_unidad :string,
    public fecha    :string,
    public usuario :string,
    public firmado   :boolean,
    public destrezas  :string,
    public tareas  :string,
    public observaciones  :string,
    public cod_hora    : number,
    public des_hora  : string,
    public cod_profesor: number,
    public estado : string,
    public observaciones_coordinador:string,
    public observaciones_inspector :string,
    public fecha_coordinador :string,
    public fecha_inspector :string,
    public usuario_coordinador :string,
    public usuario_inspector :string
  ){}
  }
