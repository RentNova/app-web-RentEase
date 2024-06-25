import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { Location } from "@angular/common";
import { TitleService } from './services/title.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  private location = inject(Location);
  private titleservice = inject(TitleService);
  private cdr = inject(ChangeDetectorRef)
  title:string = "";

  ngOnInit() {
    this.titleservice.currentData.subscribe(data => {
      this.title = data;
      this.cdr.detectChanges();
    });
  }

  goBack(){
    this.location.back();
  }
}
