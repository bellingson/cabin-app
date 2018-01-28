import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-face',
  templateUrl: './face.component.html',
  styleUrls: ['./face.component.scss']
})
export class FaceComponent implements OnInit {

  @Input() level: number;

  @Input() image: string;
  @Input() showFaces = false;
  @Input() canClick = false;
  @Input() showDot = false;
  @Input() showShapes = false;
  @Input() showCorrect = false;
  @Input() showIncorrect = false;

  @Output() clicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  click() {
    this.clicked.emit(true);
  }

}
