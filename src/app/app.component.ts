import { Component } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { BehaviorSubject } from 'rxjs';

import { MarkerForm } from './components/marker-form.component';
import { MarkersService } from './markers.service';
import { MarkerData } from './models/marker-data';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <google-map [options]="options" width="100vw" height="100vh" (mapClick)="onAddMarker($event, info, markerForm)">
      <!-- MARKERS -->
      <map-marker
        #marker="mapMarker"
        *ngFor="let data of markers$ | async; trackBy: trackFn"
        [position]="{ lat: +data.lat, lng: +data.long }"
        (mapClick)="onViewMarker(marker, info, data, markerForm)"
      ></map-marker>
      <!-- MARKER FORM -->
      <map-info-window #info="mapInfoWindow">
        <marker-form #markerForm (submitted)="onRefresh()"></marker-form>
      </map-info-window>
    </google-map>

    <!--     <pre>
      {{ markers$ | async | json }}
    </pre
    > -->
  `,
})
export class AppComponent {
  refresh = new BehaviorSubject(null);
  markers$ = this.mrkrService.getMarkers(this.refresh);

  options: google.maps.MapOptions = {
    center: { lat: 42, lng: -1 },
    zoom: 6,
  };

  constructor(private mrkrService: MarkersService) {}

  onAddMarker(event: google.maps.MapMouseEvent, infoWindow: MapInfoWindow, markerForm: MarkerForm) {
    const position = event.latLng.toJSON();

    markerForm.form.reset();
    markerForm.form.patchValue({
      lat: position.lat,
      long: position.lng,
    });

    infoWindow.options = { position };
    infoWindow.open();
  }

  onViewMarker(marker: MapMarker, infoWindow: MapInfoWindow, mrkData: MarkerData, markerForm: MarkerForm) {
    this.mrkrService.getMarkersById(mrkData.id).subscribe((data) => {
      markerForm.form.reset();
      markerForm.form.patchValue(data);
      infoWindow.open(marker);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const dismissButton: HTMLButtonElement = document.querySelector('.dismissButton');
      dismissButton && dismissButton.click();
    }, 1000);
  }

  onRefresh() {
    this.refresh.next(null);
  }

  trackFn = (idx, { id }) => id;
}
