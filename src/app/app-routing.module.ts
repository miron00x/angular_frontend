import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';
import { CreateDocumentComponent } from './create-document/create-document.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard';
const routes: Routes = [
    { path: '', redirectTo: 'document', pathMatch: 'full' },
    { path: 'document', component: DocumentsListComponent, canActivate: [AuthGuard] },
    { path: 'details/:id', component: DocumentDetailsComponent, canActivate: [AuthGuard] },
    { path: 'add/:id', component: CreateDocumentComponent, canActivate: [AuthGuard] },
    { path: 'add', component: CreateDocumentComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent }
];
 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
 
export class AppRoutingModule { }