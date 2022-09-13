import { Component, OnInit } from '@angular/core';
import {ModalService} from '../../services/modal.service'
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  title = 'rss admin interface'

  loading = false

  term = ''
  //may add in formGroup
  limit = '25'
  page = '0'

  constructor(
    public postsService: PostsService,
    public modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loading = true
    this.postsService.getAll().subscribe(() => {
      this.loading = false
    })
  }

  //may add validation like formGroup but for simple
  getAll() {
    this.loading = true
    this.postsService.getAll(Number(this.limit), Number(this.page)).subscribe(() => {
      this.loading = false
    })
  }
}
