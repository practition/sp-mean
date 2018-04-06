import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found.component';
import { AbsPipe } from './abs.pipe';

@NgModule( {
  imports : [
    CommonModule,
    FormsModule
  ],
  declarations : [ NotFoundComponent, AbsPipe ],
  exports : [ CommonModule, FormsModule, AbsPipe ]
} )
export class SharedModule {
}
