import { Component, OnInit, Inject} from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { MessageService } from '../property.service';
import { CityService } from '../city.service';
declare var $: any;
declare var swal: any;

declare var $: any;
@Component({
  selector: 'app-propertyseenprojects',
  templateUrl: './propertyseenprojects.component.html',
  styleUrls: ['./propertyseenprojects.component.css']
})
export class PropertyseenprojectsComponent implements OnInit {

  seenproparr = [];
  recent_viewArray = [];
  IsVisibleSeenProject = false;
  ImageUrl = this._messageService.imagesURL + 'uploadPropertyImgs/';

  constructor(@Inject(LOCAL_STORAGE) private Local_Storage: any,private _messageService: MessageService,
  public cityservice: CityService,) { }

  ngOnInit(): void {

    this.seenproparr = JSON.parse(this.Local_Storage.getItem('SeenPropertyID'));
    this._messageService.getSeenProjectsListByIds(this.seenproparr).subscribe(responce => {
      this.recent_viewArray = responce['recent_view'];
    });
  }

  ShowHideSeenProject() {
    var falsevar = "";
    this._messageService.clickthrough(falsevar);
    this.IsVisibleSeenProject = this.IsVisibleSeenProject ? false : true;
  }

}
