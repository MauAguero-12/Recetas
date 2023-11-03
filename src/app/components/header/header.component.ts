import { Component } from '@angular/core';
import { faBook, faHouseChimney } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // Icons
  iconHome = faHouseChimney
  iconBook = faBook
}
