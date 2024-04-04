document.addEventListener("DOMContentLoaded", function () {
  // Get the select element
  const estimateSelector = document.getElementById("numbers");

  // Add blur event listener for estimate selector
  estimateSelector.addEventListener("change", () => {
    const options = estimateSelector.options;
    // Generate a random index
    const randomIndex = Math.floor(Math.random() * options.length);
    // Set the selected index to the random index
    estimateSelector.selectedIndex = randomIndex;
  });

  const guessSelector = document.getElementById("guess");

  guessSelector.addEventListener("change", () => {
    checkGuess();
  });
});

function generateFraction(containerId) {
  const container = document.getElementById(containerId);
  const numerator = Math.floor(Math.random() * 100_000_000) + 1; // Random numerator between 1 and 10
  const denominator = Math.floor(Math.random() * 100_000_000) + 1; // Random denominator between 1 and 10
  const fractionHtml = `<div class="numerator">${numerator}</div>
                        <div class="separator"></div>
                        <div class="denominator">${denominator}</div>`;
  container.innerHTML = fractionHtml;
}

function correct(element) {
  element.classList.add("correct");
  element.classList.remove("incorrect");
}

function incorrect(element) {
  element.classList.add("incorrect");
  element.classList.remove("correct");
}

function checkGuess() {
  const guessSelect = document.getElementById("guess");
  const selectedOption = guessSelect.value;
  const resultElement = document.getElementById("result");
  const fraction1 = document.getElementById("fraction1");
  const fraction2 = document.getElementById("fraction2");

  const separator1 = document.querySelector("#fraction1 .separator");
  const separator2 = document.querySelector("#fraction2 .separator");

  const fraction1Value =
    parseFloat(document.querySelector("#fraction1 .numerator").textContent) /
    parseFloat(document.querySelector("#fraction1 .denominator").textContent);
  const fraction2Value =
    parseFloat(document.querySelector("#fraction2 .numerator").textContent) /
    parseFloat(document.querySelector("#fraction2 .denominator").textContent);

  let isCorrect = false;

  if (fraction1Value > fraction2Value && selectedOption === ">") {
    // resultElement.textContent = "Correct! Fraction 1 is higher.";
    isCorrect = true;
  } else if (fraction1Value < fraction2Value && selectedOption === "<") {
    // resultElement.textContent = "Correct! Fraction 2 is higher.";
    isCorrect = true;
  } else if (fraction1Value === fraction2Value && selectedOption === "=") {
    // resultElement.textContent = "Correct! Both fractions are equal.";
    isCorrect = true;
  } else {
    // resultElement.textContent = "Incorrect. Try again!";
  }

  // Generate new fractions for the next round
  if (!isCorrect) {
    incorrect(guessSelect);
    incorrect(fraction1);
    incorrect(separator1);
    incorrect(fraction2);
    incorrect(separator2);
    guessSelect.removeAttribute("valid");
    generateFraction("fraction1");
    generateFraction("fraction2");

    guessSelect.selectedIndex = 0;
  } else {
    correct(guessSelect);
    correct(fraction1);
    correct(separator1);
    correct(fraction2);
    correct(separator2);
    guessSelect.setAttribute("valid", "");
  }
}

// Initial generation of fractions
generateFraction("fraction1");
generateFraction("fraction2");
