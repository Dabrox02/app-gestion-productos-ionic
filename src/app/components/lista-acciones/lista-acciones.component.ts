import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';
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
  constructor(private navCtrl: IonNav) {
    addIcons({ createOutline });
  }

  ngOnInit() { }

  showOperacion() {
    this.navCtrl.push(OperacionProductoPage);
  }

}
