import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  loginData = {
    email: '',
    password: '',
  };

  errorMessage: string = 'Usuario o contraseña incorrectos. Puede iniciar sesión con el email eve.holt@reqres.in y la contraseña cityslicka';
  showError: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }


  onSubmit() {
    // Estos son los datos ingresados por el usuario
    const loginData = {
      email: this.loginData.email,
      password: this.loginData.password,
    };

    // Llamada HTTP POST a la API de Reqres para el login
    // Siempre funcionará con el mail: "eve.holt@reqres.in" y la contraseña "cityslicka"
    this.http.post<any>('https://reqres.in/api/login', loginData).subscribe(
      (response) => {
        // Si el login es correcto la API responde con un token y la página redirige a lista
        const authToken = response.token;
        console.log('Login exitoso. Token:', authToken);
        this.router.navigate(['/lista-usuarios']);
      },
      (error) => {
        // Si ocurre un error, la API lo indicará y la página mostrará un mensaje
        console.error('Error en el login:', error.error);
        this.showError = true;
      }
    );
  }
}