import { DataService2 } from './../data.service2';
import {Component, OnInit, HostListener, Inject, ViewChild, PLATFORM_ID, ElementRef} from '@angular/core';
import {isPlatformBrowser, Location} from '@angular/common';
import {WINDOW} from '@ng-toolkit/universal';
import {Params, Router, ActivatedRoute} from '@angular/router';
import {Title, Meta} from '@angular/platform-browser';
import {Pipe, PipeTransform} from '@angular/core';
import {Subscription, from, Observable} from 'rxjs';
import {DataService} from '../data.service';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {CountdownComponent, CountdownEvent} from 'ngx-countdown';
import {query} from '../innerblog/innerblog';
import {OwlOptions} from 'ngx-owl-carousel-o';

declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-expert-blog-details',
  templateUrl: './expert-blog-details.component.html',
  styleUrls: ['./expert-blog-details.component.css']
})
export class ExpertBlogDetailsComponent implements OnInit {
  @ViewChild('cd', {static: false}) private countdown: CountdownComponent;

  myControl = new FormControl();
  options;
  filteredOptions: Observable<any>;
  private routeSub: Subscription;
  urlparam: any;
  storiesTitel;
  infographics: any;
  searchshow = false;
  socialmediashow: boolean = false;
  infographics_moreimages = false;
  infographics_lessimages = false;
  Infographicsection = false;
  inforgraphicimagepath = this.Service.blogimageURL + 'infographic/';
  youtubethumbnailimagepath = this.Service.blogimageURL + 'youtube/';
  mobile_view = false;
  desktop_view = false;
  recentblogsloader = true;
  @ViewChild('scrollapiloader') scrollapiloader: ElementRef;
  blogid: any;
  categoryname: any;
  comments: any;
  commentlength: any;

  constructor(
    private titleService: Title,
    private meta: Meta,
    private router: Router,
    private _location: Location,
    public Service: DataService,
    public Service2: DataService2,
    private activeroute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(WINDOW) private window: Window
  ) {
    this.router.events.subscribe((evt) => {
      this.router.navigated = false;
      this.window.scrollTo(0, 0);
    });
    this.infographics = [];
  }

  mobileview: boolean;
  searchdeskview: boolean;
  public searchStr: string;
  mobileyoutube: any;
  youtubelink: any;
  youtubethumbnail: any;
  blogbannerview: any;
  countLike: any;
  viewcount: any;
  viewcounts: any;
  loaded = false;
  divreached = false;
  apiload = false;
  FooterComponent: any;
  toggle: boolean = true;


  scrollTo(section): void {
    document.querySelector('#' + section)
      .scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    $('#inputsection').focus().attr('placeholder', 'Please add your comments here');
  }

  ngOnInit() {
    this.getblogid();
    this.getAuto();
    this.onresize();
    this.footershowhide();
  }
  textzoominout(data){
    var size = parseInt($('#text').css("font-size"));
     if (data === "plus") {
      size = size + 2;
    } else {
      size = size - 2;
      if (size <= 14) {
        size = 14;
      }
    }
    $('#text').css("font-size", size);
}
  footershowhide() {
    var prevScrollpos = window.pageYOffset;
    var isScrolling;
    window.addEventListener('scroll', function(event) {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos) {
        document.getElementById('footer').style.bottom = '0';
      } else {
        document.getElementById('footer').style.bottom = '-50px';
        $('#fixed-accordion').css('visibility', 'hidden');
      }
      prevScrollpos = currentScrollPos;
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(function() {
        document.getElementById('footer').style.bottom = '0';
      }, 2000);
      if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        document.getElementById('footer').style.bottom = '0';
      }
    }, false);
    $('.video-scroll').click(function() {
      $('#content').animate({
        scrollLeft: '+=50px'
      }, 'slow');
    });
    $('.latest-scroll').click(function() {
      $('#content').animate({
        scrollLeft: '+=50px'
      }, 'slow');
    });
    $('.real-estate-scroll').click(function() {
      $('#content').animate({
        scrollLeft: '+=100px'
      }, 'slow');
    });
    $('.interior-scroll').click(function() {
      $('#content').animate({
        scrollLeft: '+=150px'
      }, 'slow');
    });
    $('.technology-scroll').click(function() {
      $('#content').animate({
        scrollLeft: '+=250px'
      }, 'slow');
    });
    $('.construction-scroll').click(function() {
      $('#content').animate({
        scrollLeft: '+=300px'
      }, 'slow');
    });
    $('.expert-scroll').click(function() {
      $('#content').animate({
        scrollLeft: '+=150px'
      }, 'slow');
    });
    $('.diy-scroll').click(function() {
      $('#content').animate({
        scrollLeft: '+=350px'
      }, 'slow');
    });
    $('.indian-scroll').click(function() {
      $('#content').animate({
        scrollLeft: '+=550px'
      }, 'slow');
    });
  }

  getblogid() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      var lasturl = params['url-:id'];
      this.urlparam = lasturl;
      var id = lasturl.split('-').pop().match(/[0-9]+/);
      this.blogid = id;
      this.Service.getblogstory(id).subscribe(stories => {
        this.stories = stories['locations'];
        this.storiesTitel = this.stories['0']['title'];
        this.categoryname = this.stories['0']['storytype'];
        let apivalue = this.stories[0].urlstruture;
        let urlstructure = apivalue.replace(/\s+/g, '-').toLowerCase();
        let apiurljoiner = urlstructure + '-' + id;
        this.titleService.setTitle(this.stories[0].seotitle);
        this.meta.updateTag({name: 'description', content: this.stories[0].seodesc});
        this.meta.updateTag({property: 'og:image', content: this.Service.blogimageURL + 'stories/' + this.stories[0].imgPath});
        this.meta.updateTag({property: 'og:title', content: this.stories[0].seotitle});
        this.meta.updateTag({property: 'og:description', content: this.stories[0].seodesc});
        this.Service.createLinkForCanonicalURL();
        if (lasturl !== apiurljoiner) {
          this.router.navigate(['/blogs/' + apiurljoiner]);
        }
        if (this.stories[0].youtube_thumbnail === null || this.stories[0].youtube_thumbnail === '') {
          this.mobileyoutube = false;
          this.blogbannerview = true;
        } else {
          this.mobileyoutube = true;
          this.blogbannerview = false;
          this.youtubelink = this.stories[0].youtube;
          this.youtubethumbnail = this.stories[0].youtube_thumbnail;
        }
      });

      this.Service.getblogcomments(this.blogid).subscribe(response => {
        let status = response['status'];
        if (status == 'True') {
          this.comments = response['Comments'];
          this.commentlength = this.comments.length;
        } else {
          this.comments = [];
          this.commentlength = 0;
        }
      });
      this.Service.getBlogslikes(this.blogid).subscribe(response => {
        let status = response['status'];
        if (status == 'True') {
          let apivalues = response['Likes'];
          this.countLike = apivalues[0].likecount;
          const freshviewcount = apivalues[0].viewcount;

          function convert(freshviewcount) {
            if (freshviewcount >= 1000000) {
              return (freshviewcount / 1000000).toFixed(2) + 'M';
            } else if (freshviewcount >= 1e3) {
              return +(freshviewcount / 1e3).toFixed(2) + 'K';
            }
            return freshviewcount;
          }

          this.viewcount = convert(freshviewcount);
          this.viewcounts = Number(freshviewcount) + 1;
          this.Service.addviews(this.blogid, this.viewcounts).subscribe(response => {
            if (response['status'] === 'True') {
            }
          });
        } else {
          this.countLike = 0;
          this.viewcount = 0;
          this.viewcounts = Number(this.viewcount) + 1;
          this.Service.addviews(this.blogid, this.viewcounts).subscribe(response => {
            if (response['status'] === 'True') {
            }
          });
        }
      });

    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const elementPosition = this.scrollapiloader.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    if (this.divreached = scrollPosition >= elementPosition) {
      if (this.apiload == false) {
        this.apiload = true;
        this.Service.getrecentblogs().subscribe(recentStories => {
          if (recentStories['status'] === 'True') {
            this.recentblogsloader = false;
            this.recentStories = recentStories['locations'];
          } else {
            this.recentblogsloader = true;
          }
        });
        this.routeSub = this.activeroute.params.subscribe(params => {
          var lasturl = params['url-:id'];
          var id = lasturl.split('-').pop().match(/[0-9]+/);
          this.Service.getsimilarblog(id).subscribe(similarblogs => {
            this.blogs = similarblogs['SimilarBlogs'];
            this.router.events.subscribe((evt) => {
              this.router.navigated = false;
              window.scrollTo(0, 0);
            });
          });
        });
        this.routeSub = this.activeroute.params.subscribe(params => {
          var lasturl = params['url-:id'];
          var id = lasturl.split('-').pop().match(/[0-9]+/);
          this.Service.getinfographicblog(id).subscribe(infographicimages => {
            if (infographicimages['status'] === 'True') {
              this.Infographicsection = true;
              this.infographics = infographicimages['locations'];
              if (this.infographics.length >= 3) {
                this.infographics_moreimages = true;
              } else {
                this.infographics_lessimages = true;
              }
            } else {
              this.Infographicsection = false;
            }
          });
        });
      }
    }
    let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    let max = document.documentElement.scrollHeight;
    if (pos == max) {
      // import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule =>{
      //   this.FooterComponent = FooterModule.components['lazy'];
      //   this.loaded = true;
      // });
    }
    if ($(window).scrollTop() >= 300) {
      $('.main-blog').addClass('fixed-header');
    } else {
      $('.main-blog').removeClass('fixed-header');
    }
    if ($(window).scrollTop() >= $('.zoom-div').position().top){
      $('.text-zoom-div').addClass('fixed-text-zoom-div');
    }else{
      $('.text-zoom-div').removeClass('fixed-text-zoom-div');
    }  
  }

  onresize() {
    this.routeSub = this.activeroute.params.subscribe(params => {
      $('.mobile_video_section img').show();
      var video_wrapper = $('.video_section');
      if (video_wrapper.length) {
        video_wrapper.html('');
      }
    });
  }

  onclickshare() {
    this.toggle = !this.toggle;
  }

  onclicklike() {
    this.countLike = Number(this.countLike) + 1;
    $('.fa-thumbs-o-up').css('color', 'rgba(151,27,71,.8117647058823529)');
    const currenturl = this.router.url;
    var blogid = currenturl.split('-').pop().match(/[0-9]+/);
    this.Service.addlikes(blogid, this.countLike).subscribe(responce => {
      if (responce['status'] === 'True') {
      }
    });
  }

  fbshare() {
    var currenturl = this.router.url;
    var shareurl = 'https://facebook.com/sharer/sharer.php?u=https://www.homes247.in' + currenturl;
    window.open(shareurl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  };

  twshare() {
    var currenturl = this.router.url;
    var shareurl = 'https://twitter.com/intent/tweet/?url=https://www.homes247.in' + currenturl;
    window.open(shareurl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  };

  linkedshare() {
    var currenturl = this.router.url;
    var shareurl = 'https://www.linkedin.com/shareArticle?url=https://www.homes247.in' + currenturl;
    window.open(shareurl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  };

  pinshare() {
    var currenturl = this.router.url;
    var shareurl = 'https://pinterest.com/pin/create/button/?url=https://www.homes247.in' + currenturl;
    window.open(shareurl, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  };

  tumbshare() {
    var currenturl = this.router.url;
    var shareurl = 'https://www.tumblr.com/widgets/share/tool?posttype=link&content=https://www.homes247.in' + currenturl + '&canonicalUrl=https://www.homes247.in' + currenturl;
    window.open(shareurl);
  };

  user = new query();
  adduser = new query();

  title: string;

  toLoweUpper(title: string) {
    this.title = title;
  }

  imagepath = this.Service.blogimageURL + 'stories/';
  blogs: any;
  recentblogs: any;
  recentStories: any;
  stories: any;
  pageorgin = 'Inner Blog';

  youtubemobile() {
    $('.mobile_video_section img').hide();
    var video_wrapper = $('.video_section');
    if (video_wrapper.length) {
      video_wrapper.html('<iframe style="padding: 4px 0 0 0;" class="mobile_iframe" width="100%" height="200" muted autoplay frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen src="' + this.youtubelink + '?autoplay=1"></iframe>');
    }
  }

  // subscrib
  username: any;
  useremail: any;

  subscribblog(email) {
    if ($('#useremail').val() === '') {
      $('#useremail').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#useremail').val())) {
        $('#useremail').removeAttr('style');
      } else {
        $('#useremail').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }
    var param = {
      name: this.storiesTitel,
      mail: email,
    };
    this.Service.SubscribBlog(param).subscribe(user => {
      var status = user['status'];
      if (status == 'True') {
        swal({
          title: 'Thank you For Subscribing',
          timer: 2000,
        });
      } else {
        swal({
          title: 'Something went wrong!',
          timer: 2000
        });
      }
    });
    this.useremail = '';
  }

  // subscrib
  letcontactus(name, email, msg) {

    if ($('#cname').val() === '') {
      $('#cname').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Name');
      return false;
    } else {
      var nameFilter = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
      if (nameFilter.test($('#cname').val())) {
        $('#cname').removeAttr('style');
      } else {
        $('#cname').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid name').val('');
        return false;
      }
    }

    if ($('#cemail').val() === '') {
      $('#cemail').focus().css('border-color', 'red').attr('placeholder', 'Please Enter Email-id');
      return false;
    } else {
      var emai = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
      if (emai.test($('#cemail').val())) {
        $('#cemail').removeAttr('style');
      } else {
        $('#cemail').focus().css('border-color', 'red').attr('placeholder', 'Please enter valid email-id').val('');
        return false;
      }
    }

    var param = {
      name: name,
      mail: email,
      comments: msg,
      blog: this.storiesTitel,
      blogid: this.blogid
    };
    this.Service.updateBlogComment(param).subscribe(user => {
      var status = user['status'];
      if (status == 'True') {
        swal({
          title: 'Comment Submitted Successfully',
          text: 'Please wait for the Admin Approval',
          type: 'success',
          showConfirmButton: true
        });
      } else {
        swal({
          title: 'Something went wrong!',
          type: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
    this.getcomments();
    this.user.name = '';
    this.user.email = '';
    this.user.msg = '';
  }

  getcomments() {
    this.Service.getblogcomments(this.blogid).subscribe(response => {
      this.comments = (response['Comments']);
    });
    import('../footer/footer.module').then(mod => mod.FooterModule).then(FooterModule => {
      this.FooterComponent = FooterModule.components['lazy'];
    });
  }

  getAuto() {

    var blogid = '1';
    this.Service2.getblogAuto(blogid).subscribe(myLocalList => {
      this.apioptions(myLocalList['blogautolist']);
    });
  }

  apioptions(apivalue) {
    this.options = apivalue;
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => value.length >= 1 ? this._filter(value) : [])
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onItemSelect(selected) {
    var blogurl = selected.structure;
    var blogid = selected.id;
    this.router.navigate(['/blogs/' + blogurl + '-' + blogid]);
  }

  public displayname(value) {
    if (value) {
      return value.name;
    }
  }

  Onclicksearch() {
    this.searchshow = true;
    $('html,body').animate({
        scrollTop: $('.scrollreach').offset().top
      },
      'slow');
  }
}

