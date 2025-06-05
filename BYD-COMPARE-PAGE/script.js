function updateCarSpecs(selectedOption, groupNumber) {
    if (!selectedOption || !groupNumber) return;
    console.log(selectedOption, groupNumber, "checking");
    // Get all data attributes from the selected option using dataset
    const specs = {
      modelName: selectedOption.dataset.modelName,
      imageSrc: selectedOption.dataset.image,
      price: selectedOption.dataset.price,
      brochureUrl: selectedOption.dataset.brochureUrl,
      overallLength: selectedOption.dataset.overallLength,
      overallWidth: selectedOption.dataset.overallWidth,
      overallHeight: selectedOption.dataset.overallHeight,
      wheelbase: selectedOption.dataset.wheelbase,
      groundClearance: selectedOption.dataset.groundClearance,
      luggageCapacity: selectedOption.dataset.luggageCapacity,
      towingCapacity: selectedOption.dataset.towingCapacity,
      turningRadius: selectedOption.dataset.turningRadius,
      curbWeight: selectedOption.dataset.curbWeight,
      wadingDepth: selectedOption.dataset.wadingDepth,
      seatingCapacity: selectedOption.dataset.seatingCapacity,
      technology: selectedOption.dataset.technology,
      drivetrain: selectedOption.dataset.drivetrain,
      frontMotorType: selectedOption.dataset.frontMotorType,
      rearMotorType: selectedOption.dataset.rearMotorType,
      rearMotorPower: selectedOption.dataset.rearMotorPower,
      onboardCharger: selectedOption.dataset.onboardCharger,
      frontMotorPower: selectedOption.dataset.frontMotorPower,
      frontMotorTorque: selectedOption.dataset.frontMotorTorque,
      rearMotorTorque: selectedOption.dataset.rearMotorTorque,
      enginePower: selectedOption.dataset.enginePower,
      engineTorque: selectedOption.dataset.engineTorque,
      combinedMotorPower: selectedOption.dataset.combinedMotorPower,
      combinedMotorTorque: selectedOption.dataset.combinedMotorTorque,
      acceleration: selectedOption.dataset.acceleration,
      evRange: selectedOption.dataset.evRange,
      combinedRange: selectedOption.dataset.combinedRange,
      batteryType: selectedOption.dataset.batteryType,
      batteryCapacity: selectedOption.dataset.batteryCapacity,
      frontSuspension: selectedOption.dataset.frontSuspension,
      rearSuspension: selectedOption.dataset.rearSuspension,
      frontBrake: selectedOption.dataset.frontBrake,
      rearBrake: selectedOption.dataset.rearBrake,
      wheelType: selectedOption.dataset.wheelType,
      tireSize: selectedOption.dataset.tireSize,
    };
  
    // Update car model and price first
    const modelElement = document.getElementById(`car-model-${groupNumber}`);
    const priceElement = document.getElementById(`car-price-${groupNumber}`);
  
    if (modelElement) modelElement.textContent = specs.modelName || "-";
    if (priceElement) priceElement.textContent = specs.price || "-";
  
    // Update car image
    const carImage = document.getElementById(`car-image-source-${groupNumber}`);
    if (carImage && specs.imageSrc) {
      carImage.src = specs.imageSrc;
    }
  
    // Update brochure url
    const brochureLink = document.getElementById(
      `download-brochure-${groupNumber}`
    );
    if (brochureLink && specs.brochureUrl) {
      brochureLink.href = specs.brochureUrl;
      brochureLink.setAttribute("download", "");
    }
  
    // Update all other specification elements
    const elements = {
      overallLength: document.getElementById(`overall-length-${groupNumber}`),
      overallWidth: document.getElementById(`overall-width-${groupNumber}`),
      overallHeight: document.getElementById(`overall-height-${groupNumber}`),
      wheelbase: document.getElementById(`wheelbase-${groupNumber}`),
      groundClearance: document.getElementById(`ground-clearance-${groupNumber}`),
      luggageCapacity: document.getElementById(`luggage-capacity-${groupNumber}`),
      towingCapacity: document.getElementById(`towing-capacity-${groupNumber}`),
      turningRadius: document.getElementById(`turning-radius-${groupNumber}`),
      curbWeight: document.getElementById(`curb-weight-${groupNumber}`),
      wadingDepth: document.getElementById(`wading-depth-${groupNumber}`),
      seatingCapacity: document.getElementById(`seating-capacity-${groupNumber}`),
      technology: document.getElementById(`technology-${groupNumber}`),
      drivetrain: document.getElementById(`drivetrain-${groupNumber}`),
      frontMotorType: document.getElementById(`front-motor-type-${groupNumber}`),
      rearMotorType: document.getElementById(`rear-motor-type-${groupNumber}`),
      onboardCharger: document.getElementById(`onboard-charger-${groupNumber}`),
      frontMotorPower: document.getElementById(
        `front-motor-power-${groupNumber}`
      ),
      rearMotorPower: document.getElementById(`rear-motor-power-${groupNumber}`),
      frontMotorTorque: document.getElementById(
        `front-motor-torque-${groupNumber}`
      ),
      rearMotorTorque: document.getElementById(
        `rear-motor-torque-${groupNumber}`
      ),
      enginePower: document.getElementById(`engine-power-${groupNumber}`),
      engineTorque: document.getElementById(`engine-torque-${groupNumber}`),
      combinedMotorPower: document.getElementById(
        `combined-motor-power-${groupNumber}`
      ),
      combinedMotorTorque: document.getElementById(
        `combined-motor-torque-${groupNumber}`
      ),
      acceleration: document.getElementById(`acceleration-${groupNumber}`),
      evRange: document.getElementById(`ev-range-${groupNumber}`),
      combinedRange: document.getElementById(`combined-range-${groupNumber}`),
      batteryType: document.getElementById(`battery-type-${groupNumber}`),
      batteryCapacity: document.getElementById(`battery-capacity-${groupNumber}`),
      frontSuspension: document.getElementById(`front-suspension-${groupNumber}`),
      rearSuspension: document.getElementById(`rear-suspension-${groupNumber}`),
      frontBrake: document.getElementById(`front-brake-${groupNumber}`),
      rearBrake: document.getElementById(`rear-brake-${groupNumber}`),
      wheelType: document.getElementById(`wheel-type-${groupNumber}`),
      tireSize: document.getElementById(`tire-size-${groupNumber}`),
    };
  
    // Update each element with corresponding spec value
    Object.entries(elements).forEach(([key, element]) => {
      if (element) {
        const value = specs[key];
        element.textContent = value || "-";
      }
    });
  }
  
  // Track selected models
  const selectedModels = new Set();
  
  // Function to update dropdown options
  function updateDropdownOptions() {
    const selectElements = document.querySelectorAll(".comparison-select-input");
  
    selectElements.forEach((select) => {
      Array.from(select.options).forEach((option) => {
        const model = option.getAttribute("data-model-name");
        option.disabled = selectedModels.has(model) && option.selected === false;
      });
    });
  }
  
  // Add event listener when DOM is loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Get all select elements
    const selectElements = document.querySelectorAll(".comparison-select-input");
  
    // Add event listeners to each select element
    selectElements.forEach((select, index) => {
      const groupNumber = index + 1; // Group numbers start from 1
      select.addEventListener("change", function () {
        const selectedOption = this.options[this.selectedIndex];
        const previousModel = this.getAttribute("data-previous-model");
  
        // Remove previous model if it exists
        if (previousModel) {
          selectedModels.delete(previousModel);
        }
  
        // Add new model to selected set
        const newModel = selectedOption.getAttribute("data-model-name");
        if (newModel) {
          selectedModels.add(newModel);
          this.setAttribute("data-previous-model", newModel);
        }
  
        updateCarSpecs(selectedOption, groupNumber);
        updateDropdownOptions();
      });
    });
  
    // Automatically select cars for all dropdowns
    if (selectElements.length > 0) {
      // Select first car in first dropdown
      const firstSelect = selectElements[0];
      if (firstSelect.options.length > 0) {
        firstSelect.selectedIndex = 1; // First car
        firstSelect.dispatchEvent(new Event("change"));
      }
  
      // Small delay to ensure first selection is processed
      setTimeout(() => {
        // Select second car in second dropdown
        if (selectElements.length > 1) {
          const secondSelect = selectElements[1];
          if (secondSelect.options.length > 0) {
            secondSelect.selectedIndex = 2; // Second car
            secondSelect.dispatchEvent(new Event("change"));
          }
        }
  
        // Small delay for second selection
        setTimeout(() => {
          // Select third car in third dropdown
          if (selectElements.length > 2) {
            const thirdSelect = selectElements[2];
            if (thirdSelect.options.length > 0) {
              thirdSelect.selectedIndex = 3; // Third car
              thirdSelect.dispatchEvent(new Event("change"));
            }
          }
        }, 100);
      }, 100);
    }
  });
  