import { Component, Input, OnInit } from '@angular/core';
import { IonAccordionGroup, IonAccordion, IonItem, IonLabel } from "@ionic/angular/standalone";
import { ProductoComponent } from "./producto/producto.component";

@Component({
    selector: 'app-lista-productos',
    templateUrl: './lista-productos.component.html',
    styleUrls: ['./lista-productos.component.scss'],
    standalone: true,
    imports: [IonLabel, IonAccordion, IonAccordionGroup, IonItem, ProductoComponent]
})
export class ListaProductosComponent implements OnInit {
  @Input() productos!: any[] | null;

  constructor() { }

  ngOnInit() { }

}
