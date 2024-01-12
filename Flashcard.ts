export class Flashcard {
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

  constructor(
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
  }

  toJSON() {
    return {
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
    };
  }

  // Factory method to create a Flashcard instance from serialized data
  static fromJSON(data) {
    return new Flashcard(
      data.frontContent,
      data.backContent,
      data.frontType,
      data.backType,
      data.score,
      data.easinessFactor,
      data.repNumber,
      data.interval,
      data.lastReview,
      data.nextReview
    );
  }
}
