import React from "react";
import Graph from "./Graph";

class WorldInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            worldInfo: {
                cases: '',
                deaths: '',
                recovered: ''
            }
        }

    }

    componentDidMount() {
        fetch('https://coronavirus-19-api.herokuapp.com/all')
            .then(response => response.json())
            .then(json => {
                this.setState({
                    worldInfo: {
                        cases: json.cases,
                        deaths: json.deaths,
                        recovered: json.recovered
                    }
                });
            });
        fetch('')
    }

    render() {
        return (
            <div className='world container-fluid'>
                <div className='d-flex flex-row'>
                    <div className='d-flex flex-column flex-fill align-items-center'>
                        <div className='flex-row'>Coronavirus cases</div>
                        <div className='flex-row'>{this.state.worldInfo.cases}</div>
                    </div>
                    <div className='deaths d-flex flex-column flex-fill align-items-center'>
                        <div className='flex-row'>Deaths</div>
                        <div className='flex-row'>{this.state.worldInfo.deaths}</div>
                    </div>
                    <div className='recovered d-flex flex-column flex-fill align-items-center'>
                        <div className='flex-row'>Recovered</div>
                        <div className='flex-row'>{this.state.worldInfo.recovered}</div>
                    </div>

                </div>

            </div>
        )
    }


}

export default WorldInfo;