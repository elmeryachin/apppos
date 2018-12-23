export interface DtoTransaccion {
    enabled :   boolean
    titulo  :   string
    init    :   string
    add     :   string
    update  :   string
    delete  :   string
    quest   :   string

    tipoE   :   string
    listE   :   string
    questE  :   string

    vMonto  :   boolean
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