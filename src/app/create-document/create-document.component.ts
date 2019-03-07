import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { Document } from '../models/document';
import { DocumentService } from '../services/document.service';
import { UserService } from '../services/user.service';

import { Observable } from 'rxjs';

@Component({
	selector: 'create-document',
	templateUrl: './create-document.component.html',
	styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit {
	file: File;
	file_id: number;
	doc: Document;
	message: String;
	error: String;
	
	constructor(private documentService: DocumentService, 
		private userService: UserService, 
		private router: Router,
		private route: ActivatedRoute) { }

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('id');
		this.file_id = +id;
	}

	onSubmit() {
		if(!this.file_id){
			this.documentService.createDocument(this.file)
			.subscribe((response: Document) => {
				if (response) {
					this.setMessage(response.docName);
				} 
			}, error => this.setError(error));
		} else {
			this.documentService.updateDocument(this.file_id, this.file)
			.subscribe((response: Document) => {
				if (response) {
					this.setMessage(response.docName);
				} 
			}, error => this.setError(error));
		}
	}
	
	setMessage(message: string): void {
		this.error = ``;
		this.message = `Файл ${message} был успешно сохранен`;
	}	
	
	setError(error: string): void {
		this.message = ``;
		this.error = `Произошла ошибка. ${error}`;
	}	
	
	sleep(delay) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay);
    }

	fileChange(event) {
		let fileList: FileList = event.target.files;
		if(fileList.length > 0) {
			this.file = fileList[0];
		}
	}

}
