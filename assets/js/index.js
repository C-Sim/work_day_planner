// global
const workHours = [
  { time: "9:00", key: 9 },
  { time: "10:00", key: 10 },
  { time: "11:00", key: 11 },
  { time: "12:00", key: 12 },
  { time: "13:00", key: 13 },
  { time: "14:00", key: 14 },
  { time: "15:00", key: 15 },
  { time: "16:00", key: 16 },
  { time: "17:00", key: 17 },
];

const header = $(".jumbotron");

const main = $("#main");

const currentHour = 14;
// moment().hour();

// initalise LS
const onReady = () => {
  // check if tasks exists in LS
  const tasks = readFromLocalStorage();
  // if false then set tasks to empty array in LS
  if (!tasks) {
    localStorage.setItem("tasks", JSON.stringify({}));
  }

  renderPage();
};

// get tasks from local storage
const readFromLocalStorage = () => {
  // get from LS by key
  const getTasks = localStorage.getItem("tasks");
  // parse LS data
  const parsedData = JSON.parse(getTasks);
  return parsedData;
};

const renderDate = () => {
  header.append(
    `<p id="currentDay" class="lead">${moment().format(
      "dddd Do MMMM YYYY"
    )}</p>`
  );
};

const renderTime = () => {
  header.append(
    `<p id="currentTime" class="lead">${moment().format("H:mm")}</p>`
  );
};

const getClassName = (hour) => {
  if (hour < currentHour) {
    return "past";
  } else if (hour > currentHour) {
    return "future";
  } else {
  }
};

const getTaskFromLS = (hour) => {
  const tasks = readFromLocalStorage();

  const task = tasks[hour];
  return task;
};

const renderTimeBlocks = () => {
  // create block for each time label within object, apply key as data attribute and assign status for past/present/future
  workHours.forEach((hour) => {
    //   get CSS class name
    main.append(`<section
    class="d-inline-flex p-2 bd-highlight justify-content-center align-items-center time-block"
    >
    <span class="hour">${hour.time}</span>
    <textarea class="p-2 flex-grow-1 bd-highlight ${getClassName(
      hour.key
    )} textarea" data-text-key=${hour.key}>${getTaskFromLS(hour.key) || ""}
    </textarea>
      <button name="save-btn" type="button" class="saveBtn" data-key=${
        hour.key
      }>Save</button>
    </section>`);
  });
};

const renderPage = () => {
  renderDate();

  renderTime();

  renderTimeBlocks();
};

const getTaskByTimeBlock = (event) => {
  const target = $(event.target);
  if (target.is('button[name="save-btn"]')) {
    const timeBlockSelected = target.attr("data-key");

    const textAreaValue = $(`textarea[data-text-key="${timeBlockSelected}"]`)
      .val()
      .trim();
    writeToLocalStorage(timeBlockSelected, textAreaValue);
  }
};

const writeToLocalStorage = (key, value) => {
  const tasks = readFromLocalStorage();

  tasks[key] = value;
  // stringify object value
  const stringifiedValue = JSON.stringify(tasks);
  // set value for each key within LS
  localStorage.setItem("tasks", stringifiedValue);
};

// clear all tasks and reload page
const clearLocalStorage = () => {
  localStorage.clear();
  location.reload();
};

// event listener for Clear all button click
const clearButton = $(".clearBtn");
clearButton.click(clearLocalStorage);

// event listener for save click
main.click(getTaskByTimeBlock);

// event handler for page load
$(document).ready(onReady);
