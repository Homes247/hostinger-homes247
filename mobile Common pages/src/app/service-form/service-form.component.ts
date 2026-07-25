import { Component, Inject, OnInit } from '@angular/core';
import { ProplistingService } from '../proplisting.service';
import { Enquiry } from '../home/home';
import { Router } from '@angular/router';
import { CityService } from '../city.service';
import { FilterService } from '../filter.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { WINDOW } from '@ng-toolkit/universal';

declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css'],
})
export class ServiceFormComponent implements OnInit {
  Visiblebrochure = true;

  user = new Enquiry();
  cityname: any;
  cityid: any;
  pageOrigin: any;
  serviceForm: FormGroup;

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

  constructor(
    public Service: DataService,
    private router: Router,
    public cityservice: CityService,
    public Filter: FilterService,
    private fb: FormBuilder,
    @Inject(WINDOW) private window: Window
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
      userName: ['', [Validators.required, this.validateInput]],
      userNumber: ['', [Validators.required]],
      serviceMessage: ['', [Validators.required, this.validateInput]],
      propertyTypeId: [''],
      interiorTypeId: [''],
      budgetId: [''],
      enteredLoanAmount: [''],
      bankId: [''],
    });
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

    this.Service.callForExpertService(params).subscribe((success) => {
      if (success['status'] === 'True') {
        swal({
          text: 'We Will Intimate you soon!',
          type: 'success',
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
        // this.interestRate = '';
        this.serviceId = '';
        $('.modal_close').click();
        this.serviceForm.reset({
          propertyTypeId: '',
          interiorTypeId: '',
          budgetId: '',
          enteredLoanAmount: '',
          // expectedInterest: '',
          bankId: '',
        });

        $('body').removeClass('bodyoverlay');
        $('#enameService').attr('placeholder', 'Enter Your Name');
        // $('#eemailService').attr('placeholder', 'Enter Your Email ID')
        $('#emobileService').attr('placeholder', 'Enter Your Number');
        $('#messageService').attr('placeholder', 'Type Your Queries');
      }
    });
  }
  validateInput(control) {
    const regExp = /^(?!\s)(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s]+$/;
    if (regExp.test(control.value)) {
      return null; // Validation passes
    } else {
      return { invalidInput: true }; // Validation fails
    }
  }

  closeModal() {
    $('#myModal_services').css('display', 'none');
    // ($('#myModal_services') as any).modal('hide');
    $('body').removeClass('modal-open');


    window.location.hash = '';

    this.serviceForm.reset({
      propertyTypeId: '',
      interiorTypeId: '',
      budgetId: '',
      enteredLoanAmount: '',
      // expectedInterest: '',
      bankId: '',
    });

    $('#enameService').focus().css('border-color', '#9f9f9f');
    $('#emobileService').focus().css('border-color', '#9f9f9f');
    // $('#eemailService').focus().css('border-color', '#9f9f9f');
    $('#messageService').focus().css('border-color', '#9f9f9f');
  }

  bankLists = [];

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
      this.serviceForm
        .get('propertyTypeId')
        .setValidators([Validators.required]);
      this.serviceForm
        .get('interiorTypeId')
        .setValidators([Validators.required]);
      this.serviceForm.get('budgetId').setValidators([Validators.required]);
    }
    if (this.selecetdService == '8') {
      this.homeLoan = true;
      this.serviceId = 8;
      this.showTextArea = false;

      this.Service.getBankLists().subscribe((lists) => {
        this.bankLists = lists['BankDetails'];
      });

      this.serviceForm
        .get('enteredLoanAmount')
        .setValidators([Validators.required]);
      // this.serviceForm.get('expectedInterest').setValidators([Validators.required]);
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
  }

  getPropertyType(event) {
    const propertyTypeValue = event.target.value;
    this.propertyTypeId = propertyTypeValue;
  }
  getInteriorType(event) {
    const interiorTypeValue = event.target.value;
    this.interiorTypeId = interiorTypeValue;
  }
  getBudget(event) {
    const budgetValue = event.target.value;
    this.budgetId = budgetValue;
  }
  getLoanAmount(event) {
    const loanAmountValue = event.target.value;
    this.loanAmount = loanAmountValue;
  }
  // getExpectedInterest(event){
  //   const interestValue = event.target.value;
  //   this.interestRate = interestValue

  // }

  getBankSelected(event) {
    const bankIdValue = event.target.value;
    this.bankId = bankIdValue;
  }

  loadComponent = false;
  otpValidationComponent: any;
  callServiceApi() {
    // 



    let firstInvalidElement = null;
    if ($('#enameService').val() === '') {
      $('#enameService')
        .focus()
        .css('border-color', 'red')
        .attr('placeholder', 'Please Enter Name');
      firstInvalidElement = firstInvalidElement || $('#enameService')[0];
      if (firstInvalidElement) {
        firstInvalidElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        return false;
      }

      return false;
    } else {
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#enameService').val())) {
        $('#enameService').removeAttr('style');
      } else {
        $('#enameService')
          .focus()
          .css('border-color', 'red')
          .attr('placeholder', 'Please enter valid name')
          .val('');
        firstInvalidElement = firstInvalidElement || $('#enameService')[0];
        if (firstInvalidElement) {
          firstInvalidElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          return false;
        }
        return false;
      }
    }

    if ($('#emobileService').val() === '') {
      $('#emobileService')
        .focus()
        .css('border-color', 'red')
        .attr('placeholder', 'Please Enter Phone Number');
      firstInvalidElement = firstInvalidElement || $('#emobileService')[0];
      if (firstInvalidElement) {
        firstInvalidElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        return false;
      }
      return false;
    } else {
      var emobileno = /^[0-9]{10}$/;
      if (emobileno.test($('#emobileService').val())) {
        $('#emobileService').removeAttr('style');
      } else {
        $('#emobileService')
          .focus()
          .css('border-color', 'red')
          .attr('placeholder', 'Please enter valid contact number')
          .val('');
        firstInvalidElement = firstInvalidElement || $('#emobileService')[0];
        if (firstInvalidElement) {
          firstInvalidElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          return false;
        }
        return false;
      }
      // setTimeout(() => {
      //   $('#enquiryInfoClose').click()
      // }, 500);

    }

    // if ($('#eemailService').val() == '') {
    //   $('#eemailService')
    //     .focus()
    //     .css('border-color', 'red')
    //     .attr('placeholder', 'Please Enter Email-id');
    //     firstInvalidElement = firstInvalidElement || $('#eemailService')[0];
    //     if (firstInvalidElement) {
    //       firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //       return false;
    //   }
    //   return false;
    // } else {
    //   var emaill = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    //   if (emaill.test($('#eemailService').val())) {
    //     $('#eemailService').removeAttr('style');
    //   } else {
    //     $('#eemailService')
    //       .focus()
    //       .css('border-color', 'red')
    //       .attr('placeholder', 'Please enter valid email-id')
    //       .val('');
    //       firstInvalidElement = firstInvalidElement || $('#eemailService')[0];
    //       if (firstInvalidElement) {
    //         firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    //         return false;
    //     }
    //     return false;
    //   }
    // }

    if ($('#messageService').val() === '') {
      $('#messageService')
        .focus()
        .css('border-color', 'red')
        .attr('placeholder', 'Please Enter Message');
      firstInvalidElement = firstInvalidElement || $('#messageService')[0];

      if (firstInvalidElement) {
        firstInvalidElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        return false;
      }
      return false;
    } else {
      var enameFilter = /^(?!\s*$)[^\s].*[^\s]$/;
      if (enameFilter.test($('#messageService').val())) {
        $('#messageService').removeAttr('style');
      } else {
        $('#messageService')
          .focus()
          .css('border-color', 'red')
          .attr('placeholder', 'Please enter valid Message')
          .val('');
        firstInvalidElement = firstInvalidElement || $('#messageService')[0];

        if (firstInvalidElement) {
          firstInvalidElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          return false;
        }
        return false;
      }
    }
    if (this.selecetdService == '7') {
      if ($('#propertyTypeId').val() == null) {
        $('#propertyTypeId').focus().css('border-color', 'red');
        firstInvalidElement = firstInvalidElement || $('#propertyTypeId')[0];
        if (firstInvalidElement) {
          firstInvalidElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          return false;
        }
        return false;
      } else {
        $('#propertyTypeId').focus().css('border-color', '#9f9f9f');
      }
      if ($('#interiorTypeId').val() == null) {
        $('#interiorTypeId').focus().css('border-color', 'red');
        firstInvalidElement = firstInvalidElement || $('#interiorTypeId')[0];
        if (firstInvalidElement) {
          firstInvalidElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          return false;
        }
        return false;
      } else {
        $('#interiorTypeId').focus().css('border-color', '#9f9f9f');
      }
      if ($('#budgetId').val() == null) {
        $('#budgetId').focus().css('border-color', 'red');
        firstInvalidElement = firstInvalidElement || $('#budgetId')[0];
        if (firstInvalidElement) {
          firstInvalidElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          return false;
        }
        return false;
      } else {
        $('#budgetId').focus().css('border-color', '#9f9f9f');
      }
    }

    if (this.selecetdService == '8') {
      if ($('#enteredLoanAmount').val() == null) {
        $('#enteredLoanAmount').focus().css('border-color', 'red');
        firstInvalidElement = firstInvalidElement || $('#enteredLoanAmount')[0];
        if (firstInvalidElement) {
          firstInvalidElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          return false;
        }
        return false;
      } else {
        $('#enteredLoanAmount').focus().css('border-color', '#9f9f9f');
      }
      // if ($('#expectedInterest').val() == null) {
      //   $('#expectedInterest')
      //     .focus()
      //     .css('border-color', 'red');
      //     firstInvalidElement = firstInvalidElement || $('#expectedInterest')[0];
      //       if (firstInvalidElement) {
      //         firstInvalidElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      //         return false;
      //     }
      //   return false;
      // } else{
      //   $('#expectedInterest')
      //   .focus()
      //   .css('border-color', '#9f9f9f');
      // }
      if ($('#bankId').val() == null) {
        $('#bankId').focus().css('border-color', 'red');
        firstInvalidElement = firstInvalidElement || $('#bankId')[0];
        if (firstInvalidElement) {
          firstInvalidElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
          return false;
        }
        return false;
      } else {
        $('#bankId').focus().css('border-color', '#9f9f9f');
      }
    }

    // $('body').addClass('bodyoverlay');

    var loginId = localStorage.getItem('loginID');

    if (loginId === null || loginId === undefined || loginId === '') {
      // $('.modal_close').click();
      $('#otpValidate').css('display', 'block');
      import('../otp-validation/otp-validation.module').then((mod) => mod.OtpValidationModule).then((otpValidationComponent) => {
        this.otpValidationComponent = otpValidationComponent.components['lazy'];
      });
      $('.modal-login').css('z-index', '123456');


      setTimeout(() => {
        $('#enquiryInfoClose').click()
      }, 500);

    } else {
      this.ServiceFromSubmit();
    }




  }
}     
