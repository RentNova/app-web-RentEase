import { Component, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  public url: string ='';
  
  private session = inject(SessionService);
  private router = inject(Router);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    });
    
  }
  isLogged(): boolean{
    return this.session.isAuthenticated();
  }
  closeSession(){
    this.session.logout();
  }
  shouldShowHeader(): boolean {
    return !this.url.includes('/auth');
  }
}
