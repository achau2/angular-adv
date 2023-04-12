import { Component, OnInit } from '@angular/core';
import { resolve } from 'dns';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css'],
})
export class PromesasComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    //Llamada a la promesa creada más abajo, que devuelve una promesa.
    this.getUsuarios().then((usuarios) => console.log(usuarios));

    //Ejemplo básico
    // const promesa = new Promise( (resolve, reject) => {
    //   if( true ){
    //     resolve("Resolve promise");
    //   } else {
    //     reject ("Error en promesa");
    //   }
    // });

    // promesa.then( mensaje =>{
    //   console.log( mensaje );
    // })
    // .catch (error => console.log("Error: " + error));

    // console.log("Fin Init");
  }

  //Ejemplo promesa
  getUsuarios() {
    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users')
        .then((resp) => resp.json())
        .then((body) => resolve(body.data));
    });
    return promesa;
  }
}
