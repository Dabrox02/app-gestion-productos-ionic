import { Timestamp } from "@angular/fire/firestore";

export interface Producto {
    uid: string;
    id: string;
    presupuesto: number;
    unidad: string;
    producto: string;
    cantidad: number;
    valor_unitario: number;
    valor_total: number;
    fecha_adquisicion: Timestamp;
    proveedor: string;
}

export interface ProductoSave {
    uid: string;
    presupuesto: number;
    unidad: string;
    producto: string;
    cantidad: number;
    valor_unitario: number;
    valor_total: number;
    fecha_adquisicion: Timestamp;
    proveedor: string;
}