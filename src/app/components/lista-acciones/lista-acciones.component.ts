import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { arrowUpOutline } from 'ionicons/icons';

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
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    }
  ];

  constructor() {
    addIcons({ arrowUpOutline });
  }

  ngOnInit() { }

}
