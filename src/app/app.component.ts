import { AfterViewInit, Component, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';



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
  
  public currentCryptoCurrency: FormControl = new FormControl();
  public filterCryptoCurrency: FormControl = new FormControl();
  public filteredCryptoCurrencies: any = new ReplaySubject(1);

  public profit:number =0
  
  @ViewChild('singleSelect', { static: true }) singleSelect: any;
  
  protected _onDestroy = new Subject();

  constructor(private cryptoCurrencyService:CryptoCurrencyService) { 
  }
 
  ngOnInit() {
   
    
    this.cryptoCurrencyService.getCryptoCurrencies().subscribe(cryptocurrenciesArray => {
      this.cryptoCurrencies = cryptocurrenciesArray 
    })
    this.currentCryptoCurrency.setValue(this.cryptoCurrencies[1]);
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
    if (!this.cryptoCurrencies) {
      return;
    }
  
    let search = this.filterCryptoCurrency.value;
    
    if (!search) {
      this.filteredCryptoCurrencies.next(this.cryptoCurrencies.slice());
      this.profit = (+this.currentCryptoCurrency.value.total_supply * +this.currentCryptoCurrency.value.rating/100) /100    
      return;
    } else {
      
      search = search.toLowerCase();
    }
  
    this.filteredCryptoCurrencies.next(
      this.cryptoCurrencies.filter(crypto => crypto.name.toLowerCase().indexOf(search) > -1)
    );
  }
  protected setNewCurrentCryptoCurrencyValue(data:any) {
    this.currentCryptoCurrency.value.total_supply =  data.target.value
    this.profit = (+this.currentCryptoCurrency.value.total_supply * +this.currentCryptoCurrency.value.rating/100) /100    
  }
 
}