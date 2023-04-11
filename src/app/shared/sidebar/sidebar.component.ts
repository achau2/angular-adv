import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu: any[] = this.sidebarService.menu;

  constructor( private sidebarService: SidebarService) { }

  ngOnInit(): void {
    console.log(this.sidebarService.menu);
  }

}
