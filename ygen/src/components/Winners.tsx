import React, { useState } from 'react';

interface EventType {
  id: number;
  name: string;
  date: string;
  description: string;
  image: string;
  category: string;
  status: 'completed';
  winners: WinnerType[];
}

interface WinnerType {
  rank: number;
  teamName: string;
  projectName?: string;
  achievement: string;
  links?: {
    website?: string;
    github?: string;
  };
}

const Winners: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

  const completedEvents: EventType[] = [
    {
      id: 1,
      name: 'UI/UX Design Masterclass',
      date: 'January 15, 2024',
      description: 'Learn the principles of effective UI/UX design from industry professionals.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
      category: 'workshop',
      status: 'completed',
      winners: [
        {
          rank: 1,
          teamName: 'DesignMasters',
          projectName: 'EcoTracker App',
          achievement: 'Best Overall Design'
        },
        {
          rank: 2,
          teamName: 'UXPioneers',
          projectName: 'HealthHub Interface',
          achievement: 'Most Innovative Solution'
        },
        {
          rank: 3,
          teamName: 'PixelPerfect',
          projectName: 'SmartHome Dashboard',
          achievement: 'Best User Experience'
        }
      ]
    },
    {
      id: 2,
      name: 'Code for Change 2024',
      date: 'January 8-9, 2024',
      description: '48-hour coding competition to build innovative solutions for social impact.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
      category: 'hackathon',
      status: 'completed',
      winners: [
        {
          rank: 1,
          teamName: 'Team Innovators',
          projectName: 'EcoTrack',
          achievement: 'Best Overall Solution'
        },
        {
          rank: 2,
          teamName: 'Digital Wizards',
          projectName: 'HealthConnect',
          achievement: 'Most Technical Innovation'
        },
        {
          rank: 3,
          teamName: 'Tech Titans',
          projectName: 'SmartLearn',
          achievement: 'Best Social Impact'
        }
      ]
    },
  ];

  return (
    <section id="winners" className="bg-black text-white py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-2 text-center">Completed <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">Events</span></h2>
        <p className="text-xl text-gray-400 mb-16 text-center max-w-3xl mx-auto">Celebrating the achievements of our talented community members</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {completedEvents.map((event) => (
            <div 
              key={event.id} 
              className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold">{event.name}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-300">
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">{event.description}</p>
                <div className="flex items-center text-sm text-gray-400">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>{event.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedEvent && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={() => setSelectedEvent(null)}>
            <div className="bg-gray-900 rounded-xl max-w-6xl w-full overflow-hidden flex" onClick={e => e.stopPropagation()}>
              <div className="w-1/2 relative">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.name} 
                  className="w-full h-full object-cover"
                />
                <button 
                  className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
                  onClick={() => setSelectedEvent(null)}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="w-1/2 p-8 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-3xl font-bold text-white">{selectedEvent.name}</h3>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-900 text-purple-300">
                    {selectedEvent.category.charAt(0).toUpperCase() + selectedEvent.category.slice(1)}
                  </span>
                </div>
                <p className="text-gray-300 text-lg mb-6">{selectedEvent.description}</p>
                <div className="flex items-center text-gray-300 mb-8">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="bg-gray-800 rounded-lg p-6">
                  <h4 className="text-2xl font-bold text-purple-400 mb-4">Winners</h4>
                  <div className="space-y-4">
                    {selectedEvent.winners.map((winner) => (
                      <div key={winner.rank} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xl font-bold text-white">{winner.teamName}</span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            winner.rank === 1 ? 'bg-yellow-900 text-yellow-300' :
                            winner.rank === 2 ? 'bg-gray-700 text-gray-300' :
                            'bg-orange-900 text-orange-300'
                          }`}>
                            {winner.rank === 1 ? '1st Place' :
                             winner.rank === 2 ? '2nd Place' :
                             '3rd Place'}
                          </span>
                        </div>
                        {winner.projectName && (
                          <p className="text-gray-400 mb-2">{winner.projectName}</p>
                        )}
                        <p className="text-sm text-purple-400">{winner.achievement}</p>
                        {winner.links && (
                          <div className="flex space-x-4 mt-2">
                            {winner.links.website && (
                              <a
                                href={winner.links.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            )}
                            {winner.links.github && (
                              <a 
                                href={winner.links.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-purple-400 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                </svg>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Winners;