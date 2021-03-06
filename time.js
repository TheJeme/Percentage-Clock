setInterval(function(){ UpdateTime(); }, 1);

function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function UpdateDecade() {
  const timeNow = moment()
  const yearsToAdd = 10 - timeNow.format('YY') % 10
  const nextDecade = moment().add(yearsToAdd, 'year').startOf('year')
  let diffYear = moment(nextDecade).diff(timeNow);
  let tillNextDecade = moment.duration(diffYear).as('days')
  let decadePercentage = ((3650 - tillNextDecade) / 3650)
  $('#decadeValue').attr('data-value', (decadePercentage * 100))
  document.getElementById("decadeLabel").innerHTML = Math.floor(decadePercentage * 100) + "%"
}

function UpdateYear() {
  const timeNow = moment()
  const nextYear = moment().add(1, 'year').startOf('year')
  let diffYear = moment(nextYear).diff(timeNow);
  let tillNextYear = moment.duration(diffYear).as('hours')
  let yearPercentage
  if (leapYear(timeNow.format("YYYY"))) {
    yearPercentage = ((24 * 366 - tillNextYear) / (24 * 366))  
  }else{
    yearPercentage = ((24 * 365 - tillNextYear) / (24 * 365))
  }
  $('#yearValue').attr('data-value', (yearPercentage * 100))
  document.getElementById("yearLabel").innerHTML = Math.floor(yearPercentage * 100) + "%"
}

function UpdateMonth() {
  const timeNow = moment()
  const nextMonth = moment().add(1, 'month').startOf('month')
  let diffMonth = moment(nextMonth).diff(timeNow);
  let tillNextMonth = moment.duration(diffMonth).as('minutes')
  let monthPercentage = ((60 * 24 * timeNow.daysInMonth() - tillNextMonth) / (60 * 24 * timeNow.daysInMonth()))
  $('#monthValue').attr('data-value', (monthPercentage * 100))
  document.getElementById("monthLabel").innerHTML = Math.floor(monthPercentage * 100) + "%"
}

function UpdateWeek() {
  const timeNow = moment()
  const nextWeek = moment().endOf('isoWeek')
  let diffWeek = moment(nextWeek).diff(timeNow);
  let tillNextWeek = moment.duration(diffWeek).as('minutes')
  let weekPercentage = ((10080 - tillNextWeek) / 10080)
  $('#weekValue').attr('data-value', (weekPercentage * 100))
  document.getElementById("weekLabel").innerHTML = Math.floor(weekPercentage * 100) + "%"
}

function UpdateDay() {
  const timeNow = moment()
  const nextDay = moment().add(1, 'day').startOf('day')
  let diffDay = moment(nextDay).diff(timeNow);
  let tillNextDay = moment.duration(diffDay).as('seconds')
  let dayPercentage = ((86400 - tillNextDay) / 86400)
  $('#dayValue').attr('data-value', (dayPercentage * 100))
  document.getElementById("dayLabel").innerHTML = Math.floor(dayPercentage * 100) + "%"
}

function UpdateHour() {
  const timeNow = moment()
  const nextHour = moment().ceil(1, 'hours')
  let diffHour = moment(nextHour).diff(timeNow);
  let tillNextHour = moment.duration(diffHour).as('seconds')
  let hourPercentage = ((3600 - tillNextHour) / 3600)
  $('#hourValue').attr('data-value', (hourPercentage * 100))
  document.getElementById("hourLabel").innerHTML = Math.floor(hourPercentage * 100) + "%"
}

function UpdateMinute() {
  const timeNow = moment()
  const nextMinute = moment().ceil(1, 'minutes')
  let diffMinute = moment(nextMinute).diff(timeNow);
  let tillNextMinute = moment.duration(diffMinute).as('milliseconds')
  let minutePercentage = ((60000 - tillNextMinute) / 60000)
  $('#minuteValue').attr('data-value', (minutePercentage * 100))
  document.getElementById("minuteLabel").innerHTML = Math.floor(minutePercentage * 100) + "%"
}

function UpdateSecond() {
  let secondPercentage = (moment().format('SSS') / 1000)
  $('#secondValue').attr('data-value', (secondPercentage * 100))
  document.getElementById("secondLabel").innerHTML = Math.floor(secondPercentage * 100) + "%"
}

function UpdateTime() {
  UpdateSecond()
  UpdateMinute()
  UpdateHour()
  UpdateDay()
  UpdateWeek()
  UpdateMonth()
  UpdateYear()
  UpdateDecade()
  
  $(function() {
    $(".progress").each(function() {
      var value = $(this).attr('data-value');
      var left = $(this).find('.progress-left .progress-bar');
      var right = $(this).find('.progress-right .progress-bar');

      if (value > 0) {
        if (value <= 50) {
          right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
          left.css('transform', 'rotate(0deg)')
        } else {
          right.css('transform', 'rotate(180deg)')
          left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
        }
      }

    })
    function percentageToDegrees(percentage) {
      return percentage / 100 * 360
    }
  });
}
