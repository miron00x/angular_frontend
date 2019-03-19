import { Injectable } from '@angular/core';

import {RequestOptions, Request, RequestMethod, ResponseContentType} from '@angular/http';
import { HttpClient, HttpParams, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import { map } from "rxjs/operators";

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from '../documents-list/sortable.directive';

import { Document } from '../models/document';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
	
	private baseUrl = 'http://localhost:8080/api/documents';

	sortColumn: String = "docName";
	sortDirection: SortDirection = "NULL";
	total: number;
	page: number = 1;
	pageSize: number = 5;
	
	constructor(private http: HttpClient) {

		console.log("CREATE");
	}

	getDocument(id: number): Observable<any> {
		return this.http.get(`${this.baseUrl}/id/${id}`);
	}

	createDocument(file: File, doc: Document): Observable<any> {
		let formData = new FormData();
		formData.append('uploadFile', file);
		formData.append('document', JSON.stringify(doc));
		const req = new HttpRequest('POST', `${this.baseUrl}/create`, formData);
		let result = this.http.request(req);
		this.updateService();
		return result;
	}

	updateDocument(doc: Document, file: File): Observable<any> {
		let formData = new FormData();
		formData.append('uploadFile', file);
		formData.append("document", JSON.stringify(doc));
		const req = new HttpRequest('POST', `${this.baseUrl}/${doc.id}`, formData);
		let result = this.http.request(req);
		this.updateService();
		return result;
	}
	
	upDocProp(document: Document): Observable<any>{
		return this.http.post(`${this.baseUrl}/upd`, document);
	}

	deleteDocument(id: number): Observable<any> {
		let result = this.http.delete(`${this.baseUrl}/delete/${id}`, { responseType: 'text' });
		this.updateService();
		return result;
	}

	getDocumentsList(): Observable<any> {
		return this.http.get(`${this.baseUrl}`);
	}
	
	getDocumentsListByUser(userName: string): Observable<any> {
		return this.http.get(`${this.baseUrl}/${userName}`);
	}
	
	getDocumentsPage(): Observable<any> {
		return this.http.get(
			`${this.baseUrl}` + `/page?page=` + (this.page - 1) + `&size=` + this.pageSize 
			+ `&sortColumn=` + this.sortColumn + `&sortDirection=` + this.sortDirection
		);
	}
	
	downloadDocument(id: number){
		return this.http.get(`${this.baseUrl}` + '/download/' + id, { responseType: 'blob' })
			.subscribe(data => {
				window.open(window.URL.createObjectURL(data))
			});
	}
	
	deleteAll(): Observable<any> {
		let result = this.http.delete(`${this.baseUrl}` + `/delete`);
		this.updateService();
		return result;
	}
	
	updateService(){
		let curentUser = JSON.parse(sessionStorage.getItem('currentUser'));
		if(curentUser.role === `USER`){
			this.getDocumentsListByUser(curentUser.userName)
			.subscribe(data => {this.total = data.length});
		} else {
			this.getDocumentsList()
			.subscribe(data => {this.total = data.length});
		}
	}
}