import { Timestamp } from "@angular/fire/firestore";

export interface Producto {
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