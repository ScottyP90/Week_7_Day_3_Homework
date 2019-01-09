const PubSub = require('../helpers/pub_sub.js');

const DisplayView = function(container){

}

DisplayView.prototype.bindEvents = function(){
  PubSub.subscribe('Countries:country-found', (event) => {
    const countryObject = event.detail
    this.render(countryObject)
  })
}

DisplayView.prototype.render = function(country) {
  const container = document.querySelector('#country')
  container.innerHTML = '';

  const countryName = document.createElement('h2')
  countryName.textContent = country.name

  const countryRegion = document.createElement('h3')
  countryRegion.textContent = country.region

  const countryFlag = document.createElement('img')
  countryFlag.src = country.flag


  const list = this.createList(country.languages)



  container.appendChild(countryName)
  container.appendChild(countryRegion)
  container.appendChild(countryFlag)
  container.appendChild(list)
}

DisplayView.prototype.addElement = function(type, text){
  const element = document.createElement(type);
  element.textContent = text;
  return element;
}

DisplayView.prototype.createList = function(countries) {
    const list = document.createElement('ul');
    countries.forEach((country) => {
      const listItem = this.addElement('li', country);
    list.appendChild(listItem);
  });
  return list
}

module.exports = DisplayView;
