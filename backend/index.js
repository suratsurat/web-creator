const express = require('express');
const cors = require('cors');
const slugify = require('slugify');
const connectDB = require('./mongo');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allow CORS from Vercel
app.use(cors({
  origin: '*'
}));


app.use(express.json());

// Random theme generator
function generateRandomTheme() {
  const colors = ['#FF6347', '#1E90FF', '#32CD32', '#FFC107', '#8A2BE2'];
  const fonts = ['Poppins, sans-serif', 'Inter, sans-serif', 'Roboto, sans-serif', 'Montserrat, sans-serif'];
  return {
    primaryColor: colors[Math.floor(Math.random() * colors.length)],
    fontFamily: fonts[Math.floor(Math.random() * fonts.length)],
  };
}

// POST /submit - Save form data
app.post('/submit', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('sites');

    const data = req.body;
    const slugBase = data.bussiness_name || 'user';
    const slug = slugify(slugBase, { lower: true, strict: true });

    const exists = await collection.findOne({ slug });
    if (exists) {
      return res.status(400).json({ success: false, message: 'This business name is already taken.' });
    }

    data.slug = slug;
    data.theme = generateRandomTheme();

    await collection.insertOne(data);

    res.json({ success: true, slug });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /user/:slug
app.get('/user/:slug', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('sites');
    const data = await collection.findOne({ slug: req.params.slug });

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: 'User data not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
