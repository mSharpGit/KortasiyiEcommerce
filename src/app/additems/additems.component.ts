import { Image } from '../interfaces/image';
import { ItemsService } from '../services/items.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { Items } from '../interfaces/items';
import * as $ from 'jquery';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, Timestamp } from 'rxjs';
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-additems',
  templateUrl: './additems.component.html',
  styleUrls: ['./additems.component.css']
})
  
  
export class AdditemsComponent implements OnInit {
 // @ViewChild('form') form;
  
  countries = ['', 'USA', 'Canada', 'Uk', 'Lebanon']
  addForm: FormGroup;
  submitted = false;
  errorMessage: string = '';
  item: Items;
  task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  fileEvent: any
  constructor(
  public itemsService: ItemsService,
  private fb: FormBuilder
) { }


  image: Image;
  imageNm: string;
  imgPath: string;

  createForm() {
    this.addForm = this.fb.group({
      itemname: new FormControl("",  Validators.required ),
      itemnumber: new FormControl("",  Validators.required ),
      itemprice: new FormControl("", [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
         ]),
      itemquantity: new FormControl("",  Validators.required ),
      itemdescription: new FormControl("",  Validators.required ),
      itemcolor: new FormControl("",  Validators.required ),
      itemcountry: new FormControl("",  Validators.required ),
      itemheight: new FormControl("",  Validators.required ),
      itemwidth: new FormControl("",  Validators.required ),
      itemthickness: new FormControl("",  Validators.required ),
      itemweight: new FormControl("",  Validators.required ),
      itemimage: new FormControl("",  Validators.required )
    });
  }
  
  
  get itemname() { return this.addForm.get('itemname'); }
  get itemnumber() { return this.addForm.get('itemnumber'); }
  get itemprice() { return this.addForm.get('itemprice'); }
  get itemquantity() { return this.addForm.get('itemquantity'); }
  get itemdescription() { return this.addForm.get('itemdescription'); }
  get itemcolor() { return this.addForm.get('itemcolor'); }
  get itemcountry() { return this.addForm.get('itemcountry'); }
  get itemheight() { return this.addForm.get('itemheight'); }
  get itemwidth() { return this.addForm.get('itemwidth'); }
  get itemthickness() { return this.addForm.get('itemthickness'); }
  get itemweight() { return this.addForm.get('itemweight'); }
  get itemimage() { return this.addForm.get('itemimage'); }
  
   startUpload(event: FileList, value) {
    // File object
    const file = event.item(0);
    //console.log(file);

    // client side validation
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type!');
    }
    // storage path
    this.imgPath = `test/${new Date().getTime()}_${file.name}`;
    const fileRef = this.itemsService.imageRef(this.imgPath);

    // optional metadata
    const customMetadata = { app: 'kortasiyi-app'};
    // main task
    this.task = this.itemsService.uploadImage(this.imgPath, file, customMetadata);

    //this.afStorage.upload(this.imgPath, file, { customMetadata });
    // observe percentage changes
    this.uploadProgress = this.task.percentageChanges();
    // get notified when the download URL is available
    this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          // The above step returns an observable which can be subscribed to fetch the data within it
          this.downloadURL.subscribe(data => {
            // to create an id for the document.
            //const id = this.db.createId();
            //this.imageId = id;
            // storing downloadURL as imageURL
            const imageURL = data;
            // storing image path in firestore
            const imagePath = this.imgPath;
            // Image name fetched from ngModel on 'imageNm' field
            //const imageName = this.imageNm;
            const imageName = file.name;
            // To store timestamp of the image before being inserted in firestore
            const maintTs = Date.now();
            //const image: Image = { id, imagePath, imageURL, imageName, maintTs };
            this.image = { imagePath, imageURL, imageName, maintTs };
            // image object inserted in image collection (AngularFirestoreCollection)
            //this.imagesCollection.doc(id).set(image);
            // setting the image name back to blank
            this.imageNm = '';
            //this.showerror('Image has been uploaded succesfully');
            this.createItem(value);
          });
          
        })
     )
    .subscribe();
  }


 add(value) {
   
this.submitted = true;
// stop here if form is invalid
if (this.addForm.invalid) {
  return;
}
   if (this.fileEvent != null){
   this.startUpload(this.fileEvent, value)
   }
   else {
    this.showerror('Please Select an image')
   }
    }
   

   createItem(value){
   const itemid = value.itemname;
   const itemname = value.itemname;
   const itemnumber= value.itemnumber;
   const itemprice= value.itemprice;
   const itemquantity= value.itemquantity;
   const itemdescription= value.itemdescription;
   const itemcolor= value.itemcolor;
   const itemcountry= value.itemcountry;
   const itemheight= value.itemheight;
   const itemwidth= value.itemwidth;
   const itemthickness= value.itemthickness;
   const itemweight= value.itemweight;
   const itemimage= this.image; 
         
    const item: Items = { itemid, itemname, itemnumber,
   itemprice,
   itemquantity,
   itemdescription,
   itemcolor,
   itemcountry,
   itemheight,
   itemwidth,
   itemthickness,
   itemweight,
   itemimage };
         
         this.itemsService.additem(item);
         this.showerror('Image has been uploaded and Item has been added');
         //this.uploadflag = 0;
         this.addForm.reset();
         //this.addForm.markAsUntouched();
        // this.createForm();
        // this.addForm.get('itemname').clearValidators;
         //this.addForm.setAsyncValidators([])
         //this.addForm.updateValueAndValidity()
         }

onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files &&
      event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        $('#preview').attr('src', URL.createObjectURL(event.target.files[0]));
      };
      this.fileEvent = event.target.files;
    }
  }


  ngOnInit() {
    this.createForm();
  }
  
  showerror(errormessage: string): void{
    this.errorMessage = errormessage;
    setTimeout( () => { this.errorMessage = '' }, 5000 );
    
  }

}
