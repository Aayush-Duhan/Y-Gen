import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    type: 'offline',
    description: '',
    image: '',
    category: 'event'
  });
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // If in edit mode, fetch the event data
    if (isEditMode) {
      const fetchEvent = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:5000/api/events/${id}`);
          setFormData(response.data);
          setError('');
        } catch (err) {
          console.error('Error fetching event:', err);
          setError('Failed to load event data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };

      fetchEvent();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!formData.name || !formData.date || !formData.time || !formData.location || 
        !formData.description || !formData.image) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);
      
      if (isEditMode) {
        // Update existing event
        await axios.put(`http://localhost:5000/api/events/${id}`, formData);
        setSuccess('Event updated successfully!');
      } else {
        // Create new event
        await axios.post('http://localhost:5000/api/events', formData);
        setSuccess('Event created successfully!');
        // Reset form after successful creation
        setFormData({
          name: '',
          date: '',
          time: '',
          location: '',
          type: 'offline',
          description: '',
          image: '',
          category: 'event'
        });
      }
      
      // Navigate back to events list after a short delay
      setTimeout(() => {
        navigate('/events');
      }, 1500);
      
    } catch (err) {
      console.error('Error saving event:', err);
      setError('Failed to save event. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box className="dashboard-container">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" className="page-title">
          {isEditMode ? 'Edit Event' : 'Create New Event'}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/events')}
        >
          Back to Events
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 4 }}>
          {success}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    label="Category"
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="event">Event</MenuItem>
                    <MenuItem value="workshop">Workshop</MenuItem>
                    <MenuItem value="hackathon">Hackathon</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    label="Type"
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="online">Online</MenuItem>
                    <MenuItem value="offline">Offline</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="e.g., March 15, 2025 or March 15-16, 2025"
                  helperText="Format: Month Day, Year or Month Day-Day, Year"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="e.g., 2:00 PM - 5:00 PM"
                  helperText="Format: Start Time - End Time"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="e.g., Tech Lab, Building B or Online (Zoom)"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Image URL"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="https://example.com/image.jpg"
                  helperText="Enter a URL for the event image"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  multiline
                  rows={4}
                />
              </Grid>
              
              {formData.image && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>Image Preview:</Typography>
                  <Box 
                    component="img" 
                    src={formData.image} 
                    alt="Event preview" 
                    sx={{ 
                      maxWidth: '100%', 
                      maxHeight: '200px', 
                      objectFit: 'cover',
                      borderRadius: 1
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                    }}
                  />
                </Grid>
              )}
            </Grid>
            
            <Divider sx={{ my: 4 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate('/events')}
                sx={{ mr: 2 }}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                disabled={submitting}
              >
                {submitting ? <CircularProgress size={24} /> : isEditMode ? 'Update Event' : 'Create Event'}
              </Button>
            </Box>
          </form>
        </Paper>
      )}
    </Box>
  );
}

export default EventForm;