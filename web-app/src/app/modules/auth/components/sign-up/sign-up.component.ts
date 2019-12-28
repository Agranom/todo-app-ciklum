import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NewUser } from '../../models';
import { AuthState, SignUpActions } from '../../store';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<AuthState>) {

    this.signUpForm = this.buildForm();
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
