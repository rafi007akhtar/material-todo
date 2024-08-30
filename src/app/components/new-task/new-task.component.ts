import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryType } from '../../models/category.model';
import { Subscription } from 'rxjs';
import { TaskManagementService } from '../../services/task-management.service';
import { initCategories } from '../../data/dummy-data';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.scss',
})
export class NewTaskComponent implements OnInit {
  constructor(private tms: TaskManagementService) {}

  newTaskForm: FormGroup<any> = new FormGroup({});
  selectedCategory!: CategoryType;
  selectedCategorySup: Subscription | undefined;

  ngOnInit(): void {
    this.selectedCategory = this.tms.getSelectedCategorySync();

    this.selectedCategorySup = this.tms.selectedCategory$.subscribe((cat) => {
      this.selectedCategory = cat;

      // TODO: rewrite this using native element directive
      const newInputElem = document.querySelector(
        '.new-task-input'
      ) as HTMLElement;
      newInputElem?.focus();
    });

    this.newTaskForm = new FormGroup({
      taskName: new FormControl(''),
    });
  }

  onFormEdit(evt: KeyboardEvent) {
    if (evt.key === 'Enter' && !evt.shiftKey) {
      evt.preventDefault();
      this.formSubmit();
    }
  }

  formSubmit() {
    const newTaskName: string = this.taskNameField?.value;
    if (!newTaskName || !newTaskName.trim().length) {
      this.taskNameField?.setValue('');
      return;
    }

    const taskToAdd: Task = {
      name: newTaskName,
      categoryName: this.selectedCategory.name,
      id: `${Math.random()}${new Date().toISOString()}`,
    };
    this.tms.addTask(taskToAdd);
    this.newTaskForm.reset();
  }

  get taskNameField() {
    return this.newTaskForm.get('taskName');
  }
}
