import SearchField from "react-search-field";
import React from "react";

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentCountry: '',
            countryInfo: {
                country: '',
                cases: '',
                todayCases: '',
                deaths: '',
                todayDeaths: '',
                recovered: '',
                active: '',
                critical: ''
            }
        }

        this.getCountry = this.getCountry.bind(this);
        this.getCountryApi = this.getCountryApi.bind(this);
    }

    getCountryApi = (country) => {
        try {
            fetch(`https://coronavirus-19-api.herokuapp.com/countries/${country}`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        countryInfo: {
                            country: data.country,
                            cases: data.cases,
                            todayCases: data.todayCases,
                            deaths: data.deaths,
                            todayDeaths: data.todayDeaths,
                            recovered: data.recovered,
                            active: data.active,
                            critical: data.critical
                        }
                    });
                });
        } catch (e) {
            console.log(e);
        }
    }

    getCountry = (event) => {
        event.preventDefault();
        let country = event.target.country.value;
        this.getCountryApi(country);
        this.setState({currentCountry: country});
    }


    render() {
        console.log(this.state.countryInfo.todayCases);
        const infoBlock = this.state.countryInfo;
        if(infoBlock.country === ''){
            return(
            <form className='frm d-flex justify-content-center' onSubmit={this.getCountry}>
                <input type="text" placeholder='Country' name='country'/>
                <button type='submit'>Show</button>
            </form>
            )
        }
        else {
            return (
                <div className='box container-fluid'>
                    <form className='frm d-flex justify-content-center' onSubmit={this.getCountry}>
                        <input type="text" placeholder='Country' name='country'/>
                        <button type='submit'>Show</button>
                    </form>
                    <div className='country d-flex flex-row'>
                        <div className='d-flex flex-column w-25 align-items-center'>
                            <div className='land d-flex flex-row'>{infoBlock.country}
                            </div>
                        </div>
                        <div className='d-flex flex-column w-25 align-items-center'>
                            <div className='d-flex flex-row'>Cases: {infoBlock.cases}</div>
                            <div className='d-flex flex-row'>Today: {infoBlock.todayCases} </div>
                        </div>
                        <div className='d-flex flex-column w-25 align-items-center'>
                            <div className='d-flex flex-row'>Active: {infoBlock.active}</div>
                            <div className='d-flex flex-row'>Deaths: {infoBlock.deaths} </div>
                        </div>
                        <div className='d-flex flex-column w-25 align-items-center'>
                            <div className='d-flex flex-row'>Recovered: {infoBlock.recovered}</div>
                            <div className='d-flex flex-row'>Critical: {infoBlock.critical} </div>
                        </div>

                    </div>
                    <div className='imgCountry d-flex flex-column'><img
                        src={`https://covid19.mathdro.id/api/countries/${this.state.currentCountry}/og`}
                        alt={`${this.state.currentCountry}`}/></div>
                </div>
            )
        }
    }
}


export default Search;

