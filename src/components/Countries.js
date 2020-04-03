import React from "react";
import CurrentCountry from "./CurruntCountry";
import Dropdown from 'react-dropdown';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSortDown} from '@fortawesome/free-solid-svg-icons';
import {css} from "@emotion/core";
import {PulseLoader} from "react-spinners";

const options = ['Cases', 'Today', 'Active', 'Deaths', 'Recovered', 'Critical'];
const sortIcon = <FontAwesomeIcon icon={faSortDown}/>;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Countries extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: {},
            numberOfCountries: 0, //указываем изначальное количество предлагаемых стран
            selectedOptions: null,
            select: 'Cases',
            isLoading: true
        }
    }

    handleChange = selectedOption => {
        this.setState(
            {selectedOption},
            () => this.setState({select: selectedOption.value})
        );
        this.setState(
            {selectedOption},
            () => this.setState({
                countries: this.state.countries.sort(function (a, b) {
                    switch (selectedOption.value) {
                        case 'Cases':
                            return b.cases - a.cases;
                            break;
                        case 'Today':
                            return b.todayCases - a.todayCases;
                            break;
                        case 'Active':
                            return b.active - a.active;
                            break;
                        case 'Deaths':
                            return b.deaths - a.deaths;
                            break;
                        case 'Recovered':
                            return b.recovered - a.recovered;
                            break;
                        case 'Critical':
                            return b.critical - a.critical;
                            break;
                        default:
                            return b.cases - a.cases;
                    }
                })
            })
        );
    };

    componentDidMount() {
        fetch('https://coronavirus-19-api.herokuapp.com/countries')
            .then(response => response.json())
            .then(json => {
                this.setState({countries: JSON.parse(JSON.stringify(json))}
                )
            })
    }

    render() {
        if (this.state.countries[0]) {
            const selectedOptions = this.state.selectedOptions;
            const select = this.state.select;
            return (
                <div>
                    <div style={{cursor: "pointer"}}>
                        <Dropdown className='countDrop' options={options}
                                  onChange={this.handleChange}
                                  value={selectedOptions}
                                  placeholder={<div>
                                      <div style={{cursor: "pointer"}} className='sort'>Sorted by {select} {sortIcon}</div>
                                  </div>}/>
                    </div>
                    {this.state.countries.map((country, index) => <CurrentCountry key={index}
                                                                                  countries={country}/>)}
                </div>
            )
        } else
            return (<div className="loader row justify-content-center">
                <PulseLoader
                    css={override}
                    size={20}
                    color={"white"}
                    loading={this.state.loading}
                />
            </div>);
    }

}

export default Countries;