import { Component, EventEmitter, Output } from '@angular/core';
import { faArrowUpFromBracket, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.css']
})
export class ImageInputComponent {
  // Atributes
  selectedImageURL: string = ''

  // Outputs
  @Output() newImageInput = new EventEmitter<string>();

  //Methods
  newImage(event: any) {
    if (event.target.files[0] && event.target.files[0].length != 0) {
      var reader = new FileReader()
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (event: any) => {
        this.selectedImageURL = event.target.result
        this.newImageInput.emit(this.selectedImageURL)
      }
    }
    else {
      this.resetImage()
    }

    //remove input
    event.target.value = null
  }

  resetImage() {
    this.selectedImageURL = ''
    this.newImageInput.emit(this.selectedImageURL)
  }

  // Icons
  iconX = faX
  iconUpload = faArrowUpFromBracket
}
