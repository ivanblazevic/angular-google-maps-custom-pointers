import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { HereMapModuleConfig, HERO_MAP_CONFIG } from './here-map.config';

@Component({
    selector: 'here-map',
    templateUrl: './here-map.component.html',
    styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements OnInit, AfterViewInit {
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

    private platform: any;

    private map: any;

    constructor(@Inject(HERO_MAP_CONFIG) public config: HereMapModuleConfig, @Inject("H") public H: any) {}

    public ngOnInit() {
        this.platform = new this.H.service.Platform({
            app_id: this.config.appId,
            app_code: this.config.appCode,
            useHTTPS: true
        });
    }

    public ngAfterViewInit() {
        const defaultLayers = this.platform.createDefaultLayers();
        this.map = new this.H.Map(
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
