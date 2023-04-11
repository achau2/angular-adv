import { Component, Input, OnInit, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-incrementador",
  templateUrl: "./incrementador.component.html",
  styleUrls: ["./incrementador.component.css"],
})
export class IncrementadorComponent implements OnInit {
  //Nombre es la variable que el padre enviará desde el componente al hijo.
  // @Input('nombre') progress: number = 10;
  @Input() progress: number = 10;
  @Input() btnClass: string = "btn-info";

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  changeProgess(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.valorSalida.emit(100);
      return (this.progress = 100);
    }
    if (this.progress <= 0 && value < 0) {
      this.valorSalida.emit(0);
      return (this.progress = 0);
    }
    this.valorSalida.emit(this.progress + value);
    return (this.progress = this.progress + value);
  }

  onChange(nuevoValor: number) {
    if (nuevoValor >= 100) {
      this.progress = 100;
    } else if (nuevoValor < 0) {
      this.progress = 0;
    } else {
      this.progress = nuevoValor;
    }
    this.valorSalida.emit(this.progress);
  }

  constructor() {}

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }
}
