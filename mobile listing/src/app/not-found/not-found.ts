import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServerResponseService } from '../server-response.service';
import { RouterLink } from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.css'],
  providers: [ServerResponseService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class NotFoundComponent {

  data: any = {};

  constructor(@Inject(ServerResponseService) responseService: ServerResponseService) {
    responseService.setNotFound();
  }
} 