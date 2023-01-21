import { NgModule } from '@angular/core';
import { HeaderComponent } from './header.component';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { HeaderFiltersComponent } from './header-filters/header-filters.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, HeaderTitleComponent, HeaderFiltersComponent],
  imports: [ReactiveFormsModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
