import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SIGN_UP_ROUTE } from '../../../../shared/constants';
import { AuthState, isLoading, SignInActions } from '../../store';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../../styles/auth-form.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  isProcessing$: Observable<boolean>;

  readonly signUpRoute = SIGN_UP_ROUTE;

  constructor(private store: Store<AuthState>,
              private fb: FormBuilder) {

    this.signInForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.isProcessing$ = this.store.pipe(select(isLoading));
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;

      this.store.dispatch(SignInActions.signIn({ email, password }));
    }
  }

}
