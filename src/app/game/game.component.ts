import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { CardChallengeComponent } from "../card-challenge/card-challenge.component";
import { collection, Firestore, doc, onSnapshot, updateDoc, deleteDoc, addDoc, collectionGroup } from "@angular/fire/firestore";
import { ActivatedRoute } from '@angular/router';
import { PlayerMobileComponent } from "../player-mobile/player-mobile.component";


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatIconModule,
    MatButtonModule,
    DialogAddPlayerComponent,
    CardChallengeComponent,
    PlayerMobileComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent implements OnInit, OnDestroy {
  game: Game = new Game;
  saves = [];
  gameId: string = "";
  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.gameId = params.id;

      // Ich abonniere eine Zeitung -> also kriege ich jede neue Ausgabe
      let unsubDoc = onSnapshot(doc(collection(this.firestore, 'games'), params.id), (docSnapshot: any) => {
        console.log("Get a singular document:", docSnapshot.id)
        console.log(docSnapshot.data());
        const game = docSnapshot.data();

        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;

      })
    });
  }

  ngOnDestroy(): void {

  }

  pickCard(event: Event) {
    if (this.game && !this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      // Modulo Rechnung: 3 % 2 bedeutet: Wie oft passt die 2 in 3 rein ? 1 mal und 1er bleibt über -> Rest 1 
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.updateGame();

    } else {
      event.preventDefault();
    }

    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.updateGame();
    }, 1000);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
      this.updateGame();
    });
  }

  updateGame() {
    updateDoc(doc(collection(this.firestore, "games"), this.gameId), { ...this.game });
  }
}
