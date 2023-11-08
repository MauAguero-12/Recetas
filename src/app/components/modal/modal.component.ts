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

  // Outputs
  @Output() closed = new EventEmitter<number>()

  // Methods
  showModal(): void {
    let modal = document.getElementById('modalBackground')
    modal?.classList.add('active')

    // click on close button
    let closeBtn = document.getElementById('modalCloseDiv')
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal?.classList.remove('active')
        this.outputClosed(0)
      }
    }

    // click on modal button
    let modalBtn = document.getElementById('modalButtonBtn')
    if (modalBtn) {
      modalBtn.onclick = () => {
        modal?.classList.remove('active')
        this.outputClosed(1)
      }
    }
  }

  outputClosed(i: number) {
    this.closed.emit(i)
  }

  // Icons
  iconX = faX
}
