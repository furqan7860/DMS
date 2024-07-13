import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CasesService } from 'src/app/demo/service/cases.service';
import { ICase } from 'src/app/models/case.model';

@Component({
    selector: 'app-case-list',
    templateUrl: './case-list.component.html',
    styleUrls: ['./case-list.component.scss'],
    providers: [MessageService, ConfirmationService]
})
export class CaseListComponent implements OnInit {
    @ViewChild('filter') filter!: ElementRef;
    cases: ICase[] = [];
    selectedCases: ICase[] = [];
    loading: boolean = true;

    constructor(private caseService: CasesService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.caseService.getCases().subscribe(data => {
            this.cases = data;
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

    confirmDeleteCase(caseId: string) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete this case?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.deleteCase(caseId);
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'You have cancelled' });
            }
        });
    }

    deleteCase(caseId: string) {
        this.caseService.deleteCase(caseId).subscribe((res) => {
            const currentIndex = this.cases.findIndex(x => x.id === caseId);
            this.cases.splice(currentIndex, 1);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Case deleted successfully.' });
        },
            error => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting case.' });
            }
        );
        this.messageService.clear('confirmDelete');
    }

    cancelDelete() {
        this.messageService.clear('confirmDelete');
    }
}
