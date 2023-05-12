const express = require('express');
const app = express();
const fs = require('fs');
const coursesFile = './users.json';

// Load data from JSON file
const loadData = () => {
  try {
    const data = fs.readFileSync(coursesFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Initialize courses array with data from JSON file
let courses = loadData();

// Get all courses
app.get('/courses', (req, res) => {
  res.json(courses);
});

// Get course by name
app.get('/courses/:name', (req, res) => {
  const course = courses.find((c) => c.name.toLowerCase() === req.params.name.toLowerCase());
  if (!course) {
    res.status(404).json({ message: 'Course not found' });
  } else {
    res.json(course);
  }
});

const server = app.listen(9000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Server listening at http://${host}:${port}`);
});
