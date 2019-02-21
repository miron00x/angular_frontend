import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { Document } from '../models/document';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { DocumentsListComponent } from '../documents-list/documents-list.component';

@Component({
  selector: 'document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {
	DocEditForm: FormGroup;
	document: Document;
	change: boolean = false;
	isValid: boolean = true;

	constructor(private documentService: DocumentService, 
		private router: Router, 
		private activateRoute: ActivatedRoute,
		private fb: FormBuilder) 
	{
		documentService.getDocument(activateRoute.snapshot.params['id']).subscribe(data => {
			this.document = data;
			this.document.uploadDate = data.uploadDate.substr(0, 19);
			this.document.updateDate = data.updateDate.substr(0, 19);
			this.initForm();
		});
	}

	ngOnInit() {
	}
	
	initForm(){
		this.DocEditForm = new FormGroup({
			"name": new FormControl(this.document.docName, [Validators.required]),
			"user": new FormControl(this.document.user.userName),
			"date": new FormControl(this.document.uploadDate),
		});
	}

	
    get f() { return this.DocEditForm.controls; }

	updateDocument() {
		this.router.navigate(['/add', this.document.id]);
	}
	
	downloadDocument(){
		this.documentService.downloadDocument(this.document.id);
	}

	deleteDocument() {
		this.documentService.deleteDocument(this.document.id)
			.subscribe(
				data => {
				this.router.navigate(['/document']);;
				//this.listComponent.reloadData();
			},
		error => console.log(error));
	}
	
	onChange(event){
		this.change = true;
		if(this.f.name.errors)
			this.isValid = true
		else
			this.isValid = false;
	}
	
	saveChange(){
		alert("lol");
		this.document.docName = this.f.name.value;
		this.documentService.upDocProp(this.document)
			.subscribe(
					data => {
					this.router.navigate(['/document']);;
					//this.listComponent.reloadData();
				},
			error => console.log(error));
	}

}