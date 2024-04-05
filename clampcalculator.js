document.addEventListener('DOMContentLoaded', function() {
  const breakpointInput = document.getElementById('breakpoint');
  const maxValueInput = document.getElementById('max-value');
  const unitSelect = document.getElementById('unit');
  const resetButton = document.getElementById('reset-max-value');
  const calculateButton = document.getElementById('calculate');
  const outputDiv = document.getElementById('output');
  const copyButton = document.getElementById('copy-result');
  const resultWrapper = document.getElementById('result-wrapper');

  // get local storage
  if(localStorage.getItem('breakpoint')) {
      breakpointInput.value = localStorage.getItem('breakpoint');
  }
  if(localStorage.getItem('unit')) {
      unitSelect.value = localStorage.getItem('unit');
  }

  // output
  function calculateOutput() {
    let breakpoint = parseFloat(breakpointInput.value);
    let maxValue = parseFloat(maxValueInput.value);
    let unit = unitSelect.value;

    let result = 0;
    if (unit === 'rem') {
        result = (maxValue / breakpoint) * 10 * 100;
    } else {
        result = (maxValue / breakpoint) * 100;
    }

    // check if number
    if (!isNaN(result)) {
        resultWrapper.classList.add('has-result');
        outputDiv.textContent = `Result: ${result.toFixed(2)}vw`;
        copyButton.style.display = 'inline'; // Show the button
    } else {
        resultWrapper.classList.remove('has-result');
        outputDiv.textContent = 'No result';
        copyButton.style.display = 'none'; // Hide the button
    }
  }

  // copy the value
  copyButton.addEventListener('click', function() {
    const resultText = outputDiv.textContent.replace('Result: ', '');
    navigator.clipboard.writeText(resultText).then(function() {
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  });

  // set local storage
  breakpointInput.addEventListener('input', function() {
      localStorage.setItem('breakpoint', breakpointInput.value);
      calculateOutput();
  });
  unitSelect.addEventListener('change', function() {
      localStorage.setItem('unit', unitSelect.value);
      calculateOutput();
  });

  maxValueInput.addEventListener('input', calculateOutput);
  calculateButton.addEventListener('click', calculateOutput);

  resetButton.addEventListener('click', function() {
      maxValueInput.value = '';
      outputDiv.textContent = '';
      maxValueInput.focus();
  });
});

// readmore
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.readmore__switch').forEach(function(element) {
      if (!element.hasAttribute('tabindex')) {
          element.setAttribute('tabindex', '0');
      }

      element.addEventListener('click', function() {
          toggleReadmore(this);
      });

      element.addEventListener('keydown', function(event) {
          // Check if Enter key is pressed
          if (event.key === 'Enter' || event.keyCode === 13) {
              toggleReadmore(this);
          }
      });
  });

  function toggleReadmore(element) {
      var closestParent = element.closest('.readmore');
      if (closestParent) {
          closestParent.classList.toggle('readmore__open');
      }
  }
});


