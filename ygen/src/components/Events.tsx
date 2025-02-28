import React, { useState, useEffect } from 'react';

interface EventType {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  type: 'online' | 'offline';
  description: string;
  image: string;
  category: 'event' | 'workshop' | 'hackathon';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface EventSectionProps {
  category: 'event' | 'workshop' | 'hackathon';
  title: string;
  subtitle: string;
}

const EventSection: React.FC<EventSectionProps> = ({ category, title, subtitle }) => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'online' | 'offline'>('all');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const allEvents = [
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

  const events = allEvents.filter(event => event.category === category);

  const filteredEvents = events.filter(event => {
    if (activeCategory === 'all') return true;
    return event.type === activeCategory;
  });

  const openModal = (event: EventType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedEvent(null);
      document.body.style.overflow = 'unset';
    }, 300); // Match this with the transition duration
  };

  useEffect(() => {
    if (selectedEvent) {
      const dates = selectedEvent.date.split('-');
      const endDate = dates.length > 1 ? dates[1].trim() : dates[0].trim();
      const eventDateTime = new Date(`${endDate} ${selectedEvent.time.split(' - ')[1] || selectedEvent.time.split(' - ')[0]}`).getTime();
      
      const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const distance = eventDateTime - now;

        if (distance < 0) {
          setTimeLeft(null);
          return null;
        }

        return {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
      };

      setTimeLeft(calculateTimeLeft());

      const timer = setInterval(() => {
        const newTimeLeft = calculateTimeLeft();
        if (!newTimeLeft) {
          clearInterval(timer);
        } else {
          setTimeLeft(newTimeLeft);
        }
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [selectedEvent]);

  return (
    <section id={category} className="bg-black text-white py-20 px-4 relative overflow-hidden">

      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-transparent opacity-70"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-2 text-center">{title} <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">{category === 'event' ? 'Events' : category === 'workshop' ? 'Workshops' : 'Hackathons'}</span></h2>
        <p className="text-xl text-gray-400 mb-16 text-center max-w-3xl mx-auto">{subtitle}</p>
        
        <div className="flex mb-10 justify-center gap-4 flex-wrap">
          <button 
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-full text-white font-medium transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transform hover:scale-105 ${activeCategory === 'all' ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            All {category === 'event' ? 'Events' : category === 'workshop' ? 'Workshops' : 'Hackathons'}
          </button>
          <button 
            onClick={() => setActiveCategory('offline')}
            className={`px-6 py-2 rounded-full text-white font-medium transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transform hover:scale-105 ${activeCategory === 'offline' ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            Offline {category === 'event' ? 'Events' : category === 'workshop' ? 'Workshops' : 'Hackathons'}
          </button>
          <button 
            onClick={() => setActiveCategory('online')}
            className={`px-6 py-2 rounded-full text-white font-medium transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:outline-none transform hover:scale-105 ${activeCategory === 'online' ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/20' : 'bg-gray-800 hover:bg-gray-700'}`}
          >
            Online {category === 'event' ? 'Events' : category === 'workshop' ? 'Workshops' : 'Hackathons'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <div 
                key={event.id} 
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                onClick={() => openModal(event as EventType)}
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={event.image} 
                    alt={event.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors duration-300">{event.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.type === 'online' ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'}`}>
                      {event.type === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors duration-300">{event.description}</p>
                  <div className="flex flex-col space-y-2 text-sm text-gray-400">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity">
                    Register Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center py-10">
              <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="text-xl font-medium text-gray-400">No {activeCategory} {category} found</h3>
              <p className="text-gray-500 mt-2">Try selecting a different category</p>
            </div>
          )}
        </div>
      </div>

      {/* Event Modal with animation */}
      {selectedEvent && isModalOpen && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto" 
          aria-labelledby="modal-title" 
          role="dialog" 
          aria-modal="true"
          onClick={closeModal}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-black bg-opacity-75 transition-opacity backdrop-blur-sm" 
              aria-hidden="true"
            ></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div 
              className={`inline-block align-bottom bg-gray-900 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full ${isModalOpen ? 'opacity-100 translate-y-0 sm:scale-100' : 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 relative">
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.name} 
                    className="w-full h-full object-cover"
                  />
                  <button 
                    className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                    onClick={closeModal}
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                <div className="md:w-1/2 p-8 overflow-y-auto">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl font-bold text-white">{selectedEvent.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedEvent.type === 'online' ? 'bg-blue-900 text-blue-300' : 'bg-purple-900 text-purple-300'}`}>
                      {selectedEvent.type === 'online' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  {timeLeft && (
                    <div className="grid grid-cols-4 gap-4 mb-6 bg-gray-800 p-4 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{timeLeft.days}</div>
                        <div className="text-sm text-gray-400">Days</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{timeLeft.hours}</div>
                        <div className="text-sm text-gray-400">Hours</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{timeLeft.minutes}</div>
                        <div className="text-sm text-gray-400">Minutes</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">{timeLeft.seconds}</div>
                        <div className="text-sm text-gray-400">Seconds</div>
                      </div>
                    </div>
                  )}
                  <p className="text-gray-300 text-lg mb-6">{selectedEvent.description}</p>
                  <div className="grid grid-cols-1 gap-4 text-gray-300">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{selectedEvent.time}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                  <button className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity">
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventSection;