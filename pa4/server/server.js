import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import { hashutil } from '../src/data/Hashutil.js';

const PORT = 5001;

const app = express();
app.use(cors());
app.use(express.json());

const db = await mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'leesin',
  database: 'facres',
  socketPath: '/tmp/mysql.sock'
});

app.get('/api/facilities', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM facilities');
    res.json(results);
  } catch (err) {
    console.error('Error fetching facilities:', err);
    res.status(500).json({ error: 'Failed to fetch facilities' });
  }
});

app.get('/api/facilities/:id', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM facilities WHERE id = ?', [req.params.id]);
    if (results.length === 0) {
      res.status(404).json({ error: 'Facility not found' });
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    console.error('Error fetching facility:', err);
    res.status(500).json({ error: 'Failed to fetch facility' });
  }
});

app.get('/api/reservations', async (req, res) => {
  try {
    const [results] = await db.query(`
      SELECT r.*, f.name as facility_name, f.image_source as facility_image_source, f.location as facility_location, f.only_for_suny as facility_only_for_suny
      FROM reservations r
      JOIN facilities f ON r.facility_id = f.id
    `);
    res.json(results);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

app.post('/api/reservations', async (req, res) => {
  try {
    const { reservation_date, user_number, is_suny_korea, purpose, facility_id, user_name } = req.body;
    const query = 'INSERT INTO reservations (reservation_date, user_number, is_suny_korea, purpose, facility_id, user_name) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [reservation_date, user_number, is_suny_korea, purpose, facility_id, user_name];
    const [result] = await db.query(query, values);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error creating reservation:', err);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

app.delete('/api/reservations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query('DELETE FROM reservations WHERE id = ?', [id]);
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Reservation not found' });
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error('Error deleting reservation:', err);
    res.status(500).json({ error: 'Failed to delete reservation' });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const { email, username, password, profile_image } = req.body;

    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = hashutil(email, password);

    const query = 'INSERT INTO users (email, username, password, profile_image) VALUES (?, ?, ?, ?)';
    const values = [email, username, hashedPassword, profile_image];
    const [result] = await db.query(query, values);

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Error signing up:', err);
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Wrong email or wrong password' });
    }
    
    const user = users[0];
    const hashedPassword = hashutil(email, password);
    
    if (hashedPassword !== user.password) {
      return res.status(401).json({ error: 'Wrong email or wrong password' });
    }
    
    res.json({
      id: user.id,
      email: user.email,
      username: user.username,
      profile_image: user.profile_image
    });
  } catch (err) {
    console.error('Error signing in:', err);
    res.status(500).json({ error: 'Failed to sign in' });
  }
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const [users] = await db.query('SELECT id, email, username, profile_image FROM users WHERE id = ?', [req.params.id]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(users[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.put('/api/user/:id/image', async (req, res) => {
  try {
    const { profile_image } = req.body;
    const userId = req.params.id;

    await db.query('UPDATE users SET profile_image = ? WHERE id = ?', [profile_image, userId]);
    res.status(200).json({ message: 'Profile image updated successfully' });
  } catch (err) {
    console.error('Error updating user image:', err);
    res.status(500).json({ error: 'Failed to update profile image' });
  }
});

app.put('/api/user/:id/password', async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id;

    const [users] = await db.query('SELECT email, password FROM users WHERE id = ?', [userId]);
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = users[0];
    const hashedCurrentPassword = hashutil(user.email, currentPassword);

    if (hashedCurrentPassword !== user.password) {
      console.log('currentPassword: ', currentPassword);
      console.log('email: ', user.email);
      console.log('hashedCurrentPassword: ', hashedCurrentPassword);
      console.log('user.password: ' , user.password);
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hashedNewPassword = hashutil(user.email, newPassword);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedNewPassword, userId]);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error updating password:', err);
    res.status(500).json({ error: 'Failed to update password' });
  }
});

app.put('/api/user/:id/name', async (req, res) => {
  try {
    const { newName } = req.body;
    const userId = req.params.id;

    await db.query('UPDATE users SET username = ? WHERE id = ?', [newName, userId]);

    res.status(200).json({ message: 'Name updated successfully' });
  } catch (err) {
    console.error('Error updating name:', err);
    res.status(500).json({ error: 'Failed to update name' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});