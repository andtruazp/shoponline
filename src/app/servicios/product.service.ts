import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  private baseUrl = 'http://localhost:3000';

  get(){
    return this.http.get<Producto[]>(`${this.baseUrl}/products`)
  }


  edit(product: Producto) {
    return this.http.put(`${this.baseUrl}/products/${product.id}`, product);
  }

  add(product: Producto) {
    return this.http.post<Producto>(`${this.baseUrl}/products`, product);
  }
}
