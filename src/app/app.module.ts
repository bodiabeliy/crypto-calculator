import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
  
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { CryptoCurrencyService } from 'src/services/CryptoCurrencyService';
import { MatIconModule } from '@angular/material/icon';
  
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule, 
    FormsModule, 
    MatButtonModule,
    HttpClientModule
  ],
  providers: [CryptoCurrencyService],
  bootstrap: [AppComponent]
})
export class AppModule { }