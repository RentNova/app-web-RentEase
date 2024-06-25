import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';

import { NgApexchartsModule } from "ng-apexcharts";
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgApexchartsModule,
    MaterialModule
  ]
})
export class ReportModule { }
