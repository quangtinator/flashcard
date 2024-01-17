export class Flashcard {
  objectId: string;
  frontContent: string;
  backContent: string;
  frontType: string;
  backType: string;
  score: number;
  easinessFactor: number;
  repNumber: number;
  interval: number;
  lastReview: Date;
  nextReview: Date;
  editable: boolean;

  constructor(
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
    this.objectId = objectId;
    this.frontContent = frontContent;
    this.backContent = backContent;
    this.frontType = frontType;
    this.backType = backType;
    this.score = score;
    this.easinessFactor = easinessFactor;
    this.repNumber = repNumber;
    this.interval = interval;
    this.lastReview = lastReview;
    this.nextReview = nextReview;
    this.editable = editable;
  }

  toJSON() {
    return {
      objectId: this.objectId,
      frontContent: this.frontContent,
      backContent: this.backContent,
      frontType: this.frontType,
      backType: this.backType,
      score: this.score,
      easinessFactor: this.easinessFactor,
      repNumber: this.repNumber,
      interval: this.interval,
      lastReview: this.lastReview,
      nextReview: this.nextReview,
      editable: this.editable,
    };
  }

  // Factory method to create a Flashcard instance from serialized data
  static fromJSON(data) {
    return new Flashcard(
      data.objectId,
      data.frontContent,
      data.backContent,
      data.frontType,
      data.backType,
      data.score,
      data.easinessFactor,
      data.repNumber,
      data.interval,
      data.lastReview,
      data.nextReview,
      data.editable
    );
  }
}
