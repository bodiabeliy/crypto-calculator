import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:"root"
})
export class CryptoCurrencyService {
    constructor(private http:HttpClient) {}

    getCryptoCurrencies ():Observable<any[]> {
        return this.http.get<any[]>("https://cryptoon.online/api/coin/coins")
    }
}