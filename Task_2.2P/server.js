const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory array to store quotes
let quotes = [
    "The best way to predict the future is to invent it.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "Do not wait to strike till the iron is hot; but make it hot by striking."
];

// GET endpoint to retrieve a random quote
app.get('/api/quote', (req, res) => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    res.json({ quote: quotes[randomIndex] });
});

// GET endpoint to calculate square of a number
app.get('/square', (req, res) => {
    const num = parseFloat(req.query.num);
    if (isNaN(num)) {
        return res.status(400).send('Please provide a valid number');
    }
    const square = num * num;
    res.send(`The square of ${num} is: ${square}`);
});

// GET endpoint to perform calculator operations
app.get('/calculate', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);
    const operation = req.query.operation;
    
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).send('Please provide valid numbers');
    }

    let result;
    switch(operation) {
        case 'add':
            result = num1 + num2;
            break;
        case 'subtract':
            result = num1 - num2;
            break;
        case 'multiply':
            result = num1 * num2;
            break;
        case 'divide':
            if (num2 === 0) {
                return res.status(400).send('Cannot divide by zero');
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).send('Invalid operation');
    }

    res.send(`Result: ${result}`);
});

app.listen(PORT, () => {
    console.log('App is listening on port: ' + PORT);
});