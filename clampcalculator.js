document.addEventListener('DOMContentLoaded', function() {
  const breakpointInput = document.getElementById('breakpoint');
  const maxValueInput = document.getElementById('max-value');
  const unitSelect = document.getElementById('unit');
  const resetButton = document.getElementById('reset-max-value');
  const calculateButton = document.getElementById('calculate');
  const outputDiv = document.getElementById('output');
  const copyButton = document.getElementById('copy-result');
  const resultWrapper = document.getElementById('result-wrapper');
  const fauxSelect = document.getElementById('breakpoint__list');
  const fauxSelectTrigger = document.querySelector('.faux__select__trigger');
  const fauxSelectList = document.querySelector('.faux__select__list');
  const fauxSelectPlaceholder = document.querySelector('.faux__select__item__placeholder');
  const addButton = document.querySelector('.btn_small');
  const breakpointNameInput = document.getElementById('breakpoint__name');
  const breakpointValueInput = document.getElementById('breakpoint__value');

  // Toggle the faux select dropdown
  fauxSelectTrigger.addEventListener('click', function() {
    fauxSelect.classList.toggle('faux__select__open');
  });

  // Breakpoint presets from localStorage
  function loadBreakpoints() {

      let breakpoints = JSON.parse(localStorage.getItem('breakpoint_presets')) || [];

      // ✅ Clear the existing list to prevent duplicates
      fauxSelectList.innerHTML = '';

      if (breakpoints.length === 0) {
          fauxSelectPlaceholder.classList.remove('is__hidden');
          fauxSelectList.appendChild(fauxSelectPlaceholder);
          fauxSelectTrigger.textContent = 'None'; // Reset button text when no presets exist
      } else {
          fauxSelectPlaceholder.classList.add('is__hidden');

          breakpoints.forEach(({ name, breakpoint }) => {

              const li = document.createElement('li');
              li.className = 'faux__select__item';
              li.dataset.breakpoint = breakpoint;

              // Add a span for text separation
              li.innerHTML = `<span class="preset__name">${name} - ${breakpoint}px</span>
                              <button class="faux__select__item__remove">Remove</button>`;

              // ✅ Click event to select a preset
              li.querySelector('.preset__name').addEventListener('click', function() {
                  selectPreset(name, breakpoint);
              });

              // ✅ Click event to remove a preset
              li.querySelector('.faux__select__item__remove').addEventListener('click', function(event) {
                  event.stopPropagation(); // Prevent triggering preset selection
                  removeBreakpoint(breakpoint);
              });

              fauxSelectList.appendChild(li);
          });

          // ✅ If a preset is already selected, keep it selected
          let currentBreakpoint = parseInt(localStorage.getItem('breakpoint'), 10);
          let activePreset = breakpoints.find(b => b.breakpoint === currentBreakpoint);

          if (activePreset) {
              fauxSelectTrigger.textContent = activePreset.name;
          } else {
              fauxSelectTrigger.textContent = 'None'; // Reset if no match
          }
      }

  }

  // Select a preset and update things such as localStorage + input field + button text
  function selectPreset(name, breakpoint) {
      localStorage.setItem('breakpoint', breakpoint);
      breakpointInput.value = breakpoint;
      fauxSelectTrigger.textContent = name; // ✅ Update button text
      fauxSelectTrigger.setAttribute("aria-label", `Selected preset: ${name}`); // ✅ Accessibility fix
      fauxSelect.classList.remove('faux__select__open');
      calculateOutput();
  }

  // Check if the input field matches the value from any preset, else reset button
  function validateSelectedPreset() {
      let breakpoints = JSON.parse(localStorage.getItem('breakpoint_presets')) || [];
      let currentValue = parseInt(breakpointInput.value, 10);

      let matchedPreset = breakpoints.find(b => b.breakpoint === currentValue);

      if (matchedPreset) {
          fauxSelectTrigger.textContent = matchedPreset.name; // Set button text if matched
      } else {
          fauxSelectTrigger.textContent = 'None'; // Reset if no match
      }
  }

  // Save breakpoint preset, set it as current
  function saveBreakpoint() {

      if (!breakpointNameInput || !breakpointValueInput) {
          console.error("🚨 ERROR: Inputs not found in DOM!");
          return;
      }

      const name = breakpointNameInput.value.trim();
      const breakpoint = parseInt(breakpointValueInput.value.trim(), 10);

      if (!name || isNaN(breakpoint)) {
          console.warn("⚠️ Warning: Invalid input - Name or Breakpoint missing");
          return;
      }

      let breakpoints = JSON.parse(localStorage.getItem('breakpoint_presets')) || [];
      breakpoints.push({ name, breakpoint });
      localStorage.setItem('breakpoint_presets', JSON.stringify(breakpoints));

      // ✅ Update button text and input field
      fauxSelectTrigger.textContent = name;
      fauxSelectTrigger.setAttribute("aria-label", `Selected preset: ${name}`);

      breakpointInput.value = breakpoint;
      localStorage.setItem('breakpoint', breakpoint);

      // ✅ Reload list of presets
      loadBreakpoints();

  }

  // Remove breakpoint storage, update UI
  function removeBreakpoint(value) {
      let breakpoints = JSON.parse(localStorage.getItem('breakpoint_presets')) || [];
      breakpoints = breakpoints.filter(b => b.breakpoint !== value);

      localStorage.setItem('breakpoint_presets', JSON.stringify(breakpoints));
      loadBreakpoints(); // Reload the list and button text
  }

  // Event listener: adding a new breakpoint
  addButton.addEventListener('click', function() {
      saveBreakpoint();
  });

  // Load breakpoints on page load
  loadBreakpoints();

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
      console.error('Could not copy: ', err);
    });
  });

  // Listen for manual changes to input field and validate
  breakpointInput.addEventListener('input', function() {
      localStorage.setItem('breakpoint', breakpointInput.value);
      validateSelectedPreset();
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
