import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export enum EquipmentStatus {
  no_data = 0,
  drive = 1,
  idle = 2,
  off = 3,
  operate = 4
}

@Component({
  selector: 'location-pointer-marker',
  templateUrl: './location-pointer-marker.component.html',
  styleUrls: ['./location-pointer-marker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationPointerMarkerComponent {
  @Input()
  status: EquipmentStatus;

  EquipmentStatus = EquipmentStatus;
}
