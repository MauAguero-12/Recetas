import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  // Inputs
  @Input() headerText: string = 'Alert'
  @Input() bodyText: string = 'Message'
  @Input() visible: boolean = false

  // Outputs
  @Output() closed = new EventEmitter()

  // Methods
  showModal(): void {
    this.visible = true

    let modal = document.getElementById('modalBackground')
    modal?.classList.add('active')

    // click on close icon
    let closeIcon = document.getElementById('modalCloseIcon')
    if (closeIcon) {
      closeIcon.onclick = () => {
        modal?.classList.remove('active')
        this.outputClosed()
      }
    }

    // click outside of modal
    window.onclick = (event) => {
      if (event.target == modal) {
        modal?.classList.remove('active')
        this.outputClosed()
      }
    }
  }

  outputClosed() {
    this.closed.emit()
  }

  // Icons
  iconX = faX
}
