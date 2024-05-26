import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonInput, IonItem, IonList, IonDatetime, IonLabel, IonDatetimeButton, IonModal, IonNote, IonAccordionGroup, IonAccordion, IonTabButton, IonButton, IonNav } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { FirebaseFirestoreService } from 'src/app/services/firebase-firestore.service';
import { ProductoSave } from 'src/app/types/producto.interface';
import { Timestamp } from '@angular/fire/firestore';

function totalNoSuperaPresupuesto(): ValidatorFn {
  return (formValidation: AbstractControl): ValidationErrors | null => {
    const valorTotal: number = Number(formValidation.root.get('valorTotal')?.value);
    const presupuesto: number = Number(formValidation.root.get('presupuesto')?.value);
    if (valorTotal > presupuesto) {
      return { excedePresupuesto: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-operacion-producto',
  templateUrl: './operacion-producto.page.html',
  styleUrls: ['./operacion-producto.page.scss'],
  standalone: true,
  imports: [IonButton, IonTabButton, IonAccordion, IonAccordionGroup, IonNote, IonModal, IonDatetimeButton, IonLabel, IonDatetime, IonList, IonItem, IonInput, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class OperacionProductoPage implements OnInit {
  @Input() operacion = "Crear Producto";
  @Input() idProducto = "";
  formValidation = this.formBuilder.group({
    producto: ['', Validators.compose([Validators.required, Validators.nullValidator])],
    proveedor: ['', Validators.compose([Validators.required, Validators.nullValidator])],
    unidad: ['', Validators.compose([Validators.required, Validators.nullValidator])],
    presupuesto: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
    valorUnitario: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
    cantidad: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
    valorTotal: ['', Validators.compose([Validators.pattern(/^[0-9]*$/), totalNoSuperaPresupuesto()])],
    fechaAdquisicion: [this.todayIs(), Validators.compose([Validators.required])]
  });

  constructor(private formBuilder: NonNullableFormBuilder, private firestore: FirebaseFirestoreService, private navCtrl: IonNav, private alertController: AlertController) {
    this.formValidation.get('valorUnitario')?.valueChanges.subscribe(() => {
      this.updateValorTotal();
    });

    this.formValidation.get('cantidad')?.valueChanges.subscribe(() => {
      this.updateValorTotal();
    });

    this.formValidation.get('presupuesto')?.valueChanges.subscribe(() => {
      this.updateValorTotal();
    });
  }

  ngOnInit() {
    console.log(this.operacion);
    console.log(this.idProducto);
  }

  updateValorTotal() {
    const valorUnitario: number = Number(this.formValidation.get('valorUnitario')?.value);
    const cantidad: number = Number(this.formValidation.get('cantidad')?.value);
    const valorTotal = valorUnitario * cantidad;
    this.formValidation.get('valorTotal')?.setValue(valorTotal.toString(), { emitEvent: false });
  }

  todayIs(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit() {
    const isFormValid = this.formValidation.valid;
    console.log(this.formValidation);
    if (isFormValid) {
      if (this.operacion.toLowerCase() === "crear producto") {
        const productoRaw = this.formValidation.getRawValue();
        const time: Timestamp = Timestamp.fromDate(new Date(productoRaw.fechaAdquisicion!));
        const producto: ProductoSave = {
          producto: productoRaw.producto!,
          unidad: productoRaw.unidad!,
          proveedor: productoRaw.producto!,
          presupuesto: Number(productoRaw.presupuesto!),
          cantidad: Number(productoRaw.cantidad!),
          valor_unitario: Number(productoRaw.valorUnitario!),
          valor_total: Number(productoRaw.valorTotal!),
          fecha_adquisicion: time
        }
        this.firestore.saveProduct(producto).subscribe((res) => {
          if (res) {
            this.showAlert("Se agrego exitosamente");
          } else {
            this.showAlert("No se pudo agregar");
          }
        });
      }
    }
  }

  async showAlert(message: string = "Alerta") {
    const alert = await this.alertController.create({
      header: 'Informacion',
      message,
      buttons: [{
        text: "Ok",
        handler: () => {
          this.navCtrl.pop();
        }
      }],
    });
    await alert.present();
  }

}
