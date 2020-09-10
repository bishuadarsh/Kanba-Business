import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/categories.service';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map, subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product: any = {};
  
  constructor(categoryService: CategoriesService, private productService: ProductService, private router: Router, private route: ActivatedRoute) {
    this.categories$ = categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.productService.get(id).snapshotChanges().pipe(take(1)).subscribe(p=>this.product=p);
     }

  ngOnInit(): void {
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);

  }

}
