import { Image } from '../interfaces/image';
import { Items } from '../interfaces/items';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  readonly path = 'items';
  public items: Observable<any[]>;
  itemscollection: AngularFirestoreCollection<Items> = this.db.collection('items');
  
  constructor(private db: AngularFirestore,private afStorage: AngularFireStorage) { }
  
  getitems(): Observable<any[]>{
    
     return this.items = this.itemscollection.valueChanges();
       //this.db.collection('/items').valueChanges();
    
  }
  
additem(item: Items) {
    //console.log(item);
   return this.itemscollection.add({ ...item
}).then((docRef) => {
      this.itemscollection.doc(docRef.id).update({
        itemid: docRef.id
      });
    }).catch((err) => {
      console.log(err);
    });
  }
  

  updateitem(item: Items) {
    //console.log(item);
   return this.itemscollection.doc(item.itemid).update({ ...item
    }).catch((err) => {
      console.log(err);
    });
  }
  
  
  deleteImage(storagePath: string) {
     this.afStorage.ref(storagePath).delete();
    }

deleteItem(id: string, storagePath: string) {
    this.itemscollection.doc(id).delete();
    this.deleteImage(storagePath);
  }
  
getItem(id: string) {
  return this.db.doc<Items>(`${this.path}/${id}`).ref.get();
}

uploadImage(imgPath, file, customMetadata): AngularFireUploadTask{
 return this.afStorage.upload(imgPath, file, { customMetadata });
}

imageRef(imagePath){
 return this.afStorage.ref(imagePath);
}

/* GET heroes whose name contains search term */
searchItems(term: string): Observable<Items[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.db.collection<Items>(`${this.path}`,
   //ref => ref.where('itemname', '==', term)
   ref => ref.orderBy('itemname').startAt(term).endAt(term+'\uf8ff')
  ).valueChanges();
  /* return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found heroes matching "${term}"`)),
    catchError(this.handleError<Hero[]>('searchHeroes', []))
  ); */
}
}
