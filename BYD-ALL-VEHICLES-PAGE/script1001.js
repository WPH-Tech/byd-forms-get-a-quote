document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const filterForm = document.querySelector(
    'form[fs-cmsfilter-element="filters"]'
  );
  const searchForm = document.getElementById("all-vehicles-search-form");
  const resultCountEl = document.querySelector("#results-count");
  const totalCountEl = document.querySelector("#items-count");
  const emptyStateEl = document.querySelector(".filters2_empty");
  const productList = document.querySelector(".product1_list");
  const resetButtons = document.querySelectorAll(
    '[fs-cmsfilter-element="reset"]'
  );
  const clearAllButton = document.getElementById("reset-all-filters");
  const powertrainOptions = document.querySelectorAll(
    ".filters2_category-link"
  );
  const vehicleTypeCheckboxes = document.querySelectorAll(
    ".filters2_form-checkbox1 input"
  );
  const searchInput = document.getElementById("input-search");
  const minPriceInput = document.getElementById("filter-pricing-minimum");
  const maxPriceInput = document.getElementById("filter-pricing-maximum");
  const sortOptions = document.querySelectorAll(".dropdown1_dropdown-link");

  // Store original DOM structure
  const originalItems = Array.from(document.querySelectorAll(".product1_item"));
  console.log("Items found:", originalItems.length, originalItems);
  let currentItems = [...originalItems];

  function updateDOM(filteredItems) {
    // Clear current items
    productList.innerHTML = "";

    // Add filtered items back to DOM
    filteredItems.forEach((item) => {
      productList.appendChild(item);
    });

    // Update counts and empty state
    const visibleCount = filteredItems.length;
    resultCountEl.textContent = visibleCount;
    emptyStateEl.style.display = visibleCount === 0 ? "block" : "none";

    // Store current items
    currentItems = filteredItems;
  }

  function filterVehicles() {
    const selectedPowertrain = document.querySelector(
      ".filters2_category-link.w--current"
    )?.textContent;

    // Map selected powertrain to dataset value
    const powertrainMap = {
      "Full Electric": "Full Electric",
      DMO: "DMO",
      "Super DM-i": "Super DM-i",
    };

    const powertrainValue = powertrainMap[selectedPowertrain];

    const selectedVehicleTypes = Array.from(vehicleTypeCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.nextElementSibling.textContent);
    const searchTerm = searchInput.value.toLowerCase();
    const minPrice = parseFloat(minPriceInput.value) || 0;
    const maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    const filteredItems = originalItems.filter((vehicle) => {
      const powertrainMatch =
        !selectedPowertrain || vehicle.dataset.powertrain === powertrainValue;

      const vehicleTypeMatch =
        selectedVehicleTypes.length === 0 ||
        selectedVehicleTypes.includes(vehicle.dataset.vehicleType);

      const searchMatch =
        !searchTerm ||
        vehicle.dataset.carName.toLowerCase().includes(searchTerm);

      const priceValue =
        vehicle.dataset.carPrice === "TBD"
          ? 0
          : parseFloat(vehicle.dataset.carPrice.replace(/,/g, ""));
      const priceMatch =
        priceValue >= minPrice &&
        (maxPrice === Infinity || priceValue <= maxPrice);

      return powertrainMatch && vehicleTypeMatch && searchMatch && priceMatch;
    });

    updateDOM(filteredItems);
  }

  function resetFilters(filterGroup = null) {
    if (filterGroup) {
      // Reset specific filter group
      if (filterGroup.classList.contains("filters2_filter-group")) {
        // Check if this is the Vehicle Type filter group
        if (
          filterGroup
            .querySelector(".text-size-medium")
            ?.textContent.includes("Vehicle Type")
        ) {
          const checkboxes = filterGroup.querySelectorAll(
            ".filters2_form-checkbox1"
          );
          checkboxes.forEach((label) => {
            // Reset the actual checkbox input
            const input = label.querySelector('input[type="checkbox"]');
            if (input) {
              input.checked = false;
              input.dispatchEvent(new Event("change"));
            }
            // Reset the Webflow custom checkbox visual
            const customCheckbox = label.querySelector(".w-checkbox-input");
            if (customCheckbox) {
              customCheckbox.classList.remove("w--redirected-checked");
            }
          });
        }
        // Check if this is the pricing filter group
        else if (
          filterGroup
            .querySelector(".text-size-medium")
            ?.textContent.includes("Pricing")
        ) {
          const minInput = filterGroup.querySelector("#filter-pricing-minimum");
          const maxInput = filterGroup.querySelector("#filter-pricing-maximum");
          if (minInput) {
            minInput.value = "";
            minInput.dispatchEvent(new Event("input"));
          }
          if (maxInput) {
            maxInput.value = "";
            maxInput.dispatchEvent(new Event("input"));
          }
        }
      }
    } else {
      // Reset all filters
      filterForm.reset();

      // Reset all vehicle type checkboxes
      document.querySelectorAll(".filters2_form-checkbox1").forEach((label) => {
        const input = label.querySelector('input[type="checkbox"]');
        if (input) {
          input.checked = false;
          input.dispatchEvent(new Event("change"));
        }
        const customCheckbox = label.querySelector(".w-checkbox-input");
        if (customCheckbox) {
          customCheckbox.classList.remove("w--redirected-checked");
        }
      });

      // Reset pricing inputs
      const minPriceInput = document.querySelector("#filter-pricing-minimum");
      const maxPriceInput = document.querySelector("#filter-pricing-maximum");
      if (minPriceInput) {
        minPriceInput.value = "";
        minPriceInput.dispatchEvent(new Event("input"));
      }
      if (maxPriceInput) {
        maxPriceInput.value = "";
        maxPriceInput.dispatchEvent(new Event("input"));
      }

      powertrainOptions.forEach((el) => el.classList.remove("w--current"));
      sortOptions.forEach((el) => el.classList.remove("w--current"));
      searchInput.value = "";
    }

    // Reset to original state and trigger filter update
    updateDOM(originalItems);
    filterVehicles();
  }

  function sortVehicles(sortField) {
    const sortFunctions = {
      mostPopular: (a, b) =>
        (b.dataset.mostPopular === "yes") - (a.dataset.mostPopular === "yes"),
      mostRecent: (a, b) =>
        new Date(b.dataset.createdOn) - new Date(a.dataset.createdOn),
      "a to z": (a, b) => a.dataset.carName.localeCompare(b.dataset.carName),
      "z to a": (a, b) => b.dataset.carName.localeCompare(a.dataset.carName),
      "price-low-to-high": (a, b) => {
        const priceA =
          a.dataset.carPrice === "TBD"
            ? 0
            : parseFloat(a.dataset.carPrice.replace(/,/g, ""));
        const priceB =
          b.dataset.carPrice === "TBD"
            ? 0
            : parseFloat(b.dataset.carPrice.replace(/,/g, ""));
        return priceA - priceB;
      },
      "price-high-to-low": (a, b) => {
        const priceA =
          a.dataset.carPrice === "TBD"
            ? 0
            : parseFloat(a.dataset.carPrice.replace(/,/g, ""));
        const priceB =
          b.dataset.carPrice === "TBD"
            ? 0
            : parseFloat(b.dataset.carPrice.replace(/,/g, ""));
        return priceB - priceA;
      },
    };

    const sortedItems = [...currentItems].sort(sortFunctions[sortField]);
    updateDOM(sortedItems);

    // Update current sorting option in dropdown
    sortOptions.forEach((link) => {
      link.classList.toggle(
        "w--current",
        link.getAttribute("sort-field") === sortField
      );
    });
  }

  function setupEventListeners() {
    // Prevent form submission on enter key
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      return false;
    });

    // Also prevent enter key specifically
    searchForm.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        return false;
      }
    });
    // Powertrain filters
    powertrainOptions.forEach((option) => {
      option.addEventListener("click", (e) => {
        e.preventDefault();
        powertrainOptions.forEach((opt) => opt.classList.remove("w--current"));
        e.target.classList.add("w--current");
        filterVehicles();
      });
    });

    // Vehicle Type checkboxes
    vehicleTypeCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", filterVehicles);
    });

    // Search input
    searchInput.addEventListener("input", filterVehicles);

    // Price inputs
    minPriceInput.addEventListener("input", filterVehicles);
    maxPriceInput.addEventListener("input", filterVehicles);

    // Reset buttons
    resetButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const filterGroup = e.target.closest(".filters2_filter-group");
        resetFilters(filterGroup);
      });
    });

    // Clear all filters
    clearAllButton.addEventListener("click", (e) => {
      e.preventDefault();
      resetFilters();
    });

    // Sorting
    sortOptions.forEach((sortOption) => {
      sortOption.addEventListener("click", (e) => {
        e.preventDefault();
        const sortField = e.target.getAttribute("sort-field");
        sortVehicles(sortField);
      });
    });
  }

  // Store total count
  totalCountEl.textContent = originalItems.length;
  if (totalCountEl) {
    totalCountEl.textContent = originalItems.length;
    console.log("Total items count:", originalItems.length);
  } else {
    console.warn("Total count element not found in the DOM");
  }
  // Initial setup
  setupEventListeners();
  updateDOM(originalItems);
});