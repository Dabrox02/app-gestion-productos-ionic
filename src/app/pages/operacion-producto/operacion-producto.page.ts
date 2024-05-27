import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, FormsModule, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonInput, IonItem, IonList, IonDatetime, IonLabel, IonDatetimeButton, IonModal, IonNote, IonAccordionGroup, IonAccordion, IonTabButton, IonButton, IonNav } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { FirebaseFirestoreService } from 'src/app/services/firebase-firestore.service';
import { Producto, ProductoSave } from 'src/app/types/producto.interface';
import { Timestamp } from '@angular/fire/firestore';
import moment from 'moment';

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
  @Input() producto!: Producto;
  formValidation!: FormGroup;

  constructor(private formBuilder: NonNullableFormBuilder, private firestore: FirebaseFirestoreService, private navCtrl: IonNav, private alertController: AlertController) {
  }

  ngOnInit() {
    this.initializeForm();
    if (this.producto) {
      this.fillForm(this.producto);
    }
  }

  updateValorTotal() {
    const valorUnitario: number = Number(this.formValidation.get('valorUnitario')?.value);
    const cantidad: number = Number(this.formValidation.get('cantidad')?.value);
    const valorTotal = valorUnitario * cantidad;
    this.formValidation.get('valorTotal')?.setValue(valorTotal.toString(), { emitEvent: false });
  }

  todayIs(): string {
    return moment().format('YYYY-MM-DD');
  }

  onSubmit() {
    const isFormValid = this.formValidation.valid;
    console.log(this.formValidation);
    if (isFormValid) {
      if (this.operacion.toLowerCase() === "crear producto") {
        const productoRaw = this.formValidation.getRawValue();
        const time: Timestamp = Timestamp.fromDate(moment(productoRaw.fechaAdquisicion!, 'YYYY/MM/DD').toDate());
        const producto: ProductoSave = {
          producto: productoRaw.producto!,
          unidad: productoRaw.unidad!,
          proveedor: productoRaw.proveedor!,
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
      else if (this.operacion.toLowerCase() === "editar producto") {
        const productoRaw = this.formValidation.getRawValue();
        console.log(productoRaw);
        const time: Timestamp = Timestamp.fromDate(moment(productoRaw.fechaAdquisicion!, 'YYYY/MM/DD').toDate());
        const producto: Producto = {
          id: this.idProducto,
          producto: productoRaw.producto!,
          unidad: productoRaw.unidad!,
          proveedor: productoRaw.proveedor!,
          presupuesto: Number(productoRaw.presupuesto!),
          cantidad: Number(productoRaw.cantidad!),
          valor_unitario: Number(productoRaw.valorUnitario!),
          valor_total: Number(productoRaw.valorTotal!),
          fecha_adquisicion: time
        }
        this.firestore.updateProduct(this.idProducto, producto).subscribe((res) => {
          if (res) {
            this.showAlert("Se actualizo exitosamente");
          } else {
            this.showAlert("No se pudo actualizar");
          }
        });
      }
    }
  }

  initializeForm() {
    this.formValidation = this.formBuilder.group({
      producto: ['', Validators.compose([Validators.required, Validators.nullValidator])],
      proveedor: ['', Validators.compose([Validators.required, Validators.nullValidator])],
      unidad: ['', Validators.compose([Validators.required, Validators.nullValidator])],
      presupuesto: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      valorUnitario: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      cantidad: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]*$/)])],
      valorTotal: ['', Validators.compose([Validators.pattern(/^[0-9]*$/), totalNoSuperaPresupuesto()])],
      fechaAdquisicion: [this.todayIs(), Validators.compose([Validators.required])]
    });

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

  fillForm(producto: Producto): void {
    this.formValidation.patchValue({
      producto: producto.producto,
      proveedor: producto.proveedor,
      unidad: producto.unidad,
      presupuesto: producto.presupuesto.toString(),
      valorUnitario: producto.valor_unitario.toString(),
      cantidad: producto.cantidad.toString(),
      valorTotal: producto.valor_total.toString(),
      fechaAdquisicion: producto.fecha_adquisicion.toDate().toISOString()
    });
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
