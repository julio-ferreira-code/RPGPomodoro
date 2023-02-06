import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../shared/usuario';

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

  constructor (private router: Router,private fb: FormBuilder,){

  }

  ngOnInit(): void {

  }

  createForm() {
    this.loginForm = this.fb.group({
      id: '',
      nome: '',
      email: ['', Validators.required],
      senha: ['', Validators.required],
      sexo: [''],
      pet: [''],
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
        //this.controlaLoginService.setUsuarioLogado(this.users[index]);
        //this.controlaLoginService.toggleSidebarVisibility();
        //this.router.navigate(["login"]);
        alert("Logou");
      }else{
        alert("Não logou");
      }
    }
  }

}
