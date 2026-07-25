import { Component, OnInit, Inject} from '@angular/core';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { MessageService } from '../property.service';
import { CityService } from '../city.service';

declare var $: any;
@Component({
  selector: 'app-propertywishlist',
  templateUrl: './propertywishlist.component.html',
  styleUrls: ['./propertywishlist.component.css']
})
export class PropertywishlistComponent implements OnInit {
  seenproparr = [];
  recent_viewArray = [];
  IsVisiblewishlistProject = false;
  ImageUrl = this._messageService.imagesURL + 'uploadPropertyImgs/';

  constructor(@Inject(LOCAL_STORAGE) private Local_Storage: any,private _messageService: MessageService,
  public cityservice: CityService,) { }

  ngOnInit(): void {

    this.seenproparr = JSON.parse(this.Local_Storage.getItem('propertyID'));
    this._messageService.getSeenProjectsListByIds(this.seenproparr).subscribe(responce => {
      this.recent_viewArray = responce['recent_view'];
    });
  }

  ShowHidewishlistProject() {
    var falsevar = "";
    this._messageService.clickthrough(falsevar);
    this.IsVisiblewishlistProject = this.IsVisiblewishlistProject ? false : true;
  }
}
