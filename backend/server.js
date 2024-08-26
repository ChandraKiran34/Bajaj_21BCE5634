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
    let data = req.body.data || [];
    console.log("hello call");

    const numbers = [];
    const alphabets = [];
    let highest_lowercase_alphabet = "";

    // Process the array to separate numbers and alphabets
    for (const item of data) {
      const itemAsString = item.toString();
      
      // Check if item is a numeric string and convert to number if it is
      if (!isNaN(itemAsString) && itemAsString.trim() !== "") {
        numbers.push(itemAsString); // Keep it as a string in your response
      } else if (typeof itemAsString === 'string' && itemAsString.length === 1) {
        alphabets.push(itemAsString);
        // Check if the character is a lowercase letter
        if (itemAsString >= 'a' && itemAsString <= 'z') {
          // Update highest lowercase alphabet if the current one has a higher ASCII value
          if (
            highest_lowercase_alphabet === "" ||
            itemAsString > highest_lowercase_alphabet
          ) {
            highest_lowercase_alphabet = itemAsString;
          }
        }
      }
    }

    res.json({
      is_success: true,
      user_id: "DORADLA PARDHA SARADHI RAJU",
      email: "pardha.saradhiraju2021@vitstudent.ac.in",
      roll_number: "21BCE5634",
      numbers: numbers,
      alphabets: alphabets,
      highest_lowercase_alphabet: highest_lowercase_alphabet, // return as string
    });
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
