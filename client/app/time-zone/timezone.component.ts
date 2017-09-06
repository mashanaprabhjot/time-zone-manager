import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TimeZoneService } from '../services/timezone.service';
import { ToastComponent } from '../shared/toast/toast.component';
import * as Moment from 'angular2-moment';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-time-zone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss']
})
export class TimeZoneComponent implements OnInit {

   

    timezone = {};

  timezones: any = [];
  isLoading = true;
  isEditing = false;
  search = "";
  noResult = false;

  addTimezoneForm: FormGroup;
  name = new FormControl('', Validators.required);
  city = new FormControl('', Validators.required);
  diffToGMT = new FormControl('', Validators.required);

  currentUserId = "";

  constructor(private timezoneService: TimeZoneService,
              private formBuilder: FormBuilder,
              private http: Http,
              public toast: ToastComponent,
              public auth: AuthService,
              public route: ActivatedRoute

       
  ) { 
      this.currentUserId = this.auth.currentUser._id;

      this.route.params.subscribe(params => {
          if (params['id'] != undefined && params['id'] != null) {
              this.currentUserId = params['id'];
          }
      });
  }

  ngOnInit() {
    this.getTimezones();
    this.addTimezoneForm = this.formBuilder.group({
        name: this.name,
        city: this.city,
        diffToGMT: this.diffToGMT
    });

    setInterval(() => {
        for (let zone of this.timezones) {
            zone.currentTime = this.getTimeZoneCurrentTime(zone.diffToGMT);
        }
    }, 1000);
  }

  



  getTimeZoneCurrentTime(diff) {
      let multiplier = 1;
      if (diff.indexOf('-') != -1) {
          diff = diff.replace('-', '');
          multiplier = -1;
      }
      let hours = parseInt(diff.split(':')[0]);
      let minutes = parseInt(diff.split(':')[1]);
      let totalMinutes = (multiplier * hours * 60) + minutes;
      var now = new Date();
      var now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
      let date = (new Date(now_utc.getTime() + (totalMinutes  * 60 * 1000)));
      return date;
  }

  getTimezones() {
      this.timezoneService.getTimezones(this.currentUserId).subscribe(
          data => {
              for (let entry of data) {
                  entry.currentTime = this.getTimeZoneCurrentTime(entry.diffToGMT);
              }
              this.timezones = data;
          },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  getTimezonebyName() {
      this.noResult = false;
      if (this.search == "") {
          this.getTimezones();
      }
      else {
          this.timezoneService.getTimezonebyName(this.search, this.currentUserId).subscribe(
              data => {
                  if (data.length > 0) {
                      
                      for (let entry of data) {
                          entry.currentTime = this.getTimeZoneCurrentTime(entry.diffToGMT);
                      }
                      this.timezones = data;
                  }
                  else
                  {
                      this.noResult = true;
                      this.timezones = data;
                  }
              },
              error => console.log(error),
              () => this.isLoading = false
          );
      }
  }

  changeTimezone(timezone) {
      debugger;
      this.city = timezone;
  }

  addTimezone() {
      if (this.addTimezoneForm.valid) {
          var timeZone = this.addTimezoneForm.value;
          timeZone.UserId = this.currentUserId;
          this.timezoneService.addTimezone(timeZone).subscribe(
              res => {
                  const newTimezone = res.json();
                  newTimezone.currentTime = this.getTimeZoneCurrentTime(newTimezone.diffToGMT);
                  this.timezones.push(newTimezone);
                  this.addTimezoneForm.reset();
                  this.toast.setMessage('timezone added successfully.', 'success');
              },
              error => console.log(error)
          );
      }
  }

  enableEditing(timezone) {
      this.isEditing = true;
      debugger;
      this.timezone = timezone;
  }

  cancelEditing() {
    this.isEditing = false;
    this.timezone = {};
    this.toast.setMessage('timezone editing cancelled.', 'warning');
    // reload the timezones to reset the editing
    this.getTimezones();
  }

  editTimezone(timezone) {
      this.timezoneService.editTimezone(timezone, this.currentUserId).subscribe(
      res => {
        this.isEditing = false;
        this.timezone = timezone;
        this.toast.setMessage('timezone updated successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteTimezone(timezone) {
      if (window.confirm('Are you sure you want to permanently delete this timezone?')) {
          this.timezoneService.deleteTimezone(timezone, this.currentUserId).subscribe(
        res => {
          const pos = this.timezones.map(elem => elem._id).indexOf(timezone._id);
          this.timezones.splice(pos, 1);
          this.toast.setMessage('timezone deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }
}