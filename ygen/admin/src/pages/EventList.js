import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Card,
  CardContent
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  FilterList as FilterIcon,
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import '../styles/EventList.css';

// Mock data for demonstration
const mockEvents = [
  {
    id: 1,
    name: "Tech Conference 2023",
    category: "event",
    type: "offline",
    date: "2023-12-15",
    location: "New York Convention Center",
    capacity: 500,
    description: "Annual tech conference featuring the latest innovations in web development and AI."
  },
  {
    id: 2,
    name: "Web Development Workshop",
    category: "workshop",
    type: "online",
    date: "2023-11-20",
    location: "Zoom",
    capacity: 100,
    description: "Learn the fundamentals of modern web development with React and Node.js."
  },
  {
    id: 3,
    name: "AI Hackathon",
    category: "hackathon",
    type: "offline",
    date: "2024-01-10",
    location: "San Francisco Tech Hub",
    capacity: 200,
    description: "48-hour hackathon focused on artificial intelligence and machine learning applications."
  },
  {
    id: 4,
    name: "UI/UX Design Masterclass",
    category: "workshop",
    type: "online",
    date: "2023-12-05",
    location: "Google Meet",
    capacity: 75,
    description: "Advanced techniques for creating beautiful and intuitive user interfaces."
  },
  {
    id: 5,
    name: "Mobile App Development Summit",
    category: "event",
    type: "offline",
    date: "2024-02-18",
    location: "Chicago Tech Center",
    capacity: 350,
    description: "Everything about mobile app development for iOS and Android."
  }
];

function EventList() {
  const [events, setEvents] = useState(mockEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // In a real application, you'd fetch from an API
  /*
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  */

  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEvent) return;
    
    try {
      // In a real app, you'd make an API call
      // await axios.delete(`http://localhost:5000/api/events/${selectedEvent.id}`);
      setEvents(events.filter(e => e.id !== selectedEvent.id));
      setDeleteDialogOpen(false);
      setSelectedEvent(null);
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Failed to delete event. Please try again later.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedEvent(null);
  };

  const getFilteredEvents = () => {
    return events.filter(event => {
      // Filter by category
      if (filterCategory !== 'all' && event.category !== filterCategory) {
        return false;
      }
      
      // Filter by type
      if (filterType !== 'all' && event.type !== filterType) {
        return false;
      }
      
      // Filter by search term
      if (searchTerm && !event.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };

  const resetFilters = () => {
    setFilterCategory('all');
    setFilterType('all');
    setSearchTerm('');
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Box className="events-container">
      <Box className="events-header">
        <Typography variant="h4" component="h1" className="events-title">
          Events Gallery
        </Typography>
        <Button
          className="add-event-button"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/events/new"
        >
          Create Event
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Creative Filters */}
      <Box className="filters-container">
        <Grid container spacing={2} className="filter-row">
          <Grid item xs={12} md={6}>
            <TextField
              className="filter-input"
              label="Search events"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              InputProps={{
                sx: {
                  borderRadius: 0,
                  border: '2px solid #000',
                  backgroundColor: 'white'
                }
              }}
              InputLabelProps={{
                sx: {
                  backgroundColor: 'white',
                  px: 1
                }
              }}
            />
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl size="small" fullWidth>
              <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Category</InputLabel>
              <Select
                value={filterCategory}
                label="Category"
                onChange={(e) => setFilterCategory(e.target.value)}
                sx={{
                  borderRadius: 0,
                  border: '2px solid #000',
                  backgroundColor: 'white',
                  '& .MuiSelect-select': {
                    backgroundColor: 'white'
                  }
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="event">Events</MenuItem>
                <MenuItem value="workshop">Workshops</MenuItem>
                <MenuItem value="hackathon">Hackathons</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={2}>
            <FormControl size="small" fullWidth>
              <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Type</InputLabel>
              <Select
                value={filterType}
                label="Type"
                onChange={(e) => setFilterType(e.target.value)}
                sx={{
                  borderRadius: 0,
                  border: '2px solid #000',
                  backgroundColor: 'white',
                  '& .MuiSelect-select': {
                    backgroundColor: 'white'
                  }
                }}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="online">Online</MenuItem>
                <MenuItem value="offline">Offline</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Button 
              variant="outlined" 
              startIcon={<FilterIcon />}
              onClick={resetFilters}
              fullWidth
              sx={{
                borderRadius: 0,
                border: '2px solid #000',
                fontWeight: 700,
                backgroundColor: 'white',
                '&:hover': {
                  backgroundColor: '#FFD600',
                  transform: 'translate(-2px, -2px)',
                  boxShadow: '6px 6px 0 0 #000',
                }
              }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {getFilteredEvents().length > 0 ? (
            <Grid container spacing={2}>
              {getFilteredEvents().map((event) => (
                <Grid item xs={12} sm={6} lg={4} key={event.id}>
                  <div className="event-card">
                    <div className={`event-card__type event-card__type--${event.type}`}>
                      {event.type}
                    </div>
                    <div className={`event-card__category event-card__category--${event.category}`}>
                      {event.category}
                    </div>
                    <div className="event-card__content">
                      <Typography className="event-card__title">
                        {event.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#555', mb: 2, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {event.description}
                      </Typography>
                      <div className="event-card__details">
                        <div className="event-card__detail">
                          <div className="event-card__detail-icon">
                            <CalendarIcon fontSize="small" />
                          </div>
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {formatDate(event.date)}
                          </Typography>
                        </div>
                        <div className="event-card__detail">
                          <div className="event-card__detail-icon">
                            <LocationIcon fontSize="small" />
                          </div>
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {event.location}
                          </Typography>
                        </div>
                        <div className="event-card__detail">
                          <div className="event-card__detail-icon">
                            <PeopleIcon fontSize="small" />
                          </div>
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {event.capacity} people
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className="event-card__actions">
                      <IconButton 
                        component={Link} 
                        to={`/events/edit/${event.id}`}
                        sx={{
                          backgroundColor: '#f8f8f8',
                          border: '2px solid #000',
                          borderRadius: 0,
                          padding: '6px',
                          '&:hover': {
                            backgroundColor: '#0066FF',
                            color: 'white'
                          }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDeleteClick(event)}
                        sx={{
                          backgroundColor: '#f8f8f8',
                          border: '2px solid #000',
                          borderRadius: 0,
                          padding: '6px',
                          '&:hover': {
                            backgroundColor: '#FF2D6F',
                            color: 'white'
                          }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box className="empty-state">
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                No events found
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {searchTerm || filterCategory !== 'all' || filterType !== 'all' 
                  ? 'Try adjusting your filters' 
                  : 'Start by creating your first event'}
              </Typography>
              {searchTerm || filterCategory !== 'all' || filterType !== 'all' ? (
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={resetFilters}
                  sx={{
                    borderRadius: 0,
                    border: '2px solid #000',
                    fontWeight: 700,
                    boxShadow: '4px 4px 0 0 #000'
                  }}
                >
                  Clear Filters
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary" 
                  component={Link} 
                  to="/events/new"
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: 0,
                    border: '2px solid #000',
                    fontWeight: 700,
                    boxShadow: '4px 4px 0 0 #000'
                  }}
                >
                  Create Your First Event
                </Button>
              )}
            </Box>
          )}
        </>
      )}
      
      {/* Delete confirmation dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            borderRadius: 0,
            border: '3px solid #000',
            boxShadow: '8px 8px 0 0 #000',
            width: { xs: '95%', sm: 'auto' },
            margin: { xs: '0 auto', sm: '32px' }
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, borderBottom: '2px solid #000' }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <DialogContentText>
            Are you sure you want to delete "{selectedEvent?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 1, borderTop: '2px dashed #000', flexWrap: 'wrap', gap: 1 }}>
          <Button 
            onClick={handleDeleteCancel}
            sx={{
              borderRadius: 0,
              border: '2px solid #000',
              fontWeight: 700,
              boxShadow: '3px 3px 0 0 #000',
              '&:hover': {
                boxShadow: '5px 5px 0 0 #000',
                transform: 'translate(-2px, -2px)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            color="error"
            variant="contained"
            sx={{
              borderRadius: 0,
              border: '2px solid #000',
              fontWeight: 700,
              boxShadow: '3px 3px 0 0 #000',
              '&:hover': {
                boxShadow: '5px 5px 0 0 #000',
                transform: 'translate(-2px, -2px)'
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EventList;