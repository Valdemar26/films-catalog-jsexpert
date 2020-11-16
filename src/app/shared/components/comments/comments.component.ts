import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommentsInterface } from '../../interfaces/comments.interface';

@Component({
  selector: 'exp-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  public commentsForm: FormGroup;
  public comments: CommentsInterface[];
  public currentDate: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  public confirm(): void {
    // TODO get 'id' from URL and set 'comment' to this 'id'
    // TODO get 'Data' and show in comment line
    // TODO add 'username' and 'honeycomb' to prevent 'bots attack'

    if (this.commentsForm.invalid) {
      return;
    }

    this.getDateNow();
    console.log(this.commentsForm.value);
    this.comments = this.commentsForm.value;

    // TODO show loader and after clear form
    this.cancel();
  }

  public cancel(): void {
    this.commentsForm.reset();
  }

  private initForm(): void {
    this.commentsForm = this.formBuilder.group({
      comment: ['', Validators.required],
      username: ['', Validators.required]
    });
  }

  private getDateNow(): void {
    this.currentDate = new Date();
  }


}
