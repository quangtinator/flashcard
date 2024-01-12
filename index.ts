import { LitElementWw } from "@webwriter/lit";
import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "lit/decorators.js";
import { Deck } from "./Deck";
import { ScopedElementsMixin } from "@open-wc/scoped-elements/html-element.js";
import "@shoelace-style/shoelace/dist/themes/light.css";
import "@shoelace-style/shoelace/dist/components/button/button.js";
import "@shoelace-style/shoelace/dist/components/input/input.js";
import "@shoelace-style/shoelace/dist/components/select/select.js";
import "@shoelace-style/shoelace/dist/components/icon-button/icon-button.js";
import "@shoelace-style/shoelace/dist/components/tab/tab.js";
import "@shoelace-style/shoelace/dist/components/tab-group/tab-group.js";
import "@shoelace-style/shoelace/dist/components/option/option.js";
import "@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js";
import "@shoelace-style/shoelace/dist/components/tooltip/tooltip.js";
import "@shoelace-style/shoelace/dist/components/details/details.js";
import "@shoelace-style/shoelace/dist/components/badge/badge.js";
import "@shoelace-style/shoelace/dist/components/tree-item/tree-item.js";
import "@shoelace-style/shoelace/dist/components/tree/tree.js";
import "@shoelace-style/shoelace/dist/components/divider/divider.js";
import "@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js";
import "@shoelace-style/shoelace/dist/components/color-picker/color-picker.js";
import "@shoelace-style/shoelace/dist/components/switch/switch.js";
import "@shoelace-style/shoelace/dist/components/radio-button/radio-button.js";
import "@shoelace-style/shoelace/dist/components/radio-group/radio-group.js";
import "@shoelace-style/shoelace/dist/components/alert/alert.js";
// import "@shoelace-style/shoelace/dist/components/icon/icon.js";
import "@shoelace-style/shoelace/dist/components/icon/icon.component.js";
import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
setBasePath("/node_modules/@shoelace-style/shoelace/dist");
import mime from "mime";
import SlIcon from "@shoelace-style/shoelace/dist/components/icon/icon.component.js";

@customElement("ww-flashcards")
export class WwFlashcards extends ScopedElementsMixin(LitElementWw) {
  static scopedElements = {
    "sl-icon": SlIcon,
  };

  static styles = css`
    *, html {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :host {
      --front-text-color: var(--front-text-color, #000);
      --front-background-color: var(--front-background-color, lightgreen);
      --back-text-color: var(--back-text-color, white);
      --back-background-color: var(--back-background-color, lightblue);
      --front-border-color: var(--front-border-color, black);
      --back-border-color: var(--back-border-color, yellow);
    }

    .page {
      height: 100vh;
      width: 100vw;
      min-height: 500px;
      margin: 0;
      padding: 0;
      border: 0;
      display: flex;
      flex-direction: row:
      justify-content: center;
      align-items: center;
      background-image: url("bgimg.png");
      background-size: cover;
    }

    .panel {
      height: 100%;
      width: 30%;
      min-width: 300px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      background: linear-gradient(45deg, #c7c7c7, #e1eaee);
      overflow: scroll;
      border-left: solid;
      border-left-width: 0.1rem;
    }

    sl-tab-group {
      width: 90%;
      height: 100%;
      margin: 0 auto;
    }

    sl-tab-panel {
      width: 90%;
      height: 100%;
      margin: 0 auto;
      overflow: hidden;
    }

    .user-input {
      width: 100%;
    }

    sl-details {
      margin: 1rem 0;
      text-align: justify;
    }

    .fc_front h1 {
      color: var(--front-text-color);
    }

    .fc_back h1 {
      color: var(--back-text-color);
    }

    .panel h1 {
      text-align: center;
      padding-top: 1rem;
    }

    .display {
      height: 100%;
      width: 70%;
      min-width: 800px;
      min-height: 500px;
      overflow: hidden;
      font-family: Helvetica, sans-serif;
      color: rgb (211, 211,211);
      display: grid;
      grid-template-rows: repeat(5, 1fr);
      justify-items: center;
      grid-template-areas: 
        "progress"
        "timer"
        "card"
        "flip"
        "feedback";
    }

    .fc_container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-contents: center;
      height: 40%;
      width: 100%;
      max-width: 800px;
      max-height: 450px;
      min-height: 350px;
      grid-area: card;
    }

    .fc {
      position: relative;
      height: 100%;
      width: 80%;
      border-radius: 2rem;
      transition: transform 700ms;
      transform-style: preserve-3d;
    }

    .fc_front {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      width: 100%;
      height: 100%;
      border-radius: 2rem;
      background: var(--front-background-color);
      backface-visibility: hidden;
      box-shadow: 5px 6px 32px 2px rgba(133,133,133,0.71);
      border: solid;
      border-color: var(--front-border-color);
    }

    .fc_back {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      gap: 30px;
      width: 100%;
      height: 100%;
      border-radius: 2rem;
      background: var(--back-background-color);
      backface-visibility: hidden;
      transform: rotateY(180deg) rotateZ(180deg);
      box-shadow: 5px 6px 32px 2px rgba(133,133,133,0.71);
      border: solid;
      border-color: var(--back-border-color);
    }
    
    .do_flip {
      transform: rotateY(180deg) rotateZ(180deg);
      z-index: 1;
    }

    .do_trick {
      transform: rotateY(180deg) rotateZ(180deg);
      z-index: 1;
      transition: none; 
    }

    .slider {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all .1s ease-in-out;
    }

    .slider:hover {
      transform: scale(1.2);
    }

    .flip_button {
      transition: all .1s ease-in-out;
      grid-area: flip;
      align-self: center;
    }

    .flip_button:hover {
      transform: scale(1.2);
    }

    .tab-icon {
      transition: all .1s ease-in-out;
    }

    .tab-icon:hover {
      transform: scale(1.2);
    }

    sl-tab-group {
      --track-width: 0;
      width: 100%;
    }
  
    .deck-cards, .all-cards {
      width: 100%;
    }

    .review-buttons-container {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      visibility: hidden;
      height: 5%;
      width: 40%;
      transform: translateY(100%);
      transition: visibility 0.2s, transform 0.5s ease;
      grid-area: feedback;
      align-self: center;
    }

    .review-visible {
      visibility: visible;
      transform: translateY(0);
    }

    .progress {
      width: 80%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      grid-area: progress;
    }

    sl-progress-bar {
      width: 70%;
      margin-right: 1rem;
      visibility: hidden;
      transform: translateY(-100%);
      transition: visibility 0.2s, transform 0.5s ease;
    }

    .progress-visible {
      visibility: visible;
      transform: translateY(0);
    }

    .timer-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
      font-size: 5rem;
      font-family: monospace;
      visibility: hidden;
      transform: translateY(-100%);
      transition: visibility 0.2s, transform 0.5s ease;
      margin-bottom: 0;
      grid-area: timer;
      align-self: center;
    }

    .timer-container-visible {
      visibility: visible;
      transform: translateY(0);
    }

    .timer-container sl-icon-button {
      align-self: center;
      margin-right: 1rem;
    }


    .card-position-progress {
      font-size: 3rem;
      font-family: monospace;
      visibility: hidden;
      transform: translateY(-100%);
      transition: visibility 0.2s, transform 0.5s ease;
    }

    .card-position-progress-visible {
      visibility: visible;
      transform: translateY(0);
    }

    .review-buttons-container sl-icon-button {
      font-size: 3rem;
      transition: all .1s ease-in-out;
    }

    .review-buttons-container sl-icon-button:hover {
      transform: scale(1.3);
    }

    .input {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
    }

    @media (max-width: 1500px) {
      .input {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
    }

    img {
      height: 95%;
      width: 95%;
      object-fit: contain;
      border-radius: 2rem;
    }

    video, iframe {
      height: 95%;
      width: 90%;
      object-fit: contain;
      border-radius: 2rem;
    }

    sl-input, sl-select {
      padding: 1rem 0;
    }

    .new-deck-button, .new-card-button, .delete-card-button, .review-deck-button, .add-current-button {
      width: 100%;
      margin-bottom: 1rem;
    }

    h2 {
      margin-top: 1rem;
    }

    .selected-deck {
      padding: 1rem 0;
    }

    sl-badge {
      font-size: 1.25rem; 
    }

    .deck-select {
      padding-bottom: 25rem;
    }

    .sub-icon {
      color: #4a90e2;
      font-size: 1.5rem;
      margin-left: 0.5rem;
    }

    sl-button {
      font-weight: bold;
      font-size: 50px;
    }

    .color-picker, .review-type {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;
    }

    .enable-timer {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;
    }

    .enable-timer-item {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0.25rem 0;
    }

    .enable-timer-item sl-input {
      padding: 0;
    }

    .enable-timer-item h3 {
      align-self: center;
    }

    .settings p {
      font-size: 1.5rem;
    }

    .settings {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      overflow: auto;
    }
    
    .timer-input {
      width: 20%;
    }

    .no-more-card sl-alert {
      margin-top: 1rem;
    }

    .finish-review sl-alert {
      margin-top: 1rem;
    }

  `;

  @property({ type: Array, attribute: true, reflect: true })
  deckCollection = [];

  @property({ type: String, attribute: true, reflect: true })
  deckName = "";

  @property({ type: Deck, attribute: true, reflect: true })
  selectedDeck = null;

  @property({ type: Array, attribute: true, reflect: true })
  reviewList = [];

  @property({ type: Array, attribute: true, reflect: true })
  checkBoxList = [];

  @property({ type: Array, attribute: true, reflect: true })
  cardList = [];

  @property({ type: String, attribute: true, reflect: true })
  frontType = "text";

  @property({ type: String, attribute: true, reflect: true })
  backType = "text";

  @property({ type: String, attribute: true, reflect: true })
  frontContent = "";

  @property({ type: String, attribute: true, reflect: true })
  backContent = "";

  @property({ type: String, attribute: true, reflect: true })
  frontColor = "lightgreen";

  @property({ type: String, attribute: true, reflect: true })
  backColor = "lightblue";

  @property({ type: String, attribute: true, reflect: true })
  frontBorderColor = "black";

  @property({ type: String, attribute: true, reflect: true })
  backBorderColor = "red";

  @property({ type: String, attribute: true, reflect: true })
  frontTextColor = "black";

  @property({ type: String, attribute: true, reflect: true })
  backTextColor = "black";

  @property({ type: Number, attribute: true, reflect: true })
  currentPosition = 0;

  @property({ type: Number, attribute: true, reflect: true })
  timer = 10;

  @property({ type: Number, attribute: true, reflect: true })
  timeLeft = this.timer; //running timer

  @property({ type: Number, attribute: true, reflect: true })
  timerID;

  @property({ type: Boolean, attribute: true, reflect: true }) isReviewingDeck =
    false;

  @property({ type: Boolean, attribute: true, reflect: true }) isShowingFront =
    true;

  @property({ type: Boolean, attribute: true, reflect: true }) enableTimer =
    true;

  @property({ type: Boolean, attribute: true, reflect: true }) reviewStarted =
    false;

  @property({ type: String, attribute: true, reflect: true }) feedbackStyle =
    "emoji";

  @property({ type: Boolean, attribute: true, reflect: true }) timerIcon =
    "pause-circle";

  loadDecksFromLocalStorage() {
    const decks = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("deck_")) {
        const serializedDeck = localStorage.getItem(key);
        const deck = Deck.fromJSON(JSON.parse(serializedDeck));
        decks.push(deck);
      }
    }
    return decks;
  }

  loadCardsFromLocalStorage() {
    const cardsListJSON = localStorage.getItem("cards_list");
    if (cardsListJSON) {
      try {
        const cardsList = JSON.parse(cardsListJSON);
        if (Array.isArray(cardsList)) {
          return cardsList; // Return the array as is
        } else {
          console.error("Data in local storage is not an array.");
        }
      } catch (error) {
        console.error("Error parsing data from local storage:", error);
      }
    } else {
      console.log("No data found in local storage.");
    }

    // Return an empty array if there's an issue or no data
    return [];
  }

  loadSettingsFromLocalStorage() {
    const existingSettingsJSON = localStorage.getItem("settings");
    if (existingSettingsJSON) {
      const existingSettings = JSON.parse(existingSettingsJSON);

      this.frontColor = existingSettings["frontColor"] || "lightgreen";
      this.frontBorderColor = existingSettings["frontBorderColor"] || "black";
      this.frontTextColor = existingSettings["frontTextColor"] || "black";
      this.backColor = existingSettings["backColor"] || "lightblue";
      this.backBorderColor = existingSettings["backBorderColor"] || "red";
      this.backTextColor = existingSettings["backTextColor"] || "black";
      this.enableTimer = existingSettings["enableTimer"] || true;
      this.feedbackStyle = existingSettings["feedbackStyle"] || "emoji";
      this.timer = existingSettings["timeDuration"] || 10;
    }
  }

  // loadProgressFromLocalStorage() {
  //   const progressJSON = localStorage.getItem("progress");
  //   if (progressJSON) {
  //     const progress = JSON.parse(progressJSON);

  //     this.selectedDeck = progress["selectedDeck"];
  //   }
  // }

  constructor() {
    super();
    this.timerID = null;
    this.deckCollection = this.loadDecksFromLocalStorage();
    this.cardList = this.loadCardsFromLocalStorage();
    this.loadSettingsFromLocalStorage();
    // this.loadProgressFromLocalStorage();
  }

  updated(changedProperties) {
    if (changedProperties.has("frontTextColor")) {
      this.style.setProperty(
        "--front-text-color",
        this.frontTextColor || "default-value"
      );
    }

    if (changedProperties.has("backTextColor")) {
      this.style.setProperty(
        "--back-text-color",
        this.backTextColor || "default-value"
      );
    }

    if (changedProperties.has("frontColor")) {
      this.style.setProperty(
        "--front-background-color",
        this.frontColor || "default-value"
      );
    }

    if (changedProperties.has("backColor")) {
      this.style.setProperty(
        "--back-background-color",
        this.backColor || "default-value"
      );
    }

    if (changedProperties.has("frontBorderColor")) {
      this.style.setProperty(
        "--front-border-color",
        this.frontBorderColor || "default-value"
      );
    }

    if (changedProperties.has("backBorderColor")) {
      this.style.setProperty(
        "--back-border-color",
        this.backBorderColor || "default-value"
      );
    }
  }

  addCheckedCardsToDeck() {
    // Filter the checked cards
    const checkedCards = this.cardList.filter((card) => card.checked);

    // Add the checked cards to the current deck
    checkedCards.forEach((card) => {
      this.selectedDeck.addCard(card.frontContent, card.backContent);
    });

    // Clear the checked state
    checkedCards.forEach((card) => (card.checked = false));

    localStorage.setItem(
      `deck_${this.selectedDeck.name}`,
      JSON.stringify(this.selectedDeck)
    );
    // Trigger a re-render to reflect the changes
    this.requestUpdate();
  }

  createDeck(name) {
    const newDeck = new Deck(name);
    newDeck.name = this.deckName;
    this.deckCollection.push(newDeck);
    // Serialize the newDeck object to JSON
    const serializedDeck = JSON.stringify(newDeck);

    // Save the serialized deck to local storage
    localStorage.setItem(`deck_${newDeck.name}`, serializedDeck);

    this.deckName = "";
    this.requestUpdate();
  }

  handleDeckSelect(deck) {
    this.selectedDeck = deck;
    this.reviewList = this.getOverdueCards(this.selectedDeck?.cards);
    const progressJSON = localStorage.getItem("progress");
    const progress = JSON.parse(progressJSON) || {};
    progress["selectedDeck"] = this.selectedDeck;
    localStorage.setItem("progress", JSON.stringify(progress));
    this.currentPosition = 0;
    this.renderRoot.querySelector("sl-tab-group").show("card");
  }

  handleReviewButtonClick(value) {
    const currentCard = this.getCurrentCard();

    if (currentCard) {
      currentCard.score = value;
      currentCard.lastReviewed = new Date();
      currentCard.nextReview = new Date(currentCard.nextReview);
      currentCard.lastReview = new Date(currentCard.lastReview);

      if (value >= 3) {
        if (currentCard.repNumber == 0) {
          currentCard.interval = 1;
          currentCard.nextReview.setDate(
            currentCard.lastReview.getDate() + currentCard.interval
          );
        } else if (currentCard.repNumber == 1) {
          currentCard.interval = 6;
          currentCard.nextReview.setDate(
            currentCard.lastReview.getDate() + currentCard.interval
          );
        } else {
          currentCard.interval = Math.round(
            currentCard.interval * currentCard.easinessFactor
          );
        }
        currentCard.repNumber++;
      } else {
        currentCard.repNumber = 0;
        currentCard.interval = 1;
        currentCard.nextReview.setDate(
          currentCard.lastReview.getDate() + currentCard.interval
        );
      }
      currentCard.easinessFactor =
        currentCard.easinessFactor +
        (0.1 -
          (5 - currentCard.repNumber) *
            (0.08 + (5 - currentCard.repNumber) * 0.02));
      if (currentCard.easinessFactor < 1.3) {
        currentCard.easinessFactor = 1.3;
      }

      const cardsListJSON = localStorage.getItem("cards_list");

      if (cardsListJSON) {
        try {
          let cardsList = JSON.parse(cardsListJSON);
          if (Array.isArray(cardsList)) {
            // Find the card in the array and update its properties
            const cardIndex = cardsList.findIndex(
              (card) => card.frontContent === currentCard.frontContent
            );

            if (cardIndex !== -1) {
              cardsList[cardIndex] = currentCard;

              // Save the updated cardsList back to local storage
              localStorage.setItem("cards_list", JSON.stringify(cardsList));
            }
          } else {
            console.error("Data in local storage is not an array.");
          }
        } catch (error) {
          console.error("Error parsing data from local storage:", error);
        }
      } else {
        console.log("No data found in local storage.");
      }

      const deckKey = `deck_${this.selectedDeck.name}`;
      const deckJSON = localStorage.getItem(deckKey);

      if (deckJSON) {
        try {
          const deck = JSON.parse(deckJSON);
          if (deck && Array.isArray(deck.cards)) {
            // Find the card in the deck's cards array and update its properties
            const cardIndex = deck.cards.findIndex(
              (card) => card.frontContent === currentCard.frontContent
            );

            if (cardIndex !== -1) {
              deck.cards[cardIndex] = currentCard;

              // Save the updated deck back to local storage
              localStorage.setItem(deckKey, JSON.stringify(deck));
            }
          } else {
            console.error(
              `Data for deck '${this.selectedDeck.name}' is missing or not an array.`
            );
          }
        } catch (error) {
          console.error(
            `Error parsing data for deck '${this.selectedDeck.name}' from local storage:`,
            error
          );
        }
      } else {
        console.log(
          `No data found for deck '${this.selectedDeck.name}' in local storage.`
        );
      }

      this.requestUpdate();
      this.slideRight();
    }
  }

  handleAddCard(
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
  ) {
    this.selectedDeck?.addCard(
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

    this.frontContent = "";
    this.backContent = "";

    localStorage.setItem(
      `deck_${this.selectedDeck.name}`,
      JSON.stringify(this.selectedDeck)
    );

    this.cardList = [
      ...this.cardList,
      {
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
      },
    ];
    const cards_list = JSON.parse(localStorage.getItem("cards_list")) || [];
    cards_list.push({
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
    });
    localStorage.setItem("cards_list", JSON.stringify(cards_list));

    this.requestUpdate();
  }

  handleCheckboxChange(event, card) {
    if (event.target.checked) {
      this.checkBoxList.push(card);
    } else {
      const index = this.checkBoxList.indexOf(card);
      if (index > -1) {
        this.checkBoxList.splice(index, 1);
      }
    }
    this.requestUpdate();
  }

  handleSelectTypeChange(e) {
    const selectedValue = e.target.value;
    const selectId = e.target.id;

    if (selectId === "frontContentTypeSelect") {
      if (selectedValue === "text") {
        this.frontType = "text";
      } else this.frontType = "url";
    } else if (selectId === "backContentTypeSelect") {
      if (selectedValue === "text") {
        this.backType = "text";
      } else this.backType = "url";
    }
  }

  deleteSelectedCards() {
    this.selectedDeck.cards = this.selectedDeck.cards.filter(
      (card) => !this.checkBoxList.includes(card)
    );
    this.checkBoxList = [];

    localStorage.setItem(
      `deck_${this.selectedDeck.name}`,
      JSON.stringify(this.selectedDeck)
    );

    const cards_list = JSON.parse(localStorage.getItem("cards_list")) || [];
    const updatedAllCards = cards_list.filter(
      (card) =>
        !this.checkBoxList.some(
          (selectedCard) => selectedCard.frontContent === card.frontContent
        )
    );
    localStorage.setItem("cards_list", JSON.stringify(updatedAllCards));
    this.requestUpdate();
    this.currentPosition = 0;
  }

  addFrontContent(event: InputEvent) {
    this.frontContent = (event.target as HTMLInputElement).value;
    this.requestUpdate();
  }

  addBackContent(event: InputEvent) {
    this.backContent = (event.target as HTMLInputElement).value;
    this.requestUpdate();
  }

  flipCard = () => {
    const element = this.renderRoot.querySelector(".fc");
    element.classList.toggle("do_flip");
    this.isShowingFront = !this.isShowingFront;
    if (this.enableTimer) {
      this.timerIcon = "play-circle";
      this.stopCountdown();
    }
  };

  getCurrentCard() {
    if (!this.isReviewingDeck) {
      return this.selectedDeck?.cards?.length > 0
        ? this.selectedDeck?.cards[this.currentPosition]
        : null;
    } else if (!this.reviewStarted) {
      this.reviewList = this.getOverdueCards(this.selectedDeck?.cards);
      this.reviewStarted = !this.reviewStarted;
    }
    return this.reviewList.length > 0
      ? this.reviewList[this.currentPosition]
      : null;
  }

  getUrlType(url: string) {
    const inputURL = new URL(url);
    const ext = inputURL.pathname.slice(inputURL.pathname.lastIndexOf(".") + 1);
    const urlType = mime.getType(ext);
    if (
      urlType === "image/apng" ||
      urlType === "image/avif" ||
      urlType === "image/gif" ||
      urlType === "image/jpg" ||
      urlType === "image/jpeg" ||
      urlType === "image/jfif" ||
      urlType === "image/pjpeg" ||
      urlType === "image/pjp" ||
      urlType === "image/png" ||
      urlType === "image/svg" ||
      urlType === "image/webp"
    ) {
      return { type: "image", mimeType: urlType };
    }
    if (
      urlType === "video/mp4" ||
      urlType === "video/avi" ||
      urlType === "video/mov" ||
      urlType === "video/mpg" ||
      urlType === "video/3gp" ||
      urlType === "video/mpeg" ||
      urlType === "video/m4v" ||
      urlType === "video/m4p" ||
      urlType === "video/webm" ||
      urlType === "video/ogv" ||
      urlType === "video/ogg"
    ) {
      return { type: "video", mimeType: urlType };
    }
    if (
      urlType === "audio/mp3" ||
      urlType === "audio/mp4" ||
      urlType === "audio/wav" ||
      urlType === "audio/flac" ||
      urlType === "audio/aac" ||
      urlType === "audio/mpeg" ||
      urlType === "audio/webm" ||
      urlType === "audio/ogg"
    ) {
      return { type: "audio", mimeType: urlType };
    }
    if (urlType === null) return { type: "iframe", mimeType: urlType };
  }

  convertUrlLink = (inputLink) => {
    const convertedLink = inputLink.replace(
      /^(https?:\/\/)?(www\.)?youtu\.be\/([\w-?]+)(.*)$/,
      "https://www.youtube.com/embed/$3$4"
    );

    return convertedLink;
  };

  test = (input) => {
    // sua thanh () => function
    return input;
  };

  renderFrontContent = () => {
    const currentCard = this.getCurrentCard();
    this.requestUpdate();

    if (currentCard) {
      if (currentCard.frontType === "text") {
        return html`<h1>${currentCard.frontContent}</h1>`;
      } else if (currentCard.frontType === "url") {
        const { type, mimeType } = this.getUrlType(currentCard.frontContent);

        if (type == "image") {
          return html`<img
            type=${currentCard.frontType}
            src=${this.test(currentCard.frontContent)}
          />`;
        }
        if (type == "video") {
          return html`<video controls>
            <source
              src=${this.test(currentCard.frontContent)}
              type=${mimeType}
            />
          </video>`;
        }
        if (type == "audio") {
          return html` <sl-icon
              name="soundwave"
              style="font-size: 200px;"
            ></sl-icon>
            <audio controls>
              <source src=${currentCard.frontContent} type=${mimeType} />
            </audio>`;
        }
        if (type == "iframe") {
          return html`<iframe
            src=${this.convertUrlLink(currentCard.frontContent)}
          ></iframe>`;
        }
      } else {
        return html`<h1>No content available</h1>`;
      }
    } else {
      return html`<h1>First create a deck</h1>`;
    }
  };

  renderBackContent = () => {
    const currentCard = this.getCurrentCard();

    this.requestUpdate();

    if (currentCard) {
      if (currentCard.backType === "text") {
        return html`<h1>${currentCard.backContent}</h1>`;
      } else if (currentCard.backType === "url") {
        const { type, mimeType } = this.getUrlType(currentCard.backContent);

        if (type == "image") {
          return html`<img
            type=${currentCard.backType}
            src=${this.test(currentCard.backContent)}
          />`;
        }
        if (type == "video") {
          return html`<video controls>
            <source
              src=${this.test(currentCard.backContent)}
              type=${mimeType}
            />
          </video>`;
        }
        if (type == "audio") {
          return html` <sl-icon
              name="soundwave"
              style="font-size: 200px;"
            ></sl-icon>
            <audio controls>
              <source src=${currentCard.backContent} type=${mimeType} />
            </audio>`;
        }
        if (type == "iframe") {
          return html`<iframe
            src=${this.convertUrlLink(currentCard.backContent)}
          ></iframe>`;
        }
      } else {
        return html`<h1>No content available</h1>`;
      }
    } else {
      return html`<h1>Then add flashcards to your deck</h1>`;
    }
  };

  slideLeft = () => {
    if (this.isReviewingDeck) {
      this.resetTimerForSlider();
      if (this.timerID) {
        clearTimeout(this.timerID);
      }
      if (this.enableTimer) {
        this.startCountdown();
      }
    }
    if (this.currentPosition !== 0) {
      this.currentPosition -= 1;
      this.requestUpdate();
    }
    // } else {
    //   this.currentPosition = this.selectedDeck?.cards?.length - 1;
    //   this.requestUpdate();
    // }
  };

  slideRight = () => {
    if (this.isReviewingDeck) {
      this.resetTimerForSlider();
      if (this.timerID) {
        clearTimeout(this.timerID);
      }

      if (this.enableTimer) {
        this.startCountdown();
      }

      if (this.currentPosition !== this.reviewList.length - 1) {
        this.currentPosition += 1;
        this.requestUpdate();
      } else {
        const container = this.renderRoot.querySelector(".finish-review");
        const alert = container.querySelector("sl-alert");
        alert.show();
        this.handleReviewDeckClick();
        this.reviewStarted = !this.reviewStarted;
        this.requestUpdate();
      }
    } else {
      if (this.currentPosition !== this.selectedDeck?.cards?.length - 1) {
        this.currentPosition += 1;
        this.requestUpdate();
      }
    }
    // if (!this.isShowingFront) {
    //   this.isShowingFront = !this.isShowingFront;
    //   const element = this.renderRoot.querySelector(".fc");
    //   element.classList.toggle("do_trick");
    // }

    // } else {
    //   this.currentPosition = 0;
    //   this.requestUpdate();
    // }
    // console.log(this.isShowingFront);
  };

  handleCheckboxAdd(event, index) {
    const isChecked = event.target.checked;
    this.cardList[index].checked = isChecked;
  }

  startCountdown() {
    if (this.timeLeft > 0) {
      this.timerID = setTimeout(() => this.startCountdown(), 1000);
      this.timeLeft--;
      this.requestUpdate();
    } else {
      this.flipCard();
    }
    if (!this.reviewStarted) {
      this.reviewList = this.getOverdueCards(this.selectedDeck?.cards);
    }
  }

  stopCountdown() {
    if (this.timerID) {
      clearTimeout(this.timerID);
      this.timerID = null;
    }
  }

  getOverdueCards(cardArray) {
    const currentDate = new Date();

    return cardArray.filter((card) => {
      const nextReviewDate = new Date(card.nextReview);
      return nextReviewDate < currentDate;
    });
  }

  handleReviewDeckClick() {
    if (!this.reviewStarted) {
      this.reviewList = this.getOverdueCards(this.selectedDeck?.cards);
    }
    if (this.reviewList.length !== 0) {
      if (this.enableTimer) {
        if (!this.isReviewingDeck) {
          this.timerID = setTimeout(() => this.startCountdown(), 500);
        } else {
          this.resetTimerForButton();
          if (this.timerID) {
            clearTimeout(this.timerID);
          }
        }
      }

      this.toggleReview();
    } else {
      const container = this.renderRoot.querySelector(".no-more-card");
      const alert = container.querySelector("sl-alert");
      alert.show();
    }
  }

  toggleReview() {
    this.currentPosition = 0;
    this.isReviewingDeck = !this.isReviewingDeck;
    const reviewButtons = this.renderRoot.querySelector(
      ".review-buttons-container"
    );
    const progressBar = this.renderRoot.querySelector("sl-progress-bar");
    const timer = this.renderRoot.querySelector(".timer-container");
    const progressCard = this.renderRoot.querySelector(
      ".card-position-progress"
    );

    reviewButtons.classList.toggle("review-visible");
    progressBar.classList.toggle("progress-visible");
    if (this.enableTimer) {
      timer.classList.toggle("timer-container-visible");
    }
    progressCard.classList.toggle("card-position-progress-visible");
  }

  padTimer(timer) {
    if (timer < 10) {
      return `0${timer}`;
    } else {
      return timer.toString();
    }
  }

  resetTimerForSlider() {
    this.timeLeft = this.timer + 1; //add 1 for slider appearance delay
    if (this.timerIcon == "play-circle") {
      this.timerIcon = "pause-circle";
    }
  }

  resetTimerForButton() {
    this.timeLeft = this.timer; // bug thua 1 giay doi voi switch, co the viet thanh class rieng de cho de quan ly instance
    if (this.timerIcon == "play-circle") {
      this.timerIcon = "pause-circle";
    }
  }

  handleColorChange(event) {
    const colorType = event.target.id;
    const newColor = event.target.value;

    this[colorType] = newColor;

    const existingSettingsJSON = localStorage.getItem("settings");
    const existingSettings = JSON.parse(existingSettingsJSON) || {};

    existingSettings[colorType] = newColor;

    localStorage.setItem("settings", JSON.stringify(existingSettings));
  }

  handleTimerSwitchChange(event) {
    this.enableTimer = event.target.checked;

    const existingSettingsJSON = localStorage.getItem("settings");
    const existingSettings = JSON.parse(existingSettingsJSON) || {};

    existingSettings["enableTimer"] = this.enableTimer;
    localStorage.setItem("settings", JSON.stringify(existingSettings));
  }

  handleFeedbackStyleChange(event) {
    this.feedbackStyle = event.target.value;

    const existingSettingsJSON = localStorage.getItem("settings");
    const existingSettings = JSON.parse(existingSettingsJSON) || {};

    existingSettings["feedbackStyle"] = this.feedbackStyle;
    localStorage.setItem("settings", JSON.stringify(existingSettings));
  }

  renderReviewButtons() {
    if (this.feedbackStyle === "emoji") {
      return html`
        <div class="review-buttons-container">
          <sl-icon-button
            name="emoji-dizzy-fill"
            @click=${() => this.handleReviewButtonClick(0)}
            >0</sl-icon-button
          >
          <sl-icon-button
            name="emoji-frown-fill"
            @click=${() => this.handleReviewButtonClick(1)}
            >1</sl-icon-button
          >
          <sl-icon-button
            name="emoji-neutral-fill"
            @click=${() => this.handleReviewButtonClick(2)}
            >2</sl-icon-button
          >
          <sl-icon-button
            name="emoji-smile-fill"
            @click=${() => this.handleReviewButtonClick(3)}
            >3</sl-icon-button
          >
          <sl-icon-button
            name="emoji-laughing-fill"
            @click=${() => this.handleReviewButtonClick(4)}
            >4</sl-icon-button
          >
          <sl-icon-button
            name="emoji-sunglasses-fill"
            @click=${() => this.handleReviewButtonClick(5)}
            >5</sl-icon-button
          >
        </div>
      `;
    } else if (this.feedbackStyle === "numeric") {
      return html`
        <div class="review-buttons-container">
          <sl-icon-button
            name="0-circle-fill"
            @click=${() => this.handleReviewButtonClick(0)}
            >0</sl-icon-button
          >
          <sl-icon-button
            name="1-circle-fill"
            @click=${() => this.handleReviewButtonClick(1)}
            >1</sl-icon-button
          >
          <sl-icon-button
            name="2-circle-fill"
            @click=${() => this.handleReviewButtonClick(2)}
            >2</sl-icon-button
          >
          <sl-icon-button
            name="3-circle-fill"
            @click=${() => this.handleReviewButtonClick(3)}
            >3</sl-icon-button
          >
          <sl-icon-button
            name="4-circle-fill"
            @click=${() => this.handleReviewButtonClick(4)}
            >4</sl-icon-button
          >
          <sl-icon-button
            name="5-circle-fill"
            @click=${() => this.handleReviewButtonClick(5)}
            >5</sl-icon-button
          >
        </div>
      `;
    }
  }

  handleTimerPlayPause() {
    if (this.timerIcon == "pause-circle") {
      this.timerIcon = "play-circle";
      this.stopCountdown();
    } else if (this.timerIcon == "play-circle") {
      this.timerIcon = "pause-circle";
      this.startCountdown();
    }
  }

  handleTimerInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.timer = parseInt(inputElement.value, 10);
    this.timeLeft = this.timer;

    const existingSettingsJSON = localStorage.getItem("settings");
    const existingSettings = JSON.parse(existingSettingsJSON) || {};

    existingSettings["timeDuration"] = this.timer;
    localStorage.setItem("settings", JSON.stringify(existingSettings));
  }

  render() {
    return html`
      <div class="page">
        <div class="display">
          <div class="progress">
            <sl-progress-bar value=${
              ((this.currentPosition + 1) / this.reviewList.length) * 100
            } style="--height: 1rem;">
            </sl-progress-bar>
            <div class="card-position-progress">${`${
              this.currentPosition + 1
            } / ${this.reviewList.length}`}</div>
          </div>

          <div class="timer-container">
            <sl-icon-button
              class="timer-play-icon"
              name=${this.timerIcon}
              style="font-size: 4rem;"
              @click=${this.handleTimerPlayPause}
            ></sl-icon-button>
            <div class="timer">00:${this.padTimer(this.timeLeft)}</div>
          </div>
          
          <div class="fc_container">
            <div class="slider">
              <sl-icon-button name="chevron-left" style="font-size: 4rem;" ?disabled=${
                this.currentPosition === 0
              } @click=${this.slideLeft}></sl-icon-button>
            </div>

            <div class="fc">
              <div class="fc_front">${this.renderFrontContent()}</div>

              <div class="fc_back">${this.renderBackContent()}</div>
            </div>

            <div class="slider">
              <sl-icon-button name="chevron-right" style="font-size: 4rem;" ?disabled=${
                this.currentPosition === this.selectedDeck?.cards?.length - 1 &&
                !this.isReviewingDeck
              }  @click=${this.slideRight}></sl-icon-button>
            </div>
          </div>

          <div class="flip_button">
            <sl-icon-button name="repeat" id="flip" style="font-size: 4rem;" @click=${
              this.flipCard
            }></sl-icon-button>
          </div>

          ${this.renderReviewButtons()}
        </div>

        <div class="panel">
          <sl-tab-group placement="end">

            <sl-tab slot="nav" panel="info"><sl-tooltip content="Information"><sl-icon name="info-circle-fill" class="tab-icon" style="font-size: 2rem;"></sl-tooltip></sl-icon></sl-tab>

            <sl-tab slot="nav" panel="deck"><sl-tooltip content="Deck"><sl-icon name="stack" class="tab-icon" style="font-size: 2rem;"></sl-tooltip></sl-icon></sl-tab>

            <sl-tab slot="nav" panel="card"><sl-tooltip content="Flashcard" disabled><sl-icon name="postcard-fill" class="tab-icon" style="font-size: 2rem;"></sl-tooltip></sl-icon></sl-tab>

            <sl-tab slot="nav" panel="settings"><sl-tooltip content="Settings"><sl-icon name="gear-fill" class="tab-icon" style="font-size: 2rem;"></sl-tooltip></sl-icon></sl-tab>

            <sl-tab slot="nav" panel="statistic"><sl-tooltip content="Statistic"><sl-icon name="bar-chart-line-fill" class="tab-icon" style="font-size: 2rem;"></sl-tooltip></sl-icon></sl-tab>

            <sl-tab-panel name="info">
              <h1>Flashcard Widget</h1>
              <sl-details>
                <h3 slot="summary">About</h3>
                This is a widget implemented for the <a href="https://webwriter.app/">WebWriter</a> project, allowing creation of 
                flashcards using text or other forms of multimedia like images, videos and sounds. There are two modes for this widget, 
                creation mode allow you to create decks and flashcards, and review mode allow you to review your card and learn them. 
                It is recommended that you review your deck of choice once per day for maximum effect. The widget is suitable for everyone 
                since it is also highly customizable through the setting tab
              </sl-details>
              <sl-details>
                <h3 slot="summary">How to use</h3>
                <ol>
                  <li>First, you need to create a deck with a deck name in the deck tab, then create your cards of choice using 
                  either text or other multimedia source url in the flashcard tab e.g. on a <a href="https://www.youtube.com/">YouTube</a> video 
                  click on share and copy paste the url link to the input field </li>
                  <li>When you want to review a deck, simply choose it first then enter the review mode by clicking the review button. During a review session, try to 
                  recall the information on the other side of the showing card. There is a timer to indicate how much time left before the card flips itself. Be honest 
                  with yourself and rate your performance with the face emotions or scores at the bottom, since this is very important to help the algorithm to determine 
                  your learning course. There are totally 6 levels of feedback score in terms of how well you perform: 
                    <ul>
                      <li><b>Score 0</b> - You do not remember everything at all about the card</li>
                      <li><b>Score 1</b> - Incorrect response, but the answer seems familiar when revealed</li>
                      <li><b>Score 2</b> - Incorrect response, but the answer seems easy to remember when revealed</li>
                      <li><b>Score 3</b> - Correct response, but significant effort was required</li>
                      <li><b>Score 4</b> - Correct response, but there was some</li>
                      <li><b>Score 5</b> - Correct response with perfect recall</li>
                    </ul>
                  </li>
                </ol>
              </sl-details>
              <sl-details>
                <h3 slot="summary">How the widget works</h3>
                The widget helps determine the right cards for you based on the spaced repetition algorithm SM-2. In order to maximize 
                knowledge retention through deck reviews, the algorithm calculate the interval between reviews for each card with respects to
                your performance in recalling the information. The result is that the better you can remember and recall a card correctly, 
                the less often you see that specific card and vice versa. This effect will determine the frequency of the card showing up and
                thus the effectiveness of your learning process
              </sl-details>
              <sl-details>
                <h3 slot="summary">Useful multimedia sources</h3>
                <sl-tree>
                  <sl-tree-item>
                    Image <sl-icon class="sub-icon" name="image"></sl-icon>
                    <sl-tree-item><a href="https://picsum.photos/images">Lorem Picsum</a></sl-tree-item>
                    <sl-tree-item><a href="https://postimages.org/">Postimage</a></sl-tree-item>
                    <sl-tree-item><a href="https://file-examples.com/index.php/sample-images-download/">FileExamples</a></sl-tree-item>
                  </sl-tree-item>
                  <sl-tree-item>
                    Video  <sl-icon class="sub-icon" name="film"></sl-icon>
                    <sl-tree-item><a href="https://www.youtube.com/">YouTube</a></sl-tree-item>
                    <sl-tree-item><a href="https://vimeo.com/">Vimeo</a></sl-tree-item>
                    <sl-tree-item><a href="https://file-examples.com/index.php/sample-video-files/">FileExamples</a></sl-tree-item>
                  </sl-tree-item>
                  <sl-tree-item>
                    Sound <sl-icon class="sub-icon" name="soundwave"></sl-icon>
                    <sl-tree-item><a href="https://vocaroo.com/?upload">Vocaroo</a></sl-tree-item>
                    <sl-tree-item><a href="https://developers.google.com/assistant/tools/sound-library">Google Sound Library</a></sl-tree-item>
                    <sl-tree-item><a href="https://file-examples.com/index.php/sample-audio-files/">FileExamples</a></sl-tree-item>
                  </sl-tree-item>
                </sl-tree>
              </sl-details>
            </sl-tab-panel>

            <sl-tab-panel name="deck">
              <sl-input
                type="text"
                placeholder="Enter a new deck name"
                pill
                ?disabled=${this.isReviewingDeck}
                .value=${this.deckName}
                @input=${(event: InputEvent) =>
                  (this.deckName = (event.target as HTMLInputElement).value)}
              ></sl-input>

              <sl-button class="new-deck-button" variant="primary"
                @click=${(event: MouseEvent) => {
                  event.stopPropagation();
                  this.createDeck(this.deckName);
                }}
                ?disabled=${!this.deckName}
              >
                Create new deck</sl-button
              >

              <sl-divider style="--width: 2px; --color: black;"></sl-divider>

              <h2>Available deck: </h2>
              <sl-select class="deck-select" placeholder="Select a deck"
                value=${this.selectedDeck?.name}
                pill
                @sl-change=${(e) => (this.selectedDeck = e.target.value)}
                ?disabled=${
                  this.deckCollection.length === 0 || this.isReviewingDeck
                }
              >
                ${this.deckCollection.map(
                  (deck) =>
                    html`<sl-option
                      value=${deck.name}
                      @click=${() => this.handleDeckSelect(deck)}
                      >${deck.name}</sl-option
                    >`
                )}
              </sl-select>
            </sl-tab-panel>

            <sl-tab-panel name="card">
              <h3 class="selected-deck">
                ${
                  this.selectedDeck
                    ? html`<sl-badge pill>Currently selected deck:</sl-badge>`
                    : html`<sl-tooltip content="Please select a deck first"
                        ><sl-badge pill pulse variant="danger"
                          >Currently selected deck:</sl-badge
                        ></sl-tooltip
                      >`
                }
                ${this.selectedDeck?.name}
              </h3>

              <div class="user_input">
                <h3>Front:</h3>
                <div class="input">
                  <sl-select
                    id="frontContentTypeSelect"
                    value="text"
                    @sl-change=${this.handleSelectTypeChange}
                    pill
                    ?disabled=${
                      this.isReviewingDeck || this.selectedDeck === null
                    }
                  >
                    <sl-option value="text">Text</sl-option>
                    <sl-option value="url">URL</sl-option>
                  </sl-select>

                  <sl-input
                    type="text"
                    .value=${this.frontContent}
                    @sl-input=${this.addFrontContent}
                    pill
                    ?disabled=${
                      this.isReviewingDeck || this.selectedDeck === null
                    }
                  ></sl-input>
                </div>

                <h3>Back:</h3>
                <div class="input">
                  <sl-select
                    id="backContentTypeSelect"
                    value="text"
                    @sl-change=${this.handleSelectTypeChange}
                    pill
                    ?disabled=${
                      this.isReviewingDeck || this.selectedDeck === null
                    }
                  >
                    <sl-option value="text">Text</sl-option>
                    <sl-option value="url">URL</sl-option>
                  </sl-select>

                  <sl-input
                    type="text"
                    .value=${this.backContent}
                    @sl-input=${this.addBackContent}
                    pill
                    ?disabled=${
                      this.isReviewingDeck || this.selectedDeck === null
                    }
                  ></sl-input>
                </div>
              </div>

              <sl-button class="new-card-button" variant="primary"
                @click=${() =>
                  this.handleAddCard(
                    this.frontContent,
                    this.backContent,
                    this.frontType,
                    this.backType,
                    0,
                    2.5,
                    0,
                    0,
                    new Date(),
                    new Date()
                  )}
                  ?disabled=${!this.frontContent || !this.backContent}
                >Create new card</sl-button
              >

              <sl-divider style="--width: 2px; --color: black;"></sl-divider>

              <div class="deck-cards">
                <sl-details ?disabled=${
                  this.isReviewingDeck || this.selectedDeck === null
                }>
                  <h3 slot="summary">Cards in current deck</h3>
                  <sl-tree>
                    ${this.selectedDeck?.cards?.map(
                      (card) => html`
                        <sl-tree-item>
                          <label>
                            <input
                              type="checkbox"
                              @change=${(event) =>
                                this.handleCheckboxChange(event, card)}
                            />
                            ${card.frontContent}
                          </label>
                        </sl-tree-item>
                      `
                    )}
                  </sl-tree>
                </sl-details> 
              </div>

              <sl-button class="delete-card-button" @click=${
                this.deleteSelectedCards
              } variant="primary" ?disabled=${
      this.isReviewingDeck || this.selectedDeck === null
    }
                >Delete Cards</sl-button
              >

              <sl-button id="test" class="review-deck-button" @click=${
                this.handleReviewDeckClick
              } variant=${
      this.isReviewingDeck ? "warning" : "success"
    } ?disabled=${this.selectedDeck === null}
                >${
                  this.isReviewingDeck
                    ? "Stop reviewing"
                    : "Review current deck"
                }</sl-button
              >

              <sl-divider style="--width: 2px; --color: black;"></sl-divider>

              <div class="all-cards">
                <sl-details ?disabled=${
                  this.isReviewingDeck || this.selectedDeck === null
                }>
                  <h3 slot="summary">Available cards</h3>
                  <sl-tree>
                  ${this.cardList.map(
                    (card, index) => html`
                      <sl-tree-item>
                        <label>
                          <input
                            type="checkbox"
                            @change=${(event) =>
                              this.handleCheckboxAdd(event, index)}
                          />
                          ${card.frontContent}
                        </label>
                      </sl-tree-item>
                    `
                  )}
                  <sl-tree>
                </sl-details>
              </div>

              <sl-button class="add-current-button" @click=${
                this.addCheckedCardsToDeck
              } variant="primary" ?disabled=${
      this.isReviewingDeck || this.selectedDeck === null
    }
                >Add to current deck</sl-button
              >

              <div class="no-more-card">
                <sl-alert variant="primary" duration="3000" closable>
                  <sl-icon slot="icon" name="info-circle"></sl-icon>
                    You have finished your review session today. Come back later for more cards to review
                </sl-alert>
              </div>

              <div class="finish-review">
                <sl-alert variant="success" duration="3000" closable>
                  <sl-icon slot="icon" name="check2-circle"></sl-icon>
                    Review session finished 
                </sl-alert>
              </div>
            </sl-tab-panel>

            <sl-tab-panel name="settings">
                <sl-details ?disabled=${this.isReviewingDeck}>
                  <h3 slot="summary">Front card</h3>
                  <div class="color-picker">
                    <h3>Text</h3>
                    <sl-color-picker id="frontTextColor" value="${
                      this.frontTextColor
                    }" @sl-change=${
      this.handleColorChange
    } opacity label="Select a color"></sl-color-picker>
                    <h3>Background</h3>
                    <sl-color-picker id="frontColor" value="${
                      this.frontColor
                    }" @sl-change=${
      this.handleColorChange
    } opacity label="Select a color"></sl-color-picker>
                    <h3>Border</h3>
                    <sl-color-picker id="frontBorderColor" value="${
                      this.frontBorderColor
                    }" @sl-change=${
      this.handleColorChange
    } opacity label="Select a color"></sl-color-picker>
                  </div>
                </sl-details>
              
                <sl-details ?disabled=${this.isReviewingDeck}>
                  <h3 slot="summary">Back card</h3>
                  <div class="color-picker">
                    <h3>Text</h3>
                    <sl-color-picker id="backTextColor" 
                    value="${this.backTextColor}" @sl-change=${
      this.handleColorChange
    } opacity label="Select a color"></sl-color-picker>
                    <h3>Background</h3>
                    <sl-color-picker id="backColor" 
                    value="${this.backColor}" @sl-change=${
      this.handleColorChange
    } opacity label="Select a color"></sl-color-picker>
                    <h3>Border</h3>
                    <sl-color-picker id="backBorderColor" 
                    value="${this.backBorderColor}" @sl-change=${
      this.handleColorChange
    } opacity label="Select a color"></sl-color-picker>
                  </div>
                </sl-details>

              <sl-divider style="--width: 2px; --color: black;"></sl-divider>

              <div class="enable-timer">
                <div class="enable-timer-item">
                  <h3>Timer </h3>
                    <sl-switch ?disabled=${this.isReviewingDeck} ?checked="${
      this.enableTimer
    }" size="medium" @sl-change="${this.handleTimerSwitchChange}">
                    </sl-switch>
                </div>

                <div class="enable-timer-item">
                  <h3>Timer duration</h3>
                  <sl-input class="timer-input"
                      ?disabled=${this.isReviewingDeck}
                      type="number"
                      max="30"
                      min="5"
                      pill
                      .value=${this.timer}
                      @sl-change=${(event) => this.handleTimerInput(event)}
                  ></sl-input>
                </div>
              </div>

              <sl-divider style="--width: 2px; --color: black;"></sl-divider>

              <div class="review-type">
                <h3>Feedback label </h3>
                <sl-radio-group
                  size="medium"
                  value=${this.feedbackStyle}
                  @sl-change=${this.handleFeedbackStyleChange}
                >
                  <sl-radio-button pill value="emoji" ?disabled=${
                    this.isReviewingDeck
                  } >Emoji Style</sl-radio-button>
                  <sl-radio-button pill value="numeric" ?disabled=${
                    this.isReviewingDeck
                  } >Numeric Style</sl-radio-button>
                </sl-radio-group>
              </div>
            </sl-tab-panel>

            <sl-tab-panel name="statistic">
            </sl-tab-panel>
          </sl-tab-group>
        </div>
      </sl-split-panel>
    `;
  }
}
