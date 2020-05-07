import { Injectable } from "@angular/core";
import { UtilitarioUtils } from "./utilitario.utils";
import { AlertController } from "ionic-angular";

@Injectable()
export class MensajeUtils {

    constructor(private utilitarioUtils:UtilitarioUtils,
                private alertCtrl:AlertController) {}

    /**
     * Valida si una operacion fue exitosa mostrando un mensaje
     * @param data Contiene los datos para validar
     * @param next componente/html al cual realizar asignar el focus
     */
    getValidarRespuesta( data: any, next:any ) {
        let parcial:DatosComunes = data
        if( parcial.respuesta ) {
            if ( data.mensaje == null ) {
                this.utilitarioUtils.onSaltoNext(next)
            } else {
                this.utilitarioUtils.onAlertMensaje(this.alertCtrl, next, 'Confirmacion', 'Ejecucion completada. ' + (data.mensaje == null?'':data.mensaje))
            }
        } else {
            this.utilitarioUtils.onAlertMensaje(this.alertCtrl, next, 'Alerta', data.mensaje)
        }
        return parcial.respuesta;
    }
    /**
     * Valida si una operacion fue exitosa mostrando un mensaje
     * @param data Contiene los datos para validar
     * @param next componente/html al cual realizar asignar el focus
     */
    getValidarRespuestaSinMsgConfirm( data: any, next:any ) {
      let parcial:DatosComunes = data
      if( parcial.respuesta ) {
        this.utilitarioUtils.onSaltoNext(next)
      } else {
          this.utilitarioUtils.onAlertMensaje(this.alertCtrl, next, 'Alerta', data.mensaje)
      }
      return parcial.respuesta;
  }

    /**
     * Valida si una operacion fue exitosa mostrando un mensaje para el control
     * Nota : Se utiliza tanto la respuesta(true/false) como el mensaje para retornar un boolean
     * Cuando sea true sin mensaje, existe y recupera la data
     * Cuando sea true con mensaje, no existe y puede usarse ese nro
     * Cuando sea false, no se continua sea porque existe y esta dado de baja, o algun error
     * @param data Contiene los datos para validar
     * @param next componente/html al cual realizar asignar el focus
     */
    getValidarRespuestaQuest( data: any,present:any, next:any ) {
        let parcial:DatosComunes = data
        if( parcial.respuesta ) {
            if(data.mensaje != null) {
                this.utilitarioUtils.onAlertMensaje(this.alertCtrl, next, 'Advertencia', data.mensaje)
            }
        } else {
            this.utilitarioUtils.onAlertMensaje(this.alertCtrl, present, 'Alerta', data.mensaje)
        }
        return parcial.respuesta && data.mensaje == null;
    }

    getValidarRespuestaSinMsgOk( data: any,present:any, next:any ) {
        let parcial:DatosComunes = data
        if( !parcial.respuesta )
            this.utilitarioUtils.onAlertMensaje(this.alertCtrl, present, 'Alerta', data.mensaje)

        return parcial.respuesta && data.mensaje == null;
    }

    /**
     * Validador, aun en desarrollo para definir y mostrar algun mensaje
     * y no afecte al next
     * @param data
     */
    getValidarRespuestaSinMensaje( data: any ) {
        let parcial:DatosComunes = data
        if( !parcial.respuesta ) {
            console.log("Error de respuesta de la base : " + parcial.mensaje)
        }
        return parcial.respuesta;
    }
}

export interface DatosComunes {
    respuesta:boolean
    mensaje:string
}
