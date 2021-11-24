import { FormControl, FormGroup, Validators } from "@angular/forms";
import { VideoLink } from "src/app/core/models/VideoLink";
import { VideosService } from "src/app/core/services/videos.service";
import { IVideoLinkDialog } from "../interface/IVideoLinkDialog";

export class UpdateDialogStrategy implements IVideoLinkDialog {


    constructor(private videosService: VideosService, private videoLinkData: VideoLink) { }

    init(videoLinkForm: FormGroup): FormGroup {

        videoLinkForm.controls["link"].setValue(this.videoLinkData.link);
        videoLinkForm.controls["category"].setValue(this.videoLinkData.category.name);

        return videoLinkForm;
    }
    send2Server(videoLinkForm: FormGroup) {

        videoLinkForm.addControl("ID", new FormControl(this.videoLinkData.id));
        
        this.videosService.PutVideoLink(videoLinkForm.value).subscribe(resp => {
        },
            error => {
            }
        );
    }

}