import { Component } from '@angular/core';
import { MenuComponent } from "../components/menu/menu.component";
import { WelcomeComponent } from '../components/welcome/welcome.component';

@Component({
  selector: 'app-home',
  imports: [MenuComponent, WelcomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
