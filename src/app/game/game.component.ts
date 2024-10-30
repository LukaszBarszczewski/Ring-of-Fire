import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit {
  game: Game | undefined;
  pickCardAnimation = false;
  currentCard: string = '';
  
  constructor() {
    
  }
  
  ngOnInit(): void {
    this.newGame();
  }
  
  newGame() {
    this.game = new Game();
    console.log(this.game);
    
  }
  
  pickCard(event: Event) {
    if (this.game && !this.pickCardAnimation) {  // Überprüft, ob 'game' nicht undefined ist
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;
      



      console.log(this.game.stack);
      console.log('played_cards: ' + this.game.playedCards);
      console.log(this.currentCard);
    } else {
      console.error('Game is not initialized.');
      event.preventDefault();
    }

    setTimeout(() => {
      this.game!.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000);
  }
}
