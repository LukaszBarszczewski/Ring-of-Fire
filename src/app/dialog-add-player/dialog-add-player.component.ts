import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import für ngModel
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { GameComponent } from '../game/game.component';
import { MatIcon } from '@angular/material/icon';




@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    CommonModule,
    GameComponent,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule, // Import für ngModel hinzufügen 
    MatInputModule,
    MatIcon
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  name: string = '';

  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {

  }

  addPlayer() {
    if (this.name.length <= 14) {
      this.dialogRef.close(this.name); // Schließt den Dialog und gibt den Namen zurück
    } else {
      alert('Max. 14 signs');
    }

  }
}
