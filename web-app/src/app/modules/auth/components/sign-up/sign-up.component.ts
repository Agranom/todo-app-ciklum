import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewUser } from '../../models';
import { AuthState, isLoading, SignUpActions } from '../../store';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../../styles/auth-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  isProcessing$: Observable<boolean>;

  constructor(private fb: FormBuilder,
              private store: Store<AuthState>) {

    this.signUpForm = this.buildForm();
  }

  ngOnInit(): void {
    this.isProcessing$ = this.store.pipe(select(isLoading));
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const user: NewUser = { ...this.signUpForm.value };

      this.store.dispatch(SignUpActions.signUp({ newUser: user }));
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      firstName: '',
      lastName: ''
    });
  }

}
