import Ember from 'ember';
import moment from 'moment';
import computedMoment from 'ember-calendar/macros/computed-moment';
import Day from './day';

var OccurrenceProxy = Ember.Object.extend(Ember.Copyable, {
  calendar: null,
  content: null,
  endingTime: computedMoment('content.endsAt'),
  startingTime: computedMoment('content.startsAt'),
  title: Ember.computed.oneWay('content.title'),

  duration: Ember.computed('startingTime', 'endingTime', function() {
    return moment.duration(
      this.get('endingTime').diff(this.get('startingTime'))
    );
  }),

  day: Ember.computed('startingTime', 'calendar', 'calendar.{startingTime,startFromDate}', function() {
    let currentDay = this.get('startingTime');
    let firstDay;

    if (this.get('calendar.startFromDate')) {
      firstDay = this.get('calendar.startingTime');
    } else {
      firstDay = this.get('calendar.startingTime').startOf('isoWeek');
    }

    return Day.create({
      calendar: this.get('calendar'),
      offset: currentDay.dayOfYear() - firstDay.dayOfYear()
    });
  }),

  copy: function() {
    return OccurrenceProxy.create({
      calendar: this.get('calendar'),

      content: Ember.Object.create({
        startsAt: this.get('content.startsAt'),
        endsAt: this.get('content.endsAt'),
        title: this.get('content.title')
      })
    });
  }
});

export default OccurrenceProxy;
