import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MensajeUtils } from '../utils/mensaje.utils';
import { UtilitarioUtils } from '../utils/utilitario.utils';
import { MyApp } from './app.component';

// componentes de primefaces
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ChipsModule} from 'primeng/chips';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {ToolbarModule} from 'primeng/toolbar';
import {DialogModule} from 'primeng/dialog';

import { AccesoService, 
         ArticuloService, 
         StorageService, 
         InventarioService, 
         TransaccionService } from '../providers/servicios.providers';

import {  InventarioComponent, 
          EntradaComponent, 
          QuestComponent,
          DetalleComponent } from '../components/personal.component';

import {  AccesoPage, 
          MenuPage,
          ProductoPage,
          ATransaccionPage,
          ADetallePage, 
          ADiferenciaPage,
          BPedidoPage,
          CEnvioPage,
          DSolicitudPage,
          ERecibidoPage,
          FVentaPage } from '../pages/paginas.page';


@NgModule({
  declarations: [
    MyApp,
    AccesoPage,
    MenuPage, 
    ProductoPage,
    ATransaccionPage,
    ADetallePage,
    ADiferenciaPage,
    BPedidoPage,
    CEnvioPage,
    DSolicitudPage,
    ERecibidoPage,
    FVentaPage,
    QuestComponent, 
    InventarioComponent,
    EntradaComponent,
    DetalleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    ChipsModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    DialogModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccesoPage,
    MenuPage, 
    ProductoPage,
    ATransaccionPage,
    ADetallePage,
    ADiferenciaPage,
    BPedidoPage,
    CEnvioPage,
    DSolicitudPage,
    ERecibidoPage,
    FVentaPage,
    QuestComponent, 
    InventarioComponent,
    EntradaComponent,
    DetalleComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccesoService,
    ArticuloService,
    StorageService,
    InventarioService,
    TransaccionService,
    MensajeUtils,
    UtilitarioUtils 
  ]
})
export class AppModule {}
