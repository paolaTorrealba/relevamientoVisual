import { Component, OnInit } from '@angular/core';
import { General } from 'src/app/general';
import { CameraService } from 'src/app/servicios/camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {

  private type: any;
  
  constructor(private cameraService: CameraService,
    private general: General,) { 
    this.type = this.general.type
  }

  ngOnInit() { }
  
  takePhoto(){
    console.log("takePhoto ", this.type)
    if (this.type=='lindas'){
       this.cameraService.takePhotoLinda(this.type);
    }
    else {
       this.cameraService.takePhotoFea(this.type);
    }   
  }

}