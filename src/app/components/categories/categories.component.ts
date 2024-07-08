import { Component, computed, OnInit, signal } from '@angular/core';
import { allCategories, CategoriesType } from '../../state/categories.signals';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  allCats = computed(allCategories);
  // allCategories = signal<CategoriesType>([]);

  ngOnInit(): void {
    // this.allCategories.set([{ name: 'test 1' }, { name: 'test 2' }]);
    // console.log(this.allCategories());
  }
}
