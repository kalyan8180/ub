import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { TempService } from "src/app/temp.service";

@Component({
    selector: 'topnavbar',
    templateUrl: 'topnavbar.component.html'
})
export class Topnavbar {
    constructor(private authenticationService: AuthenticationService, private router: Router,private temp: TempService) { 

    }
    img=[]
    userName: string;
    ngOnInit() {
       
this.img=this.temp.getLogo()
              if(this.authenticationService.getAuthToken()) { 
            this.hideLogout = false;
        }
        
        
        console.log("image"+ this.img) 
        
    }

    private hideLogout: boolean = false;
    toggleNavigation(): void {
        jQuery("body").toggleClass("mini-navbar");
    }
    logout() {
        this.authenticationService.logout();
        this.hideLogout = true;
        this.router.navigate(['/login']);

    }

    isloggedIn() { 
        const sessionUser = sessionStorage.getItem('currentUser');
        if(sessionUser) { 
        this.userName = JSON.parse(sessionUser).userName;
        }
        return !!this.authenticationService.getAuthToken();
    }
}