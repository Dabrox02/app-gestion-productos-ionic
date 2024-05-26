import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class BuscadorComponent {
  @Output() eventEmitBuscador: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onChangeBuscador(e: Event) {
    this.eventEmitBuscador.emit((e.target as HTMLInputElement).value);
  }

}
