const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// @route   GET /api/events
// @desc    Get all events or filter by category
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { category, type } = req.query;
    let query = {};
    
    // Filter by category if provided
    if (category) {
      query.category = category;
    }
    
    // Filter by type if provided
    if (type) {
      query.type = type;
    }
    
    try {
      const events = await Event.find(query).sort({ createdAt: -1 });
      res.json(events);
    } catch (dbErr) {
      console.log('Database error, using fallback data:', dbErr.message);
      // Fallback data when database is not available
      const fallbackEvents = [
        // Events
        {
          id: 1,
          name: 'Web Development Workshop',
          date: 'March 15, 2025',
          time: '2:00 PM - 5:00 PM',
          location: 'Tech Lab, Building B',
          type: 'offline',
          description: 'Hands-on workshop on building modern web applications with React and Node.js.',
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop',
          category: 'event'
        },
        {
          id: 2,
          name: 'UI/UX Design Masterclass',
          date: 'March 22, 2025',
          time: '3:00 PM - 6:00 PM',
          location: 'Online (Zoom)',
          type: 'online',
          description: 'Learn the principles of effective UI/UX design from industry professionals.',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
          category: 'event'
        },
        // Workshops
        {
          id: 3,
          name: 'Mobile App Development',
          date: 'March 25, 2025',
          time: '2:00 PM - 6:00 PM',
          location: 'Tech Hub, Room 301',
          type: 'offline',
          description: 'Intensive workshop on building cross-platform mobile applications using React Native.',
          image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop',
          category: 'workshop'
        },
        {
          id: 4,
          name: 'Cloud Computing Workshop',
          date: 'March 28, 2025',
          time: '3:00 PM - 5:00 PM',
          location: 'Online (Microsoft Teams)',
          type: 'online',
          description: 'Learn about cloud architecture and deployment using AWS and Azure.',
          image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
          category: 'workshop'
        },
        // Hackathons
        {
          id: 5,
          name: 'Code for Change 2025',
          date: 'April 8-9, 2025',
          time: '9:00 AM - 9:00 PM',
          location: 'Main Auditorium',
          type: 'offline',
          description: '48-hour coding competition to build innovative solutions for social impact.',
          image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
          category: 'hackathon'
        },
        {
          id: 6,
          name: 'Virtual Innovation Challenge',
          date: 'April 15-16, 2025',
          time: '10:00 AM - 6:00 PM',
          location: 'Online (Discord)',
          type: 'online',
          description: 'Global virtual hackathon focused on emerging technologies and innovation.',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop',
          category: 'hackathon'
        },
      ];
      
      // Filter fallback data based on query parameters
      let filteredEvents = fallbackEvents;
      if (category) {
        filteredEvents = filteredEvents.filter(event => event.category === category);
      }
      if (type) {
        filteredEvents = filteredEvents.filter(event => event.type === type);
      }
      
      res.json(filteredEvents);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/events/:id
// @desc    Get event by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    
    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/events
// @desc    Create a new event
// @access  Public (would typically be Private with auth)
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event({
      name: req.body.name,
      date: req.body.date,
      time: req.body.time,
      location: req.body.location,
      type: req.body.type,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category
    });
    
    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/events/:id
// @desc    Update an event
// @access  Public (would typically be Private with auth)
router.put('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    
    // Update fields
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    res.json(updatedEvent);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete an event
// @access  Public (would typically be Private with auth)
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }
    
    await Event.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;