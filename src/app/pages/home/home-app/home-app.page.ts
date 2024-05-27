import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRouterOutlet, IonFooter, IonSpinner, IonItem, IonButton, IonButtons, IonIcon } from '@ionic/angular/standalone';
import { FirebaseFirestoreService } from 'src/app/services/firebase-firestore.service';
import { BuscadorComponent } from "../../../components/buscador/buscador.component";
import { ListaProductosComponent } from "../../../components/lista-productos/lista-productos.component";
import { ListaAccionesComponent } from "../../../components/lista-acciones/lista-acciones.component";
import { addIcons } from 'ionicons';
import { logOut } from 'ionicons/icons';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-app',
  templateUrl: './home-app.page.html',
  styleUrls: ['./home-app.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButtons, IonButton, IonSpinner, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, BuscadorComponent, IonRouterOutlet, IonFooter, ListaProductosComponent, ListaAccionesComponent]
})
export class HomeAppPage implements OnInit {
  productos!: any[];
  productoBuscado: string = "";
  loading: boolean = true;

  constructor(private firebaseService: FirebaseFirestoreService, private authService: FirebaseAuthService, private router: Router) {
    addIcons({ logOut });
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.firebaseService.getAllProducts().subscribe({
      next: (data) => {
        this.productos = data;
        console.log(data);
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

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl("/loading-app");
    });
  }

}
