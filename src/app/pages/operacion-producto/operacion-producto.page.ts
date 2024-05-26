import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-operacion-producto',
  templateUrl: './operacion-producto.page.html',
  styleUrls: ['./operacion-producto.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class OperacionProductoPage implements OnInit {
  @Input() operacion = "Crear Producto";
  @Input() idProducto = "";

  constructor() { }

  ngOnInit() {
    console.log(this.operacion);
    console.log(this.idProducto);
  }

}
