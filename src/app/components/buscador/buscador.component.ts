import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class BuscadorComponent {
  @Output() eventEmitBuscador: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    addIcons({ searchOutline })
  }

  onChangeBuscador(e: Event) {
    this.eventEmitBuscador.emit((e.target as HTMLInputElement).value);
  }

}
