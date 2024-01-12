import { Flashcard } from "./Flashcard";

export class Deck {
  name: string;
  cards: Flashcard[];

  constructor(name) {
    this.name = name;
    this.cards = [];
  }

  addCard(
    frontContent: string,
    backContent: string,
    frontType: string,
    backType: string,
    score: number,
    easinessFactor: number,
    repNumber: number,
    interval: number,
    lastReview: Date,
    nextReview: Date
  ) {
    const card = new Flashcard(
      frontContent,
      backContent,
      frontType,
      backType,
      score,
      easinessFactor,
      repNumber,
      interval,
      lastReview,
      nextReview
    );
    this.cards.push(card);
  }

  removeCard(index: number) {
    if (index >= 0 && index < this.cards.length) {
      this.cards.splice(index, 1);
    }
  }

  getCard(index: number) {
    if (index >= 0 && index < this.cards.length) {
      return this.cards[index];
    }
    return null;
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  toJSON() {
    return {
      name: this.name,
      cards: this.cards.map((card) => card.toJSON()), // Serialize cards
    };
  }

  // Factory method to create a Deck instance from serialized data
  static fromJSON(data) {
    const deck = new Deck(data.name);
    deck.cards = data.cards.map((cardData) => Flashcard.fromJSON(cardData));
    return deck;
  }
}
