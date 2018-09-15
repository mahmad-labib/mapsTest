import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

let { width, height } = Dimensions.get('window');

export default class MapExample extends Component {
    constructor() {
        super();
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
                accuracy: 0
            }
        };
    }
    calDelta(lat, long, accuracy) {
        const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
        const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
        const longDelta = accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

        this.setState({
            region: {
                latitude: lat,
                longitude: long,
                latitudeDelta: latDelta,
                longitudeDelta: longDelta,
                accuracy: accuracy,
            },
        });
    }
    componentWillMount() {
        this.watchID = navigator.geolocation.getCurrentPosition(
            position => {
                this.calDelta(
                    position.coords.latitude, position.coords.longitude, position.coords.accuracy
                );
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        )
    }
    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    marker() {
        console.log(this.state.region.latitude)
        return {
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude,
        }
    }
    render() {
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                zoomControlEnabled={true}
                zoomEnabled={true}
                maxZoomLevel={18}
                style={styles.map}
                showsUserLocation={true}
                region={this.state.region}
            >
                <MapView.Marker
                    coordinate={this.marker()}
                />
            </MapView>
        );
    }
}

const styles = StyleSheet.create({
    map: { width: '100%', height: height },
})