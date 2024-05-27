import { Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, DocumentSnapshot, Firestore, getDoc, onSnapshot, QueryDocumentSnapshot, QuerySnapshot, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ProductoSave } from '../types/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseFirestoreService {

  constructor(private fireStore: Firestore) { }

  getFireStore() {
    const testCollection: CollectionReference = collection(this.fireStore, 'test');
    addDoc(testCollection, { text: 'Firebase Connected' })
  }

  getAllProducts() {
    const productsCollection: CollectionReference = collection(this.fireStore, 'productos');
    return new Observable<DocumentData[]>((observer) => {
      onSnapshot(productsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
        const products: DocumentData[] = [];
        snapshot.docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          const id = doc.id;
          products.push({ id, ...data });
        });
        console.log("actualizacion");
        observer.next(products);
      }, (error) => {
        observer.error(error);
      });
    });
  }

  getOneProduct(id: string) {
    const productoDocRef: DocumentReference = doc(this.fireStore, 'productos', id);
    return new Observable<DocumentSnapshot<any>>((observer) => {
      getDoc(productoDocRef)
        .then((data) => {
          observer.next(data);
          observer.complete();
        })
        .catch((error) => {
          observer.next(error);
          observer.complete();
        });
    });
  }

  saveProduct(producto: ProductoSave) {
    const productsCollection: CollectionReference = collection(this.fireStore, 'productos');
    return new Observable<boolean>((observer) => {
      addDoc(productsCollection, producto)
        .then(() => {
          console.log("Se agregó exitosamente");
          observer.next(true);
          observer.complete();
        })
        .catch((error) => {
          console.error("Error al agregar el producto:", error);
          observer.next(false);
          observer.complete();
        });
    });
  }

  updateProduct(id: string, producto: Partial<ProductoSave>) {
    const productoDocRef: DocumentReference = doc(this.fireStore, 'productos', id);
    return new Observable<boolean>((observer) => {
      updateDoc(productoDocRef, producto)
        .then(() => {
          console.log("Se actualizo exitosamente");
          observer.next(true);
          observer.complete();
        })
        .catch((error) => {
          console.error("Error al actualizar el producto:", error);
          observer.next(false);
          observer.complete();
        });
    });
  }


  deleteProduct(idProduct: string) {
    if (idProduct) {
      const documentReference: DocumentReference = doc(this.fireStore, `/productos/${idProduct}`);
      deleteDoc(documentReference).then(() => {
        console.log("producto eliminado exitosamente");
      });
    }
  }

}
