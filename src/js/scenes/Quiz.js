import { Colors } from "../consts/Colors.js";
import AbstractScene from "./AbstractScene.js";
import quizQuestions from "../data/QuizQuestions.js";
import { Sizes } from "../consts/Sizes.js";
import { Fonts } from "../consts/Fonts.js";
import ButtonRounded from "../prefabs/ButtonRounded.js";

export default class Quiz extends AbstractScene {
  constructor() {
    super({ key: "Quiz" });
  }

  init(data) {
    this._init(data);
  }

  preload() {
    this._preload();
    this.currentQuestionIndex = 0;
    this.questionText = null;
    this.answerText = null;
    this.answerBackground = null;
    this.answersOptions = [];
    this.answersOptionsText = [];
    this.submitButton = null;
  }

  update() {
    super.update();
  }

  create() {
    this.cameras.main.setBackgroundColor(Colors.Elmt.PaleWhite);
    console.log("Quiz Scene Created");
    console.log("Quiz Questions:", quizQuestions);
    this.showQuestions(quizQuestions[this.currentQuestionIndex]);
  }

  showQuestions(question) {
    // Create question text and answer options
    this.questionText = this.add.text(100, 100, question.question, {
      fontFamily: Fonts.Text.h3,
      fontSize: Sizes.Text.h3,
      fill: Colors.Text.Black,
    });

    question.answers.forEach((answer, answerIndex) => {
      // Use RexPlugins for a rounded rectangle background
      this.answerBackground = this.add
        .rexRoundRectangle(
          this.width - 300,
          100 + answerIndex * 100,
          250,
          50,
          16, // corner radius
          Colors.Elmt.White
        )
        .setOrigin(0, 0);
      this.answersOptions.push(this.answerBackground);
      this.answerText = this.add.text(
        this.width - 300 + 10,
        100 + answerIndex * 100,
        answer.text,
        {
          fontFamily: Fonts.Text.h3,
          fontSize: Sizes.Text.h3,
          fill: Colors.Text.Gray,
        }
      );
      this.answersOptionsText.push(this.answerText);
      // Center the answer text vertically within the rectangle
      const rectY = 100 + answerIndex * 100;
      const rectHeight = 50;
      const textHeight = this.answerText.height;
      this.answerText.y = rectY + (rectHeight - textHeight) / 2;
    });

    // Add validation button
    this.submitButton = this.add
      .existing(
        new ButtonRounded(
          this,
          this.width - 400,
          this.cameras.main.height - 500,
          86 * 2,
          32 * 2,
          "Submit",
          Colors.Text.DarkBlue,
          Colors.Elmt.White,
          false,
          Colors.Text.White,
          false,
          false,
          "arrow-right",
          null
        )
      )
      .setAlpha(0);

    // Add click event to the answer options
    this.answersOptions.forEach((option, index) => {
      option.setInteractive({ cursor: "pointer" }).on("pointerdown", () => {
        option.setFillStyle(Colors.Elmt.Black, 1);
        this.answersOptionsText[index].setColor(Colors.Text.White);

        this.tweens.add({
          targets: this.submitButton,
          alpha: 1,
          duration: 300,
          ease: "Power2",
        });

        this.answersOptions.forEach((opt, i) => {
          if (i !== index) {
            opt.setFillStyle(Colors.Elmt.White); // reset all backgrounds
            this.answersOptionsText[i].setColor(Colors.Text.Gray); // reset all texts
          }
        });
      });
    });

    this.submitButton.on("pointerdown", () => {
      this.answersOptions.forEach((option) => {
        option.disableInteractive();
      });
      const selectedOptionIndex = this.answersOptions.findIndex(
        (option) => option.fillColor === Colors.Elmt.Black
      );
      if (selectedOptionIndex !== -1) {
        const selectedAnswer = question.answers[selectedOptionIndex];
        this.answersOptions[selectedOptionIndex].setFillStyle(
          Colors.Elmt.White,
          1
        );
        this.answersOptionsText[selectedOptionIndex].setColor(Colors.Text.Gray);
        this.submitButton.setAlpha(0); // hide the submit button after click

        this.handleAnswerClick(selectedAnswer);
      } else {
        console.log("Please select an answer before submitting.");
      }
    });
  }

  handleAnswerClick(answer) {
    if (answer.isCorrect) {
      console.log("Correct answer!");
    } else {
      console.log("Incorrect answer. Try again.");
      // Optionally, you can provide feedback for incorrect answers
    }

    // Add validation button
    this.continueButton = this.add
      .existing(
        new ButtonRounded(
          this,
          this.width - 400,
          this.cameras.main.height - 500,
          86 * 2,
          32 * 2,
          "Continue",
          Colors.Text.DarkBlue,
          Colors.Elmt.White,
          false,
          Colors.Text.White,
          false,
          false,
          "arrow-right",
          null
        )
      )
      .setAlpha(0);

    this.answersOptions.forEach((option, index) => {
      const isCorrect =
        quizQuestions[this.currentQuestionIndex].answers[index].isCorrect;
      if (isCorrect) {
        option.setStrokeStyle(4, Colors.Elmt.Green); // green outline for correct answer
        option.setFillStyle(Colors.Elmt.White, 1);
        this.answersOptionsText[index].setColor(Colors.Text.Gray);
      } else {
        if (!answer.isCorrect) {
          option.setStrokeStyle(4, Colors.Elmt.Red);
        }
      }
    });

    this.tweens.add({
      targets: this.continueButton,
      alpha: 1,
      delay: 500,
      duration: 1000,
      ease: "Power2",
    });

    this.continueButton.on("pointerdown", () => {
      this.currentQuestionIndex++;
      if (this.currentQuestionIndex < quizQuestions.length) {
        this.clearPreviousQuestion();
        this.showQuestions(quizQuestions[this.currentQuestionIndex]);
      } else {
        console.log("Quiz completed!");
      }
    });
  }

  clearPreviousQuestion() {
    if (this.questionText) {
      this.questionText.destroy();
      this.questionText = null;
    }
    if (this.answersOptions) {
      this.answersOptions.forEach((option) => option.destroy());
      this.answersOptions = [];
    }
    if (this.answersOptionsText) {
      this.answersOptionsText.forEach((text) => text.destroy());
      this.answersOptionsText = [];
    }
  }
}
