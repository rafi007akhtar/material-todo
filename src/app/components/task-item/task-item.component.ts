import {
  Component,
  ElementRef,
  Input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskManagementService } from '../../services/task-management.service';
import { DateHelpersService } from '../../services/date-helpers.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @ViewChild('editTaskField') editInput!: ElementRef;
  @ViewChild('dueDateToggle') dueDateToggle!: any;

  shortTaskName = signal('');
  isEditingTask = signal(false);
  showCalendar = signal(false);
  selectedDate = undefined;

  MAX_TASK_LENGTH = 50;

  constructor(
    private tms: TaskManagementService,
    private dh: DateHelpersService
  ) {}

  ngOnInit(): void {
    let shortenedTask = this.task.name.substring(0, this.MAX_TASK_LENGTH);
    if (shortenedTask !== this.task.name) {
      shortenedTask += '...';
    }
    this.shortTaskName.set(shortenedTask);
  }

  taskEditorInputKeyPress(evt: KeyboardEvent) {
    if (evt.ctrlKey && evt.key === 'Enter') {
      this.taskEditorClick('save');
    }
  }

  taskEditorClick(action: 'edit' | 'save' | 'discard') {
    this.isEditingTask.update((val) => !val);

    switch (action) {
      case 'edit':
        setTimeout(() => {
          this.editInput?.nativeElement.focus();
        }, 0);
        break;

      case 'save':
        const newTask: Task = {
          ...this.task,
          name: this.editInput?.nativeElement.value || this.task.name,
        };
        this.tms.updateTaskWithIdTo(newTask);
        break;

      case 'discard':
        break;

      default:
        break;
    }
  }

  toggleTaskCompletion() {
    const completedTask: Task = {
      ...this.task,
      completed: !this.task.completed,
    };
    this.tms.updateTaskWithIdTo(completedTask);
  }

  toggleCalendarVisibility() {
    this.dueDateToggle._button._elementRef.nativeElement.click();
  }

  triggerTaskDeletion() {
    const confirmation = confirm('Are you sure you want to delete this task?');
    if (confirmation) this.tms.deleteTask(this.task.id);
  }

  dueDateSelected(e: any) {
    console.log(e.value);
    this.task.dueDate = new Date(e.value);
    this.tms.updateTaskWithIdTo(this.task);
  }

  formatDate(date: string | Date) {
    return this.dh.formatDate(date);
  }

  removeDueDate() {
    this.task.dueDate = undefined;
    this.tms.updateTaskWithIdTo(this.task);
  }
}
