import React, {useState} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";

const API_KEY = 'pk.eyJ1IjoicmF6ZW50IiwiYSI6ImNrODMzdzJvcDAyOXEzb281YnBtODhyd3oifQ.ql8oHBO18V6ryiFHeYqxVQ';

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
        fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
            .then(response => response.json())
            .then(json => {
                this.setState({coronaInfo: JSON.parse(JSON.stringify(json))})
            })
        const listener = e => {
            if(e.key === "Escape") {
                this.setState({selectCounty: null});
            }
        };
        window.addEventListener("keydown", listener);

    }

    render() {
        if (this.state.coronaInfo.locations) {
            const info = this.state.coronaInfo;
            const arr = info.locations[0];
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
                        {info.locations.map((count, index, arr) =>
                            (
                                <Marker key={count.id} latitude={parseFloat(count.coordinates.latitude)}
                                        longitude={parseFloat(count.coordinates.longitude)}>
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
                            <Popup latitude={parseFloat(this.state.selectCountry.coordinates.latitude)}
                                   longitude={parseFloat(this.state.selectCountry.coordinates.longitude)}
                                   onClose={() => {
                                       this.setState({selectCountry: null});
                                   }}
                            >
                                <div>
                                    <h2>{this.state.selectCountry.country}</h2>
                                    <h3>{this.state.selectCountry.province}</h3>
                                    <p>Confirmed: {this.state.selectCountry.latest.confirmed} <br/>
                                        Deaths: {this.state.selectCountry.latest.deaths} <br/>
                                        Recovered: {this.state.selectCountry.latest.recovered}</p>
                                </div>
                            </Popup>
                        ) : null}

                    </ReactMapGL>
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }
    }
}


// const IntMap = () => {
//     const [viewport, setViewport] = useState({
//         latitude: 37.785164,
//         longitude: -100,
//         width: '98vw',
//         height: '90vh',
//         zoom: 1
//
//     });
//
//
//     return (
//         <div >
//             <ReactMapGL
//                 {...viewport}
//                 mapboxApiAccessToken={API_KEY}
//                 mapStyle="mapbox://styles/razent/ck8358lcn0uct1is00calvoq4"
//                 onViewportChange ={(viewport) => {setViewport(viewport)}}
//             >
//             </ReactMapGL>
//         </div>
//     )
// }

export default M;