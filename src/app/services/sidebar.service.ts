import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[]=[
    {
      titulo: "Dashboard",
      icono: 'mdi mdi-guage',
      submenu: [
        {
          titulo: 'Main', url:'/'
        },
        {
          titulo: 'ProgressBar', url:'/dashboard/progress'
        },
        {
          titulo: 'Graphic', url:'/dashboard/grafica1'
        },

      ]
    }
  ]

  constructor() { }
}
