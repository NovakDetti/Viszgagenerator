import React, { Component } from 'react';
import './Question.css';
import JSONResult from '../data/quizquestions.json';


class Questions extends Component{        
    constructor(props) {
        super(props);
        this.state = {   
            quizWindowActive : false,
            random: Math.floor(0 + (Math.random() * (78 - 0))),
            counter : 20,
            counterFromOpposite : 0,
            isCorrect : false,
            correctAnswers : 0,
            correctdigitAnswer : 0,
            userdigitAnswer : 0,
            modCount : 0,
            modCountCounter : 1,
            isEnd : false
        }
        };

        

    handleClickForChoose = (e) => {
        this.setState({ modCountCounter: this.state.modCountCounter + 1})
        e.target.className.includes("true") ? this.countCorrectAnswers() : console.log("nope")
        if(this.state.modCount == this.state.modCountCounter){
            this.setState({ random: Math.floor(0 + (Math.random() * (78 - 0)))})
            this.setState({ counterFromOpposite : this.state.counterFromOpposite + 1 })
            this.setState({ modCountCounter : 1})
            this.isEnd();
        }
    }

    handleClickForDigit = () => {
        this.setState({ random: Math.floor(0 + (Math.random() * (78 - 0)))})
        this.setState({ counterFromOpposite : this.state.counterFromOpposite + 1 })
        this.isEnd();
    }

    countCorrectAnswers = () => { this.setState({ correctAnswers : this.state.correctAnswers + 1 })}

    handleClickForExplanation = (e) => {
        this.setState({ random: Math.floor(0 + (Math.random() * (78 - 0)))})
        this.setState({ counterFromOpposite : this.state.counterFromOpposite + 1 })
        this.isEnd();
    }

    countResult = (e) => {
       parseInt(e.target.className) == e.target.value ? this.countCorrectAnswers() : console.log("nem jo valasz")
    }

    loadQuiz = () => {
        this.setState({quizWindowActive : true})
    }


    isEnd() {
        this.state.counter == this.state.counterFromOpposite ? this.setState({ quizWindowActive: false },{isEnd : true}) : console.log("________");
    }

    render(){
            if(this.state.quizWindowActive){
            let correct_answers = JSONResult["questions"][this.state.random]["correct_answers"];
            let mod = JSONResult["questions"][this.state.random]["mod"];
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
                            if(mod === "count"){
                                this.state.correctdigitAnswer = parseInt(item["text"]);
                                console.log(this.state.correctdigitAnswer)
                                return <div id="textFieldInput" className="centered "><input type="text" className={item['text']} onChange={this.countResult}/><button type="button" className="btn btn-outline-dark" onClick={this.handleClickForDigit}>Következő</button></div>
                            }else if(mod === "explanation"){
                                return <div id="textFieldInput" className="centered"><input type="text" onChange={this.explanation}/><button type="button" className="btn btn-outline-dark" onClick={this.handleClickForExplanation}>Következő</button></div>
                            }else if(mod === "choose"){
                                this.state.modCount = correct_answers
                                if(item["isCorrect"] == "true"){
                                    return <div className="centered col-lg-4 col-sm-12"><button type="button" className="true btn btn-outline-dark" onClick={this.handleClickForChoose}>{item["text"]}</button></div>
                                }else{
                                    return <div className="centered  col-lg-4 col-sm-12"><button type="button" className=" btn btn-outline-dark" onClick={this.handleClickForChoose}>{item["text"]}</button></div>
                                }
                            }

                        } )
                    }
                    </div>
                </div>
                )
            }else if(this.state.isEnd && this.state.quizWindowActive){
                return(<div><h1>Az eredményed {this.state.correctAnswers} pont </h1>
                            <h2>{Math.floor((this.state.correctAnswers/this.state.counter)*100)}%</h2>
                            <h3> {Math.floor((this.state.correctAnswers/this.state.counter)*100) >= 60 &&
                                "Átmentél" }</h3>
                        </div>)
            }else{
                return( <div>
                        <div id="landingPic"></div>
                        <button type="button" class="btn btn-outline-primary" onClick={this.loadQuiz}>Start</button>
                </div>)
            }
    }
}





export default Questions;
