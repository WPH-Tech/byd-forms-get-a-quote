document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("wf-form-Get-in-touch");
    const submitButton = form.querySelector('input[type="submit"]');
  
    // Form fields
    const firstNameInput = document.getElementById("First-Name");
    const lastNameInput = document.getElementById("Last-Name");
    const emailInput = document.getElementById("Email");
    const confirmEmailInput = document.getElementById("Confirm-Email");
    const mobileNumberInput = document.getElementById("Mobile-Number-2");
    const natureOfConcernInput = document.getElementById("Nature-of-Inquiry");
    const messageInput = document.getElementById("Message");
    const policyCheckbox = document.getElementById("Consent");
    const regionSelect = document.getElementById("Select-A-Region-3");
    const dealershipSelect = document.querySelector(
      'select[fs-combobox-element="select"]'
    );
    const dealershipInput = document.getElementById("Preferred-Dealer");
  
    // Error messages
    const errorForFullName = document.getElementById("error-for-fullname");
    const errorForEmailOne = document.getElementById("error-for-email-one");
    const errorForEmailTwo = document.getElementById("error-for-email-two");
    const errorForMobileNumber = document.getElementById(
      "error-for-mobile-number"
    );
    const errorForConcern = document.getElementById("error-for-concern");
    const errorForMessage = document.getElementById("error-for-message");
    const errorForPolicy = document.getElementById("error-for-policy");
  
    // Error messages
    const errorForDealership = document.createElement("div");
    errorForDealership.id = "error-for-dealership";
    errorForDealership.style.color = "red";
    errorForDealership.style.fontSize = "12px"; // Make the text smaller
    errorForDealership.style.marginTop = "4px"; // Add some spacing below input
    errorForDealership.style.display = "none";
    errorForDealership.style.fontFamily = "Arial, sans-serif"; // Improve readability
    errorForDealership.textContent =
      "Please enter a valid dealership from the selected region.";
  
    // Ensure it is placed properly below the input field
    dealershipInput.insertAdjacentElement("afterend", errorForDealership);
  
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
  
        // Validate email format
        validateEmails();
        validateForm();
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
  
        // Validate email format
        validateEmails();
        validateForm();
      });
    }
  
    // UPDATE NAME VALIDATION - No special characters, no dashes, 30 char limit
    if (firstNameInput) {
      firstNameInput.addEventListener("input", (e) => {
        // Store cursor position
        const cursorPosition = e.target.selectionStart;
  
        // Get current value
        let value = e.target.value;
  
        // Replace any characters that aren't letters, spaces, or apostrophes (removed hyphens)
        const sanitizedValue = value.replace(/[^a-zA-Z\s']/g, "");
  
        // Enforce maximum length (30 characters)
        const truncatedValue = sanitizedValue.substring(0, 30);
  
        // Only update if value changed
        if (value !== truncatedValue) {
          e.target.value = truncatedValue;
  
          // Adjust cursor position
          const newPosition =
            cursorPosition - (value.length - truncatedValue.length);
          e.target.setSelectionRange(newPosition, newPosition);
        }
  
        // Run existing validation
        validateName();
        validateForm();
      });
    }
  
    // UPDATE LAST NAME VALIDATION - No special characters, no dashes, 30 char limit
    if (lastNameInput) {
      lastNameInput.addEventListener("input", (e) => {
        // Store cursor position
        const cursorPosition = e.target.selectionStart;
  
        // Get current value
        let value = e.target.value;
  
        // Replace any characters that aren't letters, spaces, or apostrophes (removed hyphens)
        const sanitizedValue = value.replace(/[^a-zA-Z\s']/g, "");
  
        // Enforce maximum length (30 characters)
        const truncatedValue = sanitizedValue.substring(0, 30);
  
        // Only update if value changed
        if (value !== truncatedValue) {
          e.target.value = truncatedValue;
  
          // Adjust cursor position
          const newPosition =
            cursorPosition - (value.length - truncatedValue.length);
          e.target.setSelectionRange(newPosition, newPosition);
        }
  
        // Run existing validation
        validateName();
        validateForm();
      });
    }
  
    // ✅ Dealer mappings by region
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
		"BYD Palawan",
        "BYD Bacoor",
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
  
    // Function to filter dealers based on selected region
    function filterDealers(selectedRegion) {
      if (!selectedRegion) {
        console.log("No region selected, returning early");
        return;
      }
  
      // Get dealers for selected region
      const regionDealers = dealersByRegion[selectedRegion];
  
      // Clear the select element
      if (dealershipSelect) {
        // Keep only the first option (placeholder)
        while (dealershipSelect.options.length > 1) {
          dealershipSelect.remove(1);
        }
      }
  
      // Add filtered dealers to the select element
      regionDealers.forEach((dealerName) => {
        if (dealershipSelect) {
          const option = document.createElement("option");
          option.value = dealerName;
          option.text = dealerName;
          dealershipSelect.add(option);
        }
      });
  
      // Reset the input value
      if (dealershipInput) {
        dealershipInput.value = "";
      }
    }
  
    // Event listener for region change
    if (regionSelect) {
      regionSelect.addEventListener("change", (e) => {
        console.log("Region changed to:", e.target.value);
        filterDealers(e.target.value);
  
        // Reset dealership selection
        if (dealershipSelect) {
          dealershipSelect.value = "";
        }
        if (dealershipInput) {
          dealershipInput.value = "";
        }
      });
    }
  
    function formatPhoneNumber(value) {
      const number = value.replace(/\D/g, ""); // Remove all non-digit characters
      if (number.length === 0) return "";
      if (number.length <= 4) return number;
      if (number.length <= 7) return `${number.slice(0, 4)}-${number.slice(4)}`;
      return `${number.slice(0, 4)}-${number.slice(4, 7)}-${number.slice(7, 11)}`;
    }
  
    if (mobileNumberInput) {
      mobileNumberInput.addEventListener("input", (event) => {
        mobileNumberInput.value = formatPhoneNumber(event.target.value);
      });
  
      mobileNumberInput.addEventListener("paste", (event) => {
        event.preventDefault();
        const pasteData = (event.clipboardData || window.clipboardData).getData(
          "text"
        );
        mobileNumberInput.value = formatPhoneNumber(pasteData);
      });
    }
  
    // UPDATE ENHANCED NAME VALIDATION - New regex without dashes
    function validateName() {
      const firstNameEmpty = firstNameInput.value.trim() === "";
      const lastNameEmpty = lastNameInput.value.trim() === "";
  
      // Check for valid name format using regex (only letters, spaces, and apostrophes)
      const nameRegex = /^[a-zA-Z\s']+$/; // Removed dash from the pattern
      const firstNameValid = nameRegex.test(firstNameInput.value.trim());
      const lastNameValid = nameRegex.test(lastNameInput.value.trim());
  
      // Show error if either field is empty or has invalid format
      if (
        firstNameEmpty ||
        lastNameEmpty ||
        (!firstNameValid && firstNameInput.value.trim() !== "") ||
        (!lastNameValid && lastNameInput.value.trim() !== "")
      ) {
        errorForFullName.style.display = "block";
  
        // Update error message if it's specifically a format issue
        if (
          (!firstNameValid && firstNameInput.value.trim() !== "") ||
          (!lastNameValid && lastNameInput.value.trim() !== "")
        ) {
          const errorParagraph = errorForFullName.querySelector("p");
          if (errorParagraph) {
            errorParagraph.textContent =
              "Names should only contain letters, spaces, and apostrophes."; // Updated error message
          }
        } else {
          // Reset to default message if it's an empty field issue
          const errorParagraph = errorForFullName.querySelector("p");
          if (errorParagraph) {
            errorParagraph.textContent = "Please enter both first and last name.";
          }
        }
        return false;
      } else {
        errorForFullName.style.display = "none";
        return true;
      }
    }
  
    // Keep these existing listeners for backward compatibility
    firstNameInput.addEventListener("input", validateName);
    lastNameInput.addEventListener("input", validateName);
  
    // Update validateEmails function to use the enhanced email validation
    function validateEmails() {
      const email = emailInput.value.trim();
      const confirmEmail = confirmEmailInput.value.trim();
  
      // Check primary email validity
      if (!email) {
        errorForEmailOne.style.display = "block";
        if (errorForEmailOne.querySelector("p")) {
          errorForEmailOne.querySelector("p").textContent =
            "Please enter your email address.";
        }
        return false;
      } else if (!isValidEmail(email)) {
        errorForEmailOne.style.display = "block";
        if (errorForEmailOne.querySelector("p")) {
          if (email.split("@").length > 2) {
            errorForEmailOne.querySelector("p").textContent =
              "Email should contain exactly one @ symbol.";
          } else if (email.includes("--")) {
            errorForEmailOne.querySelector("p").textContent =
              "Email should not contain consecutive dashes.";
          } else {
            errorForEmailOne.querySelector("p").textContent =
              "Please enter a valid email address.";
          }
        }
        return false;
      } else {
        errorForEmailOne.style.display = "none";
      }
  
      // Check if emails match
      if (email !== confirmEmail) {
        errorForEmailTwo.style.display = "block";
        return false;
      } else {
        errorForEmailTwo.style.display = "none";
      }
  
      return true;
    }
  
    emailInput.addEventListener("input", validateEmails);
    confirmEmailInput.addEventListener("input", validateEmails);
  
    mobileNumberInput.addEventListener("input", () => {
      errorForMobileNumber.style.display = mobileNumberInput.value.trim()
        ? "none"
        : "block";
    });
  
    natureOfConcernInput.addEventListener("change", () => {
      errorForConcern.style.display = natureOfConcernInput.value.trim()
        ? "none"
        : "block";
    });
  
    messageInput.addEventListener("input", () => {
      errorForMessage.style.display = messageInput.value.trim()
        ? "none"
        : "block";
    });
  
    policyCheckbox.addEventListener("change", () => {
      errorForPolicy.style.display = policyCheckbox.checked ? "none" : "block";
    });
  
    // Function to validate dealership input
    function validateDealership() {
      const selectedRegion = regionSelect.value;
      if (!selectedRegion) return false;
  
      const availableDealers = dealersByRegion[selectedRegion] || [];
      const inputDealer = dealershipInput.value.trim();
  
      // Check if input exactly matches one of the available dealers
      const isValid = availableDealers.includes(inputDealer);
  
      // Show or hide the error message based on validation
      errorForDealership.style.display = isValid ? "none" : "block";
  
      return isValid;
    }
  
    // Allow users to type and validate input
    dealershipInput.addEventListener("input", validateDealership);
  
    function validateForm() {
      let isValid = true;
  
      if (!validateDealership()) {
        isValid = false;
      }
  
      // Use the enhanced name validation
      if (!validateName()) {
        isValid = false;
      }
  
      // Use the enhanced email validation
      if (!validateEmails()) {
        isValid = false;
      }
  
      if (!mobileNumberInput.value.trim()) {
        errorForMobileNumber.style.display = "block";
        isValid = false;
      }
  
      if (!natureOfConcernInput.value.trim()) {
        errorForConcern.style.display = "block";
        isValid = false;
      }
  
      if (!messageInput.value.trim()) {
        errorForMessage.style.display = "block";
        isValid = false;
      }
  
      if (!policyCheckbox.checked) {
        errorForPolicy.style.display = "block";
        isValid = false;
      }
  
      // Disable or enable submit button based on validation
      submitButton.disabled = !isValid;
      return isValid;
    }
  
    // ✅ Attach validation listeners to input fields to enable/disable submit button dynamically
    [
      firstNameInput,
      lastNameInput,
      emailInput,
      confirmEmailInput,
      mobileNumberInput,
      natureOfConcernInput,
      messageInput,
      policyCheckbox,
    ].forEach((input) => {
      input.addEventListener("input", validateForm);
    });
  
    regionSelect.addEventListener("change", validateForm);
    dealershipInput.addEventListener("input", validateForm);
  
    async function submitForm() {
      try {
        const data = {
          email: form["Email"].value,
          subject: "Get In Touch",
          description: messageInput.value.trim() || "Need help",
          priority: 1,
          source: 9,
          status: 2,
          tags: ["Website"],
          custom_fields: {
            cf_first_name: form["First-Name"].value.trim(),
            cf_last_name: form["Last-Name"].value.trim(),
            cf_nature_of_concern: natureOfConcernInput.value,
            cf_concern_dealer: dealershipInput.value.trim(),
            cf_mobile_number: form["Mobile-Number"].value.trim(),
          },
        };
  
        submitButton.value = "Sending...";
  
        const response = await fetch(
          "https://contact-form-handler.royettemillares-co.workers.dev/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data),
          }
        );
  
        if (!response.ok) throw new Error("Failed to submit");
  
        form.style.display = "none";
        form.nextElementSibling.style.display = "block";
      } catch (error) {
        console.error("Submission Error:", error);
        submitButton.value = "SUBMIT ENQUIRY";
      }
    }
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const isFormValid = validateForm();
      if (isFormValid === true) {
        await submitForm();
      } else {
        submitButton.disabled = true;
      }
    });
  
    form.addEventListener("keypress", (event) => {
      if (event.key === "Enter") event.preventDefault();
    });
  });
  
