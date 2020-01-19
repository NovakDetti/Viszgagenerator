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
            counterFromOpposite : 1,
            isCorrect : false,
            correctAnswers : 0,
            correctdigitAnswer : 0,
            userdigitAnswer : 0,
            modCount : 0,
            modCountCounter : 1,
            isEnd : false,
            arrayOfExplanations : []
        }
        };

        

    handleClickForChoose = (e) => {
        this.setState({ modCountCounter: this.state.modCountCounter + 1})
        e.target.className.includes("true") ? this.countCorrectAnswers() : console.log("nope")
        if(this.state.modCount == this.state.modCountCounter){
            this.setState({ modCountCounter : 1})
            this.nextQuestion()
        }
    }

    nextQuestion = (e) =>{
        this.setState({ random: Math.floor(Math.random() * 78 )})
        this.setState({ counterFromOpposite : this.state.counterFromOpposite + 1 })
        this.isEnd();
    }

    countCorrectAnswers = () => { this.setState({ correctAnswers : this.state.correctAnswers + 1 })}

    explanation= (e) => {
        let counter = 0;
        console.log(e.target.value)
        console.log(this.state.arrayOfExplanations)
        for(let i = 0; i< this.state.arrayOfExplanations[0].length; ++i){
            if(e.target.value.includes(this.state.arrayOfExplanations[0][i])){
                counter ++;
                if(counter>=2){
                    this.countCorrectAnswers();
                }
                }
        }
    }

    countResult = (e) => {
       parseInt(e.target.className) == e.target.value ? this.countCorrectAnswers() : console.log("nem jo valasz")
    }

    loadQuiz = () => {
        this.setState({quizWindowActive : true})
    }


    isEnd() {
        if(this.state.counter == this.state.counterFromOpposite){
             this.setState({isEnd : true});
             this.setState({ quizWindowActive: false });
        }
    }

    render(){
            if(this.state.quizWindowActive){
            let correct_answers = JSONResult["questions"][this.state.random]["correct_answers"];
            let mod = JSONResult["questions"][this.state.random]["mod"];
            let keys = JSONResult["questions"][this.state.random]["keywords"];
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
                                return <div id="textFieldInput" className="centered "><input type="text" className={item['text']} onChange={this.countResult}/><button type="button" className="btn btn-outline-dark" onClick={this.nextQuestion}>Következő</button></div>
                            }else if(mod === "explanation"){
                                this.state.arrayOfExplanations.length = 0;
                                this.state.arrayOfExplanations = [...this.state.arrayOfExplanations, keys];
                                return <div id="textFieldInput" className="centered"><input type="text" onChange={this.explanation}/><button type="button" className="btn btn-outline-dark" onClick={this.nextQuestion}>Következő</button></div>
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
            }else if(this.state.isEnd && !this.state.quizWindowActive){
                return(<div><h1>Az eredményed {this.state.correctAnswers} pont </h1>
                            <h2>{Math.floor((this.state.correctAnswers/this.state.counter)*100)}%</h2>
                            <h3> {Math.floor((this.state.correctAnswers/this.state.counter)*100) >= 60 &&
                                "Átmentél" }</h3>
                        </div>)
            }else{
                return( <div>
                        <div id="landingPic"></div>
                        <button type="button" className="btn btn-outline-primary" onClick={this.loadQuiz}>Start</button>
                </div>)
            }
    }
}





export default Questions;
