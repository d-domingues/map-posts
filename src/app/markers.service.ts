import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MarkersService {
  markers$ = this.http
    .get('http://localhost:3000/api/v1/posts')
    .pipe(map((markers: any[]) => markers.map((m) => ({ ...m, lat: +m.lat, lng: +m.long }))));

  constructor(private http: HttpClient) {}
}
