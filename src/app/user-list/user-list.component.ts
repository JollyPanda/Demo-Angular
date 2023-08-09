// user-list.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: any[] = [];
  usersPerPage: number = 6; // Cantidad de usuarios predeterminados por la API
  currentPage: number = 1; // Página actual
  totalPages: number = 1; // Total de páginas disponibles predeterminados por la API
  sortKey: string = 'id'; // Por defecto se ordena la tabla por ID
  sortOrder: boolean = true; // true = ascendente, false = descendiente

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUserList();
  }

  fetchUserList() {
    this.http.get<any>('https://reqres.in/api/users?page=' + this.currentPage).subscribe(
      (response) => {
        console.log('Lista de usuarios:', response.data);
        // Guardar la lista completa de usuarios en el arreglo userList
        this.userList = response.data;
        this.totalPages = response.total_pages;
      },
      (error) => {
        console.error('Error. No se pudo obtener lista de usuarios, la API puede estar offline:', error);
      }
    );
  }

  loadMoreUsers() {
    // Verificar si hay más páginas disponibles para cargar
    // La API por defecto trae únicamente 2 páginas con 6 usuarios cada una
    if (this.currentPage < this.totalPages) {
      this.currentPage++;

      // Realiza un nuevo request para obtener la siguiente página de usuarios
      // Y los agrega a la lista
      this.http.get<any>('https://reqres.in/api/users?page=' + this.currentPage).subscribe(
        (response) => {
          console.log('Siguientes usuarios:', response.data);
          this.userList = this.userList.concat(response.data);
        },
        (error) => {
          console.error('Error al obtener los siguientes usuarios:', error);
        }
      );
    }
  }

  // Con esta función ordenamos la tabla
  sortTable(key: string) {
    if (this.sortKey === key) {
      // Si ya está ordenando por la misma clave, cambiamos el orden
      this.sortOrder = !this.sortOrder;
    } else {
      // Si se está ordenando por una nueva clave, establecemos la clave y el orden predeterminado
      // True = ascendente, False = descendente
      this.sortKey = key;
      this.sortOrder = true;
    }
    this.sortUsers();
  }

  // Con esta función ordenamos los usuarios
  sortUsers() {
    this.userList.sort((a, b) => {
      let valA = a[this.sortKey];
      let valB = b[this.sortKey];

      if (this.sortOrder) {
        if (valA > valB) {
          return 1;
        } else if (valA < valB) {
          return -1;
        } else {
          return 0;
        }
      } else {
        if (valA < valB) {
          return 1;
        } else if (valA > valB) {
          return -1;
        } else {
          return 0;
        }
      }
    });
  }
}
