import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-edit-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserEditComponent implements OnInit {


    user = {};
    isLoading = true;

    constructor(
        public toast: ToastComponent,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        public auth: AuthService
    ) {
        this.route.params.subscribe(params => {
            //this.id = +params['id']; // (+) converts string 'id' to a number
            this.user = { _id: params['id'] };
            // In a real app: dispatch action to load the details here.
        });
    }

    ngOnInit() {
        this.getUser();
    }

    getUser() {
        this.userService.getUser(this.user).subscribe(
            data => this.user = data,
            error => console.log(error),
            () => this.isLoading = false
        );
    }

    save(user) {
        this.userService.editUser(user).subscribe(
            res => {

                this.toast.setMessage('user profile updated!', 'success');
                this.router.navigate(['/admin']);
            },
            error => {
                  this.toast.setMessage("email already exists", 'danger');
              }
        );
    }
}
