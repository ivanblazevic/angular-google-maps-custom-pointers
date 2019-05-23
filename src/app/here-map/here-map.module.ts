import { ModuleWithProviders, NgModule } from '@angular/core';
import { HereMapComponent } from './here-map.component';
import { HereMapModuleConfig, HERO_MAP_CONFIG } from './here-map.config';

@NgModule({
  declarations: [HereMapComponent],
  exports: [HereMapComponent]
})
export class HereMapModule {
  static forRoot(config: HereMapModuleConfig): ModuleWithProviders {
    return {
      ngModule: HereMapModule,
      providers: [
        {
          provide: HERO_MAP_CONFIG,
          useValue: config
        },
        { provide: 'H', useValue: window['H'] }
      ]
    };
  }
}
