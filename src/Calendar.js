import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import './App.css'

const getCalendarList = (current) => {
  const calendarList = []
  for (let week = 0; week <= 4; week++) {
    const calendarWeek = []
    const current_ = current.clone()
    current_.add(week, 'w')
    for (let weekDay = 1; weekDay <= 7; weekDay++) {
      calendarWeek.push(current_.isoWeekday(weekDay).clone())
    }
    calendarList.push(calendarWeek)
  }

  return calendarList
}

const Calendar = ({ value = [], onChange }) => {
  const [current, setCurrent] = useState(() => {
    const [startDate] = value
    return startDate ? startDate.clone().date(1) : moment().date(1)
  })
  const [selectedDate, setSelectedDate] = useState(value)

  useEffect(() => setSelectedDate(value), [value])

  // Click to select previous/next month.
  const nextMonth = () => setCurrent(current.clone().add(1, 'M'))
  const previousMonth = () => setCurrent(current.clone().subtract(1, 'M'))

  const selectDate = date => {
    const [startDate, endDate] = selectedDate
    if (startDate && endDate) {
      onChange ? onChange([date]) : setSelectedDate([date])
    } else {
      if (startDate && date.isBefore(startDate)) {
        onChange ? onChange([date]) : setSelectedDate([date])
      } else {
        selectedDate.push(date)
        onChange ? onChange([...selectedDate]) : setSelectedDate([...selectedDate])
      }
    }
  }

  const calendarList = useMemo(() => getCalendarList(current), [current])
  const [startDate, endDate = startDate] = selectedDate

  return (
    <div className='calendar'>
      <div className='header'>
        <div className='button' onClick={previousMonth}>{'<'}</div>
        <div>{current.format('YYYY')}年{current.format('M')}月</div>
        <div className='button' onClick={nextMonth}>{'>'}</div>
      </div>
      {calendarList.map((weekList, index) => (
        <div key={index} style={{ display: 'flex' }}>
          {weekList.map((date, index) => {
            const isCurrentMonth = date.format('MM') === current.format('MM')
            const isToday = date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')
            const isInRange = date.isBetween(startDate, endDate, undefined, '[]')
            const classNames = ['date']
            !isCurrentMonth && classNames.push('nonCurrentMonth')
            isToday && classNames.push('isToday')
            isInRange && classNames.push('isSelected')
            return (
              <div
                key={index}
                className={classNames.join(' ')}
                onClick={() => isCurrentMonth && selectDate(date)}
              >
                {date.format('D')}日
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Calendar
