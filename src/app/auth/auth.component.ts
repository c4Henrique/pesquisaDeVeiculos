import { Component } from '@angular/core';
import { LoginFormComponent } from '../components/login-form/login-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {}
