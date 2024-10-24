// eslint-disable-next-line no-unused-vars
import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../../App.css";
import EventNote from "../EventNote/EventNote";

const localizer = momentLocalizer(moment);

export default function BigCalendar() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectEvent, setSelectEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  const [eventTitle, setEventTitle] = useState("");

  const [startTimeEdited, setStartTimeEdited] = useState();
  const [endTimeEdited, setEndTimeEdited] = useState();

  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (eventTitle || startTimeEdited || endTimeEdited || selectedDate) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [eventTitle, startTimeEdited, endTimeEdited, selectedDate]);

  const handleSelectSlot = (slotInfo) => {
    setShowModal(true);
    setSelectedDate(slotInfo.start);
    setSelectEvent(null);
  };

  const handleSelectEvent = (event) => {
    setShowModal(true);
    setSelectEvent(event);
    setEventTitle(eventTitle);
    setSelectedDate(selectedDate);
    setStartTimeEdited(startTimeEdited);
    setEndTimeEdited(endTimeEdited);
    setNotes(notes);
  };

  const saveEvent = () => {
    if (eventTitle && selectedDate) {
      if (selectEvent) {
        const updatedEvent = {
          ...selectEvent,
          title: eventTitle,
          start: moment(selectedDate)
            .set({
              hour: startTimeEdited.split(":")[0],
              minute: startTimeEdited.split(":")[1],
            })
            .toDate(),
          end: moment(selectedDate)
            .set({
              hour: endTimeEdited.split(":")[0],
              minute: endTimeEdited.split(":")[1],
            })
            .toDate(),
        };
        const updatedEvents = events.map((event) =>
          event === selectEvent ? updatedEvent : event
        );
        setEvents(updatedEvents);
      } else {
        const newEvent = {
          title: eventTitle,
          start: moment(selectedDate)
            .set({
              hour: startTimeEdited.split(":")[0],
              minute: startTimeEdited.split(":")[1],
            })
            .toDate(),
          end: moment(selectedDate)
            .set({
              hour: endTimeEdited.split(":")[0],
              minute: endTimeEdited.split(":")[1],
            })
            .toDate(),
        };
        setEvents([...events, newEvent]);
      }
      setShowModal(false);
      setEventTitle("");
      setSelectEvent(null);
    }
  };

  const deleteEvent = () => {
    if (selectEvent) {
      const updatedEvents = events.filter((event) => event !== selectEvent);
      setEvents(updatedEvents);
      setShowModal(false);
      setEventTitle("");
      setSelectEvent(null);
    }
  };

  return (
    <div className="calendar-container">
      <EventNote
        noteVisible={showModal}
        setShowModal={setShowModal}
        eventTitle={eventTitle}
        setEventTitle={setEventTitle}
        saveEvent={saveEvent}
        deleteEvent={deleteEvent}
        selectEvent={selectEvent}
        setSelectEvent={setSelectEvent}
        startTimeEdited={startTimeEdited}
        setStartTimeEdited={setStartTimeEdited}
        endTimeEdited={endTimeEdited}
        setEndTimeEdited={setEndTimeEdited}
        notes={notes}
        setNotes={setNotes}
        isFormValid={isFormValid}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100vh" }}
      />
    </div>
  );
}
