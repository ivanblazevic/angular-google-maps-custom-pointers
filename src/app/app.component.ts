import { Component, ComponentFactoryResolver, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { environment } from './../environments/environment';
import { LocationPointerMarkerComponent } from './location-pointer-marker/location-pointer-marker.component';

declare var H: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild("map")
  public mapElement: ElementRef;


  public center = { lat: 48.211967, lng: 16.382266 };
  public position = { lat: 48.2082, lng: 16.3738 };

  private platform: any;

  constructor(public viewContainerRef: ViewContainerRef, public componentFactoryResolver: ComponentFactoryResolver) {
    this.platform = new H.service.Platform({
      "app_id": environment.here_maps_app_id,
      "app_code": environment.here_maps_app_code
    });
  }

  onMapInit(map: any) {
    const positions = this.generatePositions();

    positions.forEach(p => {
      this.addMarker(p, map);
    });
  }

  private addMarker(position, map): void {
    const componentRef = this.getMarkerElement();
    const e = componentRef.location.nativeElement;

    const icon = new H.map.DomIcon(e),
    coords = {lat: position[0], lng: position[1]},
    marker = new H.map.DomMarker(coords, {icon: icon});
    map.addObject(marker);

    componentRef.destroy(); // destroy reference once added to the map
  }

  private getMarkerElement(): any {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      LocationPointerMarkerComponent
    );
    const componentRef = this.viewContainerRef.createComponent(
      componentFactory
    );
    componentRef.instance.status = 1;

    componentRef.changeDetectorRef.detectChanges();

    return componentRef;
  }

  private generatePositions() {
    let randomLat: number, randomLng: number;
    const positions = [];
    for (let i = 0 ; i < 9; i++) {
      randomLat = Math.random() * 0.0099 + this.position.lat;
      randomLng = Math.random() * 0.0099 + this.position.lng;
      positions.push([randomLat, randomLng]);
    }
    return positions;
  }

}
