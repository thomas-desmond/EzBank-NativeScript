import { Injectable } from '@angular/core';
import { device } from "tns-core-modules/platform";
import * as Geolocation from 'nativescript-geolocation';

@Injectable({
    providedIn: 'root'
})
export class AndroidInfoService {

    constructor() { }


    public getDeviceId(): string {
        return device.uuid;
    }

    public getCurrentDeviceLocation(): Promise<Geolocation.Location> {
        return Geolocation.getCurrentLocation({});
    }
}