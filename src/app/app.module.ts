import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HereMapModule } from './here-map/here-map.module';
import { LocationPointerMarkerComponent } from './location-pointer-marker/location-pointer-marker.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationPointerMarkerComponent
  ],
  imports: [
    BrowserModule,
    HereMapModule.forRoot({ appId: "pAkcepL9nwxnx4C8BAwt", appCode: "sbTmDwco5HJQCJZ5PLoKuA" })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [LocationPointerMarkerComponent]
})
export class AppModule { }
