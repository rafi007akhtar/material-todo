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

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  @ViewChild('editTaskField') editInput!: ElementRef;

  shortTaskName = signal('');
  isEditingTask = signal(false);

  MAX_TASK_LENGTH = 50;

  constructor(private tms: TaskManagementService) {}

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
}
