import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from 'src/app/services/firebase-auth.service';
import { AlertController } from '@ionic/angular';
import { IonButton, IonIcon } from "@ionic/angular/standalone";

@Component({
  standalone: true,
  selector: 'app-button-provider',
  templateUrl: './button-provider.component.html',
  styleUrls: ['./button-provider.component.scss'],
  imports: [IonIcon, IonButton]
})
export class ButtonProviderComponent {

  constructor(private authService: FirebaseAuthService, private router: Router, private alertController: AlertController) { }

  providerAction(provider: string) {
    if (provider === 'google') {
      this.signUpWithGoogle();
    }
  }

  async signUpWithGoogle() {
    try {
      this.authService.signInWithGoogleProvider().subscribe({
        next: (res) => {
          this.router.navigateByUrl("/");
        },
        error: (err) => {
          this.showAlert("Error al iniciar Sesion");
        }
      });
    } catch (error) {
      console.log(error);
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
