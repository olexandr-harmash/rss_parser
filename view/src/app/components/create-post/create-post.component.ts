import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  constructor(
    private postService: PostsService,
    private modalService: ModalService
  ) {}

  form = new FormGroup({
    post: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(50),
    ]),
  });

  get post() {
    return this.form.controls.post as FormControl;
  }

  ngOnInit(): void {}

  submit() {
    const post = this.form.value.post as string;
    console.log(JSON.parse(post));
    this.postService.create(JSON.parse(post)).subscribe(() => {
      this.modalService.close();
    });
  }
}
