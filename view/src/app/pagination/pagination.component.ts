import { Component, OnInit } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  constructor(public postsService: PostsService) {}

  ngOnInit(): void {}

  length: number;
  pageEvent: any;
  datasource: null;
  pageIndex: number;
  pageSize: number;

  getServerData(e?: any) {
    this.postsService
      .getAll(e?.pageSize, e?.pageIndex)
      .subscribe(result => (this.length = result.count));
  }
}
