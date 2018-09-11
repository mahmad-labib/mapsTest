import React, { Component } from 'react';
import { View } from 'react-native';
import MapExample from './components/googleMaps';
import { createStackNavigator } from 'react-navigation';

class Home extends Component {

    render() {
        return (
            <View>
                <MapExample />
            </View>
        )
    }
}
const RootStack = createStackNavigator(
    {
        Home: Home,
    },
    {
        initialRouteName: 'Home',
    }
);

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}