import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, Validators } from '@angular/forms';
import { VideosService } from 'src/app/core/services/videos.service';
import { VideoLink } from 'src/app/core/models/VideoLink';
import { VideoCategory } from 'src/app/core/models/VideoCategory';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { RecordDialogComponent } from '../../components/record-dialog/record-dialog.component';
import { UpdateDialogStrategy } from '../../components/record-dialog/implementation/updateDialogStrategy';
import { PostDialogStrategy } from '../../components/record-dialog/implementation/postDialogStrategy';
import { CategoryDialogComponent } from '../../components/category-dialog/category-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videoLinks!: VideoLink[];

  displayedColumns: string[] = ['link', 'category', 'edit','delete'];

  @ViewChild(MatTable) videoTable!: MatTable<VideoLink>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private videosService: VideosService,
    public dialog: MatDialog) { }




  ngOnInit(): void {
    this.videosService.GetAllVideos().subscribe(resp => {
      this.videoLinks = resp;
    })
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Options', cols: 1, rows: 1, color: 'lightblue' },
        ];
      }

      return [
        { title: 'Options', cols: 1, rows: 1, color: 'lightblue' },
      ];
    })
  );


  onAddLink() {
    let PostStrategy = new PostDialogStrategy(this.videosService);


    const dialogRef = this.dialog.open(RecordDialogComponent, {
      width: '250px',
      data: PostStrategy
    });

    dialogRef.afterClosed().subscribe(result => {
      this.videoTable.renderRows();
      this.videosService.GetAllVideos().subscribe(resp => {
        this.videoLinks = resp;
      })
    });
  }

  onEdit(record: VideoLink) {
    let UpdateStrategy = new UpdateDialogStrategy(this.videosService, record);

    const dialogRef = this.dialog.open(RecordDialogComponent, {
      width: '250px',
      data: UpdateStrategy
    });

    dialogRef.afterClosed().subscribe(result => {
      this.videoTable.renderRows();
      this.videosService.GetAllVideos().subscribe(resp => {
        this.videoLinks = resp;
      })
    });
  }
  onDelete(record: VideoLink) {
    this.videosService.deleteVideoLink(record.id).subscribe(resp => {
      this.videosService.GetAllVideos().subscribe(resp => {
        this.videoLinks = resp;
      })
    },
      error => {}
    )
  }

  onAddCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }




}
