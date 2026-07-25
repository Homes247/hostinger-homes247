import { Component,ChangeDetectionStrategy,  OnInit, Optional, Inject, Injector, PLATFORM_ID } from '@angular/core';
import { ServerResponseService } from '../server-response-2.service';

declare var $: any;
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found-410.component.html',
  styleUrls: ['./not-found-410.component.css'],
  providers: [ServerResponseService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

  data: any = {};

  constructor(responseService: ServerResponseService) {
    responseService.setNotFound();
  }
}
