import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UploadResponse {
  id: string;
  fileName: string;
  contentType: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private readonly apiUrl = 'http://localhost:8000/api/documents';

  constructor(private readonly http: HttpClient) {}

  uploadDocument(file: File): Observable<UploadResponse> {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadResponse>(
      `${this.apiUrl}/upload`,
      formData
    );
  }
}