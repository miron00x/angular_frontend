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
	
	constructor(private http: HttpClient) { }

	getDocument(id: number): Observable<any> {
		return this.http.get(`${this.baseUrl}/id/${id}`);
	}

	createDocument(file: File): Observable<Object> {
		let formData = new FormData();
		formData.append('uploadFile', file);
		const httpOptions = {
			headers: new HttpHeaders({
				'Accept': 'application/json'
			})
		};
		const req = new HttpRequest('POST', `${this.baseUrl}` + `/create`, formData, httpOptions);
		let result = this.http.request(req);
		this.updateService();
		return result;
	}

	updateDocument(id: number, file: File): Observable<Object> {
		let formData = new FormData();
		formData.append('uploadFile', file);
		const httpOptions = {
			headers: new HttpHeaders({
				'Accept': 'application/json'
			})
		};
		const req = new HttpRequest('PUT', `${this.baseUrl}/${id}`, formData, httpOptions);
		return this.http.request(req);
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
	
	getDocumentsPage(): Observable<any> {
		return this.http.get(
			`${this.baseUrl}` + `/page?page=` + (this.page - 1) + `&size=` + this.pageSize 
			+ `&sortColumn=` + this.sortColumn + `&sortDirection=` + this.sortDirection
		);
	}
	
	downloadDocument(id: number){
		return this.http.get(`${this.baseUrl}` + '/download/' + id, { responseType: 'blob' })
			.subscribe(data => {window.open(window.URL.createObjectURL(data))});
	}
	
	deleteAll(): Observable<any> {
		let result = this.http.delete(`${this.baseUrl}` + `/delete`);
		this.updateService();
		return result;
	}
	
	updateService(){
		this.getDocumentsList().subscribe(data => {this.total = data.length});
	}
}