import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserControllerService } from 'src/app/api/services/user-controller.service';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

interface expandedRows {
  [key: string]: boolean;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  providers: [MessageService, ConfirmationService,CustomerService]
})
export class UserListComponent {

visible: boolean = false;
public doctorForm: FormGroup;

  doctorList:any=[];

  @ViewChild('filter') filter!: ElementRef;
  emailPattern: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  constructor(private userControllerService: UserControllerService, private fb: FormBuilder ) { }

  ngOnInit() {

    this.initializeDoctorForm();

   this.userControllerService.findAllUsers().subscribe({
      next:(res)=>{
        this.doctorList=res.filter(doc => doc.role != 'admin');
        console.log(' this.doctorList: ',  this.doctorList);
      }
    });
  
  }

  initializeDoctorForm(): void {
    this.doctorForm = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
        password: ['', Validators.required],
        role: ['Doctor', Validators.required],
        active: [false, Validators.required],
    });
}

  showDialog() {
    this.visible = true;
    this.initializeDoctorForm();
}

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

  onSubmit(){
    this.userControllerService.signUp({body: this.doctorForm.value}).subscribe({
        next:(res)=>{
            if(res){
                console.log('res: ', res);                
            }
        },
        error:(err)=>{
            alert('Call Failed');
        }
    })
    
    console.log("Form Values",this.doctorForm.value)
    this.doctorForm.reset()
  }

  activeCheck(event){
    this.doctorForm.get('active').patchValue(event.checked ? true : false);

  }
}
