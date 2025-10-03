// Salary Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const form = document.getElementById('salaryForm');
    const grossSalaryInput = document.getElementById('grossSalary');
    const paidLeaveInput = document.getElementById('paidLeave');
    const unpaidLeaveInput = document.getElementById('unpaidLeave');
    const daysInMonthInput = document.getElementById('daysInMonth');
    const resultsSection = document.getElementById('results');
    const dailySalarySpan = document.getElementById('dailySalary');
    const deductionSpan = document.getElementById('deduction');
    const finalSalarySpan = document.getElementById('finalSalary');
    const calculateBtn = document.querySelector('.calculate-btn');

    // Set default value for days in month (current month)
    function setCurrentMonthDays() {
        const now = new Date();
        const daysInCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        daysInMonthInput.value = daysInCurrentMonth;
    }

    // Format number with thousands separator and two decimal places
    function formatCurrency(number) {
        return '₹' + new Intl.NumberFormat('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    }

    // Validate input values
    function validateInputs() {
        const grossSalary = parseFloat(grossSalaryInput.value);
        const paidLeave = parseFloat(paidLeaveInput.value) || 0;
        const unpaidLeave = parseFloat(unpaidLeaveInput.value) || 0;
        const daysInMonth = parseInt(daysInMonthInput.value);

        // Check if gross salary is provided and positive
        if (!grossSalary || grossSalary <= 0) {
            showError('Please enter a valid gross monthly salary.');
            return false;
        }

        // Check if days in month is valid
        if (!daysInMonth || daysInMonth < 28 || daysInMonth > 31) {
            showError('Days in month must be between 28 and 31.');
            return false;
        }

        // Check if unpaid leave is not negative
        if (unpaidLeave < 0) {
            showError('Unpaid leave cannot be negative.');
            return false;
        }

        // Check if paid leave is not negative
        if (paidLeave < 0) {
            showError('Paid leave cannot be negative.');
            return false;
        }

        return true;
    }

    // Show error message
    function showError(message) {
        // Remove existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            background-color: #f8d7da;
            color: #721c24;
            padding: 12px 16px;
            border-radius: 8px;
            margin-bottom: 1rem;
            border: 1px solid #f5c6cb;
            font-weight: 500;
        `;
        errorDiv.textContent = message;

        // Insert error message before the form
        form.parentNode.insertBefore(errorDiv, form);

        // Hide results section
        resultsSection.style.display = 'none';

        // Auto-remove error after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }

    // Calculate salary
    function calculateSalary() {
        if (!validateInputs()) {
            return;
        }

        // Remove any existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Get input values
        const grossSalary = parseFloat(grossSalaryInput.value);
        const paidLeave = parseFloat(paidLeaveInput.value) || 0;
        const unpaidLeave = parseFloat(unpaidLeaveInput.value) || 0;
        const daysInMonth = parseInt(daysInMonthInput.value);

        // Perform calculations
        const dailySalary = grossSalary / daysInMonth;
        
        // Calculate effective unpaid leave (unpaid leave - paid leave)
        // If employee doesn't use leave (0), paid leave carries forward to next month
        const effectiveUnpaidLeave = Math.max(0, unpaidLeave - paidLeave);
        
        const deduction = dailySalary * effectiveUnpaidLeave;
        const finalSalary = grossSalary - deduction;

        // Update display
        dailySalarySpan.textContent = formatCurrency(dailySalary);
        deductionSpan.textContent = formatCurrency(deduction);
        finalSalarySpan.textContent = formatCurrency(finalSalary);
        
        // Update deduction label to show effective unpaid leave
        const deductionLabel = document.querySelector('#deduction').previousElementSibling;
        if (effectiveUnpaidLeave !== unpaidLeave) {
            deductionLabel.textContent = `Deduction Amount (${effectiveUnpaidLeave} days):`;
        } else {
            deductionLabel.textContent = 'Deduction Amount:';
        }

        // Show results section
        resultsSection.style.display = 'block';

        // Scroll to results if on mobile
        if (window.innerWidth <= 768) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        calculateSalary();
    });

    // Real-time calculation on input change
    function setupRealTimeCalculation() {
        const inputs = [grossSalaryInput, paidLeaveInput, unpaidLeaveInput, daysInMonthInput];
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                // Clear any existing error messages
                const existingError = document.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }

                // Only calculate if gross salary and days in month are provided
                if (grossSalaryInput.value && daysInMonthInput.value) {
                    calculateSalary();
                } else {
                    resultsSection.style.display = 'none';
                }
            });

            // Also listen for blur events to ensure calculation happens
            input.addEventListener('blur', function() {
                if (grossSalaryInput.value && daysInMonthInput.value) {
                    calculateSalary();
                }
            });
        });
    }

    // Initialize the calculator
    function init() {
        setCurrentMonthDays();
        setupRealTimeCalculation();
        
        // Set default value for paid leave if not already set
        if (!paidLeaveInput.value) {
            paidLeaveInput.value = '1';
        }
    }

    // Initialize when DOM is loaded
    init();

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter to calculate
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            calculateSalary();
        }
    });

    // Add input validation styling
    function addInputValidationStyling() {
        const inputs = [grossSalaryInput, paidLeaveInput, unpaidLeaveInput, daysInMonthInput];
        
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value && this.checkValidity()) {
                    this.style.borderColor = '#27ae60';
                } else if (this.value && !this.checkValidity()) {
                    this.style.borderColor = '#e74c3c';
                } else {
                    this.style.borderColor = '#e1e8ed';
                }
            });
        });
    }

    addInputValidationStyling();
});
