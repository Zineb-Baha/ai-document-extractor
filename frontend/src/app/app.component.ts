import { Component } from '@angular/core';
import { DocumentUpload } from "./components/document-upload/document-upload.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DocumentUpload],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
