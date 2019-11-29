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
import {FileUploadModule} from 'primeng/fileupload';

import { AccesoService,
         ArticuloService,
         StorageService,
         InventarioService,
         TransaccionService,
         DiscoService } from '../providers/servicios.providers';

import {  InventarioComponent,
          EntradaComponent,
          QuestComponent,
          DetalleComponent,
          UsuarioComponent } from '../components/personal.component';

import {  AccesoPage,
          MenuPage,
          ProductoPage,
          APagoPage,
          ATransaccionPage,
          ADetallePage,
          ADiferenciaPage,
          BPedidoPage,
          CEnvioPage,
          DSolicitudPage,
          DiscoMenuPage,
          DSolicitudDestinoPage,
          ERecibidoPage,
          FVentaPage,
          GBorradorPage,
          HAgrupadorPage,
          IEstadoDeCuentasPage,
          DiscoPage,
          ReportesMenuPage,
          InfoPage,
          ReportePage } from '../pages/paginas.page';


@NgModule({
  declarations: [
    MyApp,
    AccesoPage,
    MenuPage,
    ProductoPage,
    APagoPage,
    ATransaccionPage,
    ADetallePage,
    ADiferenciaPage,
    BPedidoPage,
    CEnvioPage,
    DSolicitudPage,
    DSolicitudDestinoPage,
    ERecibidoPage,
    FVentaPage,
    GBorradorPage,
    HAgrupadorPage,
    IEstadoDeCuentasPage,
    DiscoPage,
    ReportesMenuPage,
    DiscoMenuPage,
    InfoPage,
    QuestComponent,
    InventarioComponent,
    EntradaComponent,
    DetalleComponent,
    UsuarioComponent,
    ReportePage
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
    DialogModule,
    FileUploadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AccesoPage,
    MenuPage,
    ProductoPage,
    APagoPage,
    ATransaccionPage,
    ADetallePage,
    ADiferenciaPage,
    BPedidoPage,
    CEnvioPage,


    DSolicitudPage,
    DSolicitudDestinoPage,
    ERecibidoPage,
    FVentaPage,
    GBorradorPage,
    HAgrupadorPage,
    ReportesMenuPage,
    IEstadoDeCuentasPage,
    DiscoPage,
    DiscoMenuPage,
    InfoPage,
    QuestComponent,
    InventarioComponent,
    EntradaComponent,
    DetalleComponent,
    UsuarioComponent,
    ReportePage
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
    DiscoService,
    MensajeUtils,
    UtilitarioUtils
  ]
})
export class AppModule {}
