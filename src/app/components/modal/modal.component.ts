import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  // Inputs & Outputs
  @Input() headerText: string = 'Alert'
  @Input() bodyText: string = 'Message'
  @Input() confirmButtons: boolean = false
  @Input() visible: boolean = false

  @Output() closed = new EventEmitter()

  // Methods
  ngOnInit(): void {
    if (!this.confirmButtons) {
      let modalButtons = document.getElementById('modalButtons')
      modalButtons?.classList.add('hidden')
    }
  }

  showModal(): void{
    this.visible = true

    let modal = document.getElementById('modalBackground')
    modal?.classList.add('active')
  }

  outputClosed(){
    this.closed.emit()
  }

  // Icons
  iconX = faX
}
