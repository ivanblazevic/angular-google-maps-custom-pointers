import { InjectionToken } from '@angular/core';

export interface HereMapModuleConfig {
    appId: string;
    appCode: string;
}

export const HERO_MAP_CONFIG = new InjectionToken<HereMapModuleConfig>('HereMapModuleConfig');
