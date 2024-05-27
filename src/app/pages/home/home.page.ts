import { Component } from "@angular/core";
import { HomeAppPage } from "./home-app/home-app.page";
import { IonContent, IonNav } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonNav, IonContent, ]
})
export class HomePage {
  homeAppPage = HomeAppPage;

  constructor() { }

}