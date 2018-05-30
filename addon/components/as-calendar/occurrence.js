import Ember from 'ember';
import computedDuration from 'ember-calendar/macros/computed-duration';
import moment from 'moment';

const { get } = Ember;

export default Ember.Component.extend({
  attributeBindings: ['_style:style'],
  classNameBindings: [':as-calendar-occurrence'],
  tagName: 'article',

  model: null,
  timeSlotDuration: null,
  timeSlotHeight: null,
  title: Ember.computed.oneWay('model.title'),
  content: Ember.computed.oneWay('model.content'),
  day: Ember.computed.oneWay('model.day'),
  computedTimeSlotDuration: computedDuration('timeSlotDuration'),

  titleStyle: Ember.computed('timeSlotHeight', function() {
    return Ember.String.htmlSafe(`line-height: ${this.get('timeSlotHeight')}px;`);
  }),

  _duration: Ember.computed.oneWay('model.duration'),
  _startingTime: Ember.computed('model.startingTime', function() {
    let time = get(this, 'model.startingTime');
    let zone = get(this, 'model.calendar.timeZone');

    return moment(time).tz(zone);
  }),

  _dayStartingTime: Ember.computed.oneWay('day.startingTime'),

  _occupiedTimeSlots: Ember.computed(
    '_duration',
    'computedTimeSlotDuration', function() {
      return this.get('_duration').as('ms') /
             this.get('computedTimeSlotDuration').as('ms');
  }),

  _height: Ember.computed('_occupiedTimeSlots', function() {
    return this.get('timeSlotHeight') * this.get('_occupiedTimeSlots');
  }),

  _top: Ember.computed(
    '_startingTime',
    '_dayStartingTime',
    'computedTimeSlotDuration',
    'timeSlotHeight', function() {
    return ((this.get('_startingTime').diff(this.get('_dayStartingTime')) % (24*3600000)) /
            this.get('computedTimeSlotDuration').as('ms')) *
            this.get('timeSlotHeight');
  }),

  _style: Ember.computed('_height', '_top', function() {
    return Ember.String.htmlSafe(`top: ${this.get('_top')}px;
            height: ${this.get('_height')}px;`);
  }),

  _stopPropagation: Ember.on('click', function(event) {
    event.stopPropagation();
  }),
});
