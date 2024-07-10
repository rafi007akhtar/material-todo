import {
  Component,
  computed,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { allCategories } from '../../state/categories.signals';
import { CategoriesType } from '../../models/category.model';
import { TaskManagementService } from '../../services/task-management.service';
import { Subscription } from 'rxjs';
import { initCategories } from '../../data/dummy-data';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  allCats: CategoriesType = [];
  allCatsSup: Subscription | undefined;
  addingNewCategory = signal(false);
  newCategoryName: string = '';

  @ViewChild('newCatInp') newCatInp!: ElementRef;

  constructor(private tms: TaskManagementService) {}

  ngOnInit(): void {
    this.allCatsSup = this.tms.allCategories$.subscribe((cats) => {
      this.allCats = cats;
    });

    this.tms.setCategories(initCategories);
    this.tms.setSelectedCategory('Default');
  }

  setSelectedCategory(change: MatSelectionListChange) {
    const changedItem = change.options[0].value;
    this.tms.setSelectedCategory(changedItem);
  }

  toggleAddCategory() {
    this.addingNewCategory.update((val) => !val);
    setTimeout(() => {
      this.newCatInp?.nativeElement.focus();
    }, 0);
  }

  onNewCatInputChange(evt: KeyboardEvent) {
    if (evt.key === 'Enter') {
      this.addNewCategory();
    }
  }

  addCategoryHandler() {
    this.toggleAddCategory();
  }

  addNewCategory() {
    if (this.newCategoryName?.trim()) {
      this.tms.addNewCategory(this.newCategoryName?.trim());
      this.newCategoryName = '';
    }
  }

  ngOnDestroy(): void {
    this.allCatsSup?.unsubscribe();
  }
}
