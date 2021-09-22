import { Component } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <google-map [options]="options" width="100vw" height="100vh" (mapClick)="onClick($event)">
      <!-- MARKERS -->
      <map-marker
        #marker="mapMarker"
        *ngFor="let markerPosition of markerPositions"
        [position]="markerPosition"
        [options]="markerOptions"
        (mapClick)="onOpenInfo(marker, info)"
      ></map-marker>
      <!-- INFO -->
      <map-info-window #info="mapInfoWindow">
        <input type="text" />
      </map-info-window>
    </google-map>
  `,
})
export class AppComponent {
  options: google.maps.MapOptions = {
    center: { lat: 40.4378698, lng: -3.8196208 },
    zoom: 12,
  };

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];

  onClick(event: google.maps.MapMouseEvent) {
    this.markerPositions.push(event.latLng.toJSON());
  }

  onOpenInfo(marker: MapMarker, infoWindow: MapInfoWindow) {
    infoWindow.open(marker);
  }
}
