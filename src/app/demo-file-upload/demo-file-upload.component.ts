import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
@Component({
  selector: 'app-demo-file-upload',
  templateUrl: './demo-file-upload.component.html',
  styleUrls: ['./demo-file-upload.component.css']
})
export class DemoFileUploadComponent implements OnInit {
  selectedFile: File = null;
  uploadedPercentage = 0;
  showMessage = false;
  message: String = '';
  constructor(private slimLoadingBarService: SlimLoadingBarService, private http: HttpClient) { }

  ngOnInit() { }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    this.showMessage = false;
    console.log(this.selectedFile.name);
    fd.append('file', this.selectedFile, this.selectedFile.name);
    this.http.post(`/api/upload-file`, fd, {
      reportProgress: true, observe: 'events'
    }).subscribe( (event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          this.slimLoadingBarService.start();
          break;
        case HttpEventType.Response:
          this.slimLoadingBarService.complete();
          if (event.body.success) {
            this.message = 'Uploaded Successfully';
          } else {
            this.message = event.body.message;
          }
          this.showMessage = true;
          break;
        case 1: {
          if (Math.round(this.uploadedPercentage) !== Math.round(event['loaded'] / event['total'] * 100)){
            this.uploadedPercentage = event['loaded'] / event['total'] * 100;
            this.slimLoadingBarService.progress = Math.round(this.uploadedPercentage);
          }
          break;
        }
      }
    },
    error => {
      console.log(error);
      this.message = "Something went wrong";
      this.showMessage = true;
      this.slimLoadingBarService.reset();
    });
  }

}
