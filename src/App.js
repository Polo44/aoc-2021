import './App.css';
import React from 'react'
import Answer1 from './components/answer1/Answer1';
import Answer2 from './components/answer2/Answer2';
import Answer3 from './components/answer3/Answer3';
import Answer8 from './components/answer8/Answer8';
import Answer9 from './components/answer9/Answer9';
import Answer10 from './components/answer10/Answer10';
// import Answer4 from './components/answer4/Answer4';

const App = ({
}) => {
    return (
       <div className="App">
            <Answer1/>
            <Answer2/>
            <Answer3/>
            {/* <Answer4/> */}
            <Answer8/>
            <Answer9/>
            <Answer10/>
        </div>
   )
}

export default App;
