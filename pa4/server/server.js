import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});