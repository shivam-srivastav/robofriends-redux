import React, {Component} from 'react';
import Cardlist from '../components/Cardlist';
import { robots } from '../robots'; 
import Scroll from '../components/Scroll'
import SearchBox from '../components/SearchBox'
import './App.css'

class App extends Component {
    constructor() {
        super()
        this.state={
            robots: robots,
            searchfield: ""
        }  
    }
componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=> response.json())
    .then(users => this.setState({robots:users}));

}
    onSearchChange=(event)=> {
        this.setState({searchfield:event.target.value})
    
    }

    render(){
        const filteredRobot = this.state.robots.filter(robots => {
            return robots.name.toLocaleLowerCase().includes(this.state.searchfield.toLocaleLowerCase())
        })
        return (
            <div className='tc'>
                <h1 className='f1'>ROBOFRIENDS</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <Cardlist robots={filteredRobot} />
                </Scroll>
                
            </div>
        )
    }
    
}
export default App;
