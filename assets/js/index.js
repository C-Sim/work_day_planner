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

const currentHour = moment().hour();

// initalise LS
onReady = () => {
  // check if tasks exists in LS
  const tasks = readFromLocalStorage();
  // if false then set tasks to empty array in LS
  if (!tasks) {
    localStorage.setItem("tasks", JSON.stringify([]));
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

renderDate = () => {
  header.append(
    `<p id="currentDay" class="lead">${moment().format(
      "dddd Do MMMM YYYY"
    )}</p>`
  );
};

renderTime = () => {
  header.append(
    `<p id="currentTime" class="lead">${moment().format("H:mm")}</p>`
  );
};

renderTimeBlocks = () => {
  // create block for each time label within object, apply key as data attribute and assign status for past/present/future
  workHours.forEach((hour) => {
    if (hour.key < currentHour) {
      main.append(`<section
    class="d-inline-flex p-2 bd-highlight justify-content-center align-items-center time-block"
    >
    <span class="hour">${hour.time}</span>
    <textarea class="p-2 flex-grow-1 bd-highlight past textarea" data-text-key=${hour.key}>
    </textarea>
      <button type="button" class="saveBtn" data-key=${hour.key}>Save</button>
    </section>`);
    } else if (hour.key > currentHour) {
      main.append(`<section
    class="d-inline-flex p-2 bd-highlight justify-content-center align-items-center time-block"
    >
    <span class="hour">${hour.time}</span>
    <textarea class="p-2 flex-grow-1 bd-highlight future textarea" data-text-key=${hour.key}>
    </textarea>
      <button type="button" class="saveBtn" data-key=${hour.key}>Save</button>
    </section>`);
    } else {
      main.append(`<section
        class="d-inline-flex p-2 bd-highlight justify-content-center align-items-center time-block"
        >
        <span class="hour">${hour.time}</span>
        <textarea class="p-2 flex-grow-1 bd-highlight textarea" data-text-key=${hour.key}>
        </textarea>
          <button type="button" class="saveBtn" data-key=${hour.key}>Save</button>
        </section>`);
    }
  });
};

const writeToLocalStorage = (key, value) => {
  // stringify object value
  const stringifiedValue = JSON.stringify(value);
  // set value for each key within LS
  localStorage.setItem(key, stringifiedValue);
};

renderPage = () => {
  renderDate();

  renderTime();

  renderTimeBlocks();
};

// event listener for Save button click
const saveButton = $(".saveBtn");
saveButton.click(console.log("hi"));

// event handler for page load
$(document).ready(onReady);
