// ERROR FUNCTIONS
function showError(input, error, msgError, show = true) {
  if (show) {
    error.innerText = msgError;
    input.style.borderColor = "#ff0000";
  } else {
    error.innerText = msgError;
    input.style.borderColor = "hsl(270, 3%, 87%)";
  }
}

//Fill validation
function fillValidation(input, error) {
  if (input.value.length > 0) {
    showError(input, error, "", false);
    return true;
  } else {
    showError(input, error, "Can't be blank");
    return false;
  }
}

// FUNCTION LETTERS
function lettersValidation(input, error) {
  let regExp = /[A-z]/g;
  if (regExp.test(input.value)) {
    showError(input, error, "Wrong format, numers only");
  } else {
    showError(input, error, "", false);
  }
}

// CARDHOLDER NAME
let nameCard = document.querySelector(".cardFront__details_name");
let nameInput = document.querySelector("#cardHolder");
let nameError = document.querySelector(".form__Cardholder--error");

nameInput.addEventListener("input", () => {
  if (nameInput.value == "") {
    nameCard.innerText = "JANE APPLESEED";
  } else {
    nameCard.innerText = nameInput.value;
  }
});

//CARDHOLDER NUMBER
let numberCard = document.querySelector(".cardFront__number");
let numberInput = document.querySelector("#cardNumber");
let numberError = document.querySelector(".form__CardNumber--error");

numberInput.addEventListener("input", () => {
  let inputValue = event.target.value;

  numberCard.innerText = numberInput.value;
  if (numberInput.value == "") {
    numberCard.innerText = "000 000 000 000";
  } else {
    numberCard.innerText = numberInput.value;
  }

  let regExp = /[A-z]/g;
  if (regExp.test(numberInput.value)) {
    showError(numberInput, numberError, "Wrong format, numers only");
  } else {
    numberInput.value = inputValue
      .replace(/\s/g, "")
      .replace(/([0-9]{4})/g, "$1 ")
      .trim();
    showError(numberInput, numberError, "", false);
  }
});

// MM
let monthCard = document.querySelector(".detailsDate__month");
let monthInput = document.querySelector("#cardMonth");
let monthError = document.querySelector(".formInput__mm--error");

monthInput.addEventListener("input", () => {
  if (monthInput.value > 0 && monthInput.value <= 12) {
    monthCard.innerText = monthInput.value;
    showError(monthInput, monthError, "", false);
  } else {
    showError(monthInput, monthError, "Wrong data");
  }
  lettersValidation(monthInput, monthError);
});

//YY
let yearCard = document.querySelector(".detailsDate__year");
let yearInput = document.querySelector("#cardYear");
let yearError = document.querySelector(".formInput__yy--error");

yearInput.addEventListener("input", () => {
  if (yearInput.value > 22 && yearInput.value <= 27) {
    yearCard.innerText = yearInput.value;
    showError(yearInput, yearError, "", false);
  } else {
    showError(yearInput, yearError, "Wrong data");
  }
  lettersValidation(yearInput, yearError);
});

//  CVC
let cvcCard = document.querySelector(".cardBack__Cvc");
let cvcInput = document.querySelector("#cardCvc");
let cvcError = document.querySelector(".formInput__cvc--error");

cvcInput.addEventListener("input", () => {
  if (cvcInput.value.length == 3) {
    cvcCard.innerText = cvcInput.value;
    showError(cvcInput, cvcError, "", false);
  } else {
    showError(cvcInput, cvcError, "Wrong CVC");
  }
  lettersValidation(cvcInput, cvcError);
});

// BTN CONFIRM
let confirmBtn = document.querySelector(".form__submit");

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

// SECTIONS
let sectionForm = document.querySelector(".form");
let sectionThanks = document.querySelector(".thanksSection");

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  // name
  if (fillValidation(nameInput, nameError)) {
    nameValidation = true;
  } else {
    nameValidation = false;
  }
  //numberCard
  if (fillValidation(numberInput, numberError) == true) {
    if (numberInput.value.length == 19) {
      showError(numberInput, numberError, "", false);
      numberValidation = true;
    } else {
      showError(numberInput, numberError, "Wrong number");
      numberValidation = false;
    }
  }
  //  month
  if (fillValidation(monthInput, monthError)) {
    if (monthInput.value > 0 && monthInput.value <= 12) {
      monthCard.innerText = monthInput.value;
      showError(monthInput, monthError, "", false);
      monthValidation = true;
    } else {
      showError(monthInput, monthError, "Wrong month");
      monthValidation = false;
    }
  }
  // year
  if (fillValidation(yearInput, yearError)) {
    if (yearInput.value > 22 && yearInput.value <= 27) {
      yearCard.innerText = yearInput.value;
      showError(yearInput, yearError, "", false);
      yearValidation = true;
    } else {
      showError(yearInput, yearError, "Wrong year");
      yearValidation = false;
    }
  }
  // cvc
  if (fillValidation(cvcInput, cvcError)) {
    if (cvcInput.value.length == 3) {
      cvcCard.innerText = cvcInput.value;
      showError(cvcInput, cvcError, "", false);
      cvcValidation = true;
    } else {
      showError(cvcInput, cvcError, "Wrong CVC");
      cvcValidation = false;
    }
  }
  if (
    nameValidation == true &&
    numberValidation == true &&
    monthValidation == true &&
    yearValidation == true &&
    cvcValidation == true
  ) {
    sectionForm.style.display = "none";
    sectionThanks.style.display = "flex";
  }
});
