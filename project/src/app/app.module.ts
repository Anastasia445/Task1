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
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { InterceptorService } from './services/interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth.guard';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { ViewProfileComponent } from './view-profile/view-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CommentsComponent,
    NewPostComponent,
    DetailsComponent,
    SearchComponent,
    LoginComponent,
    SignupComponent,
    ViewProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide : HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
