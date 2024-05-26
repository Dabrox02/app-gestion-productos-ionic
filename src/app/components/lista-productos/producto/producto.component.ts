import { Component, Input, OnInit } from '@angular/core';
import { Producto } from 'src/app/types/producto.interface';
import { IonAccordion, IonItem, IonLabel, IonBadge, IonList, IonButton } from "@ionic/angular/standalone";
import { Timestamp } from '@angular/fire/firestore';
import { CurrencyPipePipe } from "../../../utils/currency-pipe.pipe";

@Component({
    selector: 'app-producto',
    templateUrl: './producto.component.html',
    styleUrls: ['./producto.component.scss'],
    standalone: true,
    imports: [IonButton, IonList, IonBadge, IonLabel, IonItem, IonAccordion, CurrencyPipePipe]
})
export class ProductoComponent {

  @Input() producto!: Producto;

  constructor() { }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }
}
