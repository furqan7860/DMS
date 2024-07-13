import { Component, ElementRef, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PatientService } from 'src/app/demo/service/patient.service';
@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrl: './case-list.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class CaseListComponent {
    patients: any[] = [];
    selectedPatients: any[] = [];
    loading: boolean = true;
  
    @ViewChild('filter') filter!: ElementRef;
  
    constructor(private patientService: PatientService) { }
  
    ngOnInit() {
      this.patientService.getPatients().subscribe(data => {
        this.patients = data;
        this.loading = false;
      });
    }
  
    onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
  
    clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
    }

 
}
