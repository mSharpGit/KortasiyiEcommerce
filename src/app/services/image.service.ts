import { Image } from '../interfaces/image';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

let imgurl = '';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private db: AngularFirestore) { }

   private imagesCollection: AngularFirestoreCollection<any>;
   public image: Observable<any[]>;
   
  getimages(): Observable<any[]>{
    
     return this.image = this.db.collection('/Image').valueChanges();
    
  }
  
  getimagebyid(id: string): string {
   //const image = this.imagesCollection.where('id', '==', id);
 
   // this.imagesCollection = this.db.collection('/Image', ref => ref.where('id', '==', id));
   // return this.imagesCollection.valueChanges();
    //const urll = this.imagesCollection = this.db.collection('/Image', ref => ref.where('id', '==', id));
    //const imageurl = urll.getimageURL;
    /**let urldata: string;
    const imageRef = this.db.collection('Image').doc(id);
    const getimageUrl = imageRef.ref.get().then(function(doc) {
                if (doc.exists) {
                  imgurl = doc.data().imageURL;
                    console.log("Document data:", doc.data());
                   urldata = doc.data().imageURL;
                } else {
                    console.log("No such document!");
                  
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
              
            });
    return urldata**/
    return null;
    }
  

  }

