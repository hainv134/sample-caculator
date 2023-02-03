const resultPanel = document.querySelector("#math-result");
let panelValue = parseFloat("0");
let resultValue = parseFloat("0");
let operationSelected = false;
let operator = "";

let firstTime = true;
let isCal = false;

function bootstrap() {
  const mathOperation = document.querySelectorAll(".math-operation");
  const numMath = document.querySelectorAll(".number");

  // Add eventListener
  mathOperation.forEach((element) => {
    element.addEventListener("click", (e) =>
      mathOperatorHandler(e.target.innerText)
    );
  });

  numMath.forEach((element) => {
    element.addEventListener("click", (e) =>
      numMathHandler(e.target.innerText)
    );
  });
  // Add event listener on keydown
  document.addEventListener(
    "keydown",
    (event) => {
      var name = event.key;
      console.log(name);
      if (["Enter", "Backspace"].includes(name)) {
        mathOperatorHandler(name);
      } else if (name.match(/[\w]{2,}/)) return null;

      if (name.match(/^[\d\.]$/)) {
        numMathHandler(name);
      } else if (name.match(/^[+\-*/%Cc\s]$/)) {
        mathOperatorHandler(name);
      }
    },
    false
  );
}

function numMathHandler(value) {
  if (value == ",") {
    value = ".";
    if (resultPanel.innerText.includes(".") || !resultPanel.innerText.length) {
      return;
    }
  } else if (resultPanel.innerText == "0") {
    resultPanel.innerText = "";
  }

  if (operationSelected) {
    if (firstTime) {
      // Store preVale of panel
      if (!!resultPanel.innerText)
        resultValue = parseFloat(resultPanel.innerText);
      else resultValue = 0;
      firstTime = false;
      isCal = true;
    }

    // Reset panel after operator selected
    if (value == ".") {
      resultPanel.innerText = "0.";
    } else {
      resultPanel.innerText = value;
    }
    operationSelected = false;
  } else if (resultPanel.innerHTML.length <= 11) {
    resultPanel.innerText = resultPanel.innerText + value;
  }

  if (!isCal && !firstTime) {
    isCal = true;
  }

  panelValue = parseFloat(resultPanel.innerText);

  if (operator == "=") {
    resultValue = panelValue;
  }
}

function mathOperatorHandler(clickedOperator) {
  if (clickedOperator.includes("Enter")) {
    clickedOperator = "=";
  }
  if ("Cc".includes(clickedOperator)) {
    resultPanel.innerText = "0";
    operationSelected = false;
    firstTime = true;
    isCal = false;
    operator = "";
    return;
  } else {
    operationSelected = true;
  }
  if (clickedOperator == "+/-" && resultPanel.innerText != "0") {
    if (resultPanel.innerText.includes("-")) {
      resultPanel.innerText = resultPanel.innerText.replace("-", "");
    } else {
      resultPanel.innerText = "-" + resultPanel.innerText;
    }
    resultValue = -resultValue;
    return;
  }
  if (clickedOperator == "%" && operator == "=") {
    resultValue = resultValue / 100;
    resultPanel.innerText = resultValue;
    operator = "=";
    return;
  }

  if (clickedOperator == "Backspace" || clickedOperator == " ") {
    if (resultPanel.innerText == "Math Error") resultPanel.innerText = "0";

    resultPanel.innerText = resultPanel.innerText.slice(0, -1);

    if (resultPanel.innerText.length == 0 || resultPanel.innerText == "-") {
      resultPanel.innerText = "0";
    }
    if (resultPanel.innerHTML.endsWith(".")) {
      resultPanel.innerText = resultPanel.innerText.slice(0, -1);
    }
    return;
  }

  if (isCal && !firstTime) {
    // Caculate
    switch (operator) {
      case "+":
        resultValue += panelValue;
        break;
      case "-":
        resultValue -= panelValue;
        break;
      case "×":
      case "*":
        resultValue *= panelValue;
        break;
      case "÷":
      case "/":
        if (panelValue == 0) {
          resultPanel.innerText = "Math Error";
          firstTime = true;
          isCal = false;
          operator = "=";
          return;
        } else {
          resultValue /= panelValue;
        }
        break;
      default:
        console.log("switch in default case");
        break;
    }
    resultPanel.innerText = resultValue;
    // Reset calucate if operator still pressed
    isCal = false;
  }

  // Reset calulator if = operator is pressed
  if (clickedOperator == "=") {
    firstTime = true;
    isCal = false;
  }

  operator = clickedOperator;
}

bootstrap();
