import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Producer } from '../producer';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  // TODO: test if year dropdown is needed
  // TODO: down the road change used to available, store total sick/vacation they get a year on producer node

  producers: Producer[] = [];
  saved_timesheets = new Map();
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  dates: string[] = [];
  selected_producer_id = "";
  submit_btn_text = "Submit";

  timesheet = {};
  total_hours = 0;
  sick_vacation_hours = 0;
  sick_vacation_hours_used = 0;
  prior_month_bonuses = {};

  popup_message = "";
  popup_title = "";

  monthForm: FormGroup = this.fb.group({ });
  selected_year: number = 0;

  subscriptions: Subscription[] = [];

  constructor(private db: AngularFireDatabase, private fb: FormBuilder, public  db_auth:  AngularFireAuth, private router: Router) {
    let auth_sub = db_auth.authState.subscribe(user => {
      if (user) {
        environment.logged_in = true;

        // loads producers
        let producer_sub = db.list('producers').snapshotChanges().subscribe(
          (snapshot: any) => snapshot.map(snap => {
            let producer: Producer = {
              name: snap.payload.val().name,
              id: snap.key,
              pin: snap.payload.val().pin
            }
            this.producers.push(producer);
        }));
        this.subscriptions.push(producer_sub);

        // gets current month and updates sheet to most recent timesheet
        let date: Date = new Date(); 
        if (date.getDate() <= 14) {
          (document.getElementById("first_half") as HTMLInputElement).checked = true;
          this.updateSheet(date.getMonth()); // + 1
        } else {
          (document.getElementById("second_half") as HTMLInputElement).checked = true;
          this.updateSheet(date.getMonth());
          // if (date.getMonth() == 0) {
          //   this.updateSheet(12);
          // } else {
          //   this.updateSheet(date.getMonth());
          // }
          this.getPriorMonthBonus(); // only have prior month bonus on 2nd half of month
        }

      } else {
        environment.logged_in = false;
        this.router.navigate(['login']);
      }
    });
    this.subscriptions.push(auth_sub);
  }

  ngOnInit(): void {
    // gets current month and updates sheet to last timesheet
    let date: Date = new Date(); 
    this.selected_year = date.getFullYear();
    (document.getElementById("year") as HTMLInputElement).value = this.selected_year.toString();
    let current_month = date.getMonth();
    if (date.getDate() <= 14) {
      // current date is in second half of the month, so selects timesheet #1 from current month
      this.monthForm = this.fb.group({
        month: [current_month + 1]
      });
      (document.getElementById("first_half") as HTMLInputElement).checked = true;
    } else {
      // current date is in first half of the month, so selects timesheet #2 from previous month
      // if (current_month == 0) {
      //   current_month = 12;
      //   this.selected_year -= 1;
      //   (document.getElementById("year") as HTMLInputElement).value = (this.selected_year).toString();
      // }
      this.monthForm = this.fb.group({
        month: [current_month + 1] // - 1
      });
      (document.getElementById("second_half") as HTMLInputElement).checked = true;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  getPriorMonthBonus() {
    let today = new Date();
    let last_month = today.getMonth() + 1;
    // if (last_month == 1) {
    //   last_month = 12;
    // }

    // gets corporate bonuses
    let index = 0;
    let corporate_bonus_sub = this.db.list('producers').snapshotChanges().subscribe(
      (snapshot: any) => snapshot.map(snap => {
        this.prior_month_bonuses[snap.key] = 0;
        // gets corporate bonuses
        if ("corporate_bonuses" in snap.payload.val()) {
          if (this.selected_year in snap.payload.val()["corporate_bonuses"]) {
            const corporate_bonus = snap.payload.val()["corporate_bonuses"][this.selected_year];
            for (let month in corporate_bonus) {
              if (Number(month) == last_month) {
                this.prior_month_bonuses[snap.key] += corporate_bonus[month];
              }
            }
          }
        }
        index += 1;
        //console.log(this.corporate_bonuses);
    })
    );
    this.subscriptions.push(corporate_bonus_sub);

    // gets production bonuses
    let production_bonus_sub = this.db.list('applications').snapshotChanges().subscribe(
      (snapshot: any) => snapshot.map(snap => {
        const app = snap.payload.val();
        const app_type = app["type"] as string;
        const app_date = app["date"] as string;
        let app_month = parseInt(app_date.substring(5, 7));
        const app_year = parseInt(app_date.substring(0, 4));
        let bonus = app["bonus"];

        let app_went_through = false;
        /*
          Life - Issue/Bonus Month “January”
            ? might change issue_month to issue_date 	# and have it include 08-2019
          Auto - Status “Issued”
          Bank - Status “Issued”
          Fire - Status “Issued”
          Health - Status “Taken”
        */
        if (app_type != "fire" && app_type != "mutual-funds") {
          if (app["status"] == "Taken" || app["status"] == "Issued") {
            app_went_through = true;
          }
          if (app_type == "life") {
            if (app["issue_month"] != last_month) {
              app_went_through = false;
            } else {
              app_month = app["issue_month"];
              bonus = app["paid_bonus"];
            }
          }
  
          if (app_went_through == true && app_year == this.selected_year && app_month == last_month) {
            const producer_id = app["producer_id"];
            // production bonus
            this.prior_month_bonuses[producer_id] += bonus;
            //console.log("ID: " + producer_id + "    Month: " + app_month + "   Bonus: " + bonus);

            // co-production bonus
            const co_producer_bonus = app["co_producer_bonus"];
            if (co_producer_bonus > 0 && co_producer_bonus != null) {
              const co_producer_id = app["co_producer_id"];
              this.prior_month_bonuses[co_producer_id] += co_producer_bonus;
              //console.log("Co ID: " + co_producer_id + "   Bonus: " + co_producer_bonus);
            }
          }
        }
        //console.log(this.prior_month_bonuses);
      })
    );
    this.subscriptions.push(production_bonus_sub);
  }

  displayPinAuth(producer_id: string) {
    this.popup_title = "Enter Pin";
    this.popup_message = "";
    this.selected_producer_id = producer_id;
    (document.getElementById("producer_pin") as HTMLInputElement).value = "";
    document.getElementById("auth_section").style.display = 'block';
  }

  checkPin() {
    let pin = Number((document.getElementById("producer_pin") as HTMLInputElement).value);
    for (const producer of this.producers) {
      if (producer.id == this.selected_producer_id) {
        if (producer.pin == pin) {
          // displays timesheet
          this.editTimesheet(this.selected_producer_id, this.getProducerName(this.selected_producer_id));
          document.getElementById("auth_section").style.display = 'none';
          break;
        }
      }
    }
  }

  editTimesheet(producer_id: string, name: string) {
    console.log("edit timesheet " + producer_id);
    this.selected_producer_id = producer_id;

    // display how many sick/vacation hours producer has left for the year
    // ? unknown cause for why this query is being ran three times
    // ? one site mentioned that this can happen where there are two connections to the same part of the db but idk that's the case here
    let current_month = Number((document.getElementById("month") as HTMLInputElement).value)-1;
    // this.sick_vacation_hours_used = 0;
    // let hours_sub = this.db.list('timesheets').snapshotChanges().subscribe(
    //   (snapshot: any) => snapshot.map((snap, index) => {
    //     console.log(snapshot.length);
    //     console.log(index);
    //     if (snapshot.length != index+1) {
    //       let timesheet_name = snap.key as string;
    //       if (producer_id in snap.payload.val()) {
    //         if (timesheet_name.includes((this.selected_year as unknown) as string)) {
    //           this.sick_vacation_hours_used += ((snap.payload.val()[producer_id]["sick_vacation_hours"]) as number);
    //         }
    //       }
    //     }
    //    })
    // );
    // this.subscriptions.push(hours_sub);

    if (this.saved_timesheets.has(producer_id)) {
      // get values from last saved timesheet
      let last_saved_timesheet = this.saved_timesheets.get(producer_id)["dates"];
      var rows = document.getElementById("timesheet_table")["rows"];
      for (let date in last_saved_timesheet) {
        let row = rows[this.dates.indexOf(date)+1];
        let cells = row["cells"];
        //cells[0]["childNodes"][0].value = date;
        if (last_saved_timesheet[date]["holiday"] == true) {
          cells[6]["childNodes"][0].checked = true;
          this.toggleRow(date, 'holiday_rBtn');
        } else if (last_saved_timesheet[date]["off"] == true) {
          cells[7]["childNodes"][0].checked = true;
          this.toggleRow(date, 'off_rBtn');
        } else {
          cells[1]["childNodes"][0].value = last_saved_timesheet[date]["in_1"];
          cells[2]["childNodes"][0].value = last_saved_timesheet[date]["out_1"];
          cells[3]["childNodes"][0].value = last_saved_timesheet[date]["in_2"];
          cells[4]["childNodes"][0].value = last_saved_timesheet[date]["out_2"];
          cells[5]["childNodes"][0].value = last_saved_timesheet[date]["sick_vacation_hours"];
        }
      }
      this.submit_btn_text = "Update";
    } else {
      // bring up default timesheet
      var rows = document.getElementById("timesheet_table")["rows"];
      for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        let cells = row["cells"];
        cells[1]["childNodes"][0].value = "08:30:00";
        cells[2]["childNodes"][0].value = "12:00:00";
        cells[3]["childNodes"][0].value = "12:30:00"
        cells[4]["childNodes"][0].value = "17:00:00";
        cells[5]["childNodes"][0].value = 0;
        cells[6]["childNodes"][0].checked = false;
        cells[7]["childNodes"][0].checked = false;
        // enables row
        for (let i = 1; i <= 5; i++) {
          let cell = cells[i]
          cell["childNodes"][0].disabled = false;
        }
      }
      this.submit_btn_text = "Submit";
    }
    this.popup_message = name + "\'s Timesheet Submitted!";
    document.getElementById("title").innerHTML = name + "\'s Timesheet - " + this.months[current_month] + " " + this.selected_year;
    document.getElementById("backBtn").style.display = 'block';
    //document.getElementById("hours_left").style.display = 'block';
    document.getElementById("date_section").style.display = 'none';
    document.getElementById("auth_section").style.display = 'none';
    document.getElementById("producer_section").style.display = 'none';
    document.getElementById("timesheet_section").style.display = 'block';
    document.getElementById("year_section").style.display = 'none';
    this.updateTimes();
  }

  exitTimesheet() {
    document.getElementById("title").innerHTML = "Timesheet - ";
    document.getElementById("backBtn").style.display = 'none';
    //document.getElementById("hours_left").style.display = 'none';
    document.getElementById("date_section").style.display = 'flex';
    document.getElementById("producer_section").style.display = 'block';
    document.getElementById("timesheet_section").style.display = 'none';
    document.getElementById("year_section").style.display = 'block';
  }

  // called on month change
  updateSheet(month: number) {
    this.dates = [];
    let date: Date = new Date(); 
    date.setFullYear(this.selected_year);
    date.setMonth(month-1);
    let path = this.months[Number(month)-1];
    path += "_" + this.selected_year;
    if ((document.getElementById("first_half") as HTMLInputElement).checked) {
      for (let i = 1; i <= 14; i++) {
        date.setDate(i);  
        //date.toLocaleDateString()
        if (date.toDateString().substr(0, 3) != "Sun" && date.toDateString().substr(0, 3) != "Sat") {
          this.dates.push(date.toDateString().substring(0, date.toDateString().length-5));
        }
      }
      path += "_1/";
    } else {
      let number_of_days = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
      for (let i = 15; i <= number_of_days; i++) {
        date.setDate(i);  
        if (date.toDateString().substr(0, 3) != "Sun" && date.toDateString().substr(0, 3) != "Sat") {
          this.dates.push(date.toDateString().substring(0, date.toDateString().length-5));
        }
      }
      path += "_2/";
    }
    this.total_hours = this.dates.length * 8;
    this.sick_vacation_hours = 0;

    this.saved_timesheets.clear();
    // check which producers have submitted the timesheet for the selected time
    let timesheet_sub = this.db.list('timesheets/' + path).snapshotChanges().subscribe(
      (snapshot: any) => snapshot.map(snap => {
        const id = snap.payload.val().producer_id as string;
        this.saved_timesheets.set(id, snap.payload.val());
      })
    );
    this.subscriptions.push(timesheet_sub);
  }

  // called on part of month change
  updateDates() {
    this.dates = [];
    let date: Date = new Date(); 
    date.setFullYear(this.selected_year);
    let month = (document.getElementById("month") as HTMLInputElement).value;
    date.setMonth(Number(month)-1);
    let path = this.months[Number(month)-1];
    path += "_" + this.selected_year; // year
    if ((document.getElementById("first_half") as HTMLInputElement).checked) {
      for (let i = 1; i <= 14; i++) {
        date.setDate(i);  
        //date.toLocaleDateString()
        if (date.toDateString().substr(0, 3) != "Sun" && date.toDateString().substr(0, 3) != "Sat") {
          this.dates.push(date.toDateString().substring(0, date.toDateString().length-5));
        }
      }
      path += "_1/";
    } else {
      let number_of_days = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
      for (let i = 15; i <= number_of_days; i++) {
        date.setDate(i);  
        if (date.toDateString().substr(0, 3) != "Sun" && date.toDateString().substr(0, 3) != "Sat") {
          this.dates.push(date.toDateString().substring(0, date.toDateString().length-5));
        }
      }
      path += "_2/";
    }
    this.total_hours = this.dates.length * 8;
    this.sick_vacation_hours = 0;

    this.saved_timesheets.clear();
    // check which producers have submitted the timesheet for the selected time
    let timesheet_sub = this.db.list('timesheets/' + path).snapshotChanges().subscribe(
      (snapshot: any) => snapshot.map(snap => {
        const id = snap.payload.val().producer_id as string;
        this.saved_timesheets.set(id, snap.payload.val());
       })
    );
    this.subscriptions.push(timesheet_sub);
  }

  // called when holiday/off is turned on or off
  toggleRow(date: string, btn: string) {
    let row_index = this.dates.indexOf(date);
    var rows = document.getElementById("timesheet_table")["rows"];
    let cells = rows[row_index + 1]["cells"];
    let radio_btn_value = false;
    if (btn == "holiday_rBtn") {
      radio_btn_value = cells[6]["childNodes"][0].checked;
    } else if (btn == "off_rBtn") {
      radio_btn_value = cells[7]["childNodes"][0].checked;
    }
    if (radio_btn_value == true) {
      if (btn == "holiday_rBtn") {
        // if holiday is checked, then it unchecks off
        cells[7]["childNodes"][0].checked = false;
      } else if (btn == "off_rBtn") {
        // if off is checked, then it unchecks holiday
        cells[6]["childNodes"][0].checked = false;
      }
      // disables row
      for (let i = 1; i <= 5; i++) {
        let cell = cells[i]
        cell["childNodes"][0].disabled = true;
      }
    } else {
      // enables row
      for (let i = 1; i <= 5; i++) {
        let cell = cells[i]
        cell["childNodes"][0].disabled = false;
      }
    }
    this.updateTimes();
  }

  // called on in/out time change, holiday/off being checked or unchecked, and edit timesheet
  updateTimes() {
    this.total_hours = 0;
    this.sick_vacation_hours = 0;
    this.timesheet["dates"] = {};
    var rows = document.getElementById("timesheet_table")["rows"];
    for (let i = 1; i < rows.length; i++) {
      let row = rows[i];
      let cells = row["cells"];
      let date = cells[0]["childNodes"][0].data;

      if (cells[1]["childNodes"][0].disabled == false) {
        let in_time_1 = cells[1]["childNodes"][0].value;
        let out_time_1 = cells[2]["childNodes"][0].value;
        let in_time_2 = cells[3]["childNodes"][0].value;
        let out_time_2 = cells[4]["childNodes"][0].value;

        let timeStart = new Date("01/01/2007 " + in_time_1).getTime();
        let timeEnd = new Date("01/01/2007 " + out_time_1).getTime();

        let hourDiff = (timeEnd - timeStart) / 1000;
        hourDiff /= (60 * 60);
        hourDiff = Math.round(hourDiff * 100) / 100;
        this.total_hours += hourDiff;
        //console.log("Time 1 - " + hourDiff); 
        
        timeStart = new Date("01/01/2007 " + in_time_2).getTime();
        timeEnd = new Date("01/01/2007 " + out_time_2).getTime();

        hourDiff = (timeEnd - timeStart) / 1000;
        hourDiff /= (60 * 60);
        hourDiff = Math.round(hourDiff * 100) / 100;
        this.total_hours += hourDiff;
        //console.log("Time 2 - " + hourDiff); 

        this.sick_vacation_hours += Number(cells[5]["childNodes"][0].value);
        //console.log("sick hours - " + cells[5]["childNodes"][0].value);

        this.timesheet["dates"][date] = {
          in_1: in_time_1,
          out_1: out_time_1,
          in_2: in_time_2,
          out_2: out_time_2,
          sick_vacation_hours: Number(cells[5]["childNodes"][0].value)
        };
        this.total_hours = Math.round(this.total_hours * 100) / 100;
      } else {
        if (cells[6]["childNodes"][0].checked) {
          // holiday is checked
          this.timesheet["dates"][date] = { "holiday": true };
          this.total_hours += 8;
        } else if (cells[7]["childNodes"][0].checked) {
          // off is checked
          this.timesheet["dates"][date] = { "off": true };
        }
      }
    }
  }

  // called on selected year change
  updateYear(year: number) {
    this.selected_year = year;
    let date: Date = new Date();
    let month = (document.getElementById("month") as HTMLInputElement).value;
    if (date.getDate() <= 14) {
      this.updateSheet(Number(month));
    } else {
      this.updateSheet(Number(month));
      this.getPriorMonthBonus();
    }
    console.log(this.dates);
  }

  onSubmit() {
    if (this.selected_producer_id != "none") {
      //let id = this.randomTimesheetID();
      this.timesheet["hours_worked"] = this.total_hours;
      this.timesheet["producer_id"] = this.selected_producer_id;
      this.timesheet["sick_vacation_hours"] = this.sick_vacation_hours;
      let path = this.months[Number((document.getElementById("month") as HTMLInputElement).value)-1]; // month
      path += "_" + this.selected_year; // year
      if ((document.getElementById("first_half") as HTMLInputElement).checked) { // half of month and timesheet id
        path += "_1/" + this.selected_producer_id;
      } else {
        path += "_2/" + this.selected_producer_id;
      }
      // ? instead of random timesheet id, use producer id, that way if they messup something they can resubmit and it will overwrite their previous stuff
      this.db.list('timesheets').update(path, this.timesheet);
      // success message
      this.popup_title = "Success";
    } else {
      // error message
      this.popup_title = "Error";
      this.popup_message = "Please select a producer.";
    }
    this.exitTimesheet();
  }

  downloadTimesheets() {
    let month = this.months[Number((document.getElementById("month") as HTMLInputElement).value)-1];
    let timesheet_titles = document.getElementsByClassName("hidden_title");
    for (let i = 0; i < timesheet_titles.length; i++) {
      const title = timesheet_titles[i];
      if (!title.innerHTML.includes("Timesheet")) {
        title.innerHTML += "\'s Timesheet - " + month + " " + this.selected_year;
      }
    }
    window.print();
  }

  isSecondHalf() {
    if ((document.getElementById("first_half") as HTMLInputElement).checked) {
      return false;
    }
    return true;
  }

  to12HourTime(time) {
    var b = time.split(/\D/);
    return (b[0]%12 || 12) + ':' + b[1] + (b[0]<11? ' AM' : ' PM');
  }
  
  getProducerName(id: string) {
    for (const producer of this.producers) {
      if (producer.id == id) {
        return producer.name;
      }
    }
  }

}
