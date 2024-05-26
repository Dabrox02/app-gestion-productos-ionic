import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IonAccordionGroup, IonAccordion, IonItem, IonLabel } from "@ionic/angular/standalone";
import { ProductoComponent } from "./producto/producto.component";
import { provideFirebaseApp } from '@angular/fire/app';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.scss'],
  standalone: true,
  imports: [IonLabel, IonAccordion, IonAccordionGroup, IonItem, ProductoComponent]
})
export class ListaProductosComponent implements OnChanges {
  @Input() productos!: any[];
  @Input() productoBuscado: string = "";
  productosRender: any[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productoBuscado']) {
      const nuevoValor = changes['productoBuscado'].currentValue;
      const encontrados = this.getProductosBuscados(nuevoValor);
      this.productosRender = encontrados;
    }
  }

  getProductosBuscados(value: string) {
    if (value.trim() === "") {
      return this.productos;
    }
    const productosCoincidentes = this.productos.filter(el => {
      return el.producto.toLowerCase().includes(value.toLowerCase()) || el.unidad.toLowerCase().includes(value.toLowerCase());
    });
    return productosCoincidentes;
  }

}
