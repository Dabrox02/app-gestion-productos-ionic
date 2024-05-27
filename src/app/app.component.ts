import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonNav } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonNav, IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() { }
}
