import { NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, UnaryFunction } from 'rxjs';
import firebase from 'firebase/app';
import { FirebaseOptions, FirebaseAppConfig } from '@angular/fire';
export declare type AuthPipeGenerator = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => AuthPipe;
export declare type AuthPipe = UnaryFunction<Observable<firebase.User | null>, Observable<boolean | any[]>>;
export declare const loggedIn: AuthPipe;
export declare class AngularFireAuthGuard implements CanActivate {
    private router;
    authState: Observable<firebase.User | null>;
    constructor(options: FirebaseOptions, nameOrConfig: string | FirebaseAppConfig | null | undefined, zone: NgZone, router: Router);
    canActivate: (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | import("@angular/router").UrlTree>;
}
export declare const canActivate: (pipe: AuthPipeGenerator) => {
    canActivate: (typeof AngularFireAuthGuard)[];
    data: {
        authGuardPipe: AuthPipeGenerator;
    };
};
export declare const isNotAnonymous: AuthPipe;
export declare const idTokenResult: import("rxjs").OperatorFunction<firebase.User, any>;
export declare const emailVerified: AuthPipe;
export declare const customClaims: UnaryFunction<Observable<firebase.User>, Observable<any>>;
export declare const hasCustomClaim: (claim: string) => AuthPipe;
export declare const redirectUnauthorizedTo: (redirect: any[]) => AuthPipe;
export declare const redirectLoggedInTo: (redirect: any[]) => AuthPipe;
