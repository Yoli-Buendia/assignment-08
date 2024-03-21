import { Component } from '@angular/core';
import { Document } from '../document.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentsService } from '../documents.service';


@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false; 
  id: string;


  constructor(
    private documentService: DocumentsService,
    private route: ActivatedRoute,
    private router: Router,){
  }

  ngOnInit(): void {
    new FormGroup({
      'title': new FormControl(null, Validators.required),
      'url': new FormControl(null, Validators.required)
    })

    this.route.params
      .subscribe (
      (params: Params) => {
        this.id = params['id'];
        if (!this.id){
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(this.id);
    
        if (!this.originalDocument) {
          return;
        }
         this.editMode = true;
         // clone original document
         this.document = JSON.parse(JSON.stringify(this.originalDocument)); 
    }) 
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    this.document = new Document(value.id, value.name, value.description, value.url);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, this.document);
    } else {
      this.documentService.addDocument(this.document);
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }
  
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
