import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { defaultUserData } from './user-data.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatToolbarModule, CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';

  ngOnInit(): void{
    console.log('hi');
    
    const storedData = localStorage.getItem("userData");
    if(!storedData){
      localStorage.setItem('userData', JSON.stringify(defaultUserData))
    }
  }
  deleteData(): void {
    localStorage.removeItem('userData');
  }
}
