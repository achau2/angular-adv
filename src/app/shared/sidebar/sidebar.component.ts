import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  menu: any[] = this.sidebarService.menu;

  logout(){
    this.usuarioService.logout();
  }

  constructor( private sidebarService: SidebarService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    console.log(this.sidebarService.menu);
  }

}
