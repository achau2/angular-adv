import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

// Revisar después. Me rompe la aplicación,
// declare function customInitFunctions() : any;


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {


  constructor( private settingService: SettingsService) { }

  ngOnInit(): void {
    // customInitFunctions();
  }

}
