import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataService2 } from '../data.service2';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { enquiry } from '../prop-details-new/class';
import { CountdownComponent, CountdownEvent } from 'ngx-countdown';
// import { Ng2SearchPipe } from 'ng2-search-filter';
declare var $: any;
declare var swal: any;
declare var tinymce: any;


declare var $: any;
@Component({
  selector: 'app-write-blogs',
  templateUrl: './write-blogs.component.html',
  styleUrls: ['./write-blogs.component.css']
})
export class WriteBlogsComponent implements OnInit {
  @ViewChild('cd1', { static: false }) private countdown: CountdownComponent;

  private preventBack = false;

  private routeSub: Subscription;
  @ViewChild('fileInput') fileInput: ElementRef;
  searchTerm: string = '';
  searchTerm1: string = '';
  filteredData: any[] = [];
  filteredData2: any[] = [];
  showAddButton: boolean = false;
  showCategoryError: boolean = false;
  loader = false;

  registrationForm1: FormGroup;
  blogLoginForm: FormGroup;

  CoverImage1 = [];
  blogCoverImgUrls: any;
  // ProfileImage = this.Service.ProfileImageBlog
  // socialMediaImage = this.Service.socialMediaImage
  // ProfileImageNull = this.Service.bloggerImageNull
  blogCoverImage = this.Service.coverImageBlog
  noImgUrl: any = 'NoBlogImage.jpg'
  blogCoverImage1 = this.Service.coverImageBlog1
  notUploaded = true;



  categoryName: any;
  categoryTopicName: any;


  textareaValue: string = '';
  topicSelected = ''
  subTopicSelected = ''
  showCategory = true;
  showSubCategory = false
  agreedTerms = false;
  startOfBlog = true;
  UserId: any;

  State_Name = [];
  StateName: any;
  Api_District_Name: any;
  StateNames: any;
  categoryId: any;
  lStoreTextAreaContent: any;
  categorysubTopicId: any;
  bloggerId: any;
  status: any;
  blogId: any;
  blogAuthName: any;
  BloggerName: any;
  blogTitleList: any;
  bloggertype: any;
  user = new enquiry();

  otpexpired = false;

  userDetails: any;
  notLogedIn = false;
  draftOrPublish = ''
  tinyMceApi: any;
  // filteredArray: any[];

  constructor(private router: Router,
    // public Individual: IndividualService,
    public Service: DataService,
    private titleService: Title,
    public Service2: DataService2,
    private meta: Meta,
    private activeroute: ActivatedRoute,
    public fb: FormBuilder,

  ) {
    // this.overrideBackButton();
  }
  ngOnInit() {
    this.initialLoad()
  }

  // private overrideBackButton() {
  //   history.pushState(null, document.title, window.location.href);
  //   window.onpopstate = () => {
  //     if (!this.preventBack) {
  //       const confirmed = confirm("You may lose unsaved data. Are you sure you want to go back?");
  //       if (!confirmed) {
  //         history.pushState(null, document.title, window.location.href);
  //         return;
  //       }
  //     }
  //     this.preventBack = false;
  //   };
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // onBeforeUnload(event) {
  //   this.preventBack = true;
  // }


  initialLoad() {
    this.registrationForm1 = this.fb.group({
      file: [''],
      coverImage1: [''],
      cover1: [''],
    });
    var bloggerId = localStorage.getItem('bloggerId');
    this.routeSub = this.activeroute.params.subscribe(params => {
      this.BloggerName = params['bloggerName'].replace(/\s+/g, '-').toLowerCase();
      this.bloggerId = params['bloggerId'];
      // }
      this.categoryName = params['categoryName'].replace(/\s+/g, '-').toLowerCase();
      this.categoryId = params['categoryId'];
      this.categoryTopicName = params['topicName'].replace(/\s+/g, '-').toLowerCase();
      this.categorysubTopicId = params['topicId'];


    });
    this.blogLoginForm = new FormGroup({
      newUserNumber: new FormControl(''),
    });
    var param3 = {
      bloggerId: this.bloggerId,
    }
    this.Service.getAuthorDetails(param3).subscribe(response => {
      var authdetails1 = response['blogtype'].BloggerProfile;
      this.bloggertype = authdetails1[0].bloggerType;
    })

    if (this.router.url.indexOf('writeblogs/editor/' + this.BloggerName + '/' + this.categoryName + '/' + this.categoryTopicName + '/' + this.bloggerId + '/' + this.categoryId + '/' + this.categorysubTopicId) > -1) {
      this.Service.get_tinyMCE().subscribe(responce => {
        if (responce['status'] === 'True') {
          var get_tinyMCE = responce['tinymce'][0].tinyMCE_API;
          this.tinyMceApi = get_tinyMCE;
          this.getLaunchBlogText();
          // 
        } else {
        }
      });

    } else if (this.router.url.indexOf('/writeblogs/authors/' + this.BloggerName + '/' + this.categoryName + '/' + this.bloggerId + '/' + this.categoryId) > -1) {

      $('.modal-backdrop').remove();
      $('body').removeClass('modal-open');

      // $('#modal-container').addClass('out');
      //   $('body').removeClass('modal-active');
      //   $('.modal-backdrop').removeClass('modal-backdrop fade show');
      //   $('body').removeClass('bodyoverlay');
      //   $('.modal-active').removeClass('modal-active');



      this.loader = true;
      var param = {
        blogtypeid: this.categoryId,
      };


      // this.Service.getRelatedBlogTitle(id).subscribe(lists => {
      //   var blogTitleList = lists['blogcategory'];
      //   this.blogTitleList = blogTitleList;
      // })
      const TechnologyId = this.categoryId;
      this.Service.getTechnologyList(TechnologyId).subscribe(responce => {
        if (responce['status'] === 'True') {
          this.blogTitleList = responce['blogcategory'];
        } else {
        }
      });

      this.Service.getBlogTopics(param).subscribe(lists => {
        var State = lists['blogtopic'];
        var status = lists['status'];
        if (status == "False") {
          this.showAddButton = true;
          this.loader = false;

        } else {
          this.loader = false;
          this.Api_District_Name = State;
          this.filteredData2 = State;
        }
      })
      this.showSubCategory = true;
      this.showCategory = false;

    } else if (this.router.url.indexOf('writeblogs/authors/' + this.BloggerName + '/' + this.bloggerId) > -1) {
      $('.modal-backdrop').remove();
      $('body').removeClass('modal-open');

      // $('#modal-container').addClass('out');
      //   $('body').removeClass('modal-active');
      //   $('.modal-backdrop').removeClass('modal-backdrop fade show');
      //   $('body').removeClass('bodyoverlay');
      //   $('.modal-active').removeClass('modal-active');
      this.loader = true;
      this.Service.blogCategory().subscribe((allCategoryList: any[]) => {
        this.State_Name = allCategoryList['blogtype'];
        this.showSubCategory = false;
        this.showCategory = true;
        this.loader = false;

        this.filteredData = this.State_Name;

      });
      // localStorage.removeItem('blogText');


    } else {
    }
  }
  showmore() {
    $('.categoryListSection').css('height', '220px');
    $('.categoryListSection').css('overflow-y', 'scroll');
    $('.down_arrow').css('display', 'none');
    $('.up_arrow').css('display', 'block');
  }


  showless() {
    $('.categoryListSection').css('height', '97px');
    $('.categoryListSection').css('overflow-y', 'hidden');
    $('.down_arrow').css('display', 'block');
    $('.up_arrow').css('display', 'none');
  }
  onCoverSelectFile1(event) {
    if (event.target.files[0].size > 500000) {
      swal({
        icon: 'error',
        title: 'Image Size is too big.',
        text: 'Image Size should be less than 500kb.',
        showConfirmButton: true,
      });
      this.fileInput.nativeElement.value = '';

    }
    else {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.CoverImage1 = [];
          this.CoverImage1.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.registrationForm1.get('cover1').setValue(file);
        this.blogCoverImgUrls = ''
        $('#publishBtnId').removeAttr('disabled');
        $("#publishBtnId").removeClass("publishButton1")
        $("#publishBtnId").addClass("publishButtonActive")
      }
      this.notUploaded = false;

    }
  }

  selectedTopic(typeId, type) {
    var CategoryId = typeId;
    this.topicSelected = typeId;
    var categoryname = type.replace(/\s+/g, '-').toLowerCase();

    const node3: any = document.createElement('link');
    node3.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
    node3.rel = 'stylesheet';
    node3.async = true;
    document.getElementsByTagName('head')[0].appendChild(node3);
    this.router.navigate(['writeblogs/authors/' + this.BloggerName + '/' + categoryname + '/' + this.bloggerId + '/' + CategoryId])

    var param = {
      blogtypeid: typeId,
    };



    this.Service.getBlogTopics(param).subscribe(lists => {
      var State = lists['blogtopic'];
      this.filteredData2 = State;
    })
    // this.Service.getRelatedBlogTitle(typeId).subscribe(lists => {
    //   var blogTitleList = lists['blogcategory'];
    //   this.blogTitleList = blogTitleList;
    // })

    // const TechnologyId = typeId;
    //   this.Service2.getTechnologyList(TechnologyId).subscribe(responce => {
    //     if (responce['status'] === 'True') {
    //       this.blogTitleList = responce['blogcategory'];
    //     } else {
    //     }
    //   });



    this.showSubCategory = true;
    this.showCategory = false;
  }

  selectedSubTopic(subcategory, topicName) {
    var categorysubTopicId = subcategory
    var TopicName = topicName;
    this.categoryTopicName = TopicName.replace(/\s+/g, '-').toLowerCase();
    this.categorysubTopicId = categorysubTopicId.replace(/\s+/g, '-').toLowerCase();

    // this.router.navigate(['writeblogs/authors/'+ this.BloggerName + '/' + this.categoryName + '/'+ this.categoryTopicName + '/' + this.bloggerId + '/' + this.categoryId + '/' + this.categorysubTopicId])
    this.topicSelected = this.router.url.split('/').pop();

    this.subTopicSelected = subcategory;
    localStorage.removeItem('blog-autosave-draft');
  }

  getLaunchBlogText() {
    this.startOfBlog = false;
    this.textareaValue = localStorage.getItem("blog-autosave-draft");
    this.loader = true;


    let node: any = document.createElement('script');
    node.src = 'https://cdn.tiny.cloud/1/'+this.tinyMceApi+'/tinymce/6/tinymce.min.js';
    node.type = 'text/javascript';
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
    node.onload = () => {
      let node2: any = document.createElement('script');
      node2.src = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_2/tinymce.js';
      node2.type = 'text/javascript';
      node2.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node2);
      this.loader = false;

      this.router.navigate(['writeblogs/editor/' + this.BloggerName + '/' + this.categoryName + '/' + this.categoryTopicName + '/' + this.bloggerId + '/' + this.categoryId + '/' + this.categorysubTopicId])
    }
    this.agreedTerms = true;
  }

  launchBlogText() {
    this.startOfBlog = false;
    localStorage.removeItem('blog-autosave-draft');

    // this.textareaValue = localStorage.getItem("blog-autosave-draft");
    this.loader = true;

      this.Service.get_tinyMCE().subscribe(responce => {
      if (responce['status'] === 'True') {
        var get_tinyMCE = responce['tinymce'][0].tinyMCE_API;
        this.tinyMceApi = get_tinyMCE;

    let node: any = document.createElement('script');
    node.src = 'https://cdn.tiny.cloud/1/'+this.tinyMceApi+'/tinymce/6/tinymce.min.js';
    node.type = 'text/javascript';
    node.charset = 'utf-8';
    document.getElementsByTagName('head')[0].appendChild(node);
    node.onload = () => {
      let node2: any = document.createElement('script');
      node2.src = 'https://d1zt14hr2k4poi.cloudfront.net/version9.0/images/assets_mobile_2/tinymce.js';
      node2.type = 'text/javascript';
      node2.charset = 'utf-8';
      localStorage.removeItem('blog-autosave-draft');

      document.getElementsByTagName('head')[0].appendChild(node2);
      this.loader = false;


      this.router.navigate(['writeblogs/editor/' + this.BloggerName + '/' + this.categoryName + '/' + this.categoryTopicName + '/' + this.bloggerId + '/' + this.categoryId + '/' + this.categorysubTopicId])
      localStorage.removeItem('blog-autosave-draft');
    }
  } else {
      }
    });

    this.agreedTerms = true;
    localStorage.removeItem('blog-autosave-draft');

  }


  saveBlogDraft() {
    this.draftOrPublish = 'saveBlogDraft'
    this.lStoreTextAreaContent = localStorage.getItem("blog-autosave-draft");
    var myElement = document.querySelector('.tox-statusbar__wordcount');
    var htmlText = myElement.textContent;

    const myString: string = htmlText;
    const regex: RegExp = /\d+/;
    const matchArray: RegExpMatchArray | null = myString.match(regex);
    if (this.lStoreTextAreaContent == null) {
      swal({
        title: 'Minimum 20 Words are Required',
        type: 'warning',
        showConfirmButton: false,
        timer: 1500
      });
    } else if ((matchArray && parseInt(matchArray[0], 10) < 20)) {
      swal({
        title: 'Minimum 20 Words are Required',
        type: 'warning',
        showConfirmButton: false,
        timer: 1500
      });
    }

    else {

      if (this.bloggerId !== '1') {

        if (matchArray && parseInt(matchArray[0], 10) >= 20) {
          var param1 = {
            bloggerId: this.bloggerId,
            topic: this.categorysubTopicId,
            category: this.categoryId,
            content: this.lStoreTextAreaContent,
            draft: '3'
          };


          this.Service.setBlogText(param1).subscribe(lists => {
            this.status = lists['status'];
            this.blogId = lists['blogId'];
            if (this.status == 'True' && this.CoverImage1.length > 0) {
              this.testingImgBlog();
            } else if (this.status == 'True') {
              swal({
                title: 'Saved as Draft',
                type: 'success',
                showConfirmButton: false,
                timer: 2500
              });

              const navigationExtrasDraft: NavigationExtras = {
                queryParams: { tab: 'draft' }
              };

              const url = '/userblogs/profile/' + this.BloggerName + '-' + this.bloggertype + '-' + this.bloggerId;
              this.router.navigate([url], navigationExtrasDraft);
            } else {

            }
          })

          localStorage.removeItem('blog-autosave-draft');
          tinymce.remove();
          tinymce.init({
            autosave: false,
          });
        } else {
          swal({
            title: 'Minimum 20 Words are Required',
            type: 'warning',
            showConfirmButton: false,
            timer: 1500
          });
        }
      } else {

        this.notLogedIn = true;
        this.agreedTerms = true;
        $('.textAreaDiv').css('display', 'none');


      }

    }
  }


  publishBlog() {
    this.draftOrPublish = 'publishBlog'

    if (this.bloggerId !== '1') {

      this.lStoreTextAreaContent = localStorage.getItem("blog-autosave-draft");

      var param1 = {
        bloggerId: this.bloggerId,
        topic: this.categorysubTopicId,
        category: this.categoryId,
        content: this.lStoreTextAreaContent,
        draft: '4'
      };

      this.Service.setBlogText(param1).subscribe(lists => {
        var State = lists['blogtopic'];
        this.status = lists['status'];
        this.blogId = lists['blogId'];
        if (this.status == 'True') {
          this.testingImgBlog();
        } else {

        }
      })
      swal({
        title: 'Blog Post Requested',
        text: 'We Will Intimate you soon as your blog is approved and published!',
        type: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      localStorage.removeItem('blog-autosave-draft');
      tinymce.remove();
      tinymce.init({
        autosave: false,
      });
    } else {

      this.notLogedIn = true;
      this.agreedTerms = true;
      $('.textAreaDiv').css('display', 'none');


    }
  }

  uploadResponse1;
  uploadFile1() {
    // this.changesMade = true;
    const formData = new FormData();
    formData.append('blogcoverimg', this.registrationForm1.get('cover1').value);
    formData.append('bloggerId', this.bloggerId);
    formData.append('blogId', this.blogId)
    this.Service.updateBlogCoverImg(formData).subscribe(responce => {
      this.uploadResponse1 = responce;
      if (responce['status'] == 'True') {
        // 
        if (this.draftOrPublish == 'saveBlogDraft') {
          swal({
            title: 'Saved as Draft',
            type: 'success',
            showConfirmButton: false,
            timer: 2500
          });
          const navigationExtrasDraft: NavigationExtras = {
            queryParams: { tab: 'draft' }
          };
          const url = '/userblogs/profile/' + this.BloggerName + '-' + this.bloggertype + '-' + this.bloggerId;
          this.router.navigate([url], navigationExtrasDraft);

        } else if (this.draftOrPublish == 'publishBlog') {

          const navigationExtrasPending: NavigationExtras = {
            queryParams: { tab: 'pending' }
          };

          const url = '/userblogs/profile/' + this.BloggerName + '-' + this.bloggertype + '-' + this.bloggerId
          this.router.navigate([url], navigationExtrasPending);
        }
      } else {
        swal({
          title: 'Error ! Try Re-Submiting',
          // text: 'We Will Intimate you soon!',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
      }

    }, (err) => {
      
    });
  }




  testingImgBlog() {
    this.uploadFile1();
  }

  checkboxClick() {
    if ($('#exampleCheck1').is(':checked')) {
      $('#contactButton1').removeAttr('disabled'); //enable input
      $("#contactButton1").addClass("contactButton1Active")
    } else {
      $('#contactButton1').attr('disabled', true); //disable input

      $("#contactButton1").removeClass("contactButton1Active")
      $("#contactButton1").addClass("contactButton1")
    }
  }


  txtAreaLngth = false

  forwordCount() {
    this.textareaValue = localStorage.getItem("blog-autosave-draft");
    var myElement = document.querySelector('.tox-statusbar__wordcount');
    var htmlText = myElement.textContent;

    const myString: string = htmlText;
    const regex: RegExp = /\d+/;
    const matchArray: RegExpMatchArray | null = myString.match(regex);

    if (this.textareaValue == null) {
      swal({
        title: 'Please write content and Proceed',
        type: 'warning',
        showConfirmButton: false,
        timer: 1500
      });

    } else {
      if (matchArray && parseInt(matchArray[0], 10) > 300) {
        this.txtAreaLngth = true;
      } else {
        swal({
          title: 'Minimum 300 Words are Required',
          // text: 'We Will Intimate you soon!',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
        this.txtAreaLngth = false;
      }
    }

  }



  onInputChange() {
    this.filteredData = this.State_Name.filter(item => {
      return item.type.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
    this.showCategoryError = this.filteredData.length === 0;
  }

  onInputChange2() {
    if (this.searchTerm1.startsWith(' ')) {
      this.searchTerm1 = this.searchTerm1.trimLeft();
    }
    this.filteredData2 = this.Api_District_Name.filter(item => {
      return item.topicName.toLowerCase().includes(this.searchTerm1.toLowerCase());
    });

    this.showAddButton = this.filteredData2.length === 0;
  }

  addTopic() {
    this.draftOrPublish = 'addTopic'
    
    if (this.searchTerm1.length <= 4) {
      swal({
        title: 'Please Enter atleast 5 characters',
        // text: 'We Will Intimate you soon!',
        type: 'warning',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      this.showAddButton = false
      var enameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (enameFilter.test($('#topicselect').val())) {
        if (this.searchTerm1 !== '') {

          if (this.bloggerId !== '1') {

            var param1 = {
              bloggerId: this.bloggerId,
              topicname: this.searchTerm1,
              status: '3',
              catId: this.categoryId
            };

            this.Service.addBlogTopics(param1).subscribe(lists => {
              swal({
                title: 'New Topic Requested',
                text: 'Please Check Your Profile For Requested Topic is Approved or Not',
                type: 'success',
                showConfirmButton: true,
              }).then((result) => {
                // if (result.value) {
                //   this.router.navigateByUrl('/userblogs/profile/' + this.BloggerName + '-'+this.bloggertype+'-' + this.bloggerId, { skipLocationChange: false }).then(() => {
                //   });

                // }
              });


              this.router.navigateByUrl('/userblogs/profile/' + this.BloggerName + '-' + this.bloggertype + '-' + this.bloggerId, { skipLocationChange: false })


            });



          } else {
            this.notLogedIn = true;
            this.agreedTerms = false;
            this.showSubCategory = false;
            this.startOfBlog = false
          }


        } else {
          swal({
            title: 'Please Write Topic to Add',
            // text: 'We Will Intimate you soon!',
            type: 'warning',
            showConfirmButton: false,
            timer: 1500
          });
        }
      } else {
        swal({
          title: 'Special Characters not allowed',
          // text: 'We Will Intimate you soon!',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
      }

    }

  }
  cardDropDown = false;

  openBlogDropDown() {
    // this.cardDropDown = true;
    this.cardDropDown = this.cardDropDown ? false : true;
    if (this.cardDropDown == true) {
      $('.fa-angle-down').css('display', 'none');
      $('.fa-angle-up').css('display', 'block');
    } else {
      $('.fa-angle-up').css('display', 'none');
      $('.fa-angle-down').css('display', 'block');
    }

  }
  otpBasedLogin1() {
    this.loader = true;
    this.countdownconfig = {
      leftTime: 30,
      demand: true
    };

    const paramNum = {
      number: this.user.number
    }
    this.Service.otpsend(paramNum).subscribe((success) => {
    var prestatus = success['messages'][0].status;
      // var status = prestatus[0].MessageErrorDescription;
      if (prestatus == 'ENQUEUED') {
        this.loader = false;
        this.otpexpired = false;
        this.countdown.begin();
        // var buttonId = $('#one').attr('id');
        // $('#modal-container').removeAttr('class').addClass(buttonId);
        // $('body').addClass('modal-active');
        // $('body').removeClass('bodyoverlay');

      } else {
        swal({
          title: 'Oops Something Error!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        // this.otploader = false;
        // $('body').removeClass('bodyoverlay');
      }
    },
      (err) => {
        
      });


  }


  otpBasedLogin() {
    if ($('#emobileLogin').val() == "") {
      $('#emobileLogin').focus().css("border-color", "red").attr('placeholder', 'Please Enter Mobile Number');
      return false;
    }
    else {
      var mobilee = /^[0-9]{10}$/;
      if (mobilee.test($('#emobileLogin').val())) {
        $('#emobileLogin').removeAttr("style");
      }
      else {
        $('#emobileLogin').focus().css("border-color", "red").attr('placeholder', 'Please enter valid Mobile number').val('');
        return false;
      }
    }
    this.loader = true;


    const paramNum = {
      number: this.user.number
    }
    // this.otploader = true;
    $('body').addClass('bodyoverlay');
    this.Service.otpsend(paramNum).subscribe((success) => {
    var prestatus = success['messages'][0].status;
      // var status = prestatus[0].MessageErrorDescription;
      if (prestatus == 'ENQUEUED') {
        this.loader = false;

        this.countdown.begin();
        var buttonId = $('#one').attr('id');
        $('#modal-container').removeAttr('class').addClass(buttonId);
        $('body').addClass('modal-active');
        $('body').removeClass('bodyoverlay');

      } else {
        swal({
          title: 'Oops Something Error!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        // this.otploader = false;
        $('body').removeClass('bodyoverlay');
      }
    },
      (err) => {
        
      });
  }

  clearNumInput() {
    this.user.number = ''
  }


  handleEvent(e: CountdownEvent) {
    if (e.action === 'done') {
      this.otpexpired = true;
    }
  }


  goback() {
    $('#modal-container').addClass('out');
    $('body').removeClass('modal-active');
    this.countdownconfig = {
      leftTime: 30,
      demand: true
    };
    this.countdown.begin();
  }

  onOtpChange(otp) {
    var param = this.user;
    param.otp = otp;
  }


  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: true,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };


  countdownconfig = {
    leftTime: 30,
    demand: true
  };


  otpvalidate() {
    var otplength = 4;
    if ($('#otp').val() == '') {
      swal({
        title: 'Please enter the OTP!',
        type: 'error',
        showConfirmButton: false,
        timer: 1000
      });
      return false;
    } else {
      var liveotpcount = $('#otp').val().length;
      if (liveotpcount < otplength) {
        swal({
          title: 'Please enter the valid OTP!',
          type: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      } else {
      }
    }
    this.loader = true;

    const param = this.user;

    $('body').addClass('bodyoverlay');
    this.Service.otpvalidcheck(param).subscribe((success) => {
      var status = success['status'];
      if (status == 'True') {
        this.loader = false;

        this.otpUserLoginNewAPI();
        // this.addenquiry();
        // this.otploader = false;
        // this.cancel.nativeElement.click();
        $('body').removeClass('modal-open');
        $('body').removeClass('bodyoverlay');
        // $('#nameNumberModal').removeClass('modal fade');
        $('body').removeClass('modal-active');
        // document.getElementById('nameNumberModal').style.display = 'none';
        // this.notLogedIn = false;
        swal({
          title: 'OTP Verified',
          text: 'We Will Intimate you soon!',
          type: 'success',
          showConfirmButton: false,
          timer: 2500
        });
        $('#modal-container').addClass('out');
        $('body').removeClass('modal-active');
        $('.modal-backdrop').removeClass('modal-backdrop fade show');
        $('body').removeClass('bodyoverlay');
        $('.modal-active').removeClass('modal-active');
        // document.getElementById('nameNumberModal').style.display = 'none';
        $('#btn_reset').click();
        this.countdown.restart();

      } else {
        // this.otploader = false;
        $('body').removeClass('bodyoverlay');
        swal({
          title: 'Oops Something Error!',
          text: 'Its Not a valid OTP / OTP Expired!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
        this.loader = false;

      }
    }, (err) => {
      
    });
  }


  otpUserLoginNewAPI() {

    var param1 = {
      number: this.user.number
    }
    this.Service.userLoginWithOtpNewAPIBlog(param1).subscribe(responce => {
      if (responce['status'] === 'True') {
        // this.Local_Storage.setItem('loginID', '1');
        swal({
          title: 'Validated successfully',
          text: '',
          type: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.userDetails = responce['BloggerDetails'];
        localStorage.setItem('bloggerId', this.userDetails[0]['bloggerId']);
        this.BloggerName = this.userDetails[0]['blogger_name'].toLowerCase().replace(/\s+/g, '-');
        this.bloggerId = this.userDetails[0]['bloggerId'];
        this.bloggertype = this.userDetails[0]['bloggerType'];

        // this.router.navigate(['/userblogs/profile/' + bloggerName + '-'+ bloggertype+'-' + bloggerId]);

        $('#modal-container').addClass('out');

        if (this.draftOrPublish == 'saveBlogDraft') {
          this.saveBlogDraft()
        } else if (this.draftOrPublish == 'publishBlog') {
          this.publishBlog()
        } else if (this.draftOrPublish == 'addTopic') {
          this.addTopic()
        } else {

          swal({
            title: 'Error ! Try Again',
            // text: 'We Will Intimate you soon!',
            type: 'warning',
            showConfirmButton: false,
            timer: 1500
          });

        }
        //


        $('body').removeClass('modal');
        $('.modal-backdrop').removeClass('modal-backdrop fade show');
        $('body').removeClass('bodyoverlay');
        $('.modal-active').removeClass('modal-active');
      } else {
      }
    });
  }

}
