import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit, OnDestroy {

  isActive: boolean = true;

  userIsAuthenticated: boolean = false;

  private authListenerSubs: Subscription;





  constructor(private cartService: CartService, private authService: AuthService) { }


  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }



  toggle() {
    return this.isActive === !this.isActive;
  }

   ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });




}

  onLogout() {
    this.authService.logout();
  }

}
