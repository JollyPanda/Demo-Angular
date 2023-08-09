import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userId: number = 0;
  userDetails: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = Number(params.get('id'));
      this.fetchUserDetail();
    });
  }

  fetchUserDetail() {
    this.http.get<any>(`https://reqres.in/api/users/${this.userId}`).subscribe(
      (response) => {
        console.log('Detalles del usuario:', response.data);
        this.userDetails = response.data;
      },
      (error) => {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    );
  }
}