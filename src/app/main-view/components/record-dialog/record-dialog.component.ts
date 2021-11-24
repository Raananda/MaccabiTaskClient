import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VideoCategory } from 'src/app/core/models/VideoCategory';
import { VideoLink } from 'src/app/core/models/VideoLink';
import { CategoryService } from 'src/app/core/services/categories.service';
import { VideosService } from 'src/app/core/services/videos.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IVideoLinkDialog } from './interface/IVideoLinkDialog';


@Component({
  templateUrl: './record-dialog.component.html',
  styleUrls: ['./record-dialog.component.css']
})
export class RecordDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<RecordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public strategy: IVideoLinkDialog,
    private fb: FormBuilder,
    private videosService: VideosService,
    private categoryService: CategoryService
  ) { }


  videoLinkForm = this.fb.group({
    link: [null, Validators.required],
    category: [null, Validators.required]
  //  iD: [null]
  });

  videoCategories!: VideoCategory[];
  filteredOptions!: Observable<VideoCategory[]>;
  submitBtnFlag!: boolean;

  // Autocomplete filter function
  private _filter(value: string): VideoCategory[] {
    const filterValue = value.toLowerCase();
    return this.videoCategories.filter(option => option.name.toLowerCase().includes(filterValue));
  }


  ngOnInit(): void {
    //Get all categories
    this.categoryService.GetAll().subscribe(resp => {
      this.videoCategories = resp;

      // Categories autocomplete 
      this.filteredOptions = this.videoLinkForm.controls["category"].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );

      //Init the form values
      this.strategy.init(this.videoLinkForm);

    },
      error => {
      }
    );

    this.submitBtnFlag = false;
  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  onSubmit() {
    this.strategy.send2Server(this.videoLinkForm);
    this.dialogRef.close();
  }
}
