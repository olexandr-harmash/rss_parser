import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { GlobalErrorComponent } from './components/global-error/global-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPostsPipe } from './pipes/filter-posts.pipe';
import { ModalComponent } from './components/modal/modal.component';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { FocusDirective } from './directives/focus.directive';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationComponent } from './pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    GlobalErrorComponent,
    ModalComponent,
    CreatePostComponent,
    FocusDirective,
    PostPageComponent,
    AuthPageComponent,
    NavigationComponent,
    PostComponent,
    FilterPostsPipe,
    PaginationComponent,
  ],
  imports: [
    MatPaginatorModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
