import { DtoTransaccion } from "../modelo/dto";

export const SERVIDOR = "http://localhost:8080"

export const PEDIDO:string = "PATH_PEDIDO"
export const PATH_PEDIDO:DtoTransaccion = {
    enabled :   true,
    titulo  :   'Pedidos',
    guardar :   true,
    nuevo   :   true,
    eliminar:   true,
    imprimir:   true,
    init    :   '/pedido/init',
    add     :   '/pedido/add',
    update  :   '/pedido/update',
    delete  :   '/pedido/delete/',                          //{id}
    quest   :   '/pedido/quest/movimiento/',                //{nro}
    tipoE   :   'PROVEEDOR',
    listE   :   '/pedido/proveedor/list',
    questE  :   '/pedido/proveedor/quest/',                 //{codigo}

    vMonto  :   false,

    B       :   { 
                    titulo      :   'Lista Pedidos',
                    list        :   '/pedido/list', 
                    mProcesar   :   2,
                    nProcesar   :   'Hacer Llegada',
                    procesar    :   '/pedido/llegada/confirmar/',   //{id}
                    questDif    :   null,
                    ver         :   true
                },
    C       :   { 
                    list        :   '/pedido/llegada/list',
                    titulo      :   'Lista Llegadas', 
                    nProcesar   :   'Cancelar Llegada',
                    mProcesar   :   2,
                    procesar    :   '/pedido/llegada/cancelar/',    //{id}
                    questDif    :   null,
                    ver         :   false
                },
    D       :   { 
                    list        :   null, 
                    titulo      :   null,
                    mProcesar   :   null,
                    nProcesar   :   null,
                    procesar    :   null,
                    questDif    :   null,
                    ver         :   false
                }
}
export const ENVIAR:string = "PATH_ENVIAR"
export const PATH_ENVIAR:DtoTransaccion = {
    enabled :   true,
    titulo  :   'Envios',
    guardar :   true,
    nuevo   :   true,
    eliminar:   true,
    imprimir:   true,
    init    :   '/transferencia/envio/init',
    add     :   '/transferencia/envio/add',
    update  :   '/transferencia/envio/update',
    delete  :   '/transferencia/envio/delete/',     //{id}
    quest   :   '/transferencia/envio/quest/movimiento/',                //{nro}  ******** DESARROLLAR ******
    tipoE   :   'AMBIENTE',
    listE   :   '/transferencia/envio/ambiente/list',
    questE  :   '/transferencia/envio/ambiente/quest/',                  //{codigo}
    
    vMonto  :   true,

    B       :   { 
                    list        :   '/transferencia/envio/list',
                    titulo      :   'Lista Envios',
                    mProcesar   :   null,
                    nProcesar   :   null, 
                    procesar    :   null,
                    questDif    :   null,
                    ver         :   true
                },
    C       :   { 
                    list        :   '/transferencia/envio/confirmados/list', 
                    titulo      :   'Lista de Confirmados',
                    mProcesar   :   2,
                    nProcesar   :   'Reconfirmar Envio',
                    procesar    :   '/transferencia/envio/reconfirmar/',        //{id}
                    questDif    :   '/transferencia/envio/diferencia/quest/',    //{id}
                    ver         :   false
                },
    D       :   { 
                    list        :   '/transferencia/envio/reconfirmar/list',
                    titulo      :   'Lista de Reconfirmados',
                    mProcesar   :   2,
                    nProcesar   :   null, 
                    procesar    :   null,
                    questDif    :   null,
                    ver         :   false
                }
}
export const RECIBIR:string = "PATH_RECIBIR"
export const PATH_RECIBIR:DtoTransaccion = {
    enabled :   false,
    titulo  :   'Por Recibir',
    guardar :   false,
    nuevo   :   false,
    eliminar:   false,
    imprimir:   false,
    init    :   null,
    add     :   null,   
    update  :   null,
    delete  :   null,
    quest   :   '/transferencia/recibir/porrecibir/quest/movimiento/',      // {nro}  ******** DESARROLLAR ******
    tipoE   :   'ORIGEN',
    listE   :   '/transferencia/envio/ambiente/list',                    // SE COPIA DE ENVIO POR QUE ES LO MISMO
    questE  :   '/transferencia/envio/ambiente/quest/',                  //{codigo}

    vMonto  :   false,

    B       :   { 
                    list        :   '/transferencia/recibir/porrecibir/list',
                    titulo      :   'Lista Por Recibir',
                    mProcesar   :   0,
                    nProcesar   :   'Confirmar Recepcion',
                    procesar    :   '/transferencia/recibir/confirmar/recepcion/',  //{id}
                    questDif    :   null,
                    ver         :   true
                },
    C       :   { 
                    list        :   '/transferencia/recibir/recibidos/list', 
                    titulo      :   'Lista Recibidos',
                    mProcesar   :   0,
                    nProcesar   :   'Cancelar Recepcion',
                    procesar    :   '/transferencia/recibir/cancelar/recepcion/',   //{id}
                    questDif    :   '/transferencia/envio/diferencia/quest/',       //{id}
                    ver         :   false
                },
    D       :   { 
                    list        :   null,
                    titulo      :   null, 
                    mProcesar   :   null,
                    nProcesar   :   null,
                    procesar    :   null,
                    questDif    :   null,
                    ver         :   false
                }
}
export const SOLICITUD:string = "PATH_SOLICITUD"
export const PATH_SOLICITUD:DtoTransaccion = {
    enabled :   true,
    titulo  :   'Solicitud Manual',
    guardar :   true,
    nuevo   :   true,
    eliminar:   true,
    imprimir:   true,
    init    :   '/transferencia/recibir/solicitud/init',
    add     :   '/transferencia/recibir/solicitud/add',
    update  :   '/transferencia/recibir/solicitud/update',
    delete  :   '/transferencia/recibir/solicitud/delete/',
    quest   :   '/transferencia/recibir/solicitud/quest/movimiento/',       //{nro}
    tipoE   :   'AMBIENTE',
    listE   :   '/transferencia/envio/ambiente/list',                    // SE COPIA DE ENVIO POR QUE ES LO MISMO
    questE  :   '/transferencia/envio/ambiente/quest/',                  //{codigo}

    vMonto  :   true,

    B       :   { 
                    list        :   '/transferencia/recibir/solicitud/list', 
                    titulo      :   'Lista Solicitudes',
                    mProcesar   :   null,
                    nProcesar   :   null,
                    procesar    :   null,
                    questDif    :   null,
                    ver         :   true
                },
    C       :   { 
                    list        :   null,
                    titulo      :   null,
                    mProcesar   :   null,
                    nProcesar   :   null, 
                    procesar    :   null,
                    questDif    :   null,
                    ver         :   false
                },
    D       :   { 
                    list        :   null,
                    titulo      :   null,
                    mProcesar   :   null,
                    nProcesar   :   null, 
                    procesar    :   null,
                    questDif    :   null,
                    ver         :   false
                }
}

export const SOLICITUD_DESTINO:string = "PATH_SOLICITUD_DESTINO"
export const PATH_SOLICITUD_DESTINO:DtoTransaccion = {
    enabled :   true,
    titulo  :   'Destino Solicitudes',
    guardar :   false,
    nuevo   :   false,
    eliminar:   false,
    imprimir:   false,   
    init    :   '/transferencia/recibir/solicitud/init',
    add     :   '/transferencia/recibir/solicitud/add',
    update  :   '/transferencia/recibir/solicitud/update',
    delete  :   '/transferencia/recibir/solicitud/delete/',
    quest   :   '/transferencia/recibir/solicitud/quest/movimiento/',       //{nro}
    tipoE   :   'AMBIENTE',
    listE   :   '/transferencia/envio/ambiente/list',                    // SE COPIA DE ENVIO POR QUE ES LO MISMO
    questE  :   '/transferencia/envio/ambiente/quest/',                  //{codigo}

    vMonto  :   true,

    B       :   { 
                    list        :   '/transferencia/recibir/solicitud/list', 
                    titulo      :   'Lista Solicitudes',
                    mProcesar   :   null,
                    nProcesar   :   null,
                    procesar    :   null,
                    questDif    :   null,
                    ver         :   true
                },
    C       :   { 
                    list        :   null,
                    titulo      :   null,
                    mProcesar   :   null,
                    nProcesar   :   null, 
                    procesar    :   null,
                    questDif    :   null,
                    ver         :   false
                },
    D       :   { 
                    list        :   null,
                    titulo      :   null,
                    mProcesar   :   null,
                    nProcesar   :   null, 
                    procesar    :   null,
                    questDif    :   null,
                    ver         :   false
                }
}

export const VENTA:string = "PATH_VENTA"
export const PATH_VENTA:DtoTransaccion = {
    enabled :   true,
    titulo  :   'Ventas',
    guardar :   true,
    nuevo   :   true,
    eliminar:   true,
    imprimir:   true,
    init    :   '/ventas/init',
    add     :   '/ventas/add',
    update  :   '/ventas/update',
    delete  :   '/ventas/delete/',
    quest   :   '/ventas/quest/movimiento/',
    tipoE   :   'CLIENTE',
    listE   :   '/ventas/cliente/list',
    questE  :   '/ventas/cliente/quest/',
    
    vMonto  :   true,

    B       :   { 
                    list        :   '/ventas/list', 
                    titulo      :   'Lista de Ventas',
                    nProcesar   :   'Confirmar Control Venta',
                    mProcesar   :   2,
                    procesar    :   '/ventas/confirmar/',   
                    questDif    :   null,
                    ver         :   true
                },
    C       :   { 
                    list        :   '/ventas/confirmar/list', 
                    titulo      :   'Lista de Ventas Confirmadas',
                    mProcesar   :   null,
                    nProcesar   :   null,
                    procesar    :   null,
                    questDif    :   null,
                    ver         :   false
                },
    D       :   { 
                    list        :   null,
                    titulo      :   null,
                    mProcesar   :   null,
                    nProcesar   :   null, 
                    procesar    :   null,
                    questDif    :   null,
                    ver         :   false
                }
}