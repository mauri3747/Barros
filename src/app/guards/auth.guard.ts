import { Inject, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SESSION_STORAGE, WebStorageService } from 'ngx-webstorage-service';
import { Observable } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { ValidarResourceService } from '../service/validar-resource.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  token:string;
  constructor(private _router:Router, @Inject(SESSION_STORAGE) private _storage: WebStorageService, private _sanitizer: DomSanitizer ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.token = this._storage.get("token");
      if(this.token != null){
        this._sanitizer.bypassSecurityTrustResourceUrl("/principal");
      //this._router.navigateByUrl("/principal");
      //this._router.navigate(["/principal"]);
      return true;
    }
     
      else
      {
        this._router.navigate(["/login"]);
        return false;
      }
  }
  
}
