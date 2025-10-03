# Salary Calculator 💰

A simple, user-friendly web application that calculates an employee's final monthly salary after deducting unpaid leave, with support for paid leave carryover.

## 🌟 Features

- **Real-time Calculation**: Instant salary computation as you type
- **Paid Leave Carryover**: Automatically handles paid leave reducing unpaid leave deductions
- **Indian Currency Support**: Displays amounts in Indian Rupees (₹) with proper formatting
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Input Validation**: Comprehensive validation with helpful error messages
- **Accessibility**: Built with semantic HTML and proper ARIA attributes
- **Cross-browser Compatible**: Works on all modern browsers

## 🧮 How It Works

### Calculation Logic

1. **Daily Salary** = Gross Monthly Salary ÷ Days in Month
2. **Effective Unpaid Leave** = max(0, Unpaid Leave - Paid Leave)
3. **Deduction Amount** = Daily Salary × Effective Unpaid Leave
4. **Final Salary** = Gross Monthly Salary - Deduction Amount

### Paid Leave Carryover

If an employee has paid leave available, it reduces the unpaid leave deduction:
- If Unpaid Leave ≤ Paid Leave: **No deduction is made**
- If Unpaid Leave > Paid Leave: **Only the excess is deducted**

## 📋 Input Fields

| Field | Type | Constraints | Default | Description |
|-------|------|-------------|---------|-------------|
| Gross Monthly Salary | Number | min="0", step="0.01" | - | Employee's monthly salary |
| Paid Leave (days) | Number | min="0", step="0.01" | 1 | Available paid leave days |
| Unpaid Leave (days) | Number | min="0", step="0.01" | 0 | Unpaid leave taken |
| Days in Month | Integer | min="28", max="31" | Current month | Number of working days |

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/salary-calculator.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd salary-calculator
   ```

3. **Open the application**
   - Double-click `index.html` to open in your default browser
   - Or serve it using a local web server for better performance

### Usage

1. **Enter your salary details**:
   - Input your gross monthly salary
   - Specify paid leave days (defaults to 1)
   - Enter unpaid leave days taken
   - Days in month auto-populates to current month

2. **View results**:
   - Daily salary calculation
   - Deduction amount (if any)
   - Final salary after deductions

3. **Real-time updates**:
   - Results update automatically as you type
   - No need to click calculate button

## 💡 Example Calculation

**Input:**
- Gross Monthly Salary: ₹55,000
- Paid Leave: 1 day
- Unpaid Leave: 0.5 days
- Days in Month: 30

**Calculation:**
- Daily Salary: ₹55,000 ÷ 30 = ₹1,833.33
- Effective Unpaid Leave: max(0, 0.5 - 1) = 0 days
- Deduction: ₹1,833.33 × 0 = ₹0.00
- **Final Salary: ₹55,000.00**

## 🛠️ Technical Details

### Built With

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox and Grid layouts
- **Vanilla JavaScript**: No external dependencies
- **Intl API**: International number formatting

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### File Structure

```
salary-calculator/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── script.js           # Calculation logic and interactivity
└── README.md           # Project documentation
```

## 🎨 Customization

### Styling
- Modify `style.css` to change colors, fonts, or layout
- CSS variables are used for easy theme customization
- Responsive breakpoints can be adjusted

### Functionality
- Edit `script.js` to modify calculation logic
- Add new validation rules or input fields
- Extend with additional features like tax calculations

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with modern web standards
- Inspired by the need for simple salary calculation tools
- Thanks to all contributors who help improve this project

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check the existing issues for solutions
- Contact the maintainers

---

**Made with ❤️ for the Indian workforce**
