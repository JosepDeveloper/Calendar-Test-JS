const createCalendar = ({ locale, year }) => {
  const weekDays = [...Array(7).keys()];
  const intlWeekDay = new Intl.DateTimeFormat(locale, { weekday: "short" });

  document.getElementById("down").addEventListener("click", () => {
    const el = document.querySelector("div");
    el.scrollTo({ top: el.scrollTop + window.innerHeight, behavior: "smooth" });
  });

  document.getElementById("up").addEventListener("click", () => {
    const el = document.querySelector("div");
    el.scrollTo({ top: el.scrollTop - window.innerHeight, behavior: "smooth" });
  });

  const weekDaysNames = weekDays.map((weekDaysIndex) => {
    const date = new Date(2021, 10, weekDaysIndex + 1);
    const weekDayName = intlWeekDay.format(date);

    return weekDayName;
  });

  const renderedWeekDays = weekDaysNames
    .map((weekDayName) => `<li class='day-name'>${weekDayName}</li>`)
    .join("");

  const months = [...Array(12).keys()];
  const intl = new Intl.DateTimeFormat(locale, { month: "long" });

  const calendar = months.map((monthKey) => {
    const monthName = intl.format(new Date(year, monthKey));

    const nextMonthIndex = monthKey + 1;
    const daysOfMonth = new Date(year, nextMonthIndex, 0).getDate();

    const starsOn = new Date(year, monthKey, 1).getDay();

    return {
      monthName,
      daysOfMonth,
      starsOn,
    };
  });

  const html = calendar
    .map(({ daysOfMonth, monthName, starsOn }) => {
      const days = [...Array(daysOfMonth).keys()];

      const firstDayAtributtes = `class=first-day style='--firts-day-start: ${starsOn}'`;
      const renderedDays = days
        .map(
          (day, index) =>
            `<li ${index === 0 ? firstDayAtributtes : ""}>${day + 1}</li>`
        )
        .join("");

      const title = `<h1>
        ${monthName} ${year}
      </h1>`;

      return `<div class="month">${title}<ol>${renderedWeekDays}${renderedDays}</ol></div>`;
    })
    .join("");

  document.querySelector("div").innerHTML = html;
};

createCalendar({ year: 2077, locale: "es" });
