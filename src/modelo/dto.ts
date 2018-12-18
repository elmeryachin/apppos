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
    B       :   DtoDetalle
    C       :   DtoDetalle
    D       :   DtoDetalle
}

export interface DtoDetalle { 
    list        :   string
    titulo      :   string
    nProcesar   :   string
    procesar    :   string
    questDif    :   string
    ver         :   boolean
}