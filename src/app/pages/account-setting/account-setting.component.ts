import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css'],
})
export class AccountSettingComponent implements OnInit {
  linkTheme = document.querySelector('#theme');
  public linksTheme?: NodeListOf<Element>;
  constructor(private settingService: SettingsService) {}

  ngOnInit(): void {
    this.settingService.checkCurentTheme();
  }
  changeTheme(theme: string) {
    this.settingService.changeTheme(theme);
  }
}
