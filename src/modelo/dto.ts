export interface DtoTransaccion {
    enabled :   boolean
    titulo  :   string
    guardar :   boolean
    nuevo   :   boolean
    eliminar:   boolean
    imprimir:   boolean
    init    :   string
    add     :   string
    update  :   string
    delete  :   string
    quest   :   string

    tipoE   :   string
    listE   :   string
    questE  :   string

    vMonto  :   boolean     // Si se debe validar el monto,( revisar si se mantiene o se quita)

    conCredito:   boolean     // Para mostrar el componente de saldo y registrar pagos.
    pagoDia :   string
    pagoDel :   string
    saldo   :   string
    listaPag:   string

    usuario :   string
    B       :   DtoDetalle
    C       :   DtoDetalle
    D       :   DtoDetalle
}

export interface DtoDetalle {
    list        :   string
    titulo      :   string
    mProcesar   :   number  //Mostrar boton procesar pantalla (2), en todos (0)
    nProcesar   :   string  //si es null oculta el boton que "procesa la confirmacion normal" (es un cambio de estado en la base de datos)
    procesar    :   string  //Contiene el servicio que se ejecutara
    reporte     :   string
    questDif    :   string
    ver         :   boolean
    agrupa      :   string  // Muestra un boton llamado agrupar, agrupa todos los registros por cliente generando otros registros.
}

export interface ResponseReporte {
    reporte     :   any
    respuesta   :   boolean
    mensaje     :   string
}
