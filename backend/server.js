const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app
  .route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    let data = req.body.data || "";

    // Sanitize input: Replace curly quotes with straight quotes
    data = data.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

    // Convert string to array
    try {
      data = JSON.parse(data);
    } catch (error) {
      return res.status(400).json({
        is_success: false,
        message: "Invalid input format. Please provide a valid JSON array.",
      });
    }

    const numbers = [];
    const alphabets = [];
    let highest_lowercase_alphabet = "";

    // Process the array to separate numbers and alphabets
    for (const item of data) {
      if (!isNaN(item)) {
        numbers.push(item.toString()); // convert number to string
      } else if (item.length === 1 && isNaN(item)) {
        alphabets.push(item);
        if (
          !highest_lowercase_alphabet ||
          item.toLowerCase() > highest_lowercase_alphabet.toLowerCase()
        ) {
          highest_lowercase_alphabet = item.toLowerCase();
        }
      }
    }

    res.json({
      is_success: true,
      user_id: "john_doe_17091999",
      email: "john@xyz.com",
      roll_number: "ABCD123",
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: [highest_lowercase_alphabet],
    });
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});