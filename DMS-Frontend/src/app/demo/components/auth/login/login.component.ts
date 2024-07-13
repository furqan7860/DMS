import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


    emailPattern: RegExp = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    constructor(public layoutService: LayoutService, private fb: FormBuilder, private router: Router) { }
    signUpData: any;
    public userForm: FormGroup;
    ngOnInit(): void {

        this.signUpData = localStorage.getItem('signUpData');
        this.signUpData = JSON.parse(this.signUpData);
        this.initializeUserForm();
    }


    initializeUserForm(): void {
        this.userForm = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern(this.emailPattern)]],
            password: ['', Validators.required],
        });
    }

    onSubmit() {

        if (this.userForm.invalid) return;
        const isChecked = this.signUpData?.find((value: any) => {
            return value.email == this.userForm.get('email').value && value.password == this.userForm.get('password').value
        });

        if (isChecked) {

            localStorage.setItem("isAuthenticated", JSON.stringify(true));
            this.router.navigate(["/"]);
        }
        else {

            localStorage.setItem("isAuthenticated", JSON.stringify(false));
            alert('Invalid Credentials');
        }

    }

}
