import {
  catchError,
  distinctUntilChanged,
  debounceTime,
  filter,
  map,
  takeUntil
} from 'rxjs/operators';
import { Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';

import { CommonValues } from '../../classes/common-values';
import { DialogTimeoutComponent } from '../../components/dialog-timeout/dialog-timeout.component';
import { TimeoutService } from '../../services/timeout/timeout.service';
import { Version } from '../../interfaces/version.interface';
import { VersionService } from '../../services/version/version.service';
import { StudentAuthorizationService } from '../../services/studentauthservice/studentauth.service';
import { SchoolService } from '../../services/school/school.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { AutocompleteOption } from '../../interfaces/autocomplete-option.interface';
import { BlockingIndicatorService } from '../../services/blocking-indicator/blocking-indicator.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'nsc-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss']
})
export class AppRootComponent implements OnInit {
  dialogWarning;
  route: string;
  sssRequestCheck: boolean;
  postAuthRequest: any;
  cookieExists: boolean;
  ficeCode: string;
  unsubscribe$ = new Subject();
  timeArr: any;
  school: any;
  values = {
    schools$: new BehaviorSubject(<AutocompleteOption[]>[]) // complete list for autocomplete to filter down;
  };
  accesscode: string;
  authorizationId: string;
  authTimestamp: number;
  authTimestampString: string;

  constructor(
    private commonValues: CommonValues,
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    private timeoutService: TimeoutService,
    private versionService: VersionService,
    private studentAuthService: StudentAuthorizationService,
    private schoolService: SchoolService,
    private blockingIndicatorService: BlockingIndicatorService
  ) { }

  ngOnInit() {
       this.sssRequestCheck = false;
    // display the version information for this build;
    this.versionService.get().subscribe((json: Version) => {
      console.log('build:', json.b);
      console.log('version:', json.v);
      console.log('timestamp:', json.t);
    });

    // Check if the user is authenticated to Welcome Page with the ficeCode
    this.isUserAuthenticatedtoWelcomePage();
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      // define the routes where the timer shouldn't start;
      const routesNoTimeout = [
        this.commonValues.routes.messageError,
        this.commonValues.routes.messageTimeout
      ];

      // update the route so the header can display the proper data in the proper layout;
      this.route = this.location.path().replace('/', '');

      // set the timeout on route change, so we dont have to set it on every route init function;
      // if the user isn't on the first page of the app;
      if (routesNoTimeout.indexOf(this.route) === -1) {
        this.timeoutService.startWarningCountdown();
      }
    });

    this.timeoutService.showWarning.subscribe((showDialog: boolean) => {
      if (showDialog) {
        this.displayWarning();
      } else if (this.dialogWarning) {
        this.dialogWarning.close();
      }
    });
  }
  isUserAuthenticatedtoWelcomePage() {
    /*    Call the Post Authorize API to check if the user is Authenticated
    *     Route it to school Welcome
    */
    this.generateAuthRequest();
    this.studentAuthService.postAuthorize(this.postAuthRequest).subscribe(
      (response: any) => {
          const jsonResponse = response.json();
          this.ficeCode = jsonResponse.ficeCode;
          this.sssRequestCheck = true;
          this.routeSchoolWelcome();
      },
      (err: HttpErrorResponse) => {
        return this.router.navigate([this.commonValues.routes.authenticationFailure]);
       }
    );
  }
    routeSchoolWelcome(): void {
    /*   Route it to School Welcome Page based on ficeCode
    */
    this.blockingIndicatorService.open();
    this.schoolService
      .get(this.ficeCode)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        window.setTimeout(() => {
          this.router.navigate([this.commonValues.routes.schoolWelcome]);
        }, this.commonValues.loading.delay);
      });
  }
  // on route change, scroll to top of page;
  // add a setTimeout so it'll run after the blocking indicator has been removed;
  onDeactivate() {
    window.setTimeout(() => window.scrollTo(0, 0));
  }
  // Generate empty auth request
  generateAuthRequest(): void
  {
    const authRequest: any = {
      'accessCode': this.accesscode,
      'authorizationId': this.authorizationId,
      'authTimestamp': this.authTimestamp
    };
    this.postAuthRequest = authRequest;
  }
  displayWarning(): void {
    // close any existing warning dialog before showing a new one;
    if (this.dialogWarning) {
      this.dialogWarning.close();
    }

    // show the new warning dialog;
    this.dialogWarning = this.dialog.open(DialogTimeoutComponent, {
      disableClose: true,
      width: '480px'
    });
  }
}
