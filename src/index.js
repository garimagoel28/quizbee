import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class QuizBee extends Component {
    // instantiate local state for this component with an array named "questionBank"
    // this is where our 5 ques will be stored once we pull them in from the API
    // We are creating state variables in our root document because state should always be located in the nearest parent
    state = {
        questionBank: [],
        score: 0,
        responses: 0
    };
    // a function called getQuestions which invokes the quizService API and populates the questionBank state variable with results
    getQuestions = () => {
        quizService().then(question => {
            this.setState({
                questionBank: question
            });
        });
    };
    computeAnswer = (answer, correctAnswer) => {
        if(answer === correctAnswer) {
            this.setState({
                score: this.state.score + 1
            });
        }
        this.setState({
            responses: this.state.responses < 5 ? this.state.responses + 1: 5
        });
    }
    playAgain = () => {
        this.getQuestions();
        this.setState({
            score: 0,
            responses: 0
        });
    };
    // We need a function to run the function "getQuestions" when this component loads up.  This is where componentDidMount lifecycle method comes into the picture
    componentDidMount() {
        this.getQuestions();
    }

    render() {
        return (
            <div className="container">
                <div className="title">QuizBee</div>
                {this.state.questionBank.length > 0 &&
                this.state.responses < 5 &&
                    this.state.questionBank.map(
                        ({ question, answers, correct, questionId }) => <QuestionBox question={question} options = {answers} key={questionId} selected={answer => this.computeAnswer(answer, correct)}/>
                )} 
            {this.state.responses === 5 ? (<Result score={this.state.score} playAgain={this.playAgain}/>):null}
            </div>
        );
    }
}

ReactDOM.render(<QuizBee />, document.getElementById("root"));