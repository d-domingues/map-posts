import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MarkerForm } from './components/marker-form.component';

@NgModule({
  declarations: [AppComponent, MarkerForm],
  imports: [BrowserModule, HttpClientModule, CommonModule, GoogleMapsModule, ReactiveFormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
