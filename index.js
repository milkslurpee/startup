const express = require('express');
const session = require('express-session');
const database = require('./database.js');
const { peerProxy } = require('./peerProxy.js');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

const httpservice = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const wss = peerProxy(httpservice);


app.use(express.json());
app.use(
  session({
    secret: 'J$986587muncy',
    resave: false,
    saveUninitialized: false,
  })
);


app.use(express.static('public'));

function generateUserId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

app.post('/api/signup', async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (username && password && confirmPassword) {
    if (password !== confirmPassword) {
      res.json({ success: false, message: 'Passwords do not match. Please re-enter.' });
      return;
    }

    try {
      const existingUser = await database.findUserByUsername(username);

      if (existingUser) {
        res.json({ success: false, message: 'Username already exists. Please choose a different one.' });
      } else {
        const userId = generateUserId();
        await database.addUser(username, password, userId); // Adjust based on your addUser function

        await wss.sendLeaderboardUpdateToClients();

        res.json({ success: true, message: 'Sign up successful! Please log in with your new credentials.' });
      }
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ success: false, message: 'Error signing up. Please try again.' });
    }
  } else {
    res.json({ success: false, message: 'Please fill in all the fields.' });
  }
});

// app.get('/api/scores', async (req, res) => {
//   try {
//     const leaderboard = await database.getLeaderboard();
//     res.json(leaderboard);
//   } catch (error) {
//     console.error('Error getting scores:', error);
//     res.status(500).json({ success: false, message: 'Error getting scores. Please try again.' });
//   }
// });


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await database.findUserByUsername(username);

    if (user && user.password === password) {
      req.session.userId = user.userId;
      res.json({ success: true, message: 'Login successful!', user });
    } else {
      res.json({ success: false, message: 'Incorrect username or password.' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Error during login. Please try again.' });
  }
});

app.post('/api/logout', async (req, res) => {
  if (req.session.userId) {
      req.session.destroy((err) => {
          if (err) {
              res.status(500).json('Error logging out');
          } else {
              res.send({ loggedOut: true });
          }
      });
  } else {
      res.send({ loggedOut: false });
  }
});

app.post('/api/redeem', async (req, res) => {
  const { code } = req.body;
  const userId = req.session.userId;

  if (!userId) {
    return res.json({ success: false, message: 'No user logged in.' });
  }

    const currentUser = await database.findUserById(userId);

    if (!currentUser) {
      return res.json({ success: false, message: 'User not found.' });
    }

    const validCodes = ['102956', '347159', '650535','1', '2', '3', '4', '5', '6'];

    if (validCodes.includes(code)) {
      if (currentUser.redeemedCodes.includes(code)) {
        return res.json({ success: false, message: 'Code already redeemed.' });
      }

      await database.updateUserPoints(userId, currentUser.points + 10);

      await database.addRedeemedCode(userId, code);

      await wss.sendLeaderboardUpdateToClients();

      const updatedUser = await database.findUserById(userId);
      return res.json({ success: true, message: 'Points redeemed successfully!', user: updatedUser });
    } else {
      return res.json({ success: false, message: 'Invalid redemption code.' });
    }
    
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
