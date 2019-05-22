import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { HereMapService } from './here-map.service';

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements AfterViewInit {
    @ViewChild("map")
    public mapElement: ElementRef;

    @Input()
    public lat: number;

    @Input()
    public lng: number;

    @Input()
    public width: number;

    @Input()
    public height: number;

    @Output()
    public initialized = new EventEmitter<any>();

    constructor(private hereMapService: HereMapService) {}

    public ngAfterViewInit() {
        const center = {
            lat: this.lat,
            lng: this.lng
        }
        const map = this.hereMapService.initMap(this.mapElement.nativeElement, center);
        this.initialized.emit(map);
    }

}
