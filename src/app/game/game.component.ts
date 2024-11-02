import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { CardChallengeComponent } from "../card-challenge/card-challenge.component";


@Component({
  selector: 'app-game',
  standalone: true, 
  imports: [
    CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    DialogAddPlayerComponent,
    CardChallengeComponent
],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  game: Game | undefined;
  pickCardAnimation = false;
  currentCard: string = '';
  
  constructor(public dialog: MatDialog) {
    
  }
  
  ngOnInit(): void {
    this.newGame();
  }
  
  newGame() {
    this.game = new Game();
    console.log(this.game);
    
  }
  
  pickCard(event: Event) {
    if (this.game && !this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      console.log(this.game.currentPlayer);
      if (this.game.currentPlayer >= this.game.players.length) {
        this.game.currentPlayer = 0;
      }
    } else {
      event.preventDefault();
    }

    setTimeout(() => {
      this.game!.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000);
  }
  

  openDialog(): void {
    
    if (this.game!.players.length <= 5) {
      const dialogRef = this.dialog.open(DialogAddPlayerComponent);
      dialogRef.afterClosed().subscribe((name: string) => {
        if (name && name.length > 0) {
          this.game?.players.push(name);
        }
      });
    } else {
      alert('Max. 6 players');
    }

    
  }


  
    
}
