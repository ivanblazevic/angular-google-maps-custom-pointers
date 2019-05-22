import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HERO_MAP_CONFIG } from './here-map.config';

declare var H: any;

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit, AfterViewInit {
    @ViewChild("map")
    public mapElement: ElementRef;

    @Input()
    public lat: any;

    @Input()
    public lng: any;

    @Input()
    public width: any;

    @Input()
    public height: any;

    @Output()
    public initialized = new EventEmitter<any>();

    private platform: any;

    private map: any;

    constructor(@Inject(HERO_MAP_CONFIG) public config: any) {}

    public ngOnInit() {
        this.platform = new H.service.Platform({
            app_id: this.config.appId,
            app_code: this.config.appCode,
            useHTTPS: true
        });
    }

    public ngAfterViewInit() {
        const defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.normal.map,
            {
                zoom: 15,
                center: { lat: this.lat, lng: this.lng }
            }
        );
        this.initialized.emit(this.map);
    }

}
