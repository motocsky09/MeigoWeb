import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/services/product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  addingProduct = false;
  editingProduct = false;
  addingCategory = false;
  editingCategory = false;

  selectedProductId: number | null = null;
  products: any[] = [];
  categories: any[] = [];

  newProduct = this.createProduct();
  newCategory = { id: 0, name: '' };

  constructor(
    @Inject(ProductService) private productService: ProductService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  imageFiles: { [key: string]: File | null } = {
    imagePath1: null,
    imagePath2: null,
    imagePath3: null
  };

  onImageSelected(event: any, field: string) {
    const file = event.target.files[0];
    if (file) {
      this.imageFiles[field] = file;
    }
  }
  createProduct() {
    return {
      id: 0,
      name: '',
      categoryId: null,
      price: null,
      stock: null,
      status: 'active',
      description: '',
      imagePath1: '',
      imagePath2: '',
      imagePath3: '',
      size: '',
      color: '',
      season: '',
      gender: '',
      material: ''
    };
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  startAddingProduct() {
    this.addingProduct = true;
    this.editingProduct = false;
    this.newProduct = this.createProduct();
  }

  startEditingProduct(product: any) {
    this.router.navigate(['/admin/products/edit', product.id]);
  }

  cancelAddingProduct() {
    this.addingProduct = false;
    this.editingProduct = false;
    this.newProduct = this.createProduct();
  }

  saveNewProduct() {
    if (!this.newProduct.name || this.newProduct.name.trim() === '') {
      alert('Product name is required!');
      return;
    }
    // Trimite toate câmpurile, inclusiv id (0)
    const productData: any = {
      id: 0,
      name: this.newProduct.name,
      price: this.newProduct.price ?? 0,
      shortDescription: this.newProduct.description ?? '',
      totalQuantity: this.newProduct.stock ?? 0,
      categoryId: this.newProduct.categoryId ? Number(this.newProduct.categoryId) : 0,
      imagePath1: '',
      imagePath2: '',
      imagePath3: '',
      size: this.newProduct.size ?? '',
      color: this.newProduct.color ?? '',
      season: this.newProduct.season ?? '',
      gender: this.newProduct.gender ?? '',
      material: this.newProduct.material ?? ''
    };
    this.createProductAsJson(productData).subscribe({
      next: () => {
        this.loadProducts();
        this.cancelAddingProduct();
      },
      error: (err) => {
        alert('Eroare la adăugare produs: ' + (err?.error?.title || err.message));
      }
    });
  }

  // Fallback pentru POST JSON direct din componentă
  createProductAsJson(productData: any) {
    // Importă HttpClient din @angular/common/http în componentă dacă nu există deja
    // și injectează-l în constructor ca 'private http: HttpClient'
    return this.http.post(
      `${this.productService.BaseURI}/Product/CreateProduct`,
      productData,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  deleteProduct(productId: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.loadProducts();
      });
    }
  }

  startAddingCategory() {
    this.addingCategory = true;
    this.editingCategory = false;
    this.newCategory = { id: 0, name: '' };
  }

  startEditingCategory(category: any) {
    this.editingCategory = true;
    this.addingCategory = false;
    this.newCategory = { ...category };
  }

  cancelAddingCategory() {
    this.addingCategory = false;
    this.editingCategory = false;
    this.newCategory = { id: 0, name: '' };
  }

  saveNewCategory() {
    if (this.editingCategory) {
      this.productService.updateCategory(this.newCategory).subscribe(() => {
        this.loadCategories();
        this.cancelAddingCategory();
      });
    } else {
      this.productService.createCategory(this.newCategory).subscribe(() => {
        this.loadCategories();
        this.cancelAddingCategory();
      });
    }
  }

  deleteCategory(categoryId: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.productService.deleteCategory(categoryId).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  }
}