import { Component } from '@angular/core';

import { LoadingController, AlertController, ToastController } from 'ionic-angular';

import { CalenderApiProvider } from '../../providers/calender-api/calender-api';
import { TaskApiProvider } from '../../providers/task-api/task-api';

import { Task } from '../../models/models';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  calender: any;
  tasks: Task[];
  cachedTasks: Task[];

  windowWidth: number = window.innerWidth;

  constructor(private calenderApi: CalenderApiProvider,
              private taskApi: TaskApiProvider,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private alertCtrl: AlertController) {
    this.calender = Object.assign({}, this.calenderApi.getCalender());
    console.log('default:', this.calender);
    let startingLoader = this.loadingCtrl.create({
      content: 'fetching tasks...',
      enableBackdropDismiss: true
    });
    startingLoader.present();
    this.initTasks().then(() => {
      this.initTasksInCalender();
      startingLoader.dismiss();
      this.alertCtrl.create({
        message: 'Visit console for realtime json... Sorry for "not so good design", I really want to work on backend(NodeJS).',
        buttons: ["Ok, hired!"]
      }).present();
    });
    // console.log(this.calender);
  }

  initTasks() {
    return this.taskApi.getTasks().then((value: Task[]) => {
      this.tasks = value;
      this.cachedTasks = [].concat(this.tasks);
    });
  }

  initTasksInCalender() {
    this.calender = this.calenderApi.getCalender();
    console.log('init calender: ', this.calender);
    this.tasks.forEach((task) => {
      this.calender.monthsData[0][task.dueDate.week][task.dueDate.day].task = task;
    });
  }

  getItems(ev) {
    this.initTasks().then(() => {
      let val = ev.target.value;
      if (val && val.trim() != '') {
        this.tasks = this.tasks.filter((task) => {
          return (task.userName.toLowerCase().indexOf(val.toLowerCase()) == -1);
        });
        console.log('task list of users searched for ', this.tasks);
        this.calender = this.calenderApi.getCalender();
        this.cachedTasks.forEach((task) => {
          this.calender.monthsData[0][task.dueDate.week][task.dueDate.day].task = task;
        });
        this.tasks.forEach((task) => {
          this.calender.monthsData[0][task.dueDate.week][task.dueDate.day].task = null;
        });
        // console.log(this.calender);
      } else if (val == '') {
        this.initTasks().then(() => {
          this.initTasksInCalender();
        });
      }
    });
  }

}