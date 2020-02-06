import { Component, OnInit } from "@angular/core";
import { BankService } from "../shared/bank/bank.service";
import { Payment } from "../shared/bank/payment.model";
import { ItemEventData, ListView } from "tns-core-modules/ui/list-view";

import { AndroidInfoService } from "../shared/android/android-info.service";


import { Observable } from 'rxjs';

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    payment: Payment = new Payment();
    currentBalance: number = null;
    completedPayments: Payment[] = [];
    isLoading: boolean = false;

    constructor(private bankService: BankService, private androidInfoService: AndroidInfoService) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.bankService.getBalance().subscribe(
            (data) => {
                // setTimeout(() => {
                //     this.currentBalance = data.balance.amount;
                //     this.isLoading = false;
                // }, 1000);
                this.currentBalance = data.balance.amount;
                this.isLoading = false;
            }),
            (error) => { alert("Error Retrieving Balance"); this.isLoading = false; }
    }

    onMakePaymentTap(): void {
        if (this.validPayment()) {
            const deviceId = this.androidInfoService.getDeviceId();
            const geoResult = this.androidInfoService.getCurrentDeviceLocation().then(locationData => {
                this.payment.deviceId = deviceId;
                this.payment.locationLat = locationData.latitude;
                this.payment.locationLng = locationData.longitude;

                this.bankService.makePayment(this.payment).subscribe(
                    (data) => {
                        console.log(data);
                        this.currentBalance -= this.payment.amount;
                        this.completedPayments.unshift(this.payment);
                        this.payment = new Payment();
                    },
                    (error) => { alert("Error Making Payment") }
                );
            });
        } else {
            alert("Invalid payment payment must be greater than zero and you must have the required funds");
        }
    }

    private validPayment() {
        if (!this.payment.amount || this.payment.amount <= 0 || this.payment.amount > this.currentBalance) {
            return false;
        }
        return true;
    }
}
