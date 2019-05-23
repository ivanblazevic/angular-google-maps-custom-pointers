import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { HereMapService } from './here-map/here-map.service';
import { LocationPointerMarkerComponent } from './location-pointer-marker/location-pointer-marker.component';
import { LocationService } from './shared/locations.service';
import { Location, VehicleStatus } from './shared/models/location.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('map')
  public mapElement: ElementRef;

  public center = { lat: 48.211967, lng: 16.382266 };

  private markersGroup = this.hereMapService.getMarkerGroup();

  constructor(
    public viewContainerRef: ViewContainerRef,
    public componentFactoryResolver: ComponentFactoryResolver,
    private locationService: LocationService,
    private hereMapService: HereMapService
  ) {}

  onMapInit(map: any) {
    const locations$: Observable<
      Location[]
    > = this.locationService.getLocations();

    map.addObject(this.markersGroup);

    locations$.subscribe(r => {
      this.markersGroup.removeAll();
      r.forEach(p => {
        this.addMarker(p, map);
      });
    });
  }

  private addMarker(location: Location, map: any): void {
    const componentRef = this.getMarkerElement(location.status);
    const e = componentRef.location.nativeElement;

    const marker = this.hereMapService.getMarker(e, location);

    this.markersGroup.addObject(marker);

    componentRef.destroy(); // destroy reference once added to the map
  }

  private getMarkerElement(
    vehicleStatus: VehicleStatus
  ): ComponentRef<LocationPointerMarkerComponent> {
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
