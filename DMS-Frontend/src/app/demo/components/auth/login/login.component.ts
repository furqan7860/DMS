import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserControllerService } from 'src/app/api/services';
import { catchError, tap } from 'rxjs';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    emailPattern: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    constructor(public layoutService: LayoutService, private fb: FormBuilder, private router: Router, private userControllerService: UserControllerService) { }

    public userForm: FormGroup;
    ngOnInit(): void {
        this.initializeUserForm();
    }


    initializeUserForm(): void {
        this.userForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        console.log(this.userForm.invalid)
        if (this.userForm.invalid) return;
        this.userControllerService.login({body: this.userForm.value}).pipe(tap((data) => {
            if (data.token && data['role']) {
                localStorage.setItem("user", JSON.stringify(data));
                this.router.navigate(["/"]);
            }
        }), catchError((err:any) => {
            alert('Invalid Credentials');
            localStorage.clear();
            throw err;
        })).subscribe();
    }

}
