const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element){
  this.element = element;
}

SelectView.prototype.bindEvents = function(){
  PubSub.subscribe('Countries:countries-loaded', (event) => {
    this.populate(event.detail)
  })
  this.element.addEventListener('change', (event) => {
    const selectedIndex = event.target.value
    PubSub.publish('SelectView:country-index-selected', selectedIndex)
  })
}

SelectView.prototype.populate = function(countries) {
  countries.forEach((country, index) => {
    const countryOption = document.createElement('option')
    countryOption.value = index
    countryOption.textContent = country.name
    this.element.appendChild(countryOption)
  })
}

module.exports = SelectView;
