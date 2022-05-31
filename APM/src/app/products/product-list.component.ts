import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit{
    ngOnInit(): void {
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products
    }

    onRatingClicked(message: string) : void {
        this.pageTitle = 'Product List: ' + message;
    }

    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In setter', value); 
        this.filteredProducts = this.performFilter(value);
    }

    constructor(private productService: ProductService) {};

    filteredProducts: IProduct[] = [];

    products: IProduct[]= [];

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy));
    }
}