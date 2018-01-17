import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Task } from "../../models/models";

@Injectable()
export class TaskApiProvider {

  private tasks: Task[];
  private taskRESTApiURL = 'https://api.mlab.com/api/1/databases/test123/collections/tasks?apiKey=k2UUXWzq_llpX3bArdoUMJCinVLP9lDY'; // Yeah, this sucks.

  constructor(private http: HttpClient) { }

  initTasks() {
    return new Promise((resolve, reject) => {
      let tempSub = this.http.get(this.taskRESTApiURL).subscribe((value: Task[]) => {
        this.tasks = value;
        console.log(this.tasks);
        tempSub.unsubscribe();
        resolve(value);
      });
    });
  }

  getTasks() {
    // will keep updating, Immutability :D
    return this.initTasks();
  }

}