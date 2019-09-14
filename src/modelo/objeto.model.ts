import { ResumenArticulo, AbcOperaciones, PagPago } from "./tabla.model";

export class AccesoRequest {
    constructor(public usuario:string,
                public contrasenia:string,
                public appName:string,
                public appKey:string,
                public dispositivos:string) {}
}

export class AccesoResponse {
    constructor(public nombreUsuario:string,
                public nombreAmbiente:string,
                public fechaInicioCiclo:Date,
                public token:string,
                public respuesta:boolean,
                public mensaje:string,
                public tipo:string) {}
}

export interface ServResponse {
    respuesta:boolean
    mensaje:string
}

export class ServListaResponse {
    constructor(public lista:ResumenArticulo[],
                public respuesta:boolean,
                public mensaje:string) {}
}

export class ServObtenerResponse {
    public articulo:ObjetoArticulo = new ObjetoArticulo()
    public respuesta:boolean
    public mensaje:string
    constructor() {}
}


export class ServPatron {
    public patron:string
    constructor() {}
}

export class ArticuloRequest {
    public objetoArticulo:ObjetoArticulo = new ObjetoArticulo() 
    constructor() {
    }
    getReset() {
        this.objetoArticulo.codigo = null;
        this.objetoArticulo.nombre = null;
        this.objetoArticulo.descripcion = null
        this.objetoArticulo.precioKilo = null
        this.objetoArticulo.peso = null
        this.objetoArticulo.precioZonaLibre = null
        this.objetoArticulo.porcentajeGasto = null
        this.objetoArticulo.precioCompra = null
        this.objetoArticulo.precioVenta = null
        this.objetoArticulo.precioMercado = null
    }
}

export class ObjetoArticulo {
    public codigo:string
    public nombre:string
    public descripcion:string
    public precioKilo:number
    public peso:number
    public precioZonaLibre:number
    public porcentajeGasto:number
    public precioCompra:number
    public precioVenta:number
    public precioMercado:number
    constructor(){
    }
}

export class ExistenciaResponseList {
    constructor(public list:ResumenExistencia[],
                public respuesta:boolean,
                public mensaje:string){}
}

export class ResumenExistencia {
    constructor(public nombreAmbiente:string,
                public codigoAmbiente:string,
                public cantidad:number,
                public propio:number){}

}


export class TransaccionResponseInit {
    constructor(public nroMovimiento:number,
                public fechaMovimiento:string,
                public respuesta:boolean,
                public mensaje:string){}
}

export class TransaccionRequest {
    public transaccionObjeto:TransaccionObjeto = new TransaccionObjeto()
    constructor() {}
    getReset() {
        this.transaccionObjeto.nombreUsuario = null
        this.transaccionObjeto.id = null
        this.transaccionObjeto.fechaMovimiento = null
        this.transaccionObjeto.nroMovimiento = null
        this.transaccionObjeto.codigo = null
        this.transaccionObjeto.observacion = ""
        this.transaccionObjeto.lista = new Array()
        this.transaccionObjeto.precio = null
        this.transaccionObjeto.cantidad = null
    }
}

export class TransaccionObjeto {
    public nombreUsuario:string = null    // Auxiliar para la descripcion

    public id:string = null
    public fechaMovimiento:string = null
    public nroMovimiento:number = null
    public codigo:string = null
    public observacion:string = ""
    public precio:number = null     //nuevo a configurar
    public cantidad:number = null   //nuevo a configurar
    public lista:TransaccionDetalle[] = new Array()
    constructor() {}
}

export class TransaccionDetalle {
    public id:string
    public codigoArticulo:string
    public cantidad:number
    public precio:number
    public observacion:string
    constructor() {}
}

export class TransaccionResponse {
    constructor(public transaccionObjeto:TransaccionObjeto,
                public respuesta:boolean,
                public mensaje:string) {}
}

export class TransaccionResponseList { 
    public list:TransaccionObjeto[] = new Array()
    public respuesta:boolean 
    public mensaje:string
    constructor() {}
}

export class UsuarioRequest {
    public codigo:string
    public nombre:string
    public direccion:string
    public telefono
    constructor(){}
}

export class UsuarioResponseMin { 
    constructor(public codigo:string,
                public nombre:string,
                public respuesta:boolean,
                public mensaje:string) {}
}

export class UsuarioResponseList { 
    constructor(public list:UsuarioResponseMin[],
                public respuesta:boolean,
                public mensaje:string ) {}
}

export class ArticuloResponseMin { 
    public cantidad:number = null    //auxiliar para usar cantidad
    public codigo:string = null
    public nombre:string = null
    public precio:number = null
    constructor() {}

    getReset() { 
        this.cantidad = null    //auxiliar para usar cantidad
        this.codigo = null
        this.nombre = null
        this.precio = null
    }
}

export class DiscoResponse {
    constructor(public ruta:string = null,
                public nombre:string = null,
                public list:AbcOperaciones[],
                public documento:string,
                public respuesta:boolean,
                public mensaje:string) {}
}

export class PagoResponse {
    constructor(public list:PagPago[],
                public respuesta:boolean,
                public mensaje:string){}
}

export class SaldoResponse {
    public porPagar:number
    public PagosRegistrados:number
    public respuesta:boolean
    public mensaje:string
    constructor(){}
}