import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { Document } from '../models/document';
import {saveAs as importedSaveAs} from "file-saver";

import { DocumentsListComponent } from '../documents-list/documents-list.component';

@Component({
  selector: 'document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {

	document: Document;
	
	file: File;

	constructor(private documentService: DocumentService, 
		private router: Router, 
		private activateRoute: ActivatedRoute) 
	{
		documentService.getDocument(activateRoute.snapshot.params['id']).subscribe(data => this.document = data);
	}

	ngOnInit() {
	}

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
				console.log(data);
				//this.listComponent.reloadData();
			},
		error => console.log(error));
	}

}