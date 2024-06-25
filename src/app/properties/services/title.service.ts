import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
export class TitleService {
    private dataSource = new BehaviorSubject<string>('default message');
    currentData = this.dataSource.asObservable();

    changeTitle(data: string) {
        this.dataSource.next(data);
    }
}