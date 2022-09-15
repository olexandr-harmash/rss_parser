import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';

const routes: Routes = [
  { path: '', component: PostPageComponent },
  { path: 'auth', component: AuthPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
