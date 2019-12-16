import { AlertController } from "ionic-angular";

export class UtilitarioUtils {
    
    constructor() {}

    /**
     * Condiciona para que los se ingresen numeros enteros
     * @param event valor del evento ejecutado
     */
    public formatInt(event: any) {
      if(event.charCode >= 48 && event.charCode <= 57) {
        return true
      }
      return false;
    }
  
    /**
     * controla el numero de decimales para un numer  
     * @param event Objeto componente/html del que se recupera su valor
     * @param len el numero de decimales permitido
     */
    onFormatMoneda(event:any, len:number):boolean {
        var value = event.value + ''
        var array = value.split('.')
        if( array.length == 2 ) {
          var decimal = array[1];
          if( decimal.length >= len ) {
            return false
          }
        }
        return true
    }

    /**
     * Asigna un formato a un valor enviado y se retorna el mismo
     * @param number El valor a reformatear
     * @param precision Numero de decimales dentro del number
     */
    onReformatMoneda(number, precision) {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    }

    /**
     * Alerta para preguntar si se desea continuar para eliminar un objeto. 
     * @param alertCtrl Objeto que crea el alerta
     * @param _objeto referencia a un componente/page
     * @param next referenia a un componente/html para realizar un focus
     * @param titulo Asigna un mensaje la cabecera
     * @param mensaje Asigna un mensaje en el cuerpo
     */
    onAlertEliminar(alertCtrl:AlertController, _objeto:any, next, titulo:string, mensaje:string) {
        let confirm = alertCtrl.create()
        confirm.setTitle(titulo)
        confirm.setMessage(mensaje)
        confirm.addButton('Cancelar')
        confirm.addButton({
          text: 'Aceptar',
          handler: data => _objeto.onEliminar(next)
        })
       
        confirm.present();
    }

    /**
     * Alerta para preguntar si se desea continuar para guardar un objeto. 
     * @param alertCtrl Objeto que crea el alerta
     * @param _objeto referencia a un componente/page
     * @param next referenia a un componente/html para realizar un focus
     * @param titulo Asigna un mensaje la cabecera
     * @param mensaje Asigna un mensaje en el cuerpo
     */
    onAlertGuardar(alertCtrl:AlertController, _objeto:any, next, titulo:string, mensaje:string) {
      let confirm = alertCtrl.create()
      confirm.setTitle(titulo)
      confirm.setMessage(mensaje)
      confirm.addButton({
        text: 'Aceptar',
        handler: data => _objeto.onGuardar(next)
      })
      confirm.addButton('Cancelar')

      confirm.present();
    }

    /**
     * Alerta para preguntar si se desea continuar para procesar un objeto. 
     * @param alertCtrl Objeto que crea el alerta
     * @param _objeto referencia a un componente/page
     * @param next referenia a un componente/html para realizar un focus
     * @param titulo Asigna un mensaje la cabecera
     * @param mensaje Asigna un mensaje en el cuerpo
     */
    onAlertProcesar(alertCtrl:AlertController, _objeto:any, next, titulo:string, mensaje:string) {
      let confirm = alertCtrl.create()
      confirm.setTitle(titulo)
      confirm.setMessage(mensaje)
      confirm.addButton('Cancelar')
      confirm.addButton({
        text: 'Aceptar',
        handler: data => _objeto.onProcesar(next)
      })
     
      confirm.present();
    }

    /**
     * Alerta para preguntar si se desea continuar para agrupar todos los registros en pantalla.
     * @param alertCtrl Objeto que crea el alerta
     * @param _objeto referencia a un componente/page
     * @param next referenia a un componente/html para realizar un focus
     * @param titulo Asigna un mensaje la cabecera
     * @param mensaje Asigna un mensaje en el cuerpo
     */
    onAlertAgrupar(alertCtrl:AlertController, _objeto:any, next, titulo:string, mensaje:string) {
      let confirm = alertCtrl.create()
      confirm.setTitle(titulo)
      confirm.setMessage(mensaje)
      confirm.addButton('Cancelar')
      confirm.addButton({
        text: 'Aceptar',
        handler: data => _objeto.onAgrupar(next)
      })
     
      confirm.present();
    }

    /**
     * Crea un alert y tras confirmarse llama a un metodo (onLimpiar()) para limpiar  los registros 
     * @param alertCtrl Permite la construccion del alert en pantalla
     * @param _objeto referencia al componente/pagina del que se obtendra un metodo (onLimipiar())
     * @param next es una referencia a un componente/html q se enviara al metodo onLimpiar 
     */
    onAlertLimpiar(alertCtrl:AlertController, _objeto:any, next:any) {
      let confirm = alertCtrl.create()
      confirm.setTitle('Alerta')
      confirm.setMessage('Se limpiara los campos, desea salir sin guardar?')
      confirm.addButton('Cancelar')
      confirm.addButton({
        text: 'Aceptar',
        handler: data => _objeto.onLimpiar(next)
      })
     
      confirm.present();
    }

    /**
     * Un alert que contendra una lista de registro para luego seleccionar uno
     * @param alertCtrl Objeto que construye un alert en pantalla
     * @param _objeto es la referencia a todo el contenido de un componente-page
     * @param next si todo sale bien se realiza next.setFocus()
     * @param list Carga una lista para realizar la seleccion de un registro
     * @param titulo Se mostrara en el alert como cabecera.
     */
    onAlertRadio(alertCtrl:AlertController, _objeto:any, next:any, list:any[], titulo:string ) {
      let alert = alertCtrl.create();
      alert.setTitle(titulo);
      
      for(let i=0; i< list.length; i++) {
        alert.addInput({
          type: 'radio',
          label: list[i].codigo + ' -- ' + list[i].nombre,
          value: list[i].codigo,
          checked:i==0?true:false
        })
      }

      alert.addButton('Cancelar')
      alert.addButton({
        text: 'Seleccionar',
        handler: data => {
          _objeto.getObtener(data, next)
        }
      })

      alert.present();
    }

    /**
     * Muestra un mensaje para indicar al finalizacion del proceso
     * @param alertCtrl Objeto que construye el alert en pantalla
     * @param next a donde se dirigira (next.setFocus()) cerrar esta ventana
     * @param titulo Se mostrara como cabecera del alert
     * @param mensaje Se mostrara en el cuerpo para indicar como le fue a la operacion
     */
    onAlertMensaje(alertCtrl: AlertController, next:any, titulo:string, mensaje:string) {
      const alert = alertCtrl.create()
      alert.setTitle(titulo)
      alert.setMessage(mensaje)
      alert.addButton({
        text: 'Cerrar',
        handler: () => {
          if( next != null) {
            setTimeout( () => next.setFocus(), 350)  
          }
        }
      })
      alert.present();
    }

    onSaltoNext(next:any){
      if(next != null) {
        setTimeout( () => next.setFocus(), 350) 
      }
    }
}