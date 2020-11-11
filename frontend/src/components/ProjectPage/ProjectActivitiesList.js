import React from "react";

const GetDateTimeFormatted = (duration = 0) => {
  let time = Date.parse(duration);
  const offset = new Date().getTimezoneOffset() * 60 * 1000;
  console.log("old time: " + time, time);
  time = time - offset;
  time = new Date(time);
  console.log("new time: " + time, time);
  

  const year = time.getFullYear();
  const day = time.getDate() <= 9 ? "0" + time.getDate() : time.getDate();
  const month = time.getMonth() <= 9 ? "0" + time.getMonth() : time.getMonth();
  const hour = time.getHours() <= 9 ? "0" + time.getHours() : time.getHours();
  const minute = time.getMinutes() <= 9 ? "0" + time.getMinutes() : time.getMinutes();

  return `${year}/${month}/${day} ${hour}:${minute}`;
};

const GetDurationTimeFormatted = (duration = 0) => {
  const time = parseFloat(duration, 10);
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor(time % 60);
  const minutesStr = minutes <= 9 ? "0" + minutes : minutes;
  const secondsStr = seconds <= 9 ? "0" + seconds : seconds;
  return hours + ":" + minutesStr + ":" + secondsStr;
};

const ProjectActivitiesList = (props) => {
  return (
    <div className="ui list">
      {props.activities.map(({ id, start_time, end_time, duration }) => (
        <div className="item" key={id}>
          <div className="content">
            <div className="description">
            {GetDateTimeFormatted(start_time)} <span className="right floated">{GetDurationTimeFormatted(duration)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectActivitiesList;
