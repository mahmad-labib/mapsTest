import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Body } from 'native-base'
import MapExample from './components/googleMaps';
import { createStackNavigator } from 'react-navigation';

class Home extends Component {

    render() {
        return (
            <Container>
                <Content>
                    <Card>
                        <CardItem>
                            <Body>
                                <MapExample />
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    container: { ...StyleSheet.absoluteFillObject }
})

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