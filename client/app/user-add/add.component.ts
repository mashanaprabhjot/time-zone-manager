import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class UserAddComponent implements OnInit {

    addForm: FormGroup;
    isLoading = true;

    username = new FormControl('', [Validators.required,
                                  Validators.minLength(2),
                                  Validators.maxLength(30),
                                  Validators.pattern('[a-zA-Z0-9_-\\s]*')]);

    email = new FormControl('', [Validators.required,
                               Validators.minLength(3),
                               Validators.maxLength(100)]);
    password = new FormControl('', [Validators.required,
                                  Validators.minLength(6)]);
    role = new FormControl('', [Validators.required]);

    constructor(
        private formBuilder: FormBuilder,
        public toast: ToastComponent,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        public auth: AuthService
    ) {
        
    }
    ngOnInit() {
            this.addForm = this.formBuilder.group({
              username: this.username,
              email: this.email,
              password: this.password,
              role: this.role
            });
            this.isLoading = false;
        }
    
  setClassUsername() {
    return { 'has-danger': !this.username.pristine && !this.username.valid };
  }
  setClassEmail() {
    return { 'has-danger': !this.email.pristine && !this.email.valid };
  }
  setClassPassword() {
    return { 'has-danger': !this.password.pristine && !this.password.valid };
  }

    save(user) {
     if (this.addForm.valid) {
              this.userService.addUser(this.addForm.value).subscribe(
                res => {
                    this.toast.setMessage('user added!', 'success');
                    this.router.navigate(['/admin']);
                },
                error => {
                  this.toast.setMessage("email already exists", 'danger');
              }
            );
          }
          else {
              this.toast.setMessage('Please fill all the required data', 'danger')
          }
    }
}
