import { FormGroup } from "@angular/forms";
import { VideoLink } from "src/app/core/models/VideoLink";
import { VideosService } from "src/app/core/services/videos.service";
import { IVideoLinkDialog } from "../interface/IVideoLinkDialog";

export class PostDialogStrategy implements IVideoLinkDialog {


    constructor(private videosService: VideosService) { }

    init(videoLinkForm: FormGroup): FormGroup {
        return videoLinkForm;
    }
    send2Server(videoLinkForm: FormGroup) {
        this.videosService.PostVideoLink(videoLinkForm.value).subscribe(resp => {
        },
            error => {
            }
        );
    }

}