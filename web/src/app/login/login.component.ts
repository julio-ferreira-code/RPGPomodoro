import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../shared/usuario';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  usuarios!: Usuario[];
  logUsuario!: Usuario;
  errMess!: string;
  loginForm!: FormGroup;

  constructor (private router: Router,private fb: FormBuilder,private usuarioService: UsuarioService){

  }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(
      (usuarios) => (this.usuarios = usuarios),
      (errmess) => (this.errMess = <any>errmess)

    );
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email,Validators.required]],
      senha: ['', Validators.required]
    });
  }

  validar() {
    this.logUsuario = new Usuario();
    this.logUsuario.email = this.loginForm.get('email')?.value;
    this.logUsuario.senha = this.loginForm.get('senha')?.value;
    for (let index = 0; index < this.usuarios.length; index++) {
      if (
        this.logUsuario.email == this.usuarios[index].email &&
        this.logUsuario.senha == this.usuarios[index].senha
      ) {
        this.usuarioService.setUsuarioLogado(this.usuarios[index]);
        this.router.navigate(["inicial"]);
      }
    }
  }

}
