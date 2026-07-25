import { Component, Inject, OnInit, PLATFORM_ID, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { BrowserStorage } from '../services/browser-storage';


// Original Service Imports

import { Enquiry } from '../home/home';
import { CityService } from '../city.service';
import { FilterService } from '../filter.service';
import { DataService } from '../data.service';
// Swal lazy-loaded


// Note: @ng-toolkit/universal is largely deprecated in modern Angular.
// We use a generic InjectionToken for WINDOW if it's not provided globally.
// import { WINDOW } from '@ng-toolkit/universal'; 

declare var $: any;
// declare var swal: any;

@Component({
  selector: 'app-service-form',
  standalone: true, // Modern Angular 20 standard
  imports: [CommonModule, ReactiveFormsModule], // Required for [ngIf] and [formGroup]
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css'],
})
export class ServiceFormComponent implements OnInit {

  @ViewChild('otpContainer', { read: ViewContainerRef })
  otpContainer!: ViewContainerRef;

  Visiblebrochure = true;

  user = new Enquiry();
  cityname: any;
  cityid: any;
  pageOrigin: any;
  // Using '!' or initializing to satisfy strict mode in modern Angular
  serviceForm!: FormGroup;

  interiors = false;
  homeLoan = false;
  realEstate = false;
  propertyManagement = false;
  homeInspection = false;
  legal = false;
  vastu = false;
  floorPlan = false;

  showTextArea = true;
  message: any;
  bankId: any;
  propertyTypeId: any;
  interiorTypeId: any;
  budgetId: any;
  loanAmount: any;
  interestRate: any;
  serviceId: any;
  ename: any;
  selecetdService: any;

  bankLists: any[] = [];
  loadComponent = false;
  otpValidationComponent: any;

  constructor(
    public Service: DataService,
    private router: Router,
    public cityservice: CityService,
    public Filter: FilterService,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
    // @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) private platformId: object, // Added for safe SSR checks
    private storage: BrowserStorage,
  ) {
    this.Service.mouseenterlisten1().subscribe((m: any) => {
      this.test();
    });
    this.Service.mouseenterlistenOtp().subscribe((m: any) => {
      this.ServiceFromSubmit();
    });
  }

  ngOnInit(): void {
    this.serviceForm = this.fb.group({
      userName: ['', [Validators.required, this.validateInput.bind(this)]],
      userNumber: ['', [Validators.required]],
      serviceMessage: ['', [Validators.required, this.validateInput.bind(this)]],
      propertyTypeId: [''],
      interiorTypeId: [''],
      budgetId: [''],
      enteredLoanAmount: [''],
      bankId: [''],
    });
  }
 private async getSwal() {
    const { default: Swal } = await import('sweetalert2');
    return Swal;
  }

  ServiceFromSubmit() {
    let params = {
      number: this.user.emobile,
      mail: this.user.email,
      name: this.user.ename,
      message: this.message,
      bank: this.bankId,
      property_type: this.propertyTypeId,
      interior_type: this.interiorTypeId,
      budget: this.budgetId,
      loan_amount: this.loanAmount,
      interesr_rate: this.interestRate,
      services_id: this.serviceId,
    };

    this.Service.callForExpertService(params).subscribe(async (success: any) => {
      if (success['status'] === 'True') {
         const Swal = await this.getSwal();
      Swal.fire({
          text: 'We Will Intimate you soon!',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
        });

        this.selecetdService = '';
        this.user.name = '';
        this.user.number = '';
        this.user.email = '';
        this.message = '';
        this.bankId = '';
        this.propertyTypeId = '';
        this.interiorTypeId = '';
        this.budgetId = '';
        this.loanAmount = '';
        this.serviceId = '';

        $('.modal_close').click();

        this.serviceForm.reset({
          propertyTypeId: '',
          interiorTypeId: '',
          budgetId: '',
          enteredLoanAmount: '',
          bankId: '',
        });

        $('body').removeClass('bodyoverlay');
        $('#enameService').attr('placeholder', 'Enter Your Name');
        $('#emobileService').attr('placeholder', 'Enter Your Number');
        $('#messageService').attr('placeholder', 'Type Your Queries');
      }
    });
  }

  validateInput(control: AbstractControl): ValidationErrors | null {
    const regExp = /^(?!\s)(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s]+$/;
    if (regExp.test(control.value)) {
      return null;
    } else {
      return { invalidInput: true };
    }
  }

  closeModal() {

    // ($('#myModal_services') as any).modal('hide');
    document.getElementById('myModal_services').style.display = 'none';
    $('body').removeClass('modal-open');
    // alert('hi')
    // this.window.location.hash = '';

    this.serviceForm.reset({
      propertyTypeId: '',
      interiorTypeId: '',
      budgetId: '',
      enteredLoanAmount: '',
      bankId: '',
    });

    $('#enameService').focus().css('border-color', '#9f9f9f');
    $('#emobileService').focus().css('border-color', '#9f9f9f');
    $('#messageService').focus().css('border-color', '#9f9f9f');
  }

  test() {
    this.selecetdService = this.Filter.selectedService;

    this.interiors = false;
    this.homeLoan = false;
    this.realEstate = false;
    this.propertyManagement = false;
    this.homeInspection = false;
    this.legal = false;
    this.vastu = false;
    this.floorPlan = false;

    if (this.selecetdService == '7') {
      this.interiors = true;
      this.serviceId = 7;
      this.showTextArea = false;
      this.serviceForm.get('propertyTypeId').setValidators([Validators.required]);
      this.serviceForm.get('interiorTypeId').setValidators([Validators.required]);
      this.serviceForm.get('budgetId').setValidators([Validators.required]);
    }
    if (this.selecetdService == '8') {
      this.homeLoan = true;
      this.serviceId = 8;
      this.showTextArea = false;

      this.Service.getBankLists().subscribe((lists: any) => {
        this.bankLists = lists['BankDetails'];
      });

      this.serviceForm.get('enteredLoanAmount').setValidators([Validators.required]);
      this.serviceForm.get('bankId').setValidators([Validators.required]);
    }
    if (this.selecetdService == '2') {
      this.realEstate = true;
      this.serviceId = 2;
      this.showTextArea = true;
    }
    if (this.selecetdService == '6') {
      this.propertyManagement = true;
      this.serviceId = 6;
      this.showTextArea = true;
    }
    if (this.selecetdService == '5') {
      this.homeInspection = true;
      this.serviceId = 5;
      this.showTextArea = true;
    }
    if (this.selecetdService == '4') {
      this.legal = true;
      this.serviceId = 4;
      this.showTextArea = true;
    }
    if (this.selecetdService == '3') {
      this.vastu = true;
      this.serviceId = 3;
      this.showTextArea = true;
    }
    if (this.selecetdService == '1') {
      this.floorPlan = true;
      this.serviceId = 1;
      this.showTextArea = true;
    }

    // Modern Angular requires updating value and validity after changing validators
    this.serviceForm.updateValueAndValidity();
  }

  getPropertyType(event: any) {
    this.propertyTypeId = event.target.value;
  }
  getInteriorType(event: any) {
    this.interiorTypeId = event.target.value;
  }
  getBudget(event: any) {
    this.budgetId = event.target.value;
  }
  getLoanAmount(event: any) {
    this.loanAmount = event.target.value;
  }
  getBankSelected(event: any) {
    this.bankId = event.target.value;
  }

  async callServiceApi(): Promise<boolean> {
    let firstInvalidElement: any = null;

    if ($('#enameService').val() === '') {
      $('#enameService')
        .focus()
        .css('border-color', 'red')
        .attr('placeholder', 'Please Enter Name');
      firstInvalidElement = $('#enameService')[0];
      firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    } else {
      const enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test(String($('#enameService').val()))) {
        $('#enameService').removeAttr('style');
      } else {
        $('#enameService')
          .focus()
          .css('border-color', 'red')
          .attr('placeholder', 'Please enter valid name')
          .val('');
        firstInvalidElement = $('#enameService')[0];
        firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }
    }

    if ($('#emobileService').val() === '') {
      $('#emobileService')
        .focus()
        .css('border-color', 'red')
        .attr('placeholder', 'Please Enter Phone Number');
      firstInvalidElement = $('#emobileService')[0];
      firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    } else {
      const emobileno = /^[0-9]{10}$/;
      if (emobileno.test(String($('#emobileService').val()))) {
        $('#emobileService').removeAttr('style');
      } else {
        $('#emobileService')
          .focus()
          .css('border-color', 'red')
          .attr('placeholder', 'Please enter valid contact number')
          .val('');
        firstInvalidElement = $('#emobileService')[0];
        firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }
    }

    if ($('#messageService').val() === '') {
      $('#messageService')
        .focus()
        .css('border-color', 'red')
        .attr('placeholder', 'Please Enter Message');
      firstInvalidElement = $('#messageService')[0];
      firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return false;
    } else {
      const messageFilter = /^(?!\s*$)[^\s].*[^\s]$/;
      if (messageFilter.test(String($('#messageService').val()))) {
        $('#messageService').removeAttr('style');
      } else {
        $('#messageService')
          .focus()
          .css('border-color', 'red')
          .attr('placeholder', 'Please enter valid Message')
          .val('');
        firstInvalidElement = $('#messageService')[0];
        firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }
    }

    if (this.selecetdService === '7') {
      if ($('#propertyTypeId').val() == null) return false;
      if ($('#interiorTypeId').val() == null) return false;
      if ($('#budgetId').val() == null) return false;
    }

    if (this.selecetdService === '8') {
      if ($('#enteredLoanAmount').val() == null) return false;
      if ($('#bankId').val() == null) return false;
    }
    ($('#myModal_services') as any).modal('hide');
    $('body').removeClass('modal-open');
    await this.handleOtpValidation();

    return true;
  }


  async handleOtpValidation(): Promise<void> {
    const loginId = this.storage?.getItem('loginID'); // from BrowserStorageService

    if (!loginId) {
      const otpElement = this.document.getElementById('otpValidate');
      if (otpElement) {
        otpElement.style.display = 'block';
      }

      if (!this.otpValidationComponent) {
        const { OtpValidationComponent } = await import(
          '../otp-validation/otp-validation.component'
        );

        this.otpValidationComponent = OtpValidationComponent;
        this.otpContainer.clear();
        this.otpContainer.createComponent(OtpValidationComponent);
      }


      const modal = this.document.querySelector('.modal-login') as HTMLElement;
      if (modal) {
        modal.style.zIndex = '123456';
      }
      setTimeout(() => {
        const closeBtn = this.document.getElementById('enquiryInfoClose');
        closeBtn.click();
      }, 500);

    } else {
      this.ServiceFromSubmit();
    }
  }

}