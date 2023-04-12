import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router, Event } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public titulo!: string;
  public tituloSubcription!: Subscription;

  constructor(private router: Router) {
    //this.getTituloPath();
    this.tituloSubcription = this.getTituloPath().subscribe((data) => {
      // console.log(data);
      this.titulo = data['titulo'];
      //texto tab browser
      document.title = `AdminPro - ${data['titulo']}`;
    });

    // 3 + poner en método
    // this.router.events.pipe(
    //   filter((evento: Event): evento is ActivationEnd =>evento instanceof ActivationEnd),
    //   filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
    //   map((evento: ActivationEnd) => evento.snapshot.data)
    // ).subscribe(({titulo}) =>{ <- desustructuracion
    //   // console.log(data);
    //   this.titulo = titulo;
    //   //texto tab browser
    //   document.title = titulo;
    // }
    // )

    //2
    // this.router.events.pipe(
    //   filter(events => events instanceof ActivationEnd) <= funciona si utilizo solo esta línea
    //   filter((evento: Event): evento is ActivationEnd =>evento instanceof ActivationEnd),  <= funciona para poner otro filtro abajo
    // ).subscribe(event =>
    //   console.log(event)
    // )

    //1
    // this.router.events.subscribe(event =>
    //   console.log(event)
    // )
  }

  getTituloPath() {
    return this.router.events.pipe(
      filter(
        (evento: Event): evento is ActivationEnd =>
          evento instanceof ActivationEnd
      ),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.tituloSubcription.unsubscribe();
  }
}
