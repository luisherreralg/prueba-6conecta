import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { HeaderModule } from './header/header.module';
import { PokemonTableModule } from './pokemon-table/pokemon-table.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    HttpClientModule,
    HeaderModule,
    PokemonTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
