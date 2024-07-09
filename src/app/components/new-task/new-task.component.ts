import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
})
export class NewTaskComponent implements OnInit {
  constructor() {}

  newTaskForm: FormGroup<any> = new FormGroup({});

  ngOnInit(): void {
    this.newTaskForm = new FormGroup({
      taskName: new FormControl('', [Validators.required]),
    });
  }

  formSubmit() {
    console.log('form submission clicked');
  }
}
