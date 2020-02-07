import { Component, OnInit } from '@angular/core';
import { Theme, DEFAULT_THEME } from './models/theme';
import { ThemesService } from './services/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-themes-blog-post';

  constructor(private themes: ThemesService) {

  }

  ngOnInit(): void {

    // this.themes.setCurrentTheme(DEFAULT_THEME);
  }
}
