import { FormGroup } from "@angular/forms";
import { VideoLink } from "src/app/core/models/VideoLink";

export interface IVideoLinkDialog {
    init(videoLinkForm: FormGroup): FormGroup;

    send2Server(data: FormGroup): any;
}