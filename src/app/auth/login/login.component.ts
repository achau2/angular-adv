import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { UsuarioService } from 'src/app/services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;
  private formSubmitted: boolean = false;

  public loginForm = this.fb.group({
    email: ['achau@gmail.com', [Validators.required, Validators.email]],
    password: ['1234', [Validators.required]],
    remember:[false]
  });

  constructor( private router: Router, private fb: FormBuilder, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id:
        "239347861638-4f70722at1b5cd8nintsnd3botjbpa65.apps.googleusercontent.com",
        // para mantener la referencia al componente que se envía por el callback al método handleCredentialResponse...
        callback: (response:any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" } // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    //console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
      .subscribe(resp => {
        //console.log({login: resp});
        this.router.navigateByUrl('/');
      })
  }

  login(){
    this.formSubmitted = true;
    console.log(this.loginForm.value);
    if (
      !this.loginForm.valid
    ) {
      return;
    }
    this.usuarioService.loginUsuario(this.loginForm.value)
      .subscribe({
        next: (resp) => {
          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value);
          }
          else{
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
        },
        error: (err) => {
          // console.warn(err.error.msg)
          Swal.fire({
            icon: 'error',
            text: err.error.msg
          }
          )
        }
      });
  }

  campoValido(campo: string): boolean {
    if (this.loginForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
