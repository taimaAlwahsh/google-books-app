import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  books : any;
  @ViewChild("searchValue",{static:false}) searchValue;
  config: PaginationInstance = {
    itemsPerPage:4,
    currentPage: 1
  }
  constructor(
    private httpClient : HttpClient,
  ) { }

  // get the books from google books api using http client .
  getBooks(book){
    return this.httpClient.get("https://www.googleapis.com/books/v1/volumes?q="+book+"&key=AIzaSyCY7E5xtiXPU7rZDpKoNf4f4UBiqQ373e8").toPromise().then(data=>{
       this.books = data;
       this.books = this.books.items; 
       console.log(this.books);       
     
     });
  }

  // search for books.
  search(value : HTMLInputElement){
    this.getBooks(value.value).then(result =>{
    });
    
  }

  // if the books more than 5 we will hava pages, to change between them.
  pageChanged(pageNumber) {
    this.config.currentPage = pageNumber;
  }

  // sort books by title.
  sortByTitle(){
    this.books.sort((a,b)=>a.volumeInfo.title.localeCompare(b.volumeInfo.title));
  }
}
