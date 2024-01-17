import { Flashcard } from "./Flashcard";

export class Deck {
  objectId: string;
  name: string;
  cards: Flashcard[];
  editable: boolean;

  constructor(objectId: string, name: string, editable: boolean) {
    this.objectId = objectId;
    this.name = name;
    this.cards = [];
    this.editable = editable;
  }

  addCard(
    objectId: string,
    frontContent: string,
    backContent: string,
    frontType: string,
    backType: string,
    score: number,
    easinessFactor: number,
    repNumber: number,
    interval: number,
    lastReview: Date,
    nextReview: Date,
    editable: boolean
  ) {
    const card = new Flashcard(
      objectId,
      frontContent,
      backContent,
      frontType,
      backType,
      score,
      easinessFactor,
      repNumber,
      interval,
      lastReview,
      nextReview,
      editable
    );
    this.cards.push(card);
  }

  toJSON() {
    return {
      objectId: this.objectId,
      name: this.name,
      cards: this.cards.map((card) => card.toJSON()),
      editable: this.editable,
    };
  }

  // Factory method to create a Deck instance from serialized data
  static fromJSON(data) {
    const deck = new Deck(data.objectId, data.name, data.editable);
    deck.cards = data.cards.map((cardData) => Flashcard.fromJSON(cardData));
    return deck;
  }
}
