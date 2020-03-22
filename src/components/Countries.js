import React from "react";
import CurrentCountry from "./CurruntCountry";

class Countries extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: {},
            numberOfCountries: 187 //указываем изначальное количество предлагаемых стран
        }
        this.numbers = [];
        for (let i = 0; i <= this.state.numberOfCountries; i++) {
            this.numbers[i] = i;
        }
    }

    componentDidMount() {
        fetch('https://coronavirus-19-api.herokuapp.com/countries')
            .then(response => response.json())
            .then(json => {
                this.setState({countries: JSON.parse(JSON.stringify(json))}
                )
                this.setState({numberOfCountries: JSON.parse(JSON.stringify(json)).length}) //если вдруг количество стран на сервере поменяется
            })
    }

    render() {
        if (this.state.countries[0]) {
            return (
                <div>
                    {this.numbers.map(number => <CurrentCountry key={number}
                                                                countries={this.state.countries[number]}/>)}
                    <CurrentCountry countries={this.state.countries[0]}/>
                </div>
            )
        } else
            return (<div></div>);
    }

}

export default Countries;