import Ember from 'ember';
import computedMoment from 'ember-calendar/macros/computed-moment';
import computedDuration from 'ember-calendar/macros/computed-duration';
import Calendar from './calendar';
import OccurrenceProxy from './occurrence-proxy';

export default Calendar.extend({
  component: null,
  timeZone: Ember.computed.oneWay('component.timeZone'),
  startFromDate: Ember.computed.readOnly('component.startFromDate'),
  startingTime: computedMoment('component.startingDate'),
  dayStartingTime: computedDuration('component.dayStartingTime'),
  dayEndingTime: computedDuration('component.dayEndingTime'),
  timeSlotDuration: computedDuration('component.timeSlotDuration'),

  defaultOccurrenceTitle: Ember.computed.oneWay(
    'component.defaultOccurrenceTitle'
  ),

  defaultOccurrenceDuration: computedDuration(
    'component.defaultOccurrenceDuration'
  ),

  occurrences: Ember.computed('component.occurrences.[]', function() {
    let newOccurences = Ember.A();

    this.get('component.occurrences').forEach((occurrence) => {
      newOccurences.pushObject(OccurrenceProxy.create({ calendar: this, content: occurrence }));
    });

    return newOccurences;
  })
});
