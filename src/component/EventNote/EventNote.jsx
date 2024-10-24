/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./EventNote.css";
import moment from "moment";

export default function EventNote({
  noteVisible,
  setShowModal,
  eventTitle,
  setEventTitle,
  saveEvent,
  deleteEvent,
  selectEvent,
  setSelectEvent,
  startTimeEdited,
  setStartTimeEdited,
  endTimeEdited,
  setEndTimeEdited,
  notes,
  setNotes,
  isFormValid,
  setSelectedDate,
  selectedDate,
}) {
  const onEventClose = () => {
    setShowModal(false);
    setEventTitle("");
    setSelectEvent(null);
  };
  return (
    <div className={`event ${noteVisible ? "" : "hide"}`}>
      <div className="event-content">
        <div className="event-header">
          <button className="btn-close-with-save" onClick={onEventClose}>
            Close
          </button>
          <div className="event-body">
            <input
              className="event-title"
              type="text"
              name="title"
              id={Math.random()}
              placeholder="Event title"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
            />
            <input
              className="event-date"
              type="date"
              name="date"
              placeholder="event date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <input
              className="event-time"
              type="time"
              name="startTime"
              placeholder="event time"
              value={startTimeEdited}
              onChange={(e) => setStartTimeEdited(e.target.value)}
            />
            <input
              className="event-time"
              type="time"
              name="endTime"
              placeholder="event time"
              value={endTimeEdited}
              onChange={(e) => setEndTimeEdited(e.target.value)}
            />
            <input
              className="event-notes"
              type="text"
              placeholder="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <div className="discard-edit_block">
              <button onClick={selectEvent ? deleteEvent : onEventClose}>
                {selectEvent ? "DISCARD" : "CANCEL"}
              </button>
              <button onClick={saveEvent}>
                {/* isFormValid */}
                {selectEvent ? "EDIT" : "SAVE"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
