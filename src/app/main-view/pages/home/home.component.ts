import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, Validators } from '@angular/forms';
import { VideosService } from 'src/app/core/services/videos.service';
import { VideoLink } from 'src/app/core/models/VideoLink';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private videosService: VideosService) { }



  videoLinks!: VideoLink[];

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
          { title: 'Video Links', cols: 2, rows: 1, color: 'lightblue' },
        ];
      }

      return [
        { title: 'Video Links', cols: 2, rows: 5, color: 'lightblue' },
      ];
    })
  );




}
