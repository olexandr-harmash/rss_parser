import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  title = 'rss admin interface';

  loading = false;

  term = '';

  constructor(
    public postsService: PostsService,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.postsService.getAll().subscribe(() => {
      this.loading = false;
    });
  }

  //may add validation like formGroup but for simple
  getAll() {
    this.loading = true;
    this.postsService.getAll(10, 0).subscribe(() => {
      this.loading = false;
    });
  }
}
