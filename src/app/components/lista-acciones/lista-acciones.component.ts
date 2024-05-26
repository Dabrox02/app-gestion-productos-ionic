import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowUpOutline } from 'ionicons/icons';
import { IonNav } from '@ionic/angular/standalone';
import { OperacionProductoPage } from 'src/app/pages/operacion-producto/operacion-producto.page';

@Component({
  selector: 'app-lista-acciones',
  templateUrl: './lista-acciones.component.html',
  styleUrls: ['./lista-acciones.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ListaAccionesComponent implements OnInit {
  public actionSheetButtons = [
    {
      text: 'Crear Producto',
      role: 'create',
      data: {
        action: 'create',
      },
      handler: () => {
        this.navCtrl.push(OperacionProductoPage);
      }
    }
  ];

  constructor(private navCtrl: IonNav) {
    addIcons({ arrowUpOutline });
  }

  ngOnInit() { }

}
