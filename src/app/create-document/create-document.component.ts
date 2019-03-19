import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../models/user';
import { Document } from '../models/document';
import { DocumentService } from '../services/document.service';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Observable } from 'rxjs';

@Component({
	selector: 'create-document',
	templateUrl: './create-document.component.html',
	styleUrls: ['./create-document.component.css']
})
export class CreateDocumentComponent implements OnInit {
	createForm: FormGroup;
    error = '';
	file: File;
	file_id: number;
	doc: Document;
	message: String;
	
	constructor(private documentService: DocumentService, 
		private formBuilder: FormBuilder,
		private userService: UserService, 
		private router: Router,
		private route: ActivatedRoute) {
			this.initForm();
	}

	ngOnInit() {
	}

	initForm(){
		this.doc = new Document(JSON.parse(sessionStorage.getItem("currentUser")));
		this.file_id = +this.route.snapshot.paramMap.get('id');
		this.createForm = new FormGroup({
			"visibleName": new FormControl(this.doc.visibleName, [Validators.required]),
			"description": new FormControl(this.doc.description, [Validators.required])
		});
	}

	onSubmit() {
		this.doc.visibleName = this.f.visibleName.value;
		this.doc.description = this.f.description.value;
		if(!this.file_id){
			this.documentService.createDocument(this.file, this.doc)
			.subscribe((response: Document) => {
				if (response) {
					this.setMessage(response.visibleName);
				} 
			}, error => this.setError(error));
		} else {
			this.doc.id = this.file_id;
			this.documentService.updateDocument(this.doc, this.file)
			.subscribe((response: Document) => {
				if (response) {
					this.setMessage(response.visibleName);
				} 
			}, error => this.setError(error));
		}
	}

	get f() { return this.createForm.controls; }
	
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
		this.f.visibleName.setValue(this.file.name);
	}

}
