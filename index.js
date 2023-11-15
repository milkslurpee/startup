const express = require('express');
const session = require('express-session');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;


app.use(express.json());
let redeemedCodes = [];
let users = [];

app.use(
  session({
    secret: 'J$986587muncy',
    resave: false,
    saveUninitialized: true,
  })
);

function authenticateUser(req, res, next) {
  const user = req.session.user;

  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}

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

app.get('/api/scores', (req, res) => {
  const sortedUsers = [...users].sort((a, b) => b.points - a.points);
  res.json(sortedUsers);
});


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {

    const foundUser = users.find(user => user.username === username);

    if (foundUser) {
      if (foundUser.password === password) {
        const authenticatedUser = foundUser;
        req.session.user = authenticatedUser; 
        res.json({ success: true, message: 'Login successful!', user: authenticatedUser });
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

function authenticateUser(req, res, next) {
  const { user } = req.session;
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
}

app.post('/api/redeem', authenticateUser, (req, res) => {
    const { code } = req.body;
    currentUser = req.user;
  
    if (!code) {
      return res.json({ success: false, message: 'Please provide a redemption code.' });
    }
  
    const validCodes = ['102956', '347159', '650535'];
  
    if (validCodes.includes(code)) {
  
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