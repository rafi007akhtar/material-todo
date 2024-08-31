import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryType } from '../../models/category.model';
import { Subscription } from 'rxjs';
import { TaskManagementService } from '../../services/task-management.service';
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
  @ViewChild('newTaskInput') newTaskInputElem!: ElementRef;

  ngOnInit(): void {
    this.selectedCategory = this.tms.getSelectedCategorySync();

    this.selectedCategorySup = this.tms.selectedCategory$.subscribe((cat) => {
      this.selectedCategory = cat;

      // The New Task input element should be in focus when a new category is selected
      this.newTaskInputElem?.nativeElement.focus();
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
