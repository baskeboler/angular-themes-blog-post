import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private themes: ThemesService) { }

  ngOnInit(): void {
  }

  randomTheme() {
    const t = this.themes.generateRandomTheme();
    this.themes.setCurrentTheme(t);
    console.log(t);

  }

}
