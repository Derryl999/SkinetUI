import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/shared/models/product';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService
  ) {}
  product!: Product;
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idString = params.get('id');
      // const id = idString ? parseInt(idString, 10) : null;
      if (idString) {
        this.shopService.getProduct(+idString).subscribe({
          next: (data) => (this.product = data),
          error: (error) => console.log(error),
        });
      }
    });
  }
}
