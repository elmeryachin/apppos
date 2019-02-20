export interface ResumenArticulo {
    codigo:string
    nombre:string
    descripcion:string
}

export interface AbcOperaciones {

    id:number
    tipo:string
    url:string
    json:string
    token:string
    proceso:string
    fecha:Date
    codigoAmbiente:string
    operador:string

}
