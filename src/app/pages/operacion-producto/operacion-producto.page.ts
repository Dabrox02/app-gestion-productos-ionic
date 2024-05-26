import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButtons, IonInput, IonItem, IonList, IonDatetime, IonLabel, IonDatetimeButton, IonModal, IonNote, IonAccordionGroup, IonAccordion } from '@ionic/angular/standalone';

@Component({
  selector: 'app-operacion-producto',
  templateUrl: './operacion-producto.page.html',
  styleUrls: ['./operacion-producto.page.scss'],
  standalone: true,
  imports: [IonAccordion, IonAccordionGroup, IonNote, IonModal, IonDatetimeButton, IonLabel, IonDatetime, IonList, IonItem, IonInput, IonButtons, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class OperacionProductoPage implements OnInit {
  onSubmit() {
    throw new Error('Method not implemented.');
  }
  @Input() operacion = "Crear Producto";
  @Input() idProducto = "";
  formValidation = this.formBuilder.group({
    nombreProducto: ['', Validators.compose([Validators.required, Validators.nullValidator])]

  });

  constructor(private formBuilder: NonNullableFormBuilder) { }

  ngOnInit() {
    console.log(this.operacion);
    console.log(this.idProducto);
  }



}
