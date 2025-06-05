document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("wf-form-Book-A-Test-Drive");
    const regionSelect = document.getElementById("select-region-test-drive");
    const dealershipSelect = document.getElementById("Dealership");
    const nextButtons = document.querySelectorAll('[data-form="next-btn"]');
    const formSteps = document.querySelectorAll(".form-outer");
    const submitButton = form ? form.querySelector('input[type="submit"]') : null;
    const bookErrorForName = document.getElementById(
      "book-error-for-name-lastname"
    );
    const bookErrorForEmail = document.getElementById("book-error-for-email");
    const bookErrorForEmailTwo = document.getElementById(
      "book-error-for-confirm-email"
    );
    const bookErrorForPhone = document.getElementById(
      "book-error-for-mobile-number"
    );
    const bookErrorForModel = document.getElementById(
      "book-error-for-model-of-interests"
    );
    const bookErrorForDealer = document.getElementById("book-error-for-dealer");
    const bookErrorForDate = document.getElementById("book-error-for-date");
    const bookErrorForTime = document.getElementById("book-error-for-time");
    const bookErrorForPlanToPurchase = document.getElementById(
      "book-error-for-plan-to-purchase"
    );
    const bookErrorForPrivacyPolicy = document.getElementById(
      "book-error-for-privacy-policy"
    );
    const mobileNumberInput = document.getElementById("Mobile-Number");
    const firstNameInput = document.getElementById("First-name");
    const lastNameInput = document.getElementById("Last-name");
    const emailInput = document.getElementById("Email");
    const confirmEmailInput = document.getElementById("Confirm-Email");
    let currentStep = 0;
  
    // UPDATE NAME VALIDATION - No special characters, no dashes, 30 char limit
    if (firstNameInput) {
      firstNameInput.addEventListener("input", (e) => {
        // Get the current value and cursor position
        let value = e.target.value;
        const cursorPosition = e.target.selectionStart;
  
        // Replace any characters that aren't letters, spaces, or apostrophes (no dashes)
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
  
    // UPDATE LAST NAME VALIDATION - No special characters, no dashes, 30 char limit
    if (lastNameInput) {
      lastNameInput.addEventListener("input", (e) => {
        // Get the current value and cursor position
        let value = e.target.value;
        const cursorPosition = e.target.selectionStart;
  
        // Replace any characters that aren't letters, spaces, or apostrophes (no dashes)
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
  
    // ADD EMAIL VALIDATION - Limit to one @ sign and prevent consecutive dashes
    // Enhanced email validation function
    function isValidEmail(email) {
      // Check for basic email format
      if (!email || typeof email !== "string") return false;
  
      // Check for only one @ symbol
      const atSymbols = email.split("@");
      if (atSymbols.length !== 2) return false;
  
      // Check for consecutive dashes
      if (email.includes("--")) return false;
  
      // Check if it's in a valid format overall
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    // Add email input sanitization
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
        "BYD Bacoor",
        "BYD Palawan",
      ],
      Visayas: [
        "BYD Mandaue, Cebu",
        "BYD Negros",
        "BYD Iloilo",
        "BYD Ayala Center Cebu",
        "BYD Cebu Central",
        "BYD IL Corso",
      ],
      Mindanao: ["BYD Gensan", "BYD Davao", "BYD Cagayan de Oro"],
    };
  
    // Function to validate dealer selection
    function validateDealerSelection() {
      const selectedRegion = regionSelect ? regionSelect.value : "";
      const dealerInput = document.querySelector(
        '[fs-combobox-element="text-input"]'
      );
      const submitBtn = form ? form.querySelector('input[type="submit"]') : null;
  
      // If no region is selected or no dealer input exists, return early
      if (!selectedRegion || !dealerInput || !bookErrorForDealer || !submitBtn) {
        return false;
      }
  
      const dealerValue = dealerInput.value.trim();
      const validDealers = dealersByRegion[selectedRegion] || [];
      const isValidDealer = validDealers.includes(dealerValue);
  
      // Show/hide error message and enable/disable submit button
      if (!dealerValue || !isValidDealer) {
        bookErrorForDealer.classList.remove("hide");
        submitBtn.disabled = true;
        return false;
      } else {
        bookErrorForDealer.classList.add("hide");
        submitBtn.disabled = false;
        return true;
      }
    }
  
    // Function to filter dealers based on selected region
    function filterDealers(selectedRegion) {
      console.log("Filtering dealers for region:", selectedRegion);
  
      // Find all the relevant Finsweet combobox elements
      const fsInput = document.querySelector(
        '[fs-combobox-element="text-input"]'
      );
      const fsList = document.querySelector(
        '[fs-combobox-element="dropdown"] .fs-combobox_list'
      );
      const submitBtn = form ? form.querySelector('input[type="submit"]') : null;
  
      if (!selectedRegion) {
        console.log("No region selected, returning early");
        // Disable submit button if no region selected
        if (submitBtn) submitBtn.disabled = true;
        return;
      }
  
      // Get dealers for selected region
      const regionDealers = dealersByRegion[selectedRegion];
      console.log("Available dealers for region:", regionDealers);
  
      // Clear the hidden select first
      if (dealershipSelect) {
        dealershipSelect.options.length = 1;
      }
  
      // Add filtered dealers to both the hidden select and enable the dropdown
      if (regionDealers && dealershipSelect) {
        // Enable the dropdown
        const dropdownToggle = document.querySelector(
          ".fs-combobox_dropdown-toggle"
        );
        if (dropdownToggle) {
          dropdownToggle.removeAttribute("disabled");
        }
  
        regionDealers.forEach((dealerName) => {
          // Add to hidden select
          const option = document.createElement("option");
          option.value = dealerName;
          option.text = dealerName;
          dealershipSelect.add(option);
        });
  
        // Reset the input value if it exists
        if (fsInput) {
          fsInput.value = "";
  
          // Set up input validation for the dealer field
          fsInput.addEventListener("input", validateDealerSelection);
          fsInput.addEventListener("blur", validateDealerSelection);
  
          // Show error and disable submit initially when region changes
          if (bookErrorForDealer) bookErrorForDealer.classList.remove("hide");
          if (submitBtn) submitBtn.disabled = true;
        }
      }
    }
  
    // Add event listener to region select
    if (regionSelect) {
      regionSelect.addEventListener("change", (e) => {
        console.log("Region changed to:", e.target.value);
        filterDealers(e.target.value);
  
        // Reset dealership selection
        if (dealershipSelect) {
          dealershipSelect.value = "";
        }
  
        const fsInput = document.querySelector(
          '[fs-combobox-element="text-input"]'
        );
        if (fsInput) {
          fsInput.value = "";
        }
      });
    }
  
    // Add input event listeners for real-time validation
    function setupInputValidation() {
      const currentStepEl = formSteps[currentStep];
      const inputs = currentStepEl.querySelectorAll("input, select");
  
      inputs.forEach((input) => {
        input.addEventListener("input", () => {
          validateCurrentStep();
        });
  
        if (input.type === "checkbox") {
          input.addEventListener("change", () => {
            validateCurrentStep();
          });
        }
      });
    }
  
    // Prevent form submission on enter key
    form.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (currentStep === formSteps.length - 1 && validateFinalStep()) {
          submitForm();
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
          console.log("Moving to next step:", currentStep);
          updateFormSteps();
          setupInputValidation(); // Setup validation for new step
        }
      });
    });
  
    // Add phone number formatting
    function formatPhoneNumber(value) {
      // Remove all non-digit characters
      const number = value.replace(/\D/g, "");
  
      // Check if number is empty
      if (number.length === 0) return "";
  
      // Format the number as XXXX-XXX-XXXX
      let formattedNumber = "";
      if (number.length <= 4) {
        formattedNumber = number;
      } else if (number.length <= 7) {
        formattedNumber = `${number.slice(0, 4)}-${number.slice(4)}`;
      } else {
        formattedNumber = `${number.slice(0, 4)}-${number.slice(
          4,
          7
        )}-${number.slice(7, 11)}`;
      }
  
      return formattedNumber;
    }
  
    // Add event listener for phone number formatting
    if (mobileNumberInput) {
      mobileNumberInput.addEventListener("input", (e) => {
        const cursorPosition = e.target.selectionStart;
        const oldValue = e.target.value;
        const newValue = formatPhoneNumber(oldValue);
        e.target.value = newValue;
  
        // Restore cursor position
        if (oldValue !== newValue) {
          const newCursorPosition =
            cursorPosition + (newValue.length - oldValue.length);
          e.target.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      });
    }
  
    // UPDATE validateCurrentStep to include new name and email validation
    function validateCurrentStep() {
      console.log("Validating step:", currentStep);
      const currentStepEl = formSteps[currentStep];
      const requiredFields = currentStepEl.querySelectorAll(
        "input[required], select[required]"
      );
  
      let isValid = true;
  
      // Reset all error messages in current step
      const errorElements = currentStepEl.querySelectorAll('[id^="book-error-"]');
      errorElements.forEach((el) => el.classList.add("hide"));
  
      // Enable the next/submit button by default
      const nextButton = currentStepEl.querySelector('[data-form="next-btn"]');
      const submitBtn = currentStepEl.querySelector('[data-form="submit-btn"]');
      if (nextButton) {
        nextButton.classList.remove("disabled");
        nextButton.style.opacity = "1";
        nextButton.style.pointerEvents = "auto";
      }
      if (submitBtn) {
        submitBtn.classList.remove("disabled");
        submitBtn.style.opacity = "1";
        submitBtn.style.pointerEvents = "auto";
        submitBtn.style.display = "block";
      }
  
      // Validate based on current step
      if (currentStep === 0) {
        const firstName = form.querySelector("#First-name").value.trim();
        const lastName = form.querySelector("#Last-name").value.trim();
        const email = form.querySelector("#Email").value.trim();
        const confirmEmail = form.querySelector("#Confirm-Email").value.trim();
        const phone = form.querySelector("#Mobile-Number").value.trim();
  
        // Basic required field validation
        if (!firstName || !lastName) {
          bookErrorForName.classList.remove("hide");
          isValid = false;
        }
  
        // UPDATED name format validation (check for allowed characters - no dashes)
        const nameRegex = /^[a-zA-Z\s']+$/;
        if (firstName && !nameRegex.test(firstName)) {
          bookErrorForName.classList.remove("hide");
          bookErrorForName.querySelector("p").textContent =
            "First name should only contain letters, spaces, and apostrophes.";
          isValid = false;
        }
  
        if (lastName && !nameRegex.test(lastName)) {
          bookErrorForName.classList.remove("hide");
          bookErrorForName.querySelector("p").textContent =
            "Last name should only contain letters, spaces, and apostrophes.";
          isValid = false;
        }
  
        // UPDATED email validation
        if (!email) {
          bookErrorForEmail.classList.remove("hide");
          isValid = false;
        } else if (!isValidEmail(email)) {
          bookErrorForEmail.classList.remove("hide");
          const errorElement = bookErrorForEmail.querySelector("p");
          if (errorElement) {
            if (email.split("@").length > 2) {
              errorElement.textContent =
                "Email should contain exactly one @ symbol.";
            } else if (email.includes("--")) {
              errorElement.textContent =
                "Email should not contain consecutive dashes.";
            } else {
              errorElement.textContent = "Please enter a valid email address.";
            }
          }
          isValid = false;
        }
  
        if (email !== confirmEmail) {
          bookErrorForEmailTwo.classList.remove("hide");
          isValid = false;
        }
  
        if (!phone || !/^\d{10,}$/.test(phone.replace(/\D/g, ""))) {
          bookErrorForPhone.classList.remove("hide");
          isValid = false;
        }
      } else if (currentStep === 1) {
        const modelOfInterest =
          document.getElementById("Model-of-interest").value;
  
        if (!modelOfInterest || modelOfInterest === "Choose model") {
          bookErrorForModel.classList.remove("hide");
          isValid = false;
        }
      } else if (currentStep === 2) {
        const dealer = document.getElementById("Preferred-dealer").value;
        const date = document.querySelector('input[type="date"]').value;
        const preferredTime = document.getElementById("Preferred-Time-2").value;
        const planToPurchase =
          document.getElementById("Plan-To-Purchase-3").value;
        const privacyPolicy = document.querySelector(
          'input[type="checkbox"]'
        ).checked;
  
        if (!dealer || dealer === "Preferred dealer") {
          bookErrorForDealer.classList.remove("hide");
          isValid = false;
        }
  
        if (!date) {
          bookErrorForDate.classList.remove("hide");
          isValid = false;
        }
  
        if (!preferredTime || preferredTime === "") {
          bookErrorForTime.classList.remove("hide");
          isValid = false;
        }
  
        if (!planToPurchase || planToPurchase === "Choose only one") {
          bookErrorForPlanToPurchase.classList.remove("hide");
          isValid = false;
        }
  
        if (!privacyPolicy) {
          bookErrorForPrivacyPolicy.classList.remove("hide");
          isValid = false;
        }
      }
  
      if (!isValid) {
        if (nextButton) {
          nextButton.classList.add("disabled");
          nextButton.style.opacity = "0.4";
          nextButton.style.pointerEvents = "none";
        }
        if (submitBtn) {
          submitBtn.classList.add("disabled");
          submitBtn.style.opacity = "0.4";
          submitBtn.style.pointerEvents = "none";
        }
      }
  
      return isValid;
    }
  
    function validateFinalStep() {
      return validateCurrentStep();
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
    }
  
    async function submitForm() {
      const formData = new FormData(form);
      const preferredTime = document.getElementById("Preferred-Time-2").value;
  
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
            cf_preferred_dealer:
              document.getElementById("Preferred-dealer").value,
            cf_preferred_test_drive_date:
              document.querySelector('input[type="date"]').value,
            cf_preferred_time: preferredTime,
            cf_purchase_intent:
              document.getElementById("Plan-To-Purchase-3").value,
            cf_request_type: "Test Drive",
          },
        },
      };
  
      try {
        submitButton.value = "Submitting...";
        // submitButton.disabled = true;
  
        // First check if required fields are present
        if (!data.contact.first_name || !data.contact.last_name) {
          throw new Error("First name and last name are required");
        }
  
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
  
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({
            message: "Failed to parse error response",
          }));
          console.error("Response error:", errorData);
          throw new Error(errorData.message || `Error: ${response.status}`);
        }
  
        const result = await response.json();
        console.log("Success:", result);
  
        // Show success message
        const successMessage = form.nextElementSibling;
        form.style.display = "none";
        successMessage.style.display = "block";
  
        // Reset form
        form.reset();
        currentStep = 0;
        updateFormSteps();
      } catch (error) {
        console.error("Error:", error);
        // Show error message
        const errorMessage = form.nextElementSibling.nextElementSibling;
        errorMessage.style.display = "block";
        setTimeout(() => {
          errorMessage.style.display = "none";
        }, 5000);
      } finally {
        submitButton.value = "SUBMIT ENQUIRY";
        // submitButton.disabled = false;
      }
    }
  
    // Update form submit handler to use the new validation
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (validateFinalStep()) {
        await submitForm();
      }
    });
  
    // Initialize form display and validation
    updateFormSteps();
    setupInputValidation(); // Setup initial validation
  
    // When the finsweet combobox list items are clicked, validate dealer selection
    document.addEventListener("click", function (event) {
      if (
        event.target.hasAttribute("fs-combobox-element") &&
        event.target.getAttribute("fs-combobox-element") === "option"
      ) {
        // Wait a small moment for the input to be updated with the selection
        setTimeout(validateDealerSelection, 100);
      }
    });
  
    // Set up the finsweet combobox to work with our validation
    function setupCombobox() {
      const fsInput = document.querySelector(
        '[fs-combobox-element="text-input"]'
      );
      if (fsInput) {
        fsInput.addEventListener("input", validateDealerSelection);
        fsInput.addEventListener("blur", validateDealerSelection);
      }
    }
  
    // Call setup on document ready
    setupCombobox();
  
    // Initially disable submit button until all validations pass
    const submitBtn = form ? form.querySelector('input[type="submit"]') : null;
    if (submitBtn) {
      submitBtn.disabled = true;
    }
  
    // Set up form submission
    if (form) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (validateFinalStep()) {
          console.log("Form validation passed, submitting...");
          if (submitButton) {
            submitButton.value = "Submitting...";
            submitButton.disabled = true;
          }
  
          // Submit the form after validation
          setTimeout(() => {
            form.submit();
          }, 1000);
        } else {
          console.log("Form validation failed!");
        }
      });
  
      // Prevent form submission on Enter key
      form.addEventListener("keypress", (event) => {
        if (event.key === "Enter") event.preventDefault();
      });
    }
  });
  