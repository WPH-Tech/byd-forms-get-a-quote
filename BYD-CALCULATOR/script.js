document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  const carSelect = document.querySelector(".select-car-models");
  const calculateBtn = document.getElementById("calculate-btn");
  const vehicleTypeSelect = document.querySelector(".selected-vehicle-type");
  const dmiRadios = document.querySelectorAll('input[name="Driving-Pattern"]');

  // Set default values for input fields
  setDefaultValues();

  if (carSelect) {
    carSelect.addEventListener("change", updateCarSpecs);
    updateCarSpecs();
  }

  if (calculateBtn) {
    calculateBtn.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent form submission
      calculateCosts();
    });
  }

  if (vehicleTypeSelect) {
    vehicleTypeSelect.addEventListener("change", handleVehicleTypeChange);
  }

  dmiRadios.forEach((radio) => {
    radio.addEventListener("change", handleDmiRadioChange);
  });

  // Add input cleanup for numeric fields
  setupNumericInputs();
}

function setDefaultValues() {
  const defaults = {
    average_ice_weekday_km: "28",
    ice_weekend_km: "10",
    ice_fuel_cost: "60",
    ice_fuel_efficiency: "9.5",
  };

  Object.entries(defaults).forEach(([id, value]) => {
    const input = document.getElementById(id);
    if (input && !input.value) {
      input.value = value;
    }
  });
}

function setupNumericInputs() {
  const numericInputs = [
    "average_ice_weekday_km",
    "ice_weekend_km",
    "ice_fuel_cost",
    "ice_fuel_efficiency",
  ];

  numericInputs.forEach((id) => {
    const input = document.getElementById(id);
    if (input) {
      // Add input validation
      input.addEventListener("input", validateNumericInput);

      // Clean up value on blur
      input.addEventListener("blur", function () {
        const value = parseFloat(this.value);
        if (!isNaN(value)) {
          // Format number with up to 2 decimal places
          this.value = value.toFixed(value % 1 === 0 ? 0 : 2);
        }
      });
    }
  });
}

function validateNumericInput(event) {
  const input = event.target;
  const value = input.value;

  // Allow only numbers and decimal point
  if (!/^\d*\.?\d*$/.test(value)) {
    input.value = value.replace(/[^\d.]/g, "");
  }

  // Prevent multiple decimal points
  if ((value.match(/\./g) || []).length > 1) {
    input.value = value.replace(/\.+$/, "");
  }

  // Limit to 2 decimal places
  const parts = value.split(".");
  if (parts[1] && parts[1].length > 2) {
    input.value = `${parts[0]}.${parts[1].slice(0, 2)}`;
  }
}

function handleVehicleTypeChange() {
  const carSelect = document.querySelector(".select-car-models");
  const selectedType = this.value;

  Array.from(carSelect.options).forEach((option) => {
    option.style.display =
      selectedType && option.getAttribute("data-car-type") !== selectedType
        ? "none"
        : "block";
  });

  const visibleOptions = Array.from(carSelect.options).filter(
    (option) => option.style.display !== "none"
  );
  if (visibleOptions.length > 0) {
    carSelect.selectedIndex = Array.from(carSelect.options).indexOf(
      visibleOptions[0]
    );
    carSelect.dispatchEvent(new Event("change"));
  }
}

function handleDmiRadioChange() {
  const selectedCar = getSelectedCarData();
  if (
    selectedCar &&
    (selectedCar.type.includes("DM-i") || selectedCar.type.includes("DMO"))
  ) {
    calculateCosts();
  }
}

function getSelectedCarData() {
  const selectedOption = document.querySelector(
    ".select-car-models option:checked"
  );
  if (!selectedOption) return null;

  return {
    name: selectedOption.textContent,
    type: selectedOption.getAttribute("data-car-type"),
    batteryCapacity:
      parseFloat(selectedOption.getAttribute("data-battery-capacity")) || 0,
    electricRange:
      parseFloat(selectedOption.getAttribute("data-electric-range")) || 0,
    combinedRange:
      parseFloat(selectedOption.getAttribute("data-combined-range")) || null,
    fuelTankCapacity:
      parseFloat(selectedOption.getAttribute("data-fuel-tank-capacity")) ||
      null,
    fuelCost: parseFloat(selectedOption.getAttribute("data-fuel-cost")) || 60.0,
    electricityCost:
      parseFloat(selectedOption.getAttribute("data-electricity-cost")) || 13.0,
    fuelEfficiency:
      parseFloat(selectedOption.getAttribute("data-dm-i-fuel-efficiency")) ||
      4.55,
    imageSrc: selectedOption.getAttribute("data-image-src") || "",
  };
}

function updateCarSpecs() {
  const car = getSelectedCarData();
  if (!car) return;

  // Clear previous calculation results
  const elementsToReset = [
    "ice_monthly_distance",
    "ice_annual_distance",
    "ice_monthly_fuel_cost",
    "ice_annual_fuel_cost",
    "dmi-cost-monthly",
    "dmi-cost-annually",
    "total-saved-in-month",
    "total-saved-in-annual",
    "total-save-by-percent-monthly",
    "total-save-by-percent-annual",
  ];

  elementsToReset.forEach((id) => updateElementText(id, "0"));

  // Update car thumbnail image
  const carThumbnail = document.getElementById("car-thumbnail");
  if (carThumbnail && car.imageSrc) {
    carThumbnail.src = car.imageSrc;
  }

  updateElementText("car-name", car.name);
  updateElementText("car-type", car.type);
  updateElementText("battery-capacity", `${car.batteryCapacity} kWh`);
  updateElementText("electric-range", `${car.electricRange} km`);
  updateElementText(
    "fuel-tank-capacity",
    car.fuelTankCapacity ? `${car.fuelTankCapacity} Liters` : "N/A"
  );

  // Hide fuel-tank-capacity-wrapper if value is N/A or null
  const fuelTankWrapper = document.getElementById("fuel-tank-capacity-wrapper");
  if (fuelTankWrapper) {
    fuelTankWrapper.style.display = car.fuelTankCapacity ? "block" : "none";
  }

  // Update DM-i/DM-o labels
  const dmiOne = document.getElementById("dmi-one");
  const dmiTwoElements = document.querySelectorAll("#dmi-two");

  if (dmiOne) {
    if (car.type.includes("DM-i")) {
      dmiOne.textContent = "DM-i";
    } else if (car.type.includes("DMO")) {
      dmiOne.textContent = "DMO";
    } else if (car.type === "Full-Electric") {
      dmiOne.textContent = "Electric";
    }
  }

  // Update all dmi-two elements
  dmiTwoElements.forEach((element) => {
    if (car.type.includes("DM-i")) {
      element.textContent = "DM-i Cost";
    } else if (car.type.includes("DMO")) {
      element.textContent = "DMO Cost";
    } else if (car.type === "Full-Electric") {
      element.textContent = "Electric Cost";
    }
  });

  const iceFuelCostInput = document.getElementById("ice_fuel_cost");
  if (iceFuelCostInput) {
    iceFuelCostInput.value = `${car.fuelCost || "N/A"} per Liter`;
  }

  const dmiSection = document.getElementById("dmi-mode-section");
  if (dmiSection) {
    dmiSection.style.display =
      car.type.includes("DM-i") || car.type.includes("DMO") ? "block" : "none";
  }
}

function calculateCosts() {
  const car = getSelectedCarData();
  if (!car) {
    alert("Please select a car model");
    return;
  }

  // Validate input values
  const weekdayKm = parseFloat(
    document.getElementById("average_ice_weekday_km")?.value
  );
  const weekendKm = parseFloat(
    document.getElementById("ice_weekend_km")?.value
  );
  const fuelCost = parseFloat(document.getElementById("ice_fuel_cost")?.value);
  const fuelEfficiency = parseFloat(
    document.getElementById("ice_fuel_efficiency")?.value
  );

  if (
    isNaN(weekdayKm) ||
    isNaN(weekendKm) ||
    isNaN(fuelCost) ||
    isNaN(fuelEfficiency)
  ) {
    alert("Please fill in all required fields with valid numbers");
    return;
  }

  if (weekdayKm < 0 || weekendKm < 0 || fuelCost < 0 || fuelEfficiency < 0) {
    alert("Please enter positive values for all fields");
    return;
  }

  const { monthlyDistance, annualDistance } = calculateDistances();
  const { monthlyBydCost, annualBydCost } = calculateBydCosts(
    car,
    annualDistance
  );

  updateDisplayValues({
    monthlyDistance,
    annualDistance,
    monthlyBydCost,
    annualBydCost,
  });
}

function calculateDistances() {
  const weekdayKm =
    parseFloat(document.getElementById("average_ice_weekday_km").value) || 0;
  const weekendKm =
    parseFloat(document.getElementById("ice_weekend_km").value) || 0;

  const monthlyDistance = weekdayKm * 5 * 4 + weekendKm * 2 * 4;
  const annualDistance = monthlyDistance * 12;

  return { monthlyDistance, annualDistance };
}

function calculateBydCosts(car, annualDistance) {
  if (car.type === "Full-Electric") {
    return calculateEvCosts(car, annualDistance);
  } else if (car.type.includes("DM-i")) {
    return calculateDmiCosts(car, annualDistance);
  } else if (car.type.includes("DMO")) {
    return calculateDmoCosts(car, annualDistance);
  } else {
    // For other vehicle types (like DM-O), return zero costs for now
    return { monthlyBydCost: 0, annualBydCost: 0 };
  }
}

function calculateEvCosts(car, annualDistance) {
  // Calculate consumption in kWh per 100km
  const evConsumption = (car.batteryCapacity / car.electricRange) * 100;

  // Calculate annual electricity consumption in kWh
  const annualKwh = (annualDistance / 100) * evConsumption;

  // Calculate annual cost
  const annualBydCost = annualKwh * car.electricityCost;
  const monthlyBydCost = annualBydCost / 12;

  return { monthlyBydCost, annualBydCost };
}

function calculateDmiCosts(car, annualDistance) {
  const selectedMode = document.querySelector(
    'input[name="Driving-Pattern"]:checked'
  );
  const dmiMode = selectedMode ? getDmiModeValue(selectedMode.value) : 1;

  // Calculate electric and hybrid portions of total distance
  const evDistance = dmiMode === 1 ? annualDistance : annualDistance * dmiMode;
  const hybridDistance = dmiMode === 1 ? 0 : annualDistance * (1 - dmiMode);

  // Calculate EV portion costs
  const evConsumption = (car.batteryCapacity / car.electricRange) * 100; // kWh per 100km
  const annualEvKwh = (evDistance / 100) * evConsumption;
  const evPortionCost = annualEvKwh * car.electricityCost;

  // Calculate hybrid portion costs using the vehicle's DM-i fuel efficiency
  const fuelEfficiency = car.fuelEfficiency || 4.55; // Default DM-i fuel efficiency if not specified
  const hybridPortionCost =
    (hybridDistance / 100) * fuelEfficiency * car.fuelCost;

  // Calculate total costs
  const annualBydCost = evPortionCost + hybridPortionCost;
  const monthlyBydCost = annualBydCost / 12;

  return { monthlyBydCost, annualBydCost };
}
function calculateDmoCosts(car, annualDistance) {
  const selectedMode = document.querySelector(
    'input[name="Driving-Pattern"]:checked'
  );
  const dmoMode = selectedMode ? getDmiModeValue(selectedMode.value) : 1;

  // Calculate electric and hybrid portions of total distance based on selected mode
  const evDistance = annualDistance * dmoMode;
  const hybridDistance = annualDistance * (1 - dmoMode);

  // Calculate EV portion costs
  const evConsumption = (car.batteryCapacity / car.electricRange) * 100; // kWh per 100km
  const annualEvKwh = (evDistance / 100) * evConsumption;
  const evPortionCost = annualEvKwh * car.electricityCost;

  // Calculate hybrid portion costs
  const defaultDmoFuelEfficiency = 7.0; // L/100km for DM-O vehicles
  const fuelEfficiency = car.fuelEfficiency || defaultDmoFuelEfficiency;
  const hybridPortionCost =
    (hybridDistance / 100) * fuelEfficiency * car.fuelCost;

  // Calculate total costs
  const annualBydCost = evPortionCost + hybridPortionCost;
  const monthlyBydCost = annualBydCost / 12;

  return { monthlyBydCost, annualBydCost };
}
function getDmiModeValue(mode) {
  if (mode.includes("100%")) return 1;
  if (mode.includes("70%")) return 0.7;
  return 0.5; // Default to 50% if not specified
}

function updateDisplayValues(results) {
  const { monthlyDistance, annualDistance, monthlyBydCost, annualBydCost } =
    results;

  // Update distance values
  updateElementText(
    "ice_monthly_distance",
    `${formatNumber(monthlyDistance, 1)} km`
  );
  updateElementText(
    "ice_annual_distance",
    `${formatNumber(annualDistance, 1)} km`
  );

  // Get ICE vehicle costs
  const iceFuelCost =
    parseFloat(document.getElementById("ice_fuel_cost")?.value) || 60;
  const iceFuelEfficiency =
    parseFloat(document.getElementById("ice_fuel_efficiency")?.value) || 9.5;

  // Calculate ICE costs
  const iceMonthlyFuelCost =
    (monthlyDistance / 100) * iceFuelEfficiency * iceFuelCost;
  const iceAnnualFuelCost =
    (annualDistance / 100) * iceFuelEfficiency * iceFuelCost;

  // Update ICE costs with PHP symbol
  updateElementText(
    "ice_monthly_fuel_cost",
    `₱${formatNumber(iceMonthlyFuelCost, 2)}`
  );
  updateElementText(
    "ice_annual_fuel_cost",
    `₱${formatNumber(iceAnnualFuelCost, 2)}`
  );

  // Update BYD costs with PHP symbol
  updateElementText("dmi-cost-monthly", `₱${formatNumber(monthlyBydCost, 2)}`);
  updateElementText("dmi-cost-annually", `₱${formatNumber(annualBydCost, 2)}`);

  // Calculate savings
  const monthlySavings = iceMonthlyFuelCost - monthlyBydCost;
  const annualSavings = iceAnnualFuelCost - annualBydCost;

  // Calculate savings percentages
  const monthlySavingsPercentage =
    ((iceMonthlyFuelCost - monthlyBydCost) / iceMonthlyFuelCost) * 100;
  const annualSavingsPercentage =
    ((iceAnnualFuelCost - annualBydCost) / iceAnnualFuelCost) * 100;

  // Update savings amounts with PHP symbol
  updateElementText(
    "total-saved-in-month",
    `₱${formatNumber(monthlySavings, 2)}`
  );
  updateElementText(
    "total-saved-in-annual",
    `₱${formatNumber(annualSavings, 2)}`
  );

  // Update savings percentages
  updateElementText(
    "total-save-by-percent-monthly",
    `${formatNumber(monthlySavingsPercentage, 0)}%`
  );
  updateElementText(
    "total-save-by-percent-annual",
    `${formatNumber(annualSavingsPercentage, 0)}%`
  );
}

function formatNumber(number, decimals = 2) {
  return new Intl.NumberFormat("en-PH", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number);
}

function animateNumber(
  element,
  start,
  end,
  duration = 1000,
  prefix = "",
  suffix = ""
) {
  const startTime = performance.now();
  const decimals = String(end).split(".")[1]?.length || 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function for smooth animation
    const easeOutQuad = 1 - Math.pow(1 - progress, 2);

    const current = start + (end - start) * easeOutQuad;
    element.textContent = `${prefix}${formatNumber(
      current,
      decimals
    )}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function updateElementText(elementId, text) {
  const element = document.getElementById(elementId);
  if (!element) return;

  // List of IDs that should not be animated
  const noAnimationIds = [
    "car-name",
    "car-type",
    "dmi-one",
    "dmi-two",
    "battery-capacity",
    "electric-range",
    "fuel-tank-capacity",
  ];

  // If the element ID is in the no-animation list, update directly
  if (noAnimationIds.includes(elementId)) {
    element.textContent = text;
    return;
  }

  // Check if the text represents a number (with or without currency symbol)
  const numericValue = parseFloat(text.replace(/[^0-9.-]+/g, ""));

  if (!isNaN(numericValue)) {
    const prefix = text.startsWith("₱") ? "₱" : "";
    const suffix = text.endsWith("%") ? "%" : text.endsWith("km") ? " km" : "";

    // Get the current value if it exists, otherwise start from 0
    const currentValue = parseFloat(
      element.textContent?.replace(/[^0-9.-]+/g, "") || "0"
    );

    // Animate from current value to new value
    animateNumber(element, currentValue, numericValue, 1000, prefix, suffix);
  } else {
    // For non-numeric text, update directly
    element.textContent = text;
  }
}
