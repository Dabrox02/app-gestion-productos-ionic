import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRouterOutlet, IonFooter, IonSpinner, IonItem } from '@ionic/angular/standalone';
import { FirebaseFirestoreService } from 'src/app/services/firebase-firestore.service';
import { BuscadorComponent } from "../../components/buscador/buscador.component";
import { ListaAccionesComponent } from "../../components/lista-acciones/lista-acciones.component";
import { ListaProductosComponent } from "../../components/lista-productos/lista-productos.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonItem, IonSpinner, IonFooter, IonRouterOutlet, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, BuscadorComponent, ListaAccionesComponent, ListaProductosComponent]
})
export class HomePage implements OnInit {

  productos!: any[];
  productoBuscado: string = "";
  loading: boolean = true;

  constructor(private firebaseService: FirebaseFirestoreService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.firebaseService.getAllProducts().subscribe({
      next: (data) => {
        this.productos = data;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  buscarProducto($event: string) {
    this.productoBuscado = $event;
  }

}