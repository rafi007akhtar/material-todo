import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent implements OnInit {
  @Input() taskName: string = '';
  shortTaskName = signal('');

  MAX_TASK_LENGTH = 50;

  ngOnInit(): void {
    let shortenedTask = this.taskName.substring(0, this.MAX_TASK_LENGTH);
    if (shortenedTask !== this.taskName) {
      shortenedTask += '...';
    }
    this.shortTaskName.set(shortenedTask);
  }
}
