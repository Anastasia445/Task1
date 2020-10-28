import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { CommentsComponent } from './comments/comments.component';
import { NewPostComponent } from './new-post/new-post.component';
import { DetailsComponent } from './details/details.component';
import { SearchComponent } from './search/search.component';
import { MainService } from './services/main.service';
//import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { MatDialogRef } from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CommentsComponent,
    NewPostComponent,
    NewPostComponent,
    DetailsComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [MainService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
