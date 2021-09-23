import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MapInfoWindow } from '@angular/google-maps';

import { MarkersService } from './../markers.service';

@Component({
  selector: 'marker-form',
  styleUrls: ['marker-form.component.scss'],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-fields">
        <b> Title: </b>
        <input formControlName="title" required />
        <b> Content: </b>
        <textarea rows="5" formControlName="content" required></textarea>
        <b> Image URL: </b>
        <input #image formControlName="image_url" />
      </div>

      <img [src]="image.value" alt="insert a valid image URL" />

      <button type="submit" [disabled]="form.invalid">SUBMIT</button>
      <button *ngIf="markerId" type="button" (click)="onDelete()">DELETE</button>
    </form>
  `,
})
export class MarkerForm {
  form = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    content: new FormControl(),
    image_url: new FormControl(),
    lat: new FormControl(),
    long: new FormControl(),
  });

  @Output() submitted = new EventEmitter();

  get markerId() {
    return this.form.get('id').value;
  }

  constructor(private infoWindow: MapInfoWindow, private mrkService: MarkersService) {}

  onSubmit() {
    this.mrkService.submitMarker(this.form.getRawValue()).subscribe((next) => {
      this.submitted.emit(next);
      this.infoWindow.close();
    });
  }

  onDelete() {
    this.mrkService.deleteMarker(this.markerId).subscribe((next) => {
      this.submitted.emit(next);
      this.infoWindow.close();
    });
  }
}
