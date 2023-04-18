import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private formSubmitted: boolean = false;

  public registerForm = this.fb.group({
    nombre: ['Alejandro', [Validators.required]],
    email: ['test@test.com', [Validators.required, Validators.email]],
    password: ['1234', [Validators.required]],
    confirmPassword: ['1234', [Validators.required]],
    terms: [true, [Validators.required]],
  });

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService, private router: Router) {}

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (
      !this.registerForm.valid &&
      !this.registerForm.get('terms')?.value &&
      this.contraseniasDistintas()
    ) {
      return;
    }
    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe({
        next: (resp) => {
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          // console.warn(err.error.msg)
          Swal.fire({
            icon: 'warning',
            text: err.error.msg
          }
          )
        }
      });
  }

  campoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  terminosValido() {
    if (!this.registerForm.get('terms')?.value && this.formSubmitted) {
      return true;
    }
    return false;
  }

  contraseniasDistintas(): boolean {
    const pass = this.registerForm.get('password');
    const pass2 = this.registerForm.get('confirmPassword');
    if (pass?.value !== pass2?.value && this.formSubmitted) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {}
}
