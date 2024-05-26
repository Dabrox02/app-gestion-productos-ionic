import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet, IonNav } from '@ionic/angular/standalone';
import { HomePage } from './pages/home/home.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonNav, IonApp, IonRouterOutlet],
})
export class AppComponent {
  homePage = HomePage;
  constructor() { }
}
