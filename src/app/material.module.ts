import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatCardModule, MatSidenavModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule
  ],
  exports : [
    MatButtonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule
  ],
  declarations: []
})
export class MaterialModule { }
