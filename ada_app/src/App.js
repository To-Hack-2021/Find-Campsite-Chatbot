
import './App.css';
import React, {Component} from 'react';
import XMLParser from 'react-xml-parser'
class App extends Component{
constructor(props){
  super(props);
  this.state = {
    items: [],
    isLoaded: false,
  }
}

componentDidMount(){

  fetch("http://api.amp.active.com/camping/campgrounds/?pstate=TX&siteType=2003&Maxpeople=6&api_key=s4gwwyb4v39rfrb7cfjp26sb")
            .then(res => res.text())
            .then(data => {
                var xml = new XMLParser().parseFromString(data);
                

                var resultList = xml.getElementsByTagName("result");


                this.setState({
                  items: resultList,
                  isLoaded: true, 
              })
            })
            .catch(err => console.log(err));
}

render() {

  const { isLoaded, items } = this.state;

  console.log(items);

  if (!isLoaded)
      return <div>Loading...</div>;

  return (
      <div className="App">
          <ul>
              {items.map(item => (
                  <li key={item.id}>
                      Name: {item.attributes.facilityName}
                  </li>
              ))}
          </ul>
      </div>
  );

}
}
export default App;
