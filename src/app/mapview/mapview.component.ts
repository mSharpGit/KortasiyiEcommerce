import { Component, OnInit, Input } from '@angular/core';
import { marker } from '../interfaces/marker';

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements OnInit {

  @Input() lat: number;
  @Input() lng: number;

  // google maps zoom level
zoom: number = 12;
  



  constructor() { }

  ngOnInit() {
    this.updateMarker(this.lat, this.lng);
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
