import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './ErrorDialog.component.html'
})
export class ErrorDialogComponent {
  title = 'Angular-Interceptor';
  constructor(@Inject(MAT_DIALOG_DATA) public data: string, public dialModalRef: MatDialogRef<any>) {}

  changePosition() {
    var topPos = window.innerHeight/2;
    var leftPos = window.innerWidth/2
    this.dialModalRef.updatePosition({left : 'leftPos' + 'px', top : 'topPos' + 'px'})
}
}