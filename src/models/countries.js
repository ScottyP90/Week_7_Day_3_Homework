const PubSub = require('../helpers/pub_sub.js');

const Countries = function(){
  this.countries = [];
}

Countries.prototype.bindEvents = function(){
  PubSub.subscribe('SelectView:country-index-selected', (event) => {
    const index = event.detail
    const selectedCountry = this.findCountry(index)
    console.log(selectedCountry)
    PubSub.publish('Countries:country-found', selectedCountry)
  })
}

Countries.prototype.findCountry = function (index) {
  return this.countries[index]
}

Countries.prototype.getData = function(){
  // Make request to API and publish data from in here.
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    if (xhr.status !=200){
      return;
    }
    const jsonString = xhr.responseText;
    const data = JSON.parse(jsonString)
    console.log(data);
    this.countries = data
    PubSub.publish('Countries:countries-loaded', this.countries)
  });


  xhr.open('GET', 'https://restcountries.eu/rest/v2/')
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.send();
}

module.exports = Countries;
