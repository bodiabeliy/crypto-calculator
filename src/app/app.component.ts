import { AfterViewInit, Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';



import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CryptoCurrencyService } from 'src/services/CryptoCurrencyService';
  

  
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app-material3';
    
  protected cryptoCurrencies: any[] = [];
  protected investingPeriods: any[] = [
  {id:1, title:"1 month"}, {id:2, title:"3 months"},{id:3, title:"6 months"},{id:4, title:"12 months"},{id:5, title:"24 months"},
];

  
  public currentCryptoCurrency: FormControl = new FormControl();
  public filterCryptoCurrency: FormControl = new FormControl();
  public investingRange: FormControl = new FormControl();

  public filteredCryptoCurrencies: any = new ReplaySubject(1);

  public profit:number =0
  public timePeriod = 0
  
  @ViewChild('singleSelect', { static: true }) singleSelect: any;
  @ViewChild('singleInvest', { static: true }) singleInvest: any;

  
  protected _onDestroy = new Subject();

  constructor(private cryptoCurrencyService:CryptoCurrencyService) { 
  }
 
  ngOnInit() {
    this.cryptoCurrencyService.getCryptoCurrencies().subscribe(cryptocurrenciesArray => {
      this.cryptoCurrencies = cryptocurrenciesArray 
    })
    
    this.currentCryptoCurrency.setValue(this.cryptoCurrencies[0]);
    this.investingRange.setValue(this.investingPeriods[0]);

    this.filteredCryptoCurrencies.next(this.cryptoCurrencies.slice());
  
    this.filterCryptoCurrency.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filteredCryptos();
      });
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }
  ngAfterViewChecked() {
    this.filteredCryptos();
    
  }
  
  ngOnDestroy() {
    this._onDestroy.next(1);
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredCryptoCurrencies
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
          this.singleSelect.compareWith = (a:any, b: any) => a && b && a._id === b._id;
      });
  }

  protected filteredCryptos() {
    console.log(this.cryptoCurrencies);

    if (!this.cryptoCurrencies) {
      return;
    }
  
    let search = this.filterCryptoCurrency.value;
    
    if (!search) {      
      this.filteredCryptoCurrencies.next(this.cryptoCurrencies.slice());      
      this.profit = ((+this.currentCryptoCurrency.value.price * +this.currentCryptoCurrency.value.rating/100) /1000) * +this.investingRange.value.title.split(" ")[0] 
      return;
    } else {
      
      search = search.toLowerCase();
    }
  
    this.filteredCryptoCurrencies.next(
      this.cryptoCurrencies.filter(crypto => crypto.name.toLowerCase().indexOf(search) > -1)
    );
  }
  protected setNewCurrentCryptoCurrencyValue(data:any) {
    this.currentCryptoCurrency.value.price =  data.target.value
    this.profit = (+this.currentCryptoCurrency.value.price * +this.currentCryptoCurrency.value.rating/100) /1000  
  }
 protected investingPeriod(data:any) {
  console.log("wwsa", data);
  
 }
}