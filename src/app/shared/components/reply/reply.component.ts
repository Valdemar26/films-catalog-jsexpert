import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exp-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.scss']
})
export class ReplyComponent implements OnInit {

  @Input() parentRef;

  constructor() { }

  ngOnInit(): void {
    console.log('reply parentRef: ', this.parentRef);
  }

}
