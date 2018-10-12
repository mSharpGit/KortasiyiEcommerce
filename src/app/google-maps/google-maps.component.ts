import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { GlobalsService } from '../services/globals.service';
import { marker } from '../interfaces/marker';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent implements OnInit {


// google maps zoom level
zoom: number = 12;
  
// initial center position for the map
lat: number = 33.8892527;
lng: number = 35.4867727;


constructor(public globals: GlobalsService) { 
  this.updateGlobals();
}

ngOnInit() {
}


findMe() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.showPosition(position);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  
}

showPosition(position) {
  this.lat = position.coords.latitude;
  this.lng = position.coords.longitude;
  this.updateGlobals();
  this.updateMarker(this.lat, this.lng);
}

updateGlobals(){
  this.globals.latitude = this.lat
  this.globals.longitude = this.lng
}

clickedMarker(label: string, index: number) {
  console.log(`clicked the marker: ${label || index}`)
}

mapClicked($event: MouseEvent) {
 /*  this.markers.push({
    lat: $event.coords.lat,
    lng: $event.coords.lng,
    draggable: true
  }); */
 /*  this.markers[0]=
  {
    lat: $event.coords.lat,
    lng: $event.coords.lng,
    label: 'A',
    draggable: true
  } */

  this.updateMarker($event.coords.lat, $event.coords.lng);

  this.lat = $event.coords.lat
  this.lng = $event.coords.lng
  this.updateGlobals();

}

markerDragEnd(m: marker, $event: MouseEvent) {
  //console.log('dragEnd', m, $event);
  //console.log('dragEnd',$event.coords.lat, " : ", $event.coords.lng);
  this.lat = $event.coords.lat
  this.lng = $event.coords.lng
  this.updateGlobals();
}

updateMarker(lat: number, lng: number){
  this.markers[0]=
  {
    lat: lat,
    lng: lng,
    label: 'A',
    draggable: true
  }
}

markers: marker[] = [
  {
    lat: this.lat,
    lng: this.lng,
    label: 'A',
    draggable: true
  }/*,
   {
    lat: 51.373858,
    lng: 7.215982,
    label: 'B',
    draggable: false
  },
  {
    lat: 51.723858,
    lng: 7.895982,
    label: 'C',
    draggable: true
  } */
]

}



