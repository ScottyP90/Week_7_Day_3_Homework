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

  const countryName = this.addElement('h2', country.name)

  const countryRegion = this.addElement('h3', `Location: ${country.region}`)

  const listOfLanguages = this.addElement('h3', 'List of languages:')

  const countryFlag = document.createElement('img')
  countryFlag.src = country.flag

  const list = this.createLangugeList(country.languages)

  container.appendChild(countryName)
  container.appendChild(countryRegion)
  container.appendChild(countryFlag)
  container.appendChild(listOfLanguages)
  container.appendChild(list)
}

DisplayView.prototype.addElement = function(type, text){
  const element = document.createElement(type);
  element.textContent = text;
  return element;
}

DisplayView.prototype.createLangugeList = function(languages) {
  const list = document.createElement('ul');
  languages.forEach((language) => {
    const listItem = this.addElement('li', language.name);
  list.appendChild(listItem);
});
return list
}

module.exports = DisplayView;
