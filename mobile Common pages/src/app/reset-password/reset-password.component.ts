import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
declare var $: any;
declare var swal: any;
declare var $: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  password : any;
  confirmpassword : any;
  username: any;
  showalert = false;
  userid: any;
  constructor(private activatedRoute : ActivatedRoute, private Service : DataService) { }

  ngOnInit(): void {
    this.getuserdetials();
  }
  
  getuserdetials(){
     this.activatedRoute.params.subscribe(params => {
      var userid = params['id'];
       this.Service.getUserDetailsById(userid).subscribe((userinfo) =>{
         let users = userinfo['UserDetails'];
         this.username = users[0].user_name;
         this.userid = users[0].reg_IDPK;
       });
    });
  }
  ResetPass(){
    if ($('#password').val() == "") {
      $('#password').focus().css("border-color", "red").attr('placeholder', 'Please Enter New Password');
      return false;
    }
    else {
      var enameFilter = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,10}$/;
      if (enameFilter.test($('#password').val())) {
        this.showalert = false;
      }
      else {
        this.showalert = true;
        $('#password').focus().css("border-color", "red").attr('placeholder', 'Please Enter New Password');
        return false;
      }
    }
   
  if ($('#confirmpass').val() == "") {
    $('#confirmpass').focus().css("border-color", "red").attr('placeholder', 'Please confirm password');
    return false;
  }
  else {
    if ($('#confirmpass').val() == $('#password').val()) {
      $('#confirmpass').removeAttr("style");
    }
    else {
      $('#confirmpass').focus().css("border-color", "red").attr('placeholder', 'Password does not match').val('');
      return false;
    }
  }
    const param = {
      id : this.userid,
      password : this.password,
      confirmpassword : this.confirmpassword
     }
    this.Service.updateUserPassword(param).subscribe((response) => {
    if(response['status'] === 'True'){
      swal({
        text: 'password updated Successfully',
        type: 'success',
        showConfirmButton: false,
        timer: 2500
      });
      this.password = '';
      this.confirmpassword ='';
      window.history.back();
    }else{
      swal({
        text: 'Something Went wrong',
        type: 'error',
        showConfirmButton: false,
        timer: 2500
      });
    }
    });
  }
}
