import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-oost-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
})
export class PostPageComponent implements OnInit {
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
