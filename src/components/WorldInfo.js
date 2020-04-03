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
    }

    render() {
        return (
            <div className='world container-fluid'>
                <div className='row'>
                    <div className='col-sm-4 align-items-center'>
                        <div className='row justify-content-center'>Coronavirus cases</div>
                        <div className='row justify-content-center'>{this.state.worldInfo.cases}</div>
                    </div>
                    <div className='deaths col-sm-4 align-items-center'>
                        <div className='row justify-content-center'>Deaths</div>
                        <div className='row justify-content-center'>{this.state.worldInfo.deaths}</div>
                    </div>
                    <div className='recovered col-sm-4 justify-content-center'>
                        <div className='row justify-content-center'>Recovered</div>
                        <div className='row justify-content-center'>{this.state.worldInfo.recovered}</div>
                    </div>
                </div>
            </div>
        )
    }


}

export default WorldInfo;