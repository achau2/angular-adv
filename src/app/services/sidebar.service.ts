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
          titulo: 'Graphic', url:'/dashboard/grafica1'
        },
        {
          titulo: 'ProgressBar', url:'/dashboard/progress'
        },
        {
          titulo: 'Promises', url:'/dashboard/promises'
        },
        {
          titulo: 'Rxjs', url:'/dashboard/rxjs'
        },

      ]
    }
  ]

  constructor() { }
}
