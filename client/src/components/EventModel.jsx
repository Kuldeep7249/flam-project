import React, { useState } from 'react';
import './EventModel.css'; 

const recurrenceOptions = ["None", "Daily", "Weekly", "Monthly"];

const EventModal = ({ date, event, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [time, setTime] = useState(event ? event.time : "12:00");
  const [recurrence, setRecurrence] = useState(event?.recurrence || "None");

  const handleSubmit = () => {
    const eventData = {
      title,
      description,
      date,
      time,
      recurrence
    };
    onSave(eventData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{event ? 'Edit' : 'Add'} Event</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
        >
          {recurrenceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="modal-buttons">
          {event && <button onClick={() => onDelete(event._id)}>Delete</button>}
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
