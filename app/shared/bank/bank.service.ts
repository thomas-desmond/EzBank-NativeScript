import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BankService {

    private baseUrl: string = 'https://ezbanking.gear.host/api/Money';
    private headers: HttpHeaders;

    constructor(private httpClient: HttpClient) {
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    }

    public getBalance(): Observable<any> {
        return this.httpClient.get('https://ezbanking.gear.host/api/Money/Balance', { headers: this.headers });
    }

    public makePayment(payload): Observable<any> {
        return this.httpClient.post('https://ezbanking.gear.host/api/Money/Payment', payload);
    }
}
