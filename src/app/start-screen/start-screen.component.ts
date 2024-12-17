import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { collection, Firestore, doc, onSnapshot, updateDoc, deleteDoc, addDoc } from "@angular/fire/firestore";

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {

  constructor(private firestore: Firestore, private router: Router) {

  }

  newGame() {
    const game = new Game();
    addDoc(collection(this.firestore, "games"), game.toJSON())
      .then((gameInfo) => {
        console.log(gameInfo);
        let documentId: string = gameInfo.id;

        this.router.navigateByUrl('/game/' + documentId)
      });
  }
}
