import React, { Component } from 'react';
import './Question.css';
import JSONResult from '../data/quizquestions.json';


const maxQuestions = 20;


class Questions extends Component{        
    constructor(props) {
        super(props);
        this.state = {   
            quizWindowActive : true,
            random: Math.floor(0 + (Math.random() * (78 - 0))),
            counter : 20,
            counterFromOpposite : 0,
            isCorrect : false,
            correctAnswers : 0,
            digitAnswer : 0

        }
        };

    handleClick = (e) => {
        this.setState({ random: Math.floor(0 + (Math.random() * (78 - 0)))})
        this.setState({ counterFromOpposite : this.state.counterFromOpposite + 1 })
        e.target.className.includes("true") ? this.setState({ correctAnswers : this.state.correctAnswers + 1 }) : console.log("nope")
        this.isEnd();
    }

    handleClickForDigit = (e) => {
        this.setState({ random: Math.floor(0 + (Math.random() * (78 - 0)))})
        this.setState({ counterFromOpposite : this.state.counterFromOpposite + 1 })
        this.isEnd();
    }


    isEnd() {
        this.state.counter == this.state.counterFromOpposite ? this.setState({ quizWindowActive: false }) : console.log("");
    }

    render(){
            if(this.state.quizWindowActive){
            let jsonObj = JSONResult["questions"][this.state.random]["answers"];
            const arr = [];
            for (let index = 0; index < jsonObj.length; index++) {
                arr.push(jsonObj[index]);
            }
            return ( 
                <div className="container quizTable">
                    <div id="counter">{this.state.counter} / {this.state.counterFromOpposite}</div>
                    <h3 className="question">{JSONResult["questions"][this.state.random]["question"]}</h3>
                    <div className="row">
                    {
                        arr.map((item) => {
                            if(item["isCorrect"] == "true"){
                                if(jsonObj.length < 2){
                                    if(!isNaN(item["text"])){
                                        this.state.digitAnswer = parseInt(item["text"]);
                                        return (<div id="inputTextField"><input type="text" name="text"/><button className="true btn btn-outline-dark" onClick={this.handleClick.bind(this)}>Következő</button></div>)
                                    }else{
                                        return <div className=" col col-sm-12 col-lg-12 centered"><button type="button" className="true btn btn-outline-dark" onClick={this.handleClick.bind(this)} >{item["text"]}</button></div> 
                                    }
                                }else{
                                    return <div className=" col col-sm-12 col-lg-6 centered"><button type="button" className="true btn btn-outline-dark" onClick={this.handleClick.bind(this)} >{item["text"]}</button></div> 
                                }
                            }else{
                                return <div  className="col col-sm-12 col-lg-6 centered"><button type="button" className="false btn btn-outline-dark" onClick={this.handleClick.bind(this)} >{item["text"]}</button></div> 
                            }
                        } )
                    }
                    </div>
                </div>
                )
            }else{
            return(<div><h1>Az eredményed {this.state.correctAnswers} pont </h1>
                        <h2>{Math.floor((this.state.correctAnswers/this.state.counter)*100)}%</h2>
                        <h3> {Math.floor((this.state.correctAnswers/this.state.counter)*100) >= 60 &&
                            "Átmentél" }</h3>
                    </div>)
            }
    }
}





export default Questions;
