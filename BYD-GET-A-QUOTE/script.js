document.addEventListener("DOMContentLoaded", () => {
    console.log("Form script loaded");
    let currentStep = 0;
    const form = document.getElementById("wf-form-Get-a-quote");
    const regionSelect = document.getElementById("Select-a-region");
    const dealershipSelect = document.getElementById("Dealership-2");
    const preferredDealerTextInput =
      document.getElementById("Preferred-Dealer-2");
    const nextButtons = document.querySelectorAll('[data-form="next-btn"]');
    const formSteps = document.querySelectorAll(".form-outer");
    const submitButton = form.querySelector('input[type="submit"]');
    const errorForNameAndLastname = document.getElementById("error-for-fullname");
    const errorForEmail = document.getElementById("error-for-email");
    const errorForEmailTwo = document.getElementById("error-for-email-two");
    const errorForPhone = document.getElementById("error-for-mobile-number");
    const errorForModelInterest = document.getElementById(
      "error-for-model-of-interests"
    );
    const errorForPreferredDealer = document.getElementById(
      "error-for-preferred-dealer"
    );
    const errorForPlanningToChoose = document.getElementById(
      "error-for-planning-to-choose"
    );
    const mobileNumberInput = document.getElementById("Mobile-Number");
    const dealershipInput = document.querySelector(
      '[fs-combobox-element="text-input"]'
    );
    const firstNameInput = document.getElementById("First-name");
    const lastNameInput = document.getElementById("Last-name");
    const emailInput = document.getElementById("Email");
    const confirmEmailInput = document.getElementById("Confirm-Email");
  
    console.log("Form initialized. Starting at step:", currentStep);
  
    // ADD NAME AND LAST NAME VALIDATION
    // First Name Validation - No special characters, no dashes, 30 char limit
    if (firstNameInput) {
      firstNameInput.addEventListener("input", (e) => {
        // Get the current value and cursor position
        let value = e.target.value;
        const cursorPosition = e.target.selectionStart;
  
        // Replace any characters that aren't letters, spaces, or apostrophes (removed dashes)
        const sanitizedValue = value.replace(/[^a-zA-Z\s']/g, "");
  
        // Enforce maximum length (30 characters)
        const truncatedValue = sanitizedValue.substring(0, 30);
  
        // Only update if value changed
        if (value !== truncatedValue) {
          e.target.value = truncatedValue;
  
          // Adjust cursor position if characters were removed
          const newPosition =
            cursorPosition - (value.length - truncatedValue.length);
          e.target.setSelectionRange(newPosition, newPosition);
        }
      });
    }
  
    // Last Name Validation - No special characters, no dashes, 30 char limit
    if (lastNameInput) {
      lastNameInput.addEventListener("input", (e) => {
        // Get the current value and cursor position
        let value = e.target.value;
        const cursorPosition = e.target.selectionStart;
  
        // Replace any characters that aren't letters, spaces, or apostrophes (removed dashes)
        const sanitizedValue = value.replace(/[^a-zA-Z\s']/g, "");
  
        // Enforce maximum length (30 characters)
        const truncatedValue = sanitizedValue.substring(0, 30);
  
        // Only update if value changed
        if (value !== truncatedValue) {
          e.target.value = truncatedValue;
  
          // Adjust cursor position if characters were removed
          const newPosition =
            cursorPosition - (value.length - truncatedValue.length);
          e.target.setSelectionRange(newPosition, newPosition);
        }
      });
    }
  
    // Add email input sanitization to prevent consecutive dashes and limit @ symbols
    if (emailInput) {
      emailInput.addEventListener("input", (e) => {
        // Get current value
        let value = e.target.value;
        const cursorPosition = e.target.selectionStart;
  
        // Remove multiple @ symbols (keep only the first one)
        if ((value.match(/@/g) || []).length > 1) {
          // Find position of the first @
          const firstAtPos = value.indexOf("@");
          // Get the part before the first @ and everything after, but remove other @ symbols
          const beforeAt = value.substring(0, firstAtPos + 1);
          const afterAt = value.substring(firstAtPos + 1).replace(/@/g, "");
          value = beforeAt + afterAt;
        }
  
        // Replace consecutive dashes with a single dash
        const noConsecutiveDashes = value.replace(/--+/g, "-");
  
        // Only update if value changed
        if (value !== noConsecutiveDashes) {
          e.target.value = noConsecutiveDashes;
  
          // Adjust cursor position
          const newPosition =
            cursorPosition - (value.length - noConsecutiveDashes.length);
          e.target.setSelectionRange(newPosition, newPosition);
        }
      });
    }
  
    // Do the same for confirm email input
    if (confirmEmailInput) {
      confirmEmailInput.addEventListener("input", (e) => {
        // Get current value
        let value = e.target.value;
        const cursorPosition = e.target.selectionStart;
  
        // Remove multiple @ symbols (keep only the first one)
        if ((value.match(/@/g) || []).length > 1) {
          // Find position of the first @
          const firstAtPos = value.indexOf("@");
          // Get the part before the first @ and everything after, but remove other @ symbols
          const beforeAt = value.substring(0, firstAtPos + 1);
          const afterAt = value.substring(firstAtPos + 1).replace(/@/g, "");
          value = beforeAt + afterAt;
        }
  
        // Replace consecutive dashes with a single dash
        const noConsecutiveDashes = value.replace(/--+/g, "-");
  
        // Only update if value changed
        if (value !== noConsecutiveDashes) {
          e.target.value = noConsecutiveDashes;
  
          // Adjust cursor position
          const newPosition =
            cursorPosition - (value.length - noConsecutiveDashes.length);
          e.target.setSelectionRange(newPosition, newPosition);
        }
      });
    }
  
    // Prevent Enter key submission specifically in the dealer combobox text input
    if (preferredDealerTextInput) {
      preferredDealerTextInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          console.log("Enter key pressed in dealer input.");
          event.preventDefault(); // Prevent default behavior (like form submission)
          event.stopPropagation(); // Stop the event from bubbling up
          // Optionally trigger validation or blur to potentially select the highlighted item
          preferredDealerTextInput.blur(); // Blurring might help Finsweet finalize selection
          setTimeout(validateCurrentStep, 50); // Re-run validation shortly after to catch state change
          return false;
        }
      });
    }
  
    // Define dealer mappings by region
    const dealersByRegion = {
      "Metro Manila/NCR": [
        "BYD Quezon Avenue",
        "BYD Mandaluyong",
        "BYD Glorietta",
        "BYD Fairview",
        "BYD Commonwealth",
        "BYD Chinatown",
        "BYD Balintawak",
        "BYD Makati",
        "BYD Alabang",
        "BYD Global City",
        "BYD Manila Bay",
      ],
      Luzon: [
        "BYD Sta. Rosa",
        "BYD Pampanga",
        "BYD Lipa",
        "BYD Dagupan",
        "BYD Clark",
        "BYD Camarines Sur",
        "BYD Cabanatuan",
        "BYD La Union",
      ],
      Visayas: [
        "BYD Mandaue, Cebu",
        "BYD Negros",
        "BYD Iloilo",
        "BYD Ayala Center Cebu",
      ],
      Mindanao: ["BYD Gensan", "BYD Davao", "BYD Cagayan de Oro"],
    };
  
    // Store all original dealer options
    // const allDealerOptions = Array.from(dealershipSelect.options).slice(1);
  
    // Function to filter dealers based on selected region
    function filterDealers(selectedRegion) {
      console.log("Filtering dealers for region:", selectedRegion);
  
      if (!selectedRegion) {
        console.log("No region selected, returning early");
        return;
      }
  
      // Get dealers for selected region
      const regionDealers = dealersByRegion[selectedRegion];
  
      // Clear the existing select element options (keep only first placeholder)
      while (dealershipSelect.options.length > 1) {
        dealershipSelect.remove(1);
      }
  
      // Add filtered dealers to the select element
      regionDealers.forEach((dealerName) => {
        const option = document.createElement("option");
        option.value = dealerName;
        option.text = dealerName;
        dealershipSelect.appendChild(option);
      });
  
      // Get Finsweet combobox elements
      const fsDropdownToggle = document.querySelector(
        ".fs-combobox_dropdown-toggle"
      );
      const fsInput = document.querySelector(
        '[fs-combobox-element="text-input"]'
      );
  
      // Enable the dropdown if it was disabled
      if (fsDropdownToggle && fsDropdownToggle.hasAttribute("disabled")) {
        fsDropdownToggle.removeAttribute("disabled");
      }
  
      // Reset the input
      if (fsInput) {
        fsInput.value = "";
        fsInput.disabled = false;
        fsInput.classList.remove("error"); // Also remove error class on region change
      }
  
      // Let Finsweet handle the rest of the dropdown display
      // The key is to only modify the select element and not touch the visual dropdown elements
    }
  
    // Event listener for region change
    regionSelect.addEventListener("change", (e) => {
      console.log("Region changed to:", e.target.value);
  
      // Reset dealership selection
      dealershipSelect.value = "";
      const fsInput = document.querySelector(
        '[fs-combobox-element="text-input"]'
      );
      if (fsInput) {
        fsInput.value = "";
        fsInput.classList.remove("error"); // Also remove error class on region change
      }
  
      // Filter dealers
      filterDealers(e.target.value);
      updateComboboxOptionsVisibility(e.target.value);
  
      // Trigger validation
      validateCurrentStep();
    });
  
    // Add input event listeners for real-time validation
    function setupInputValidation() {
      const currentStepEl = formSteps[currentStep];
      const inputs = currentStepEl.querySelectorAll(
        "input:not([type=hidden]), select"
      ); // Exclude hidden inputs
      // console.log("Setting up validation for inputs:", inputs.length);
  
      inputs.forEach((input) => {
        // console.log("Adding validation for input:", input.id);
        const validateAndLog = () => {
          // console.log("Input/Change/Blur on:", input.id, "Value:", input.value);
          validateCurrentStep();
        };
  
        // Use 'input' for immediate feedback on text fields
        if (input.tagName === "INPUT" && input.type !== "checkbox") {
          input.addEventListener("input", validateAndLog);
        }
  
        // Use 'change' for selects and checkboxes
        if (input.tagName === "SELECT" || input.type === "checkbox") {
          input.addEventListener("change", validateAndLog);
        }
  
        // Additionally, for the dealer text input, validate on 'blur' to catch final state
        if (input.id === "Preferred-Dealer-2") {
          input.addEventListener("blur", validateAndLog);
        }
      });
    }
  
    // Prevent form submission on enter key (global listener, except for specific inputs handled separately)
    form.addEventListener("keypress", function (event) {
      // Prevent submit if Enter is pressed *unless* it's the dealer text input (handled separately)
      // or the final submit button itself.
      if (
        event.key === "Enter" &&
        event.target.id !== "Preferred-Dealer-2" &&
        event.target.type !== "submit"
      ) {
        event.preventDefault();
        // If it's the last step and valid, allow the click on the 'next' (which is actually submit) button
        if (currentStep === formSteps.length - 1 && validateFinalStep()) {
          // Find the submit button in the last step and click it programmatically
          const finalSubmitButton = formSteps[currentStep].querySelector(
            'input[type="submit"]'
          );
          if (finalSubmitButton && !finalSubmitButton.disabled) {
            finalSubmitButton.click();
          }
        }
        // If it's not the last step, trigger the next button if valid
        else if (currentStep < formSteps.length - 1) {
          const nextButton = formSteps[currentStep].querySelector(
            '[data-form="next-btn"]'
          );
          if (nextButton && !nextButton.classList.contains("disabled")) {
            nextButton.click();
          }
        }
        return false;
      }
    });
  
    // Handle next button clicks
    nextButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        if (validateCurrentStep()) {
          currentStep++;
          // console.log("Moving to next step:", currentStep);
          updateFormSteps();
          setupInputValidation(); // Setup validation for new step
        }
      });
    });
  
    function validateCurrentStep() {
      const currentStepEl = formSteps[currentStep];
      const requiredFields = currentStepEl.querySelectorAll(
        "[required], select[id]"
      );
  
      let isValid = true; // Assume step is valid initially
  
      // Hide all error messages first
      errorForNameAndLastname.classList.add("hide");
      errorForEmail.classList.add("hide");
      errorForEmailTwo.classList.add("hide");
      errorForPhone.classList.add("hide");
      errorForModelInterest.classList.add("hide");
      errorForPreferredDealer.classList.add("hide");
      errorForPlanningToChoose.classList.add("hide");
  
      // Get the next/submit button for the current step
      const nextButton = currentStepEl.querySelector('[data-form="next-btn"]');
      const submitBtn = currentStepEl.querySelector('input[type="submit"]');
  
      // Reset validation state for all fields
      requiredFields.forEach((field) => {
        field.classList.remove("error");
        // Also remove error from associated text input if it's the dealer select
        if (field.id === "Dealership-2") {
          const textInput = document.getElementById("Preferred-Dealer-2");
          if (textInput) textInput.classList.remove("error");
        }
      });
  
      // Validate each required field
      requiredFields.forEach((field) => {
        // Skip fields that aren't visible in the current step
        if (field.offsetParent === null) return;
  
        // Check if field is empty
        if (!field.value.trim()) {
          field.classList.add("error");
          isValid = false; // Step is invalid if any required field is empty
  
          // Show specific error messages for empty fields
          if (field.id === "First-name" || field.id === "Last-name") {
            errorForNameAndLastname.classList.remove("hide");
          } else if (field.id === "Email") {
            errorForEmail.classList.remove("hide");
          } else if (field.id === "Confirm-Email") {
            errorForEmailTwo.classList.remove("hide");
          } else if (field.id === "Mobile-Number") {
            errorForPhone.classList.remove("hide");
          } else if (field.id === "Model-of-interest") {
            errorForModelInterest.classList.remove("hide");
          } else if (field.id === "Dealership-2") {
            errorForPreferredDealer.classList.remove("hide");
            // Add error class to the visible text input for visual feedback
            const textInput = document.getElementById("Preferred-Dealer-2");
            if (textInput) textInput.classList.add("error");
          } else if (field.id === "Plan-to-purchase") {
            errorForPlanningToChoose.classList.remove("hide");
          }
        } else {
          // Field is not empty, attempt to hide relevant errors (if format validation passes later)
          if (field.id === "First-name" || field.id === "Last-name") {
            // Hide only if BOTH are non-empty (check below for format)
          } else if (field.id === "Email") {
            // Error hidden by format check
          } else if (field.id === "Confirm-Email") {
            // Error hidden by format/match check
          } else if (field.id === "Mobile-Number") {
            // Error hidden by format check
          } else if (field.id === "Model-of-interest") {
            errorForModelInterest.classList.add("hide"); // Hide if non-empty, select check handles placeholder
          } else if (field.id === "Dealership-2") {
            // Error hidden by select check
          } else if (field.id === "Plan-to-purchase") {
            errorForPlanningToChoose.classList.add("hide"); // Hide if non-empty, select check handles placeholder
          }
        }
  
        // Enhanced name format validation (check for allowed characters)
        if (
          (field.id === "First-name" || field.id === "Last-name") &&
          field.value.trim()
        ) {
          const nameRegex = /^[a-zA-Z\s']+$/;
          if (!nameRegex.test(field.value)) {
            field.classList.add("error");
            isValid = false;
            errorForNameAndLastname.classList.remove("hide");
  
            // If there's a <p> element for the error message, update it
            const errorMessage = errorForNameAndLastname.querySelector("p");
            if (errorMessage) {
              errorMessage.textContent =
                "Names should only contain letters, spaces, and apostrophes.";
            }
          } else {
            // If format is valid, check if *both* names have valid formats before hiding error
            const firstNameField = document.getElementById("First-name");
            const lastNameField = document.getElementById("Last-name");
            if (
              firstNameField &&
              lastNameField &&
              nameRegex.test(firstNameField.value) &&
              nameRegex.test(lastNameField.value)
            ) {
              errorForNameAndLastname.classList.add("hide");
            }
          }
        }
  
        // Email validation
        if (field.type === "email" && field.value.trim()) {
          if (!isValidEmail(field.value)) {
            field.classList.add("error");
            isValid = false;
            if (field.id === "Email") {
              errorForEmail.classList.remove("hide");
              // Update error message with more specific information
              const errorMessage = errorForEmail.querySelector("p");
              if (errorMessage) {
                if (field.value.split("@").length > 2) {
                  errorMessage.textContent =
                    "Email should contain exactly one @ symbol.";
                } else if (field.value.includes("--")) {
                  errorMessage.textContent =
                    "Email should not contain consecutive dashes.";
                } else {
                  errorMessage.textContent =
                    "Please enter a valid email address.";
                }
              }
            } else if (field.id === "Confirm-Email") {
              errorForEmailTwo.classList.remove("hide");
              // Update error message
              const errorMessage = errorForEmailTwo.querySelector("p");
              if (errorMessage)
                errorMessage.textContent = "Please enter a valid email address.";
            }
          } else {
            // Valid email format, hide the specific error
            if (field.id === "Email") {
              errorForEmail.classList.add("hide");
            } else if (field.id === "Confirm-Email") {
              // Check match before hiding
              const emailField = document.getElementById("Email");
              if (field.value === emailField.value) {
                errorForEmailTwo.classList.add("hide");
              }
            }
          }
        }
  
        // Confirm email validation (Match check)
        if (field.id === "Confirm-Email" && field.value.trim()) {
          const emailField = document.getElementById("Email");
          if (field.value !== emailField.value) {
            field.classList.add("error");
            isValid = false;
            errorForEmailTwo.classList.remove("hide");
            // Update error message
            const errorMessage = errorForEmailTwo.querySelector("p");
            if (errorMessage) errorMessage.textContent = "Emails do not match.";
          } else if (isValidEmail(field.value)) {
            // Only hide if format is also valid
            errorForEmailTwo.classList.add("hide");
          }
        }
  
        // Phone number validation
        if (field.id === "Mobile-Number" && field.value.trim()) {
          const cleanPhone = field.value.replace(/\D/g, "");
          if (cleanPhone.length < 9) {
            // Assuming 9 digits is minimum (e.g., for PH numbers without '0')
            field.classList.add("error");
            isValid = false;
            errorForPhone.classList.remove("hide");
          } else {
            errorForPhone.classList.add("hide"); // Hide error if length is okay
          }
        }
  
        // Select field validation (Handle placeholders and specific dealer check)
        if (field.tagName === "SELECT" && field.id) {
          // Specific validation for Dealership-2 based on selected region
          if (field.id === "Dealership-2") {
            const selectedRegion = regionSelect.value;
            const validDealers = dealersByRegion[selectedRegion] || []; // Get valid dealers for the region
            const textInput = document.getElementById("Preferred-Dealer-2"); // Get the text input for visual feedback
            let dealerIsValid = true; // Assume valid initially for this field
  
            // Check if the value is empty, the placeholder, OR not in the valid list for the region
            if (
              field.value === "" ||
              field.value === "Select Dealer" ||
              !validDealers.includes(field.value)
            ) {
              field.classList.add("error");
              dealerIsValid = false; // Mark this specific field as invalid
              errorForPreferredDealer.classList.remove("hide");
              // Add error class to the visible text input
              if (textInput) textInput.classList.add("error");
            } else {
              // Field is valid, remove error class from select and text input
              field.classList.remove("error");
              if (textInput) textInput.classList.remove("error");
              errorForPreferredDealer.classList.add("hide"); // Hide error message if valid
            }
            // If this specific field is invalid, the overall step is invalid
            if (!dealerIsValid) {
              isValid = false;
            }
          } else if (
            field.id === "Model-of-interest" ||
            field.id === "Plan-to-purchase"
          ) {
            let otherSelectIsValid = true;
            // Generic check for other required select fields (placeholder values)
            if (
              field.value === "" ||
              field.value === "Choose model" ||
              field.value === "Choose only one"
            ) {
              field.classList.add("error");
              otherSelectIsValid = false;
              if (field.id === "Model-of-interest") {
                errorForModelInterest.classList.remove("hide");
              } else if (field.id === "Plan-to-purchase") {
                errorForPlanningToChoose.classList.remove("hide");
              }
            } else {
              field.classList.remove("error"); // Ensure error removed if valid
              // Hide corresponding error message
              if (field.id === "Model-of-interest") {
                errorForModelInterest.classList.add("hide");
              } else if (field.id === "Plan-to-purchase") {
                errorForPlanningToChoose.classList.add("hide");
              }
            }
            if (!otherSelectIsValid) {
              isValid = false; // Mark overall step as invalid
            }
          }
        }
      });
  
      // Update button states based on validation result
      if (nextButton) {
        if (isValid) {
          nextButton.classList.remove("disabled");
          nextButton.style.opacity = "1";
          nextButton.style.pointerEvents = "auto";
        } else {
          nextButton.classList.add("disabled");
          nextButton.style.opacity = "0.4";
          nextButton.style.pointerEvents = "none";
        }
      }
  
      if (submitBtn) {
        if (isValid) {
          submitBtn.classList.remove("disabled");
          submitBtn.style.opacity = "1";
          submitBtn.style.pointerEvents = "auto";
          submitBtn.disabled = false;
        } else {
          submitBtn.classList.add("disabled");
          submitBtn.style.opacity = "0.4";
          submitBtn.style.pointerEvents = "none";
          submitBtn.disabled = true;
        }
      }
  
      return isValid;
    }
  
    function validateFinalStep() {
      const isValid = validateCurrentStep(); // First check all fields in the current step
  
      if (!isValid) {
        console.log("Final step field validation failed.");
        return false;
      }
  
      // Check privacy policy checkbox
      const privacyCheckbox = document.getElementById("checkbox");
      if (!privacyCheckbox.checked) {
        // Instead of alert, find/create an error message element
        let privacyError = document.getElementById("error-for-privacy");
        if (!privacyError) {
          privacyError = document.createElement("div");
          privacyError.id = "error-for-privacy";
          privacyError.style.color = "red";
          privacyError.style.fontSize = "0.8em";
          privacyError.style.marginTop = "5px";
          privacyCheckbox
            .closest(".w-checkbox")
            .parentNode.appendChild(privacyError);
        }
        privacyError.textContent = "Please accept the privacy policy to proceed.";
        privacyCheckbox
          .closest(".w-checkbox")
          .scrollIntoView({ behavior: "smooth", block: "center" });
        console.log("Privacy policy not checked.");
        return false;
      } else {
        // If checked, remove the error message if it exists
        const privacyError = document.getElementById("error-for-privacy");
        if (privacyError) {
          privacyError.remove();
        }
      }
  
      // Check reCAPTCHA
      const recaptchaResponse = document.getElementById("g-recaptcha-response");
      if (!recaptchaResponse || !recaptchaResponse.value) {
        console.log("reCAPTCHA not completed.");
        // Optionally, add visual feedback near the reCAPTCHA widget
        const recaptchaWrapper = document.querySelector(".recaptcha-wrapper");
        let recaptchaError = document.getElementById("error-for-recaptcha");
        if (!recaptchaError) {
          recaptchaError = document.createElement("div");
          recaptchaError.id = "error-for-recaptcha";
          recaptchaError.style.color = "red";
          recaptchaError.style.fontSize = "0.8em";
          recaptchaError.style.marginTop = "5px";
          if (recaptchaWrapper) recaptchaWrapper.appendChild(recaptchaError);
        }
        recaptchaError.textContent =
          "Please complete the reCAPTCHA verification.";
        if (recaptchaWrapper)
          recaptchaWrapper.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        return false;
      } else {
        const recaptchaError = document.getElementById("error-for-recaptcha");
        if (recaptchaError) {
          recaptchaError.remove();
        }
      }
  
      console.log("Final step validation passed.");
      return true; // All checks passed
    }
  
    function updateFormSteps() {
      console.log("Updating form display for step:", currentStep);
      formSteps.forEach((step, index) => {
        if (index === currentStep) {
          step.style.display = "block";
        } else {
          step.style.display = "none";
        }
      });
  
      // Setup validation for the current step
      setupInputValidation();
      // Run initial validation for the current step to set button states correctly
      validateCurrentStep();
  
      // Auto-focus on the first input in the current step
      const currentStepEl = formSteps[currentStep];
      const firstInput = currentStepEl.querySelector(
        "input:not([type=hidden]):not([type=checkbox]), select"
      );
      if (firstInput) {
        setTimeout(() => {
          // Check if the element is actually visible before focusing
          if (
            firstInput.offsetWidth > 0 ||
            firstInput.offsetHeight > 0 ||
            firstInput.getClientRects().length > 0
          ) {
            firstInput.focus();
          }
        }, 100);
      }
  
      // If we're on the dealer selection step (step 3), check if a region is selected
      if (currentStep === 2 && regionSelect.value) {
        // Enable the dealer dropdown if we have a region selected
        setTimeout(() => {
          filterDealers(regionSelect.value);
          // Re-validate after filtering in case the initial state was invalid
          validateCurrentStep();
        }, 100);
      }
  
      updateComboboxOptionsVisibility(regionSelect.value);
    }
  
    async function submitForm() {
      const formData = new FormData(form);
      const data = {
        unique_identifier: {
          emails: formData.get("Email"),
        },
        contact: {
          first_name: formData.get("First-name"),
          last_name: formData.get("Last-name"),
          mobile_number: formData.get("Mobile-Number"),
          email: formData.get("Email"),
          custom_field: {
            cf_model_of_interest:
              document.getElementById("Model-of-interest").value,
            cf_preferred_dealer: document.getElementById("Dealership-2").value, // Always get from the select
            cf_purchase_intent: document.getElementById("Plan-to-purchase").value,
            cf_request_type: "Quote",
          },
        },
      };
  
      try {
        submitButton.value = "Submitting...";
        // submitButton.disabled = true; // Keep it enabled visually, let validation handle pointer events
  
        // Re-validate one last time before submitting
        if (!validateFinalStep()) {
          console.log("Final validation failed before submission.");
          submitButton.value = "SUBMIT ENQUIRY"; // Reset button text
          // Find the first error and focus it
          const firstErrorField = form.querySelector(".error");
          if (firstErrorField) {
            firstErrorField.focus();
            firstErrorField.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          } else {
            // If no field has .error, maybe it's privacy or recaptcha
            const privacyError = document.getElementById("error-for-privacy");
            const recaptchaError = document.getElementById("error-for-recaptcha");
            if (privacyError) {
              document.getElementById("checkbox").focus();
            } else if (recaptchaError) {
              // Cannot directly focus iframe, but scroll to it
              const recaptchaWrapper =
                document.querySelector(".recaptcha-wrapper");
              if (recaptchaWrapper)
                recaptchaWrapper.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
            }
          }
          return; // Stop submission
        }
  
        // Basic data presence check (somewhat redundant due to validateFinalStep)
        if (
          !data.contact.first_name ||
          !data.contact.last_name ||
          !data.contact.email ||
          !data.contact.mobile_number ||
          !data.contact.custom_field.cf_model_of_interest ||
          !data.contact.custom_field.cf_preferred_dealer ||
          !data.contact.custom_field.cf_purchase_intent
        ) {
          console.error("Form data missing before sending:", data);
          throw new Error(
            "Required information is missing. Please check the form."
          );
        }
        if (!isValidEmail(data.contact.email)) {
          throw new Error("Valid email is required.");
        }
        // Add other critical checks if needed
  
        console.log("Submitting data:", JSON.stringify(data, null, 2)); // Log data being sent
  
        const response = await fetch(
          "https://byd-form-handler.digital-sales.workers.dev",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          }
        );
  
        const responseText = await response.text(); // Read response text first
        console.log("Raw response:", response.status, responseText);
  
        if (!response.ok) {
          let errorData = { message: `Server error: ${response.status}` };
          try {
            errorData = JSON.parse(responseText); // Try to parse as JSON
          } catch (e) {
            console.warn("Failed to parse error response as JSON.");
            errorData.details = responseText; // Include raw text if not JSON
          }
          console.error("Response error:", errorData);
          throw new Error(
            errorData.message ||
              errorData.details ||
              `Submission failed. Status: ${response.status}`
          );
        }
  
        let result = {};
        try {
          result = JSON.parse(responseText); // Parse success response
        } catch (e) {
          console.warn("Failed to parse success response as JSON.", responseText);
          // Decide if this is acceptable or an error
          // If plain text success message is okay:
          // result = { message: responseText };
          // If JSON is expected:
          throw new Error(
            "Received an invalid success response from the server."
          );
        }
  
        // console.log("Success:", result);
  
        // Show success message
        const successMessage = form.nextElementSibling;
        const formContent = form.closest(".w-form");
        form.style.display = "none";
        successMessage.style.display = "block";
  
        // Reset form
        form.reset();
        // Manually clear Finsweet combobox text input
        const fsInput = document.querySelector(
          '[fs-combobox-element="text-input"]'
        );
        if (fsInput) fsInput.value = "";
        // Reset reCAPTCHA
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.reset();
        }
        currentStep = 0;
        updateFormSteps();
      } catch (error) {
        console.error("Error during submission:", error);
        // Show error message
        const errorMessage = form.nextElementSibling.nextElementSibling; // Assuming error message element follows success message
        errorMessage.style.display = "block";
        errorMessage.textContent = `Submission failed: ${
          error.message || "Please try again."
        }`; // Show specific error
        // Reset reCAPTCHA on error too
        if (typeof grecaptcha !== "undefined") {
          grecaptcha.reset();
        }
        setTimeout(() => {
          errorMessage.style.display = "none";
        }, 7000); // Longer display for errors
      } finally {
        submitButton.value = "SUBMIT ENQUIRY";
        // Re-run validation to potentially disable the button if errors occurred during submit attempt
        // Ensure button state reflects validation (might be disabled if error occurred)
        validateCurrentStep();
      }
    }
  
    // Add phone number formatting
    function formatPhoneNumber(value) {
      // Remove all non-digit characters
      const number = value.replace(/\D/g, "");
  
      // Check if number is empty
      if (number.length === 0) return "";
  
      // Format the number as XXXX-XXX-XXXX (Max 11 digits)
      let formattedNumber = "";
      if (number.length <= 4) {
        formattedNumber = number;
      } else if (number.length <= 7) {
        formattedNumber = `${number.slice(0, 4)}-${number.slice(4)}`;
      } else {
        formattedNumber = `${number.slice(0, 4)}-${number.slice(
          4,
          7
        )}-${number.slice(7, 11)}`; // Limit to 11 digits total
      }
  
      return formattedNumber;
    }
  
    // Add event listener for phone number formatting
    if (mobileNumberInput) {
      mobileNumberInput.addEventListener("input", (e) => {
        const cursorPosition = e.target.selectionStart;
        const oldValue = e.target.value;
        const newValue = formatPhoneNumber(oldValue);
  
        if (oldValue !== newValue) {
          e.target.value = newValue; // Update the value only if it changed
  
          // Restore cursor position intelligently
          let diff = newValue.length - oldValue.length;
          let newCursorPosition = cursorPosition + diff;
  
          // Adjust if a dash was added right before the cursor
          if (diff > 0 && newValue.charAt(cursorPosition) === "-") {
            newCursorPosition = cursorPosition + 1;
          }
          // Adjust if a dash was removed right before the cursor
          else if (diff < 0 && oldValue.charAt(cursorPosition - 1) === "-") {
            newCursorPosition = cursorPosition - 1;
          }
  
          // Ensure cursor position is within bounds
          newCursorPosition = Math.max(
            0,
            Math.min(newCursorPosition, newValue.length)
          );
  
          e.target.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      });
    }
  
    // Update form submit handler to use the new validation
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      // Final validation check happens *inside* submitForm now
      await submitForm();
    });
  
    // Initialize form display and validation
    updateFormSteps();
    // setupInputValidation(); // Setup initial validation (now called within updateFormSteps)
  
    // Prevent Enter key submission specifically in the dealer combobox text input
    if (preferredDealerTextInput) {
      preferredDealerTextInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          console.log("Enter key pressed in dealer input.");
          event.preventDefault(); // Prevent default behavior (like form submission)
          event.stopPropagation(); // Stop the event from bubbling up
          // Optionally trigger validation or blur to potentially select the highlighted item
          preferredDealerTextInput.blur(); // Blurring might help Finsweet finalize selection
          setTimeout(validateCurrentStep, 50); // Re-run validation shortly after to catch state change
          return false;
        }
      });
    }
  
    function updateComboboxOptionsVisibility(selectedRegion) {
      // Instead of directly manipulating the DOM, modify the underlying select options
      // This will make Finsweet rebuild its UI with the correct options
  
      const dealershipSelect = document.getElementById("Dealership-2");
      if (!dealershipSelect) return;
  
      // Clear the dropdown completely EXCEPT the placeholder
      while (dealershipSelect.options.length > 1) {
        dealershipSelect.remove(1);
      }
  
      // Get the text input and toggle elements
      const fsInput = document.querySelector(
        '[fs-combobox-element="text-input"]'
      );
      const fsDropdownToggle = document.querySelector(
        ".fs-combobox_dropdown-toggle"
      );
  
      if (!selectedRegion) {
        // If no region selected, disable the dropdown
        if (fsInput) {
          fsInput.disabled = true;
          fsInput.placeholder = "Select a region first";
        }
        if (fsDropdownToggle) {
          fsDropdownToggle.setAttribute("disabled", "disabled");
        }
        return;
      }
  
      // If region is selected, enable the dropdown
      if (fsInput) {
        fsInput.disabled = false;
        fsInput.placeholder = "Select dealer";
      }
      if (fsDropdownToggle) {
        fsDropdownToggle.removeAttribute("disabled");
      }
  
      // Populate options with only the dealers for the selected region
      const validDealers = dealersByRegion[selectedRegion] || [];
      validDealers.forEach((dealer) => {
        const option = document.createElement("option");
        option.value = dealer;
        option.text = dealer;
        dealershipSelect.appendChild(option);
      });
  
      // Force Finsweet to rebuild its options by simulating a click on document
      // This will make Finsweet rebuild its options list from the select element
      setTimeout(() => {
        // First close any open dropdown
        const openDropdown = document.querySelector(
          ".fs-combobox_dropdown.w--open"
        );
        if (openDropdown) {
          const toggle = openDropdown.querySelector(
            ".fs-combobox_dropdown-toggle"
          );
          if (toggle) toggle.click();
        }
  
        // Then dispatch an event to make Finsweet reinitialize
        document.dispatchEvent(new Event("FSComboboxInit"));
  
        // Add a more aggressive approach to force refresh if needed
        const fsOptions = document.querySelectorAll(".fs-combobox_option");
        fsOptions.forEach((opt) => {
          opt.remove(); // Remove all options
        });
  
        // This should cause Finsweet to rebuild the options list from scratch
      }, 100);
    }
  });
  
  // Enhanced email validation
  function isValidEmail(email) {
    // Check for basic email format
    if (!email || typeof email !== "string") return false;
  
    // Check for only one @ symbol
    const atSymbols = email.split("@");
    if (atSymbols.length !== 2) return false;
  
    // Check for consecutive dashes in the domain part or local part
    const [localPart, domainPart] = atSymbols;
    if (!localPart || !domainPart) return false; // Ensure both parts exist
    if (localPart.includes("--") || domainPart.includes("--")) return false;
  
    // Check for leading/trailing dashes in domain parts
    if (
      domainPart.startsWith("-") ||
      domainPart.endsWith("-") ||
      domainPart.includes(".-") ||
      domainPart.includes("-.")
    )
      return false;
  
    // Check if domain part has at least one dot and is not just a dot
    if (
      !domainPart.includes(".") ||
      domainPart.startsWith(".") ||
      domainPart.endsWith(".")
    )
      return false;
  
    // Check if the TLD (last part after dot) has at least 2 characters
    const tld = domainPart.split(".").pop();
    if (!tld || tld.length < 2) return false;
  
    // Use a robust regex for general structure, considering the checks above
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  
    return emailRegex.test(email);
  }
  
