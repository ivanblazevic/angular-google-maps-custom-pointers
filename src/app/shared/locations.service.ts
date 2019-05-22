import { Injectable } from "@angular/core";
import { interval, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Location } from "./models/location.model";

@Injectable({
  providedIn: "root"
})
export class LocationService {

  getLocations(): Observable<Location[]> {
    return interval(5000).pipe(startWith(this.generateLocation()), map(_ => this.generateLocation()));
  }

  private getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  private generateLocation() {
    const startPosition = { lat: 48.2082, lng: 16.3738 };

    const locations: Location[] = [];
    for (let i = 0; i < 9; i++) {
      const randomLat = Math.random() * 0.0099 + startPosition.lat;
      const randomLng = Math.random() * 0.0099 + startPosition.lng;

      locations.push({
        lat: randomLat,
        lng: randomLng,
        status: this.getRandomInt(4) + 1
      });
    }
    return locations;
  }
}
