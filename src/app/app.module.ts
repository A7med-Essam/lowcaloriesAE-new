import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { TermsComponent } from './pages/terms/terms.component';
import { PlansComponent } from './pages/plans/plans.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { FaqComponent } from './pages/faq/faq.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { APP_STORE } from './store/appStore';
import { AuthEffect } from './store/authStore/auth.effect';

const APP_PRIMENG_MODULE = [DropdownModule, SkeletonModule];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    MenuComponent,
    ContactsComponent,
    TermsComponent,
    PlansComponent,
    RegisterComponent,
    LoginComponent,
    NotfoundComponent,
    ForgetPasswordComponent,
    FaqComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DialogModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(APP_STORE),
    EffectsModule.forRoot([AuthEffect]),
    CarouselModule,
    APP_PRIMENG_MODULE,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}