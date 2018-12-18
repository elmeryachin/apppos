import { NgModule } from '@angular/core';
import { QuestComponent } from './quest/quest';
import { InventarioComponent } from './inventario/inventario';
import { EntradaComponent } from './entrada/entrada';

@NgModule({
	declarations: [QuestComponent,
    InventarioComponent,
    EntradaComponent],
	imports: [],
	exports: [QuestComponent,
    InventarioComponent,
    EntradaComponent]
})
export class ComponentsModule {}
