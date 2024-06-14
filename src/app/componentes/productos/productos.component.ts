import { Component, OnInit } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { ProductService } from '../../servicios/product.service';
import { FormBuilder, Validators } from '@angular/forms'; 
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit{
  products: Producto[] = [];
  statuses: { label: string; value: string; }[] | undefined;

  productsForm = this.fb.group({
    id: [null as number | null],
    codigo: ['',Validators.required],
    nombre: ['',Validators.required],
    descripcion: ['',Validators.required],
    precio: [null as number | null,Validators.required],
    imagen: ['',Validators.required],
    categoria: ['',Validators.required],
    cantidad: [null as number | null,Validators.required],
    estadoInventario: ['',Validators.required],
    rating: [null as number | null, Validators.required]
  })
  selectedProducts: Producto[] = [];
  productDialog: boolean = false;
  submitted: boolean = false;

  constructor(private productService : ProductService,
    private fb: FormBuilder,
    private messageService: MessageService
  ){}


  ngOnInit(): void {
    this.productService.get().subscribe((products)=>{
      this.products = products;
    })

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofnstock' }
    ]
  }

  openNew(){
    this.productsForm.reset();
  this.productsForm.patchValue({
    id: 0,
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    categoria: '',
    cantidad: 0,
    estadoInventario: '',
    rating: 0
  });
  this.submitted = false;
  this.productDialog = true;
  }

  deleteSelectedProducts(){
    this.products = this.products?.filter(val => !this.selectedProducts.includes(val));
    this.selectedProducts = [];
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
  }

  editProduct(product : Producto){
    this.productsForm.patchValue(product);
    this.productDialog = true;
  }

  deleteProduct(product: Producto){
    this.products = this.products?.filter(val => val.id !== product.id);
    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
  }


  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }
  
  saveProduct() {
    this.submitted = true;
  
    if (this.productsForm.valid) {
      const product = this.productsForm.value as unknown as Producto;
      if (product.id) {
        // Edit existing product
        this.productService.edit(product).subscribe(() => {
          const index = this.products?.findIndex(p => p.id === product.id);
          if (index !== undefined && index !== -1 && this.products) {
            this.products[index] = product;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          }
        });
      } else {
        // Add new product
        this.productService.add(product).subscribe((newProduct: Producto) => {
          this.products?.push(newProduct);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        });
      }
      this.products = [...(this.products || [])];
      this.productDialog = false;
      this.productsForm.reset();
    }
  }
  

}
