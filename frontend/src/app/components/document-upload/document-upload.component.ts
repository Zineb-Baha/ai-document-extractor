import { Component } from '@angular/core';
import { DocumentService } from "../../services/document.service";

@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [],
  templateUrl: './document-upload.component.html',
  styleUrl: './document-upload.component.css'
})
export class DocumentUpload {

  selectedFile: File | null = null;
  message = '';
  uploading = false;

  constructor(private readonly documentService: DocumentService) {}

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.message = '';
    }
  }

  upload(): void {

    if (!this.selectedFile) {
      this.message = 'Please select a file first.';
      return;
    }

    this.uploading = true;
    this.message = '';

    this.documentService
      .uploadDocument(this.selectedFile)
      .subscribe({
        next: (response) => {
          this.uploading = false;

          this.message =
            `✓ ${response.message} (${response.fileName})`;
        },

        error: (error) => {
  this.uploading = false;

  console.error('UPLOAD ERROR:', error);
  console.error('STATUS:', error.status);
  console.error('ERROR:', error.error);
  console.error('MESSAGE:', error.message);

  this.message = `❌ Upload failed (${error.status})`;
}
      });
  }
}