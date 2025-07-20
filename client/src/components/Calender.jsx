import dayjs from 'dayjs';
import './Calender.css';

const Calendar = ({ events, onDateClick, onEventClick }) => {
  const today = dayjs();
  const startOfMonth = today.startOf('month');
  const endOfMonth = today.endOf('month');
  const days = [];

  for (
    let date = startOfMonth;
    date.isBefore(endOfMonth) || date.isSame(endOfMonth);
    date = date.add(1, 'day')
  ) {
    const dayEvents = events.filter((event) =>
      dayjs(event.date).isSame(date, 'day')
    );

    const isToday = date.isSame(today, 'day');

    days.push(
      <div
        key={date}
        className={`calendar-day ${isToday ? 'today' : ''}`}
        onClick={() => onDateClick(date.toDate())}
      >
        <div className="date">{date.format('DD')}</div>
        {dayEvents.map((event) => (
          <div
            key={event._id}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick(event);
            }}
            className="event"
          >
            {event.title}
          </div>
        ))}
      </div>
    );
  }

  return <div className="calendar">{days}</div>;
};

export default Calendar;
