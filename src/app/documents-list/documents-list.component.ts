import {DecimalPipe} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';

import { NgbdSortableHeader, SortEvent} from './sortable.directive';
import { Component, Directive, EventEmitter, Input, Output, OnInit, QueryList, ViewChildren } from '@angular/core';

import { Observable } from 'rxjs';
 
import { DocumentService } from '../services/document.service';
import { Document } from '../models/document';

@Component({
  selector: 'documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css']
})
export class DocumentsListComponent implements OnInit {

  documents: Observable<Document[]>;
  total: number;
  page: number;
  pageSize: number;
  error: String;
  img: String;
  
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
 
  constructor(private documentService: DocumentService, private router: Router) { 
	this.reloadData();
  }
  
  onPageChange(pageNumber){
	this.documentService.page = pageNumber;
	this.reloadData();
  }
  
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
	  if (header.sortable !== column) {
		header.direction = 'NULL';
	  }
    });
    this.img = "glyphicon glyphicon-triangle-bottom";

    this.documentService.sortColumn = column;
    this.documentService.sortDirection = direction;
	this.reloadData();
  }
 
  ngOnInit() {
    this.reloadData();
  }
 
  deleteDocuments() {
    this.documentService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => this.setError(error));
  }
 
  reloadData() {
	this.documentService.updateService();
	this.total = this.documentService.total;
	this.page = this.documentService.page;
	this.pageSize = this.documentService.pageSize;
    this.documentService.getDocumentsPage()
	.subscribe(
		data => {
			this.documents = data;
		},
		error => this.setError(error));
	}

	setError(error: string): void {
		this.error = `Произошла ошибка. ${error}`;
	}	
  
  documentDetails(doc: Document){
	this.router.navigate(["/details/", doc.id]);
  }

}
