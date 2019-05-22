import { Component, ComponentFactoryResolver, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { LocationPointerMarkerComponent } from './location-pointer-marker/location-pointer-marker.component';
import { LocationService } from './shared/locations.service';
import { Location, VehicleStatus } from './shared/models/location.model';

declare var H: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('map')
  public mapElement: ElementRef;

  public center = { lat: 48.211967, lng: 16.382266 };

  constructor(
    public viewContainerRef: ViewContainerRef, 
    public componentFactoryResolver: ComponentFactoryResolver,
    private locationService: LocationService) {}

  onMapInit(map: any) {
    const locations: Location[] = this.locationService.getLocations();

    locations.forEach(p => {
      this.addMarker(p, map);
    });
  }

  private addMarker(location: Location, map): void {
    const componentRef = this.getMarkerElement(location.status);
    const e = componentRef.location.nativeElement;

    const icon = new H.map.DomIcon(e);
    const marker = new H.map.DomMarker(location, {icon: icon});
    map.addObject(marker);

    componentRef.destroy(); // destroy reference once added to the map
  }

  private getMarkerElement(vehicleStatus: VehicleStatus): any {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      LocationPointerMarkerComponent
    );
    const componentRef = this.viewContainerRef.createComponent(
      componentFactory
    );
    componentRef.instance.status = vehicleStatus;

    componentRef.changeDetectorRef.detectChanges();

    return componentRef;
  }

}
