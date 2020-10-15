import {
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';


@Component({
  selector: 'exp-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent {

  @Input() trailerPath;
  @Input() filmTitle;

  @Output() modalClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('modalWrapperContainer') modalWrapperContainer: TemplateRef<ModalComponent>;

  private modalContainer: ComponentRef<ModalComponent>;

  public onInit(): void {
    this.modalClose.emit(true);
  }

  public closeModal(): void {
    console.log('close');
    this.modalClose.emit(false);
    console.log(this.modalWrapperContainer.elementRef.nativeElement);

    if (this.modalWrapperContainer.elementRef.nativeElement) {
      this.modalWrapperContainer.elementRef.nativeElement.destroy();
    }

  }
}
