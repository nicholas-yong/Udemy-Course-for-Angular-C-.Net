import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { icon, latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { coordinatesMap, coordinatesMapWithMessage } from './coordinate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  @Input()
  initialCoordinates: coordinatesMapWithMessage[] = [];

  @Input()
  editMode: boolean = true;

  ngOnInit(): void
  {
    this.layers = this.initialCoordinates.map( (value) =>
    {
      const m = marker([value.latitude, value.longitude]);
      if(value.message)
      {
        m.bindPopup(value.message, {autoClose: false, autoPan: false});
      }
      return m;
    });
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Angular Movies' })
    ],
    zoom: 15,
    center: latLng(-31.953601385818278, 115.8602948577027)
  };

  layers: Marker<any>[] = [];

  @Output()
  onSelectedLocation = new EventEmitter<coordinatesMap>();



  handleMapClick(event: LeafletMouseEvent)
  {
    if(this.editMode)
    {
      let latitude = event.latlng.lat;
      let longitude = event.latlng.lng;

      this.layers = [];
      this.layers.push(marker([latitude,longitude], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        })
      }));
      this.onSelectedLocation.emit({latitude, longitude});
    }
  }

}
