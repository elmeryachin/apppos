import { NgModule } from '@angular/core';
import { QuestComponent } from './quest/quest';
import { InventarioComponent } from './inventario/inventario';
import { EntradaComponent } from './entrada/entrada';
import { UsuarioComponent } from './usuario/usuario';

@NgModule({
	declarations: [QuestComponent,
    InventarioComponent,
    EntradaComponent,
    UsuarioComponent],
	imports: [],
	exports: [QuestComponent,
    InventarioComponent,
    EntradaComponent,
    UsuarioComponent]
})
export class ComponentsModule {}
