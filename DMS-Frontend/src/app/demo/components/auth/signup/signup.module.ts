import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup.component';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', component: SignupComponent }
        ]),
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        ReactiveFormsModule
    ],
    declarations: [SignupComponent]
})
export class SignupModule { }
