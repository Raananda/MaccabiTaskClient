import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.css']
})
export class CategoryDialogComponent implements OnInit {

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    private categoryService: CategoryService
  ) { }
  

  categoryForm = this.fb.group({
    name: [null, Validators.required]
  });

  ngOnInit(): void {
  }

  onSubmit() {

    this.categoryService.PostCategory(this.categoryForm.value).subscribe(resp => {
      this.dialogRef.close();

    },
      error => {

      })
  
  }

}
