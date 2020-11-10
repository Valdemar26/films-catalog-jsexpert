import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { MessageInterface } from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root'
})

export class MessagesService {
  private messages$ = new Subject<MessageInterface>();
  private submit$ = new Subject<boolean>();

  constructor() {
  }

  public getMessages(): Observable<any> {
    return this.messages$.asObservable();
  }

  public setMessage(msg: MessageInterface): void {
    this.messages$.next(msg);
  }

  public getSubmit(): Observable<any> {
    return this.submit$.asObservable();
  }

  public submit(confirmation = true): void {
    this.submit$.next(confirmation);
  }

}

