import React from "react";

const CurrentCountry = (props) => {
    let count;
    let cases;
    let todayCases;
    let active;
    let deaths;
    let recovered;
    let critical;

    let country = props.countries;
    for (let key in country) {
        if (key === "country") {
            count = country[key];
        }
        if(key === 'cases'){
            cases = country[key];
        }
        if(key === 'todayCases'){
            todayCases = country[key];
        }
        if(key === 'active'){
            active = country[key];
        }
        if(key === 'deaths') {
            deaths = country[key];
        }
        if(key === 'recovered'){
            recovered = country[key];
        }
        if(key === 'critical'){
            critical = country[key];
        }
    }
    let info = <div className='box container-fluid'>
        <div className='d-flex justify-content-center'></div>
        <div className='country row align-items-center'>
            <div className='col-sm-3 align-items-center'>
                <div className='land d-flex flex-row'>{count}
                </div>
            </div>
            <div className='col-sm-3 align-items-center'>
                <div className='d-flex flex-row'>Cases: {cases}</div>
                <div className='d-flex flex-row'>Today: {todayCases} </div>
            </div>
            <div className='col-sm-3 align-items-center'>
                <div className='d-flex flex-row'>Active: {active}</div>
                <div className='d-flex flex-row'>Deaths: {deaths} </div>
            </div>
            <div className='col-sm-3 align-items-center'>
                <div className='d-flex flex-row'>Recovered: {recovered}</div>
                <div className='d-flex flex-row'>Critical: {critical} </div>
            </div>
        </div>
    </div>
    if (country !== undefined) {
        return info;
    } else
        return (<div></div>);
}

export default CurrentCountry;