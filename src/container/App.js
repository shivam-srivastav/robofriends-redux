import React, {Component} from 'react';
import { connect } from 'react-redux'
import Cardlist from '../components/Cardlist';
import Scroll from '../components/Scroll'
import SearchBox from '../components/SearchBox'
import './App.css';

import {setSearchField, requestRobots} from '../action.js'


const mapStateToProps = state =>{
    return{
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending:state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps=(dispatch) => {
    return{ 
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
 
     }
 }




class App extends Component {
   

componentDidMount(){
  this.props.onRequestRobots();
      }

    
    render(){
        
        const { searchField, onSearchChange, robots, isPending}= this.props;
        const filteredRobots = robots.filter(robot =>  {
            return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
        })
        return isPending ? 
        <h1>Loading</h1> :
        (

            <div className='tc'>
                <h1 className='f1'>ROBOFRIENDS</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <Cardlist robots={filteredRobots} />
                </Scroll>
                
            </div>
        )
        
    }

}
    



    export default connect(
        mapStateToProps,
        mapDispatchToProps
      )(App)