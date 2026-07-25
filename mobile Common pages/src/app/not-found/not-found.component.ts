import { Component,ChangeDetectionStrategy,  OnInit, Optional, Inject, Injector, PLATFORM_ID } from '@angular/core';
import { ServerResponseService } from '../server-response.service';

declare var $: any;
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
  providers: [ServerResponseService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

  data: any = {};

  constructor(responseService: ServerResponseService) {
    responseService.setNotFound();
  }
}
