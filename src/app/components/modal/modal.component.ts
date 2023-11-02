import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  // Inputs
  @Input() headerText: string = 'Alerta'
  @Input() bodyText: string = ''
  @Input() buttonText: string = 'Aceptar'
  @Input() buttonTextColor: string = ''
  @Input() buttonBgColor: string = ''

  // Outputs
  @Output() closed = new EventEmitter()

  // Methods
  showModal(): void {
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

    // click on modal button
    let modalBtn = document.getElementById('modalButtonBtn')
    if (modalBtn) {
      if (this.buttonTextColor) {
        modalBtn.style.color = this.buttonTextColor
      }

      if (this.buttonBgColor) {
        modalBtn.style.backgroundColor = this.buttonBgColor
      }

      modalBtn.onclick = () => {
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
