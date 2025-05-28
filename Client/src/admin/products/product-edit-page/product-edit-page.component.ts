import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/services/product.service';

@Component({
  selector: 'app-product-edit-page',
  templateUrl: './product-edit-page.component.html',
  styleUrls: ['./product-edit-page.component.css']
})
export class ProductEditPageComponent implements OnInit {
  product: any = null;
  categories: any[] = [];
  mainImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(Number(id)).subscribe((data: any) => {
        this.product = {
          ...data,
          size: data.size ?? '',
          color: data.color ?? '',
          season: data.season ?? '',
          gender: data.gender ?? '',
          material: data.material ?? ''
        };
        this.mainImage = data.imagePath1 || '';
      });
    }
    this.productService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  saveProduct() {
    this.productService.updateProduct(this.product).subscribe(() => {
      this.router.navigate(['/admin/products']);
    });
  }

  cancel() {
    this.router.navigate(['/admin/products']);
  }

  onImgError(event: Event) {
    const target = event.target as HTMLImageElement;
    if (target && target.src.indexOf('no-image.png') === -1) {
      target.src = './assets/images/no-image.png';
    }
  }

  getImageSrc(path: string): string {
    if (!path || !/\.[a-zA-Z0-9]+$/.test(path)) {
      return './assets/images/no-image.png';
    }
    return './assets/images/products/' + path;
  }
}
