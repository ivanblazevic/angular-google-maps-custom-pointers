import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { VehicleStatus } from '../shared/models/location.model';

@Component({
  selector: 'location-pointer-marker',
  templateUrl: './location-pointer-marker.component.html',
  styleUrls: ['./location-pointer-marker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationPointerMarkerComponent {
  @Input()
  status: VehicleStatus;

  VehicleStatus = VehicleStatus;
}
