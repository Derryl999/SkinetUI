import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { Product } from '../shared/models/product';
import { Brand } from '../shared/models/brand';
import { Type } from '../shared/models/type';
import { ShopParams } from '../shared/models/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  constructor(private shopService: ShopService) {}
  products: Product[] = [];
  brands: Brand[] = [];
  types: Type[] = [];
  shopParams = new ShopParams();
  sortOptions = [
    { name: 'Alphabetical', value: 'name' },
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDsc' },
  ];
  totalCount = 0;
  searchVal!: string;
  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  getProducts(): void {
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalCount = response.count;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pagesize = response.pageSize;
      },
      error: (error) => console.log(error),
      complete: () => console.log('completed'),
    });
  }
  getBrands(): void {
    this.shopService.getBrands().subscribe({
      next: (response) => (this.brands = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
      complete: () => console.log('completed fetching brands'),
    });
  }
  getTypes(): void {
    this.shopService.getTypes().subscribe({
      next: (response) => (this.types = [{ id: 0, name: 'All' }, ...response]),
      error: (error) => console.log(error),
      complete: () => console.log('completed fetching types'),
    });
  }
  onBrandSelected(brandId: number): void {
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onTypeSelected(typeId: number): void {
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onSortOptionSelected(event: any): void {
    this.shopParams.sort = event.target.value;
    this.getProducts();
  }
  onPageChange(event: any) {
    this.shopParams.pageNumber = event;
    this.getProducts();
  }
  onSearch() {
    this.shopParams.search = this.searchVal;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }
  onReset() {
    this.searchVal = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
