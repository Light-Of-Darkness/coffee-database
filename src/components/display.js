import React from 'react';
import firebase from "./firestore";
import Select from 'react-select';

const db = firebase.firestore();

class Display extends React.Component
{
    state = {
        selectedBrewer:null,
        //recipes contains JSX expressions to display each recipe
        recipes: [],
        brewers: [],
    };

    constructor(props)
    {
        super(props);
        db.collection("brewers").get().then(querySnapshot => this.brewerSelection(querySnapshot));
    }

    //get the list of brewers from the querySnapshot in the constructor
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
    };

    resetRecipes()
    {
        this.setState({recipes: []});
    }

    //add the recipes from the firestore query to the recipes state
    //once added, render() is automatically called again so the recipes are dynamically appended
    pushRecipes(querySnapshot)
    {
        //iterate over each document in the collection
        querySnapshot.forEach(doc => {
            const coffee = doc.get("coffee");
            const water = doc.get("water");
            const minutes = doc.get("minutes");
            const seconds = doc.get("seconds");
            //after getting the fields, append JSX to the recipes state
            this.setState({recipes: [...this.state.recipes,
                    <p>Coffee: {coffee}g, water: {water}g, brew time: {minutes}:{seconds}</p>]});
        });
    }

    displayRecipes = e =>
    {
        e.preventDefault();
        this.resetRecipes();
        //get the collection of recipes for the selected brewer, then pass that query to be added to the state
        db.collection("brewers").doc(this.state.selectedBrewer).collection("recipes")
            .get().then(querySnapshot => this.pushRecipes(querySnapshot));
    };

    render()
    {
        return(
            <div>
                <form onSubmit = {this.displayRecipes}>
                    <h1>Select your brewer</h1>
                    <Select
                        options = {this.state.brewers}
                        onChange = {this.updateBrewer}
                        required
                    />
                    <button type="submit">Check recipes</button>
                </form>
                <div id="recipes">
                    {this.state.recipes}
                </div>
            </div>
        )
    }
}

export default Display;