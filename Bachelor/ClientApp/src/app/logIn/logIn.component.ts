import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule   } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './logIn.component.html',
})

export class LogInComponent {
  logInForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }
}
