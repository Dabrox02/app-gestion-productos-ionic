import { Injectable } from '@angular/core';
import { addDoc, collection, CollectionReference, Firestore, getDocs, QuerySnapshot, Timestamp } from '@angular/fire/firestore';
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

  getAllProducts(): Observable<any[]> {
    const productsCollection: CollectionReference = collection(this.fireStore, 'productos');
    return new Observable(observer => {
      getDocs(productsCollection).then((querySnapshot: QuerySnapshot<any>) => {
        const products: any[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data();
          const id = doc.id;
          products.push({ id, ...data });
        });
        observer.next(products);
        observer.complete();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

}
