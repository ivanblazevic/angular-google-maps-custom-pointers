import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HereMapComponent } from './here-map/here-map.component';
import { LocationPointerMarkerComponent } from './location-pointer-marker/location-pointer-marker.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationPointerMarkerComponent,
    HereMapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LocationPointerMarkerComponent]
})
export class AppModule { }
