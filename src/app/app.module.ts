import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BasicAuthInterceptor } from './helper/basic-auth.interceptor';
import { ErrorInterceptor } from './helper/error.interceptor';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { LoginComponent } from './login/login.component';
import { NgbdSortableHeader } from './documents-list/sortable.directive';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
	LoginComponent,
    CreateDocumentComponent,
    DocumentsListComponent,
    DocumentDetailsComponent,
	NgbdSortableHeader
  ],
  imports: [
	NgbModule,
    BrowserModule,
	FormsModule,
	ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
	{ provide: APP_BASE_HREF, useValue : '/' },
	{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
