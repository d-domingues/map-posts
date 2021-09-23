import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { MarkerData } from './models/marker-data';

@Injectable({ providedIn: 'root' })
export class MarkersService {
  constructor(private http: HttpClient) {}

  getMarkers(refreshSignal: Subject<null>) {
    return refreshSignal.pipe(switchMap(() => this.http.get('http://localhost:3000/api/v1/posts')));
  }

  getMarkersById(id: number) {
    return this.http.get(`http://localhost:3000/api/v1/posts/${id}`);
  }

  submitMarker(body: Partial<MarkerData>) {
    return iif(
      () => !!body.id,
      this.http.put(`http://localhost:3000/api/v1/posts/${body.id}`, body),
      this.http.post('http://localhost:3000/api/v1/posts', body)
    );
  }

  deleteMarker(id: number) {
    return this.http.delete(`http://localhost:3000/api/v1/posts/${id}`);
  }
}
