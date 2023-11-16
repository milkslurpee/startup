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
    saveUninitialized: false,
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

function generateUserId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

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
      const userId = generateUserId(); 
      const newUser = {
        userId,
        username,
        password,
        points: 0,
        redeemedCodes: [],
      };
      users.push(newUser);
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

  const foundUser = users.find(user => user.username === username && user.password === password);

  if (foundUser) {
    req.session.userId = foundUser.userId; 
    res.json({ success: true, message: 'Login successful!', user: foundUser });
  } else {
    res.json({ success: false, message: 'Incorrect username or password.' });
  }
});



app.post('/api/redeem', (req, res) => {
  const { code } = req.body;

  const currentUserIndex = users.findIndex(user => user.userId === req.session.userId);

  if (currentUserIndex === -1) {
    return res.json({ success: false, message: 'No user logged in.' });
  }

  const currentUser = users[currentUserIndex];

  if (!code) {
    return res.json({ success: false, message: 'Please provide a redemption code.' });
  }

  const validCodes = ['102956', '347159', '650535'];

  if (validCodes.includes(code)) {
    if (currentUser.redeemedCodes.includes(code)) {
      return res.json({ success: false, message: 'Code already redeemed.' });
    }

    redeemedCodes.push(code);
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