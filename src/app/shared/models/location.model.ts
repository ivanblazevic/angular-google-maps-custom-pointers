export enum VehicleStatus {
  drive = 1,
  operate = 2,
  off = 3,
  error = 4
}

export interface Location {
  lat: number;
  lng: number;
  status: VehicleStatus;
}
