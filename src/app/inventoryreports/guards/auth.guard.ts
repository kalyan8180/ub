import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from "src/app/services/authentication.service";
import { Navigation } from "src/app/navigation/navigation.component";
// import { AuthenticationService } from '../services/authentication.service';
// import { Navigation } from '../navigation/navigation.component';

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authenticationService: AuthenticationService, private navigation: Navigation) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('currentUser')) {
            // logged in so return true
            let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            this.authenticationService.sendRole(currentUser['role']);
            if(currentUser) {
                let userPages: any[] = this.navigation.getNavigationPages(currentUser['role']);
                let isValidRoute: boolean = false;
                if(userPages) {
                    isValidRoute = userPages.filter(page => page.link.substr(1) == state.url || state.url.indexOf(page.link.substr(1)) != -1).length>0;
                }
                if(!isValidRoute) {
                let route:string = userPages[0].link.substr(1);    
                this.router.navigateByUrl(route);
                return true;
                } else { 
                return true;
                }
            }
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}