const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));


app.post('/api/signup', (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (username && password && confirmPassword) {
    if (password !== confirmPassword) {
      res.json({ success: false, message: 'Passwords do not match. Please re-enter.' });
      return;
    }

    const users = retrieveUsersFromDatabase();

    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
      res.json({ success: false, message: 'Username already exists. Please choose a different one.' });
    } else {
      const newUser = {
        username,
        password,
        points: 0,
      };

      users.push(newUser);
      updateDatabaseWithNewUser(users);

      res.json({ success: true, message: 'Sign up successful! Please log in with your new credentials.' });
    }
  } else {
    res.json({ success: false, message: 'Please fill in all the fields.' });
  }
});

// Define an endpoint for user login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const users = retrieveUsersFromDatabase();

    const foundUser = users.find(user => user.username === username);

    if (foundUser) {
      if (foundUser.password === password) {
        res.json({ success: true, message: 'Login successful!', user: foundUser });
      } else {
        res.json({ success: false, message: 'Incorrect password. Please try again.' });
      }
    } else {
      res.json({ success: false, message: 'User not found. Please sign up.' });
    }
  } else {
    res.json({ success: false, message: 'Please enter both username and password.' });
  }
});

// Define an endpoint for code redemption
app.post('/api/redeem', (req, res) => {
  const { code } = req.body;
  const currentUser = req.user;

  if (!code) {
    return res.json({ success: false, message: 'Please provide a redemption code.' });
  }

  const validCodes = ['102956', '347159', '650535'];

  if (validCodes.includes(code)) {
    if (!currentUser) {
      return res.json({ success: false, message: 'User not found.' });
    }

    if (!currentUser.redeemedCodes) {
      currentUser.redeemedCodes = [];
    }

    if (currentUser.redeemedCodes.includes(code)) {
      return res.json({ success: false, message: 'Code already redeemed.' });
    }

    currentUser.points += 10;
    currentUser.redeemedCodes.push(code);
    updateDatabaseWithRedeemedCode(currentUser);

    return res.json({ success: true, message: 'Points redeemed successfully!', user: currentUser });
  } else {
    return res.json({ success: false, message: 'Invalid redemption code.' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});