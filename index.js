const express = require('express');
const app = express();


const port = process.argv.length > 2 ? process.argv[2] : 3000;


app.use(express.json());
let redeemedCodes = [];
let users = [];



app.use(express.static('public'));

app.post('/api/signup', (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (username && password && confirmPassword) {
    if (password !== confirmPassword) {
      res.json({ success: false, message: 'Passwords do not match. Please re-enter.' });
      return;
    }

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


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {

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

app.post('/api/redeem', (req, res) => {
    const { code } = req.body;
    const currentUser = req.user; // Assuming you have user authentication middleware
  
    if (!code) {
      return res.json({ success: false, message: 'Please provide a redemption code.' });
    }
  
    const validCodes = ['102956', '347159', '650535'];
  
    if (validCodes.includes(code)) {
      if (!currentUser) {
        return res.json({ success: false, message: 'User not found.' });
      }
  
      if (redeemedCodes.includes(code)) {
        return res.json({ success: false, message: 'Code already redeemed.' });
      }
  
      redeemedCodes.push(code);
  
      if (!currentUser.redeemedCodes) {
        currentUser.redeemedCodes = [];
      }
  
      currentUser.points += 10;
      currentUser.redeemedCodes.push(code);
  
      return res.json({ success: true, message: 'Points redeemed successfully!', user: currentUser });
    } else {
      return res.json({ success: false, message: 'Invalid redemption code.' });
    }
  });
  

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});