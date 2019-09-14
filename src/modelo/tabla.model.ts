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

export interface PagPago {
    id:string
    idTransaccion:string
    fecha:Date
    monto:number
}