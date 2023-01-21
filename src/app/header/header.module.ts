import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderTitleComponent } from './header-title/header-title.component';
import { HeaderFiltersComponent } from './header-filters/header-filters.component';

@NgModule({
  declarations: [HeaderComponent, HeaderTitleComponent, HeaderFiltersComponent],
  imports: [CommonModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
