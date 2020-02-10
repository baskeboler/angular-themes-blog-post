import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThemesService } from 'src/app/services/themes.service';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Theme } from 'src/app/models/theme';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  brand: Observable<string>; // = 'Default brand';
  logo: Observable<string>;
  githubLinkEnabled: Observable<boolean>;
  themeSubscription: Subscription;
  constructor(private themes: ThemesService) { }

  ngOnInit(): void {
    this.brand = this.themes.getCurrentTheme()
      .pipe(
        map((t: Theme) => t ? t.brandName : 'unknown')
      );

    this.logo = this.themes.getCurrentTheme()
      .pipe(
        map(t => t ? t.brandLogo : 'unknown')
      );
    this.githubLinkEnabled = this.themes.getCurrentTheme()
    .pipe(
      map((t: Theme) => t && t.enableGithubLink ? t.enableGithubLink : false)
    );

    this.themeSubscription = combineLatest([this.brand, this.logo, this.githubLinkEnabled])
      .subscribe(([b]) => {
        console.log('theme has changed, brand = ' + b);

      });
  }

  ngOnDestroy(): void {
    console.log('destroying navbar component');
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
    // throw new Error("Method not implemented.");
  }

  switchTheme() {
    this.themes.setCurrentTheme(this.themes.generateRandomTheme());
  }
}
