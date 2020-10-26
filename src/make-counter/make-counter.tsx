import React from 'react';
import './make-counter.scss';
import Counter from '../counter/counter';
// steps data model
interface Steps {
    step: number;
    stepValue: number;
}
// make counter component data model
interface MakeCounterModel {
    steps: Steps[];
    message: string;
    currentStep: number;
    stepValue: number;
    validateFloat: string;
}
  
class MakeCounter extends React.Component{
    makeCounterModel: MakeCounterModel;
    state: {steps: Steps[], activeMessage: string, inputValue: string, addIsDisabled: boolean};
    constructor(
            props: Steps
        ) {
        super(props);
        this.state = {
            steps: [],
            activeMessage: '',
            inputValue: '',
            addIsDisabled: true
        };
        this.makeCounterModel = {
            steps: [],
            message: 'This only accepts numbers like 1, 2, -5, 3.8, 310',
            currentStep: 1,
            stepValue: 0,
            validateFloat: ''
        }
    };
    // on input change this method will fire
    // have a regex for validate input to get just numbers with + and - signs and . for floating numbers
    // ater that detect if input have floating number and this floating number length is bigger than one
    // make input clear and add button disable and the hint text will moving
    // but if regex is pass
    // make add button enable and input value is set
    // in another ways add button is disable and hint message is moving and input is clear
    checkUserInput(event: string): void {
        const validate: RegExp = /^[0-9 ()+-]+\.?[0-9]*$/;
        if (event.split('.')[1]) {
            this.makeCounterModel.validateFloat = event.split('.')[1];
            if (this.makeCounterModel.validateFloat.length >= 2) {
                this.setState({inputValue: '',activeMessage: 'make-counter-parent__message--active', addIsDisabled: true});
                return;
            }
        }
        if (validate.exec(event)) {
            this.makeCounterModel.stepValue = Number(event);
            this.setState({inputValue: event,activeMessage: 'false', addIsDisabled: false});
            return;
        } else {
            this.setState({inputValue: '',activeMessage: 'make-counter-parent__message--active', addIsDisabled: true});
            return;
        }
    };
    // this method will fire by clicking on add button
    // make add button disable input value empty and hint message fix
    // if you generate more than eight counter i will say to you is enough
    // every time current step will increase
    // step and value will pushed in steps array 
    // steps array will change the state
    makeCounter(currentStep: number, stepValue: number): void {
        this.setState({inputValue: '',activeMessage: '', addIsDisabled: true});
        if (this.makeCounterModel.currentStep > 8) {
            alert('this is enough');
            return;
        }
        ++this.makeCounterModel.currentStep;
        this.makeCounterModel.steps.push({step: currentStep, stepValue: stepValue});
        this.setState({
            steps: this.makeCounterModel.steps
        });
    }

    render() {
        return (
            <>
                <section className="make-counter-parent">
                    <div className="make-counter-parent__counter-maker-holder">
                        <input className="make-counter-parent__steps-input" type="text"
                            placeholder="enter steps value ..."
                            value={this.state.inputValue}
                            onChange={(e) => this.checkUserInput(e.target.value)} />
                        <button className="make-counter-parent__maker-button"
                                disabled={this.state.addIsDisabled}
                                onClick={(e) => this.makeCounter(this.makeCounterModel.currentStep,
                                this.makeCounterModel.stepValue)}>Add counter</button>
                    </div>
                    <div className={`make-counter-parent__message ${this.state.activeMessage}`}>
                        {this.makeCounterModel.message}
                    </div>
                </section>
                <section className="counter-parent">
                    {/* dynamicaly generate instance of counter component with deffrent states */}
                    {
                        this.state.steps.map((step) => <Counter step={step.step} stepValue={step.stepValue} defaultStep={0} makeRunDisable={false} />)
                    }
                </section>
            </>
        )
    }
}




export default MakeCounter;