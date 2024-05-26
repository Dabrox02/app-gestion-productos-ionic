import { Component, Input } from '@angular/core';
import { Producto } from 'src/app/types/producto.interface';
import { IonAccordion, IonItem, IonLabel, IonBadge, IonList, IonButton, IonNav, IonAlert } from '@ionic/angular/standalone';
import { Timestamp } from '@angular/fire/firestore';
import { CurrencyPipePipe } from "../../../utils/currency-pipe.pipe";
import { OperacionProductoPage } from 'src/app/pages/operacion-producto/operacion-producto.page';
import { FirebaseFirestoreService } from 'src/app/services/firebase-firestore.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
  standalone: true,
  imports: [IonAlert, IonButton, IonList, IonBadge, IonLabel, IonItem, IonAccordion, CurrencyPipePipe]
})
export class ProductoComponent {
  @Input() producto!: Producto;
  alertButtons = [{
    text: "Confirmar",
    role: "confirm",
    handler: () => {
      this.deleteProduct();
    }
  },
  {
    text: 'Cancelar',
    role: 'cancel'
  },
  ];

  constructor(private navCtrl: IonNav, private firebaseService: FirebaseFirestoreService) { }

  formatDate(timeStamp: Timestamp): string {
    if (timeStamp) {
      const date = timeStamp.toDate();
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };
      return new Intl.DateTimeFormat('es-ES', options).format(date);
    }
    return "";
  }

  showUpdateProduct() {
    this.navCtrl.push(OperacionProductoPage, {
      operacion: "Editar Producto",
      idProducto: this.producto.id,
      producto: this.producto
    });
  }

  deleteProduct() {
    this.firebaseService.deleteProduct(this.producto.id);
  }
}
