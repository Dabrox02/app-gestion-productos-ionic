import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonInput, IonButton, IonItem, IonCardContent, IonRow, IonGrid, IonCol, IonCard, IonLabel, IonTabButton, IonCardTitle } from '@ionic/angular/standalone';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-loading-app',
  templateUrl: './loading-app.page.html',
  styleUrls: ['./loading-app.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonTabButton, IonLabel, IonCard, IonCol, IonGrid, IonRow, IonCardContent, IonItem, IonButton, IonInput, IonList, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoadingAppPage implements OnInit {
  formValidation: FormGroup = this.formBuilder.group({
    usuario: ['', Validators.compose([Validators.required, Validators.nullValidator, Validators.email])],
    clave: ['', Validators.compose([Validators.required, Validators.nullValidator, Validators.minLength(6)])],
  });;

  constructor(private formBuilder: NonNullableFormBuilder, private authService: FirebaseAuthService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
  }

  ingresarApp() {
    const usuario = this.formValidation.get("usuario")?.value;
    const clave = this.formValidation.get("clave")?.value;

    if (this.formValidation.valid) {
      this.authService.signInWithEmailAndPassword(usuario, clave)
        .subscribe({
          next: (res) => {
            this.formValidation.reset();
            this.router.navigateByUrl("/");
          },
          error: (err) => {
            this.showAlert("Error al iniciar Sesion")
          }
        }
        );
    }
  }

  async showAlert(message: string = "Alerta") {
    const alert = await this.alertController.create({
      header: 'Inicio Sesion',
      message,
      buttons: [{
        text: "Ok",
        handler: () => {
        }
      }],
    });
    await alert.present();
  }

}
