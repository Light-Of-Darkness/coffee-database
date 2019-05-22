import React from 'react';
import firebase from "./firestore";
import Select from 'react-select';

const db = firebase.firestore();

class Recipe extends React.Component
{
    state =
    {
        selectedBrewer: "",
        minutes: "",
        seconds: "",
        coffee: "",
        water: "",
        brewers: [],
    };

    constructor(props)
    {
        super(props);
        db.collection("brewers").get().then(querySnapshot => this.brewerSelection(querySnapshot));
    }

    brewerSelection(querySnapshot)
    {
        querySnapshot.forEach(doc =>
        {
            this.setState({brewers: [...this.state.brewers, {label: doc.get("name"), value: doc.get("name")}]});
        })
    }

    updateBrewer = e =>
    {
        this.setState({selectedBrewer:e.value});
    }

    updateInput = e =>
    {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render()
    {
        //const selectedOption = this.state.selectedBrewer.value;
        return (
            <form onSubmit = {this.addRecipe}>
                <p>
                    How much coffee (in grams) in this recipe?
                </p>
                <input
                    type="number"
                    name="coffee"
                    value = {this.state.coffee}
                    onChange = {this.updateInput}
                    required
                />
                <p>
                    How much water (in grams) in this recipe?
                </p>
                <input
                    type = "number"
                    name = "water"
                    value = {this.state.water}
                    onChange = {this.updateInput}
                    required
                />
                <p>
                    What kind of brewer is this recipe for?
                </p>
                <Select
                    options = {this.state.brewers}
                    name = "selectedBrewer"
                    onChange = {this.updateBrewer}
                    value = {this.state.selectedBrewer}
                    required
                />
                <p>
                    How long is the brew time?
                </p>
                <p>
                    Minutes: <input
                        type = "number"
                        name = "minutes"
                        value = {this.state.minutes}
                        onChange = {this.updateInput}
                        min = "0"
                        required
                    />
                </p>
                <p>
                    Seconds: <input
                        type = "number"
                        name = "seconds"
                        value = {this.state.seconds}
                        onChange = {this.updateInput}
                        min = "0"
                        max = "59"
                        required
                    />
                </p>
                <p>

                </p>
                <button type="submit">Submit Recipe</button>
            </form>
        );
    }

    addRecipe = e =>
    {
        e.preventDefault();
        db.settings({
            timestampsInSnapshots: true
        });
        db.collection("brewers").doc(this.state.selectedBrewer).collection("recipes").add({
            coffee: this.state.coffee,
            water: this.state.water,
            minutes: this.state.minutes,
            seconds: this.state.seconds,
        });
        this.setState({
            coffee:"",
            water:"",
            selectedBrewer:"",
            minutes:"",
            seconds:"",
        });
    }

}

export default Recipe;