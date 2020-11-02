import { Component, OnInit, Inject, NgModule } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
  NgForm,
} from '@angular/forms'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { main } from '../main-page/main-page.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
  Record: main;
  formGroups: FormGroup;
  dialogConfig: { disableClose: boolean; data: {} };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<NewPostComponent>
  ) { }
  
  groupControl = new FormControl('', Validators.required);

  ngOnInit() {
    this.formGroups = new FormGroup({
      userId: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      body: new FormControl(null, [Validators.required]),
    });
    if (this.data.item) {
      this.formGroups.get('userId').setValue(this.data.item.userId);
      this.formGroups.get('title').setValue(this.data.item.title);
      this.formGroups.get('body').setValue(this.data.item.body);
    }
  }

  onConfirm() {
    this.dialogRef.close(true);
  }
   
  onSubmitGroups() {
    this.formGroups.getRawValue();
    this.dialogRef.close({
    main: this.formGroups.value,
    });
  }
  
}