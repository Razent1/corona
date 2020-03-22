import React from "react";
import {GoogleMap, Marker, withScriptjs, withGoogleMap} from "react-google-maps";

const API_KEY = 'AIzaSyAq-4xkvjpE5jdqbs3p73BJ7NwLylipLa4';

const Map = () => {
    return (<GoogleMap defaultZoom={10}
                       defaultCenter={{lat: -34.397, lng: 150.644}}/>);
}
const WrappedMap = withScriptjs(withGoogleMap(Map));

class gMap extends React.Component {
    render() {
        return (
            <div style={{width: "98vw", height: "100vh"}}>
                <WrappedMap
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
                    loadingElement={<div style={{height: `100%`}}/>}
                    containerElement={<div style={{height: `80%`}}/>}
                    mapElement={<div style={{height: `100%`}}/>}
                />
            </div>
        )
    }
}

export default gMap;