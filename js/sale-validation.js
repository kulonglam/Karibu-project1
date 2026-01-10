/**
 * sale-validation.js - Validation script for cash sale and credit sale forms
 * Handles real-time validation and form submission for both sale types
 */

// Validation rules for cash sale form
const cashSaleValidation = {
  sale_date_time: {
    required: true,
    message: 'Sale date and time is required',
    validate: (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
    errorMessage: 'Sale date cannot be in the past',
  },
  customer_name: {
    required: false,
    message: 'Customer name must be at least 2 characters',
    validate: (value) => {
      if (!value) return true; // Optional field
      return value.trim().length >= 2;
    },
  },
  phone: {
    required: false,
    message: 'Phone must be 10 digits',
    validate: (value) => {
      if (!value) return true;
      return /^\d{10}$/.test(value);
    },
  },
  customer_type: {
    required: true,
    message: 'Customer type must be selected',
    validate: (value) => {
      return value && ['Walk-in', 'Regular', 'Credit'].includes(value);
    },
  },
  item_name: {
    required: true,
    message: 'Product name is required',
    validate: (value) => {
      return value && value.trim().length > 0;
    },
  },
  item_category: {
    required: true,
    message: 'Product category is required',
    validate: (value) => {
      return value && value !== '';
    },
  },
  quantity_sold: {
    required: true,
    message: 'Quantity must be greater than 0',
    validate: (value) => {
      const qty = parseFloat(value);
      return !isNaN(qty) && qty > 0;
    },
  },
  unitPriceSale: {
    required: true,
    message: 'Unit price must be greater than 0',
    validate: (value) => {
      const price = parseFloat(value);
      return !isNaN(price) && price > 0;
    },
  },
  discount: {
    required: false,
    message: 'Discount must be between 0 and 100',
    validate: (value) => {
      if (!value) return true;
      const discount = parseFloat(value);
      return !isNaN(discount) && discount >= 0 && discount <= 100;
    },
  },
  amount_paid: {
    required: true,
    message: 'Amount paid must be greater than 0',
    validate: (value) => {
      const paid = parseFloat(value);
      return !isNaN(paid) && paid > 0;
    },
  },
  paymentMethodSale: {
    required: true,
    message: 'Payment method must be selected',
    validate: (value) => {
      return value && ['Cash', 'Mobile Money', 'Card'].includes(value);
    },
  },
  sales_person: {
    required: true,
    message: 'Sales agent name is required',
    validate: (value) => {
      return value && value.trim().length >= 2;
    },
  },
};

// Validation rules for credit sale form
const creditSaleValidation = {
  buyer_name: {
    required: true,
    message: 'Buyer name must be at least 2 characters',
    validate: (value) => {
      return value && value.trim().length >= 2;
    },
  },
  nin: {
    required: true,
    message: 'NIN must be exactly 14 characters (alphanumeric)',
    validate: (value) => {
      return value && /^[A-Za-z0-9]{14}$/.test(value);
    },
  },
  contacts: {
    required: true,
    message: 'Contact information is required',
    validate: (value) => {
      return value && /^(\+256|0)[0-9]{9}$/.test(value);
    },
  },
  location: {
    required: true,
    message: 'Location must be at least 2 characters',
    validate: (value) => {
      return value && value.trim().length >= 2;
    },
  },
  produce_name: {
    required: true,
    message: 'Produce name must be at least 2 characters',
    validate: (value) => {
      return value && value.trim().length >= 2;
    },
  },
  produce_type: {
    required: true,
    message: 'Produce type must be selected',
    validate: (value) => {
      return (
        value &&
        ['cereals', 'legumes', 'root_tubers', 'coffee', 'other'].includes(value)
      );
    },
  },
  tonnage: {
    required: true,
    message: 'Tonnage must be greater than 0',
    validate: (value) => {
      const tonnage = parseFloat(value);
      return !isNaN(tonnage) && tonnage > 0;
    },
  },
  dispatch_date: {
    required: true,
    message: 'Dispatch date is required',
    validate: (value) => {
      if (!value) return false;
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    },
  },
  amount_due: {
    required: true,
    message: 'Amount due must be at least 10,000 UGX',
    validate: (value) => {
      const amount = parseFloat(value);
      return !isNaN(amount) && amount >= 10000;
    },
  },
  due_date: {
    required: true,
    message: 'Due date is required and must be after dispatch date',
    validate: (value, formData) => {
      if (!value) return false;
      const dueDate = new Date(value);
      const dispatchDate = new Date(formData.dispatch_date);
      return dueDate > dispatchDate;
    },
  },
  sales_agent: {
    required: true,
    message: 'Sales agent name must be at least 2 characters',
    validate: (value) => {
      return value && value.trim().length >= 2;
    },
  },
};

/**
 * Display validation error message for a field
 * @param {HTMLElement} field - Form field element
 * @param {string} message - Error message to display
 */
function showFieldError(field, message) {
  // Remove existing error message if any
  const existingError = field.parentElement.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }

  // Create and display error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message text-danger small mt-1';
  errorDiv.textContent = message;
  field.parentElement.appendChild(errorDiv);

  // Add error styling to field
  field.classList.add('is-invalid');
}

/**
 * Clear validation error message for a field
 * @param {HTMLElement} field - Form field element
 */
function clearFieldError(field) {
  const errorDiv = field.parentElement.querySelector('.error-message');
  if (errorDiv) {
    errorDiv.remove();
  }
  field.classList.remove('is-invalid');
}

/**
 * Validate a single field against rules
 * @param {HTMLElement} field - Form field to validate
 * @param {object} rule - Validation rule for the field
 * @param {object} formData - Complete form data for cross-field validation
 * @returns {boolean} True if valid, false otherwise
 */
function validateField(field, rule, formData = {}) {
  const value = field.value.trim();

  // Check if required
  if (rule.required && !value) {
    showFieldError(field, rule.message);
    return false;
  }

  // If not required and empty, it's valid
  if (!rule.required && !value) {
    clearFieldError(field);
    return true;
  }

  // Run custom validation
  if (rule.validate) {
    const isValid = rule.validate(value, formData);
    if (!isValid) {
      const errorMsg = rule.errorMessage || rule.message;
      showFieldError(field, errorMsg);
      return false;
    }
  }

  clearFieldError(field);
  return true;
}

/**
 * Initialize validation for cash sale form
 */
function initializeCashSaleValidation() {
  const form = document.querySelector('form[action="/submit"]');
  if (!form) return;

  // Add real-time validation listeners
  Object.keys(cashSaleValidation).forEach((fieldName) => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;

    field.addEventListener('blur', () => {
      const formData = new FormData(form);
      const formDataObj = Object.fromEntries(formData);
      validateField(field, cashSaleValidation[fieldName], formDataObj);
    });

    field.addEventListener('input', () => {
      const formData = new FormData(form);
      const formDataObj = Object.fromEntries(formData);
      validateField(field, cashSaleValidation[fieldName], formDataObj);
    });
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData);
    let isFormValid = true;

    // Validate all fields
    Object.keys(cashSaleValidation).forEach((fieldName) => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (!field) return;

      const isValid = validateField(
        field,
        cashSaleValidation[fieldName],
        formDataObj
      );
      if (!isValid) {
        isFormValid = false;
      }
    });

    // Check if amount paid is sufficient
    const totalAmount = parseFloat(
      form.querySelector('#totalAmountSale').value
    );
    const amountPaid = parseFloat(form.querySelector('#amount_paid').value);

    if (amountPaid < totalAmount) {
      const amountPaidField = form.querySelector('#amount_paid');
      showFieldError(
        amountPaidField,
        `Amount paid (${amountPaid}) must be at least equal to total amount (${totalAmount})`
      );
      isFormValid = false;
    }

    if (isFormValid) {
      console.log('Cash sale form is valid', formDataObj);
      // Submit form or trigger further processing
      alert('Cash sale form submitted successfully!');
      // form.submit(); // Uncomment to actually submit
    } else {
      alert('Please fix the errors above before submitting');
    }
  });
}

/**
 * Initialize validation for credit sale form
 */
function initializeCreditSaleValidation() {
  const form = document.querySelector('form[action="/submit-credit"]');
  if (!form) return;

  // Add real-time validation listeners
  Object.keys(creditSaleValidation).forEach((fieldName) => {
    const field = form.querySelector(`[name="${fieldName}"]`);
    if (!field) return;

    field.addEventListener('blur', () => {
      const formData = new FormData(form);
      const formDataObj = Object.fromEntries(formData);
      validateField(field, creditSaleValidation[fieldName], formDataObj);
    });

    field.addEventListener('input', () => {
      const formData = new FormData(form);
      const formDataObj = Object.fromEntries(formData);
      validateField(field, creditSaleValidation[fieldName], formDataObj);
    });
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData);
    let isFormValid = true;

    // Validate all fields
    Object.keys(creditSaleValidation).forEach((fieldName) => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (!field) return;

      const isValid = validateField(
        field,
        creditSaleValidation[fieldName],
        formDataObj
      );
      if (!isValid) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      console.log('Credit sale form is valid', formDataObj);
      // Submit form or trigger further processing
      alert('Credit sale form submitted successfully!');
      // form.submit(); // Uncomment to actually submit
    } else {
      alert('Please fix the errors above before submitting');
    }
  });
}

/**
 * Wait for DOM elements to be available before initializing validation
 */
function waitForSaleFormsAndValidate() {
  // Check for cash sale form every 100ms
  const cashSaleCheck = setInterval(() => {
    const cashForm = document.querySelector('form[action="/submit"]');
    if (cashForm) {
      clearInterval(cashSaleCheck);
      initializeCashSaleValidation();
    }
  }, 100);

  // Check for credit sale form every 100ms
  const creditSaleCheck = setInterval(() => {
    const creditForm = document.querySelector('form[action="/submit-credit"]');
    if (creditForm) {
      clearInterval(creditSaleCheck);
      initializeCreditSaleValidation();
    }
  }, 100);

  // Stop checking after 10 seconds (forms should be loaded by then)
  setTimeout(() => {
    clearInterval(cashSaleCheck);
    clearInterval(creditSaleCheck);
  }, 10000);
}

// Initialize validation when DOM is ready
document.addEventListener('DOMContentLoaded', waitForSaleFormsAndValidate);

// Also try to initialize immediately in case DOM is already loaded
waitForSaleFormsAndValidate();
