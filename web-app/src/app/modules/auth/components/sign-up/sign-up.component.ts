import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from '../../models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent {

  signUpForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {

    this.signUpForm = this.buildForm();
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const user: NewUser = { ...this.signUpForm.value };
      this.authService.signUp(user)
        .subscribe(() => this.router.navigate(['/']), (error) => console.error(error));
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
