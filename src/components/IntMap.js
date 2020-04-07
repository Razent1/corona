import React, {useState} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import {css} from "@emotion/core";
import {PulseLoader} from "react-spinners";

const API_KEY = 'pk.eyJ1IjoicmF6ZW50IiwiYSI6ImNrODMzdzJvcDAyOXEzb281YnBtODhyd3oifQ.ql8oHBO18V6ryiFHeYqxVQ';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class M extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectCountry: null,
            coronaInfo: {},
            viewport: {
                latitude: 35.7452,
                longitude: 95.9956,
                width: '98vw',
                height: '88vh',
                zoom: 2
            }
        }
    }

    componentDidMount() {
        fetch('https://corona.lmao.ninja/yesterday?sort=cases')
            .then(response => response.json())
            .then(json => {
                this.setState({coronaInfo: JSON.parse(JSON.stringify(json))})
            })
        window.addEventListener("keydown", this.listener);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.listener);
    }

    listener = e => {
        if (e.key === "Escape") {
            this.setState({selectCounty: null});
        }
    }

    render() {
        if (this.state.coronaInfo[0]) {
            const info = this.state.coronaInfo;
            return (
                <div>
                    <ReactMapGL
                        {...this.state.viewport}
                        mapboxApiAccessToken={API_KEY}
                        mapStyle="mapbox://styles/razent/ck8358lcn0uct1is00calvoq4"
                        onViewportChange={(viewport) => {
                            this.setState({viewport: viewport})
                        }}
                    >
                        {info.map((count, index, arr) =>
                            (
                                <Marker key={index} latitude={parseFloat(count.countryInfo.lat)}
                                        longitude={parseFloat(count.countryInfo.long)}>
                                    <button className='marker-btn' onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({selectCountry: count});
                                    }}>
                                        <img src="https://img.icons8.com/color/48/000000/coronavirus.png"
                                             alt='Corona Icon'/>
                                    </button>
                                </Marker>
                            )
                        )}
                        {this.state.selectCountry ? (
                            <Popup latitude={parseFloat(this.state.selectCountry.countryInfo.lat)}
                                   longitude={parseFloat(this.state.selectCountry.countryInfo.long)}
                                   onClose={() => {
                                       this.setState({selectCountry: null});
                                   }}
                            >
                                <div>
                                    <h2>{this.state.selectCountry.country} <img
                                        src={this.state.selectCountry.countryInfo.flag} width='100px' height='50px' alt=""/>
                                    </h2>
                                    {/*<h3>{this.state.selectCountry.province}</h3>*/}
                                    <p>Confirmed: {this.state.selectCountry.cases} <br/>
                                        Today Cases: {this.state.selectCountry.todayCases} <br/>
                                        Deaths: {this.state.selectCountry.deaths} <br/>
                                        Recovered: {this.state.selectCountry.recovered} <br/>
                                    </p>
                                </div>
                            </Popup>
                        ) : null}

                    </ReactMapGL>
                </div>
            )
        } else {
            return (
                <div className='loader'><PulseLoader
                    css={override}
                    size={20}
                    color={"white"}
                    loading={this.state.loading}
                /></div>
            )
        }
    }
}

export default M;