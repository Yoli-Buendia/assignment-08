import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit{
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  
  constructor(
    private contactService: ContactsService,
    private router: Router,
    private route: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        const id = params["id"];
        if (id === undefined || id === null) {
          this.editMode = false;
          return;
        }

        this.originalContact = this.contactService.getContact(id);
        if (this.originalContact === undefined || this.originalContact === null) {
          return;
        }
        this.editMode = true;

        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.originalContact.group != null) {
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
        }
      });
  }
 
  onCancel() {
    this.router.navigate(["/contacts"]);
  }
  onSubmit(form: NgForm) {

    }


}
