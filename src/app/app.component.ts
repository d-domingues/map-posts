import { Component } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

import { MarkersService } from './markers.service';
import { MarkerData } from './models/marker-data';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <google-map [options]="options" width="100vw" height="100vh" (mapClick)="onClick($event)">
      <!-- MARKERS -->
      <map-marker
        #marker="mapMarker"
        *ngFor="let data of markersService.markers$ | async"
        [position]="data"
        [options]="markerOptions"
        (mapClick)="onOpenInfo(marker, info, data, paragraph, image)"
      ></map-marker>
      <!-- INFO -->
      <map-info-window #info="mapInfoWindow">
        <p #paragraph></p>
        <img #image alt="" />
      </map-info-window>
    </google-map>
    <pre>
      {{ markersService.markers$ | async | json }}
    </pre
    >
  `,
})
export class AppComponent {
  options: google.maps.MapOptions = {
    center: { lat: 40.4378698, lng: -3.8196208 },
    zoom: 6,
  };

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  constructor(public markersService: MarkersService) {}

  onClick(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  onOpenInfo(marker: MapMarker, infoWindow: MapInfoWindow, mrkData: MarkerData, paragraph: HTMLParagraphElement, image: HTMLImageElement) {
    image.src = mrkData.image_url;
    paragraph.innerText = mrkData.content;
    infoWindow.open(marker);
  }
}
