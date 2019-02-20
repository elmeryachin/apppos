import { Component } from '@angular/core';
import { StorageService } from '../../../providers/storage.service';

@Component({
  selector: 'page-disco',
  templateUrl: 'disco.html'
})
export class DiscoPage {

  constructor( public storageService: StorageService ) {
  }

  onBasicUploadAuto(event) {
    console.log(event)
  }

  onGenerar() {

  }

  onActualizar() {

  }

  onLista() {

  }
  
  private filesToUpload = null;
  public message = '';
  files(files) {
    this.message = '';
    this.filesToUpload = files;
  }

  upload() {
    const formData = new FormData();
    const files = this.filesToUpload;
    try {
      /*for (f:any : files) {
        console.log(f)
        //formData.append(`fil${i}`, files.item(i), files.item(i).name);
      } */ 
    } catch (error) {
      console.log(error)
    }
    console.log(formData)
    //this.http.post('http://localhost:3000/upload', formData).subscribe(response => this.message = response['message']);
  }

}
