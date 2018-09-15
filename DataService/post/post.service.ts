import * as moment from 'moment';
import { catchError, tap } from 'rxjs/operators';
import { filter as _filter, get as _get } from 'lodash';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ApiPostConsent } from '../../interfaces/api-post-consent.interface';
import { ApiPostPayment } from '../../interfaces/api-post-payment.interface';
import { ApiPostRecipient, Attachment } from '../../interfaces/api-post-recipient.interface';
import { ApiPostStudent } from '../../interfaces/api-post-student.interface';
import { ApiResponseOrder } from '../../interfaces/api-response-order.interface';
import { ApiResponseRecipientDetails } from '../../interfaces/api-response-recipient-profile.interface';
import { CheckApiResponse } from '../../classes/check-api-response';
import { CommonValues } from '../../classes/common-values';
import { DataService } from '../../services/data/data.service';
import { SecurityService } from '../../services/security/security.service';

@Injectable()
export class PostService {
  defaultState = 'International';
  defaultZip = this.commonValues.defaultZip;

  constructor(
    private checkApiResponse: CheckApiResponse,
    private commonValues: CommonValues,
    private dataService: DataService,
    private http: HttpClient,
    private router: Router,
    private securityService: SecurityService
  ) {}

  saveResponse(json: ApiResponseOrder): void {
    if (this.checkApiResponse.isValid(json)) {
      this.dataService.save({
        response: json
      });
    } else {
      throw new Error('Error found in valid response JSON');
    }
  }

  saveToken(token: string): void {
    if (token) {
      this.dataService.save({
        jsonWebToken: token
      });
    } else {
      throw new Error('Missing JWT value');
    }
  }

  student(): Observable<HttpResponse<ApiResponseOrder>> {
    const data = this.dataService.get();
    const requestor = data.form.requestor;
    const dateOfBirth = moment(requestor.personal.dob, this.commonValues.dateFormat.input).format(
      this.commonValues.dateFormat.output
    );
    const attendSchoolInfoData = requestor.attend.programs
      ? requestor.attend.programs.map(program => {
          return {
            attendSchool: program.program ? this.commonValues.api.yes : null,
            attendSchlBeg: program.yearFrom || null,
            attendSchlEnd: program.yearTo || null
          };
        })
      : null;
    const postData: ApiPostStudent = {
      orderHeader: {
        archiveStudent: requestor.personal.enrolledBefore || this.commonValues.api.no,
        feePathTypeAnswer: requestor.personal.path,
        integrationHoldActivityId: _get(data.studentProfile, 'integrationHoldActivityId', null),
        toScprofilId: this.dataService.get().schoolProfile.toScprofilId
      },
      student: {
        attendBeginYear: requestor.personal.enrolledYearFrom,
        attendSchoolInfo: attendSchoolInfoData,
        attendEndYear: requestor.personal.enrolledYearTo,
        city: requestor.contact.city,
        country: requestor.contact.country,
        currEnrolled: requestor.personal.enrolledCurrently,
        dateOfBirth: dateOfBirth,
        degreeInfo: [
          {
            degreeTitle: requestor.attend.degree1,
            awardYear: requestor.attend.year1
          },
          {
            degreeTitle: requestor.attend.degree2,
            awardYear: requestor.attend.year2
          },
          {
            degreeTitle: requestor.attend.degree3,
            awardYear: requestor.attend.year3
          },
          {
            degreeTitle: requestor.attend.degree4,
            awardYear: requestor.attend.year4
          }
        ],
        email: requestor.contact.emailPrimary,
        firstName: requestor.personal.nameFirst,
        lastName: requestor.personal.nameLast,
        middleName: requestor.personal.nameMiddle,
        phone: requestor.contact.phone,
        schlFirstName: requestor.personal.nameChangedFirst,
        schlLastName: requestor.personal.nameChangedLast,
        schlMiddleName: requestor.personal.nameChangedMiddle,
        ssn: requestor.personal.ssnPrimary ? requestor.personal.ssnPrimary.replace(/-/g, '') : null,
        state: requestor.contact.state || this.defaultState,
        street1: requestor.contact.addressLine1,
        street2: requestor.contact.addressLine2,
        studentId: requestor.personal.studentIdPrimary,
        textMessging: {
          mobilePhoneNumber:
            requestor.contact.textUpdates === this.commonValues.api.yes
              ? requestor.contact.phone
              : null,
          sendTxtMsg: requestor.contact.textUpdates
        },
        updateSchoolRec: requestor.contact.updateRecords,
        verifiedStudentId: _get(data.studentProfile, 'verifiedStudentId', null),
        zip: requestor.contact.zip || this.defaultZip
      }
    };

    // cf. https://angular.io/guide/http#reading-the-full-response
    // need the full response on this request so we can access the headers, and save the JWT value;
    // the JWT value will be used on subsequent API calls;
    return this.http.post<ApiResponseOrder>('/api/order', postData, { observe: 'response' }).pipe(
      tap(resp => {
        this.saveToken(resp.headers.get('authorization'));
        this.saveResponse(resp.body);
      }),
      catchError(error => this.securityService.catchResponse(error))
    );
  }

  getAttachments(recipient): Attachment[] {
    const uploadedFiles: Attachment[] = [];
    Array.from(recipient.attachments).forEach((uploadedFile: any, index: number) => {
      if (uploadedFile.attachmentResponse && uploadedFile.attachmentResponse.status === 'success'){
        const tempAttachment = {
          fileIdentifier: uploadedFile.attachmentResponse.fileIdentifier,
          originalFileName: uploadedFile.attachmentResponse.originalFileName,
          contentType: uploadedFile.attachmentResponse.contentType
        };
        uploadedFiles.push(tempAttachment);
      }
    });
    return (uploadedFiles.length > 0) ? uploadedFiles : null;
  }

  getRecipientEmail(recipient): string{
    if (recipient.who.sendElectronically === this.commonValues.api.yes){
      // set recipient email to the one entered on the recipient/select page if the user answered yes to send electronically
      // regardless if there was a match or not, this allows us to reuse the email and avoid going to delivery info page
      return recipient.who.emailPrimary;
    }
    return recipient.address.emailPrimary;
  }

  recipients(): Observable<ApiResponseOrder> {
    const orderId = this.dataService.get().response.orderHeader.toOrderId;
    const formRecipients = this.dataService.get().form.recipients;
    const postData: ApiPostRecipient[] = [];
    const mailDeliveryMethods = [
      this.commonValues.api.mail,
      this.commonValues.api.faxExpress,
      this.commonValues.api.overnight,
      this.commonValues.api.faxMail
    ];

    // loop through the entered recipients to create the payload to send to the API;
    formRecipients.forEach((recipient, index) => {
      const deliveryMethod = this.dataService.getDeliveryMethodObject(
        recipient.delivery.deliveryMethod
      );

      // determine which value to return for State and ZIP;
      // if the user didn't enter a value, we are to pass the defined value - for certain delivery methods;
      const deliveryMethodType = deliveryMethod.deliveryMethodType;
      const defaultState =
        mailDeliveryMethods.indexOf(deliveryMethodType) > -1 ? this.defaultState : null;
      const defaultZip =
        mailDeliveryMethods.indexOf(deliveryMethodType) > -1 ? this.defaultZip : null;

      // return either the department or subnetwork object (both are the same);
      // otherwise an empty object for _get() to find nothing in;
      const getDepartment = (): ApiResponseRecipientDetails => {
        const departments = _get(recipient.who, 'recipientResponse.recipientDepartments', []);
        const recipientResponseDepartment = _filter(departments, {
          deptId: recipient.who.department
        });

        return recipientResponseDepartment.length ? recipientResponseDepartment[0] : null;
      };
      const getSubNetwork = (): ApiResponseRecipientDetails => {
        return _get(recipient.who, 'recipientResponse.subNetwork', null);
      };
      const getExchangeDataObject = (): ApiResponseRecipientDetails => {
        return getDepartment() || getSubNetwork();
      };

      // if the recipient isn't defined in the form data model, then the address fields were skipped, and recipient was never set;
      // if that's the case, then get the value here (pass in the index so the getRecipient() knows which array item to reference);
      // this will happen with ETX recipients;
      const organization = recipient.address.recipient || this.dataService.getRecipient(index);

      const recipientItem: ApiPostRecipient = {
        amcasId: recipient.who.aamcAccountNumber,
        amcasTranscriptId: recipient.who.amcasTranscriptIdNumber,
        attachments: this.getAttachments(recipient),
        attention: recipient.address.attention || _get(getExchangeDataObject(), 'deptName', null),
        city: recipient.address.city,
        country: recipient.address.country,
        degreeTitle: recipient.delivery.program,
        deliveryMethodId: recipient.delivery.deliveryMethod,
        deptProcessingOption: _get(getExchangeDataObject(), 'subNetworkType', null),
        email: this.getRecipientEmail(recipient),
        etxDeliveryFileFormat: (recipient.who.matchedUboxEntry) ? recipient.who.matchedUboxEntry.fileFormat : _get(getExchangeDataObject(), 'fileFormat', null),
        etxDeptRecipientId: (recipient.who.matchedUboxEntry) ? recipient.who.matchedUboxEntry.etxDeptId : _get(getExchangeDataObject(), 'ftpAccountName', null),
        exchangeNetworkTypeCode: _get(recipient.who.recipientResponse, 'exchangeNetworkType', null),
        etxRgtryUboxId: (recipient.who.matchedUboxEntry) ? recipient.who.matchedUboxEntry.etxRgtryUboxId : null,
        sendToSchoolElectronic: (recipient.who.sendElectronically) ? recipient.who.sendElectronically : null,
        ficeCode: recipient.who.recipientFiceCode,
        liaisonCasId: recipient.who.casId,
        lsacId: recipient.who.lsacAccountNumber,
        organization: organization,
        phone: recipient.address.phone,
        processingOption: recipient.delivery.transcriptWhen,
        quantityId: recipient.delivery.howMany,
        sendToType: recipient.who.recipientType,
        specialInstr: recipient.delivery.specialInstructions,
        state: recipient.address.state || defaultState,
        street1: recipient.address.addressLine1,
        street2: recipient.address.addressLine2,
        term: recipient.delivery.ungradedTerm,
        toOrderId: orderId,
        xcriptPurposeId: recipient.delivery.transcriptPurpose,
        xcriptTypeId: recipient.delivery.transcriptType,
        zip: recipient.address.zip || defaultZip
      };

      postData.push(recipientItem);
    });

    return this.http.post<ApiResponseOrder>('/api/recipient-organization', postData).pipe(
      tap(json => this.saveResponse(json)),
      catchError(error => this.securityService.catchResponse(error))
    );
  }

  payment(): Observable<ApiResponseOrder> {
    const orderId = this.dataService.get().response.orderHeader.toOrderId;
    const payment = this.dataService.get().form.payment;
    const postData: ApiPostPayment = {
      billCity: payment.city,
      billCountry: payment.country,
      billPhone: null,
      billState: payment.state,
      billStreet1: payment.addressLine1,
      billStreet2: payment.addressLine2,
      billZip: payment.zip,
      ccAmount: this.dataService.get().response.orderHeader.totalFee,
      ccExpiryMonth: payment.expirationMonth,
      ccExpiryYear: `20${payment.expirationYear}`,
      ccName: payment.name,
      ccType: payment.ccType,
      payeezyToken: payment.payeezyToken
    };

    return this.http.post<ApiResponseOrder>(`/api/payment/${orderId}`, postData).pipe(
      tap(json => this.saveResponse(json)),
      catchError(error => this.securityService.catchResponse(error))
    );
  }

  consent(): Observable<ApiResponseOrder> {
    const orderId = this.dataService.get().response.orderHeader.toOrderId;
    const postData: ApiPostConsent = {
      lines: this.dataService.get().form.consent.signature.lines
    };

    return this.http.post<ApiResponseOrder>(`/api/consent/${orderId}`, postData).pipe(
      tap(json => this.saveResponse(json)),
      catchError(error => this.securityService.catchResponse(error))
    );
  }
}
