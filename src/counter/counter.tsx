import React from 'react';
import './counter.scss';
// steps data model for use in component
interface Steps {
    step: number;
    stepValue: number;
    defaultStep: number;
    makeRunDisable: boolean;
}
class Counter extends React.Component<Steps> {
    state: Steps;
    constructor(props: Steps) {
        super(props);
        this.state = {
            step: props.step,
            stepValue: props.stepValue,
            defaultStep: props.defaultStep,
            makeRunDisable: props.makeRunDisable
        }
    }
    // this method will fire when you click on run button
    // valueHolder is for keep begining number
    // after that run button will disable
    // repeater will plus counted value with beginig value every second
    // after seven seconds all states will be as begin state
    makeCount(stepValue: number): void {
        let valueHolder: number = stepValue;
        this.setState({makeRunDisable: true});
        let repeater = setInterval(e => {
            this.setState({defaultStep: valueHolder});
            valueHolder = valueHolder + stepValue;
        }, 1000);
        setTimeout(() => {
            clearInterval(repeater);
            this.setState({makeRunDisable: false});
            this.setState({defaultStep: 0});
        }, 7000);
    }

    render() {
        return (
            <div className="counter">
                <div className="counter__counter-header">
                    <span>step {this.state.step}</span>
                </div>
                <div className="counter__count">
                    <h3>{this.state.defaultStep}</h3>
                </div>
                <div className="counter__run-button-holder">
                    <button className="counter__run-button" disabled={this.state.makeRunDisable} onClick={(e) => this.makeCount(this.state.stepValue)}>Run</button>
                </div>
            </div>
        )
    }
}



export default Counter;