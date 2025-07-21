import  { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from './components/Calender';
import EventModal from './components/EventModel' ;
import './index.css'; 
function App() {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('https://flam-project-1.onrender.com/api/events');
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events", err);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedDate(new Date(event.date));
    setModalOpen(true);
  };

  const saveEvent = async (eventData) => {
    try {
      if (selectedEvent) {
        await axios.put(`https://flam-project-1.onrender.com/api/events/${selectedEvent._id}`, eventData);
      } else {
        await axios.post('https://flam-project-1.onrender.com/api/events', eventData);
      }
      setModalOpen(false);
      fetchEvents();
    } catch (err) {
      console.error("Error saving event", err);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`https://flam-project-1.onrender.com/api/events/${id}`);
      setModalOpen(false);
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event", err);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Event Calendar</h1>
      <Calendar 
        events={events} 
        onDateClick={handleDateClick} 
        onEventClick={handleEventClick} 
      />
      {modalOpen && (
        <EventModal 
          date={selectedDate} 
          event={selectedEvent} 
          onClose={() => setModalOpen(false)} 
          onSave={saveEvent} 
          onDelete={deleteEvent} 
        />
      )}
    </div>
  );
}

export default App;