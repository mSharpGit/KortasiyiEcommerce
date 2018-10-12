import { ItemsService } from '../services/items.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Items } from '../interfaces/items';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Image } from '../interfaces/image';
import * as $ from 'jquery';
import { AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

@Input() item: Items;
countries = ['', 'USA', 'Canada', 'Uk', 'Lebanon'];
editForm: FormGroup;
submitted = false;
errorMessage: string = '';
task: AngularFireUploadTask;
  uploadProgress: Observable<number>;
  downloadURL: Observable<string>;
  
  constructor(
  private route: ActivatedRoute,
  private location: Location,
  private fb: FormBuilder,
  public itemsService: ItemsService
  ) { 
  }

  image: Image;
  uploadflag: number;
  imageNm: string;
  imgPath: string;
  oldImagePath: string;
  fileEvent: any;

  ngOnInit() {
    this.getItem();
    this.oldImagePath = '';
    //this.createForm();
    //console.log(this.item);
    //this.image = { this.item.itemimage.imagePath, imageURL, imageName, maintTs };
    //this.image = this.item.itemimage;
    //console.log(this.image);

  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  createForm(item: Items) {
    this.editForm = this.fb.group({
      itemid: new FormControl(item.itemid,  Validators.required ),
      itemname: new FormControl(item.itemname,  Validators.required ),
      itemnumber: new FormControl(item.itemnumber,  Validators.required ),
      itemprice: new FormControl(item.itemprice, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
         ]),
      itemquantity: new FormControl(item.itemquantity,  Validators.required ),
      itemdescription: new FormControl(item.itemdescription,  Validators.required ),
      itemcolor: new FormControl(item.itemcolor,  Validators.required ),
      itemcountry: new FormControl(item.itemcountry,  Validators.required ),
      itemheight: new FormControl(item.itemheight,  Validators.required ),
      itemwidth: new FormControl(item.itemwidth,  Validators.required ),
      itemthickness: new FormControl(item.itemthickness,  Validators.required ),
      itemweight: new FormControl(item.itemweight,  Validators.required ),
      itemimage: new FormControl("" )
    });
  }
  
  get itemname() { return this.editForm.get('itemname'); }
  get itemnumber() { return this.editForm.get('itemnumber'); }
  get itemprice() { return this.editForm.get('itemprice'); }
  get itemquantity() { return this.editForm.get('itemquantity'); }
  get itemdescription() { return this.editForm.get('itemdescription'); }
  get itemcolor() { return this.editForm.get('itemcolor'); }
  get itemcountry() { return this.editForm.get('itemcountry'); }
  get itemheight() { return this.editForm.get('itemheight'); }
  get itemwidth() { return this.editForm.get('itemwidth'); }
  get itemthickness() { return this.editForm.get('itemthickness'); }
  get itemweight() { return this.editForm.get('itemweight'); }
  get itemimage() { return this.editForm.get('itemimage'); }

  getItem() {
    const id = this.route.snapshot.paramMap.get('id');
    
    let data
    this.itemsService.getItem(id)
    .then ( snapshot => {
      data = snapshot.data();
       }).then( snapshot => {
        this.item = data})
        .then( snapshot => {
          this.image = this.item.itemimage;
        })
        .then( snapshot => {
         //console.log(this.image)
         this.createForm(this.item);
        })
      .catch(error => {
      //handle the error
      console.log(error)
      });
}

createItem(value){
  const itemid= value.itemid;
 
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
    //console.log(item);
    this.itemsService.updateitem(item);
    this.showerror('Item has been updated');
    this.uploadflag = 0;
    //this.addForm.reset();
//} else {
 //   this.showerror('Image is not uploaded yet! try again when the progress bar is full');
 // }
 //console.log(this.oldImagePath)
 if(this.oldImagePath != "")
 this.itemsService.deleteImage(this.oldImagePath);
 this.goBack();
}



update(value) {
//console.log(this.f.itemname.errors.required)

this.submitted = true;
  // stop here if form is invalid
  if (this.editForm.invalid) {
    return;
}

  if (this.fileEvent != null){
    this.startUpload(this.fileEvent, value)
    }
    else {
      this.createItem(value);
     this.showerror('Please Select an image')
    }

 // console.log(value);
  //if (this.uploadflag == 1) {
    
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
      this.oldImagePath = this.item.itemimage.imagePath;
      //this.startUpload(event.target.files);
      this.fileEvent = event.target.files;
    }
  }



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
          this.downloadURL.subscribe(data => {
            const imageURL = data;
            const imagePath = this.imgPath;
            const imageName = file.name;
            const maintTs = Date.now();
            this.image = { imagePath, imageURL, imageName, maintTs };
            this.imageNm = '';
            //this.showerror('Image has been uploaded succesfully');
            this.createItem(value);
          });

        })
     )
    .subscribe();
  }
  showerror(errormessage: string): void{
    this.errorMessage = errormessage;
    setTimeout( () => { this.errorMessage = '' }, 5000 );
    
  }

  goBack(): void {
    this.location.back();
  }
}
