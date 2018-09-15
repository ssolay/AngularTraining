import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiResponseRecipientProfile } from '../../interfaces/api-response-recipient-profile.interface';
import { DataService } from '../data/data.service';
import { SecurityService } from '../../services/security/security.service';

@Injectable()
export class RecipientService {
  constructor(
    private dataService: DataService,
    private http: HttpClient,
    private securityService: SecurityService
  ) {}

  get(ficeCode: string): Observable<ApiResponseRecipientProfile> {
    const orderId = this.dataService.get().response.orderHeader.toOrderId;
    const url = `/api/recipient-organization/exchange-detail/${orderId}/${ficeCode}`;

    return this.http
      .get<ApiResponseRecipientProfile>(url)
      .pipe(catchError(error => this.securityService.catchResponse(error)));
  }
}
