import { ElementRef, Inject, Injectable } from "@angular/core";
import { HereMapModuleConfig, HERO_MAP_CONFIG } from './here-map.config';

@Injectable({
  providedIn: "root"
})
export class HereMapService {

    constructor(@Inject(HERO_MAP_CONFIG) public config: HereMapModuleConfig, @Inject("H") public H: any) {}

    initMap(e: ElementRef, center: { lat: number, lng: number }): any {
        const platform = this.getPlatform();
        const defaultLayers = platform.createDefaultLayers();
        return new this.H.Map(
            e,
            defaultLayers.normal.map,
            {
                zoom: 15,
                center: {
                    lat: center.lat,
                    lng: center.lng
                }
            }
        );
    }

    private getPlatform(): any {
        return new this.H.service.Platform({
            app_id: this.config.appId,
            app_code: this.config.appCode,
            useHTTPS: true
        });
    }

}
