import { Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, Firestore, onSnapshot, QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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

  deleteProduct(idProduct: string) {
    if (idProduct) {
      const documentReference: DocumentReference = doc(this.fireStore, `/productos/${idProduct}`);
      deleteDoc(documentReference).then(() => {
        console.log("producto eliminado exitosamente");
      });
    }
  }

}
