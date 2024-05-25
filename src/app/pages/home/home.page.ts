import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRouterOutlet, IonFooter } from '@ionic/angular/standalone';
import { FirebaseFirestoreService } from 'src/app/services/firebase-firestore.service';
import { BuscadorComponent } from "../../components/buscador/buscador.component";
import { ListaAccionesComponent } from "../../components/lista-acciones/lista-acciones.component";
import { ListaProductosComponent } from "../../components/lista-productos/lista-productos.component";
import { Producto } from '../../types/producto.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonFooter, IonRouterOutlet, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, BuscadorComponent, ListaAccionesComponent, ListaProductosComponent]
})
export class HomePage implements OnInit {

  public productos$!: Observable<any[]>;

  constructor(public firebaseService: FirebaseFirestoreService) { }

  ngOnInit(): void {
    this.productos$ = this.firebaseService.getAllProducts();
  }

}