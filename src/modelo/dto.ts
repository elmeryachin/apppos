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
    B       :   DtoDetalle
    C       :   DtoDetalle
    D       :   DtoDetalle
}

export interface DtoDetalle { 
    list        :   string
    titulo      :   string
    mProcesar   :   number  //Mostrar en pantalla (1), pantalla (2), en todos (0)
    nProcesar   :   string
    procesar    :   string
    questDif    :   string
    ver         :   boolean
}