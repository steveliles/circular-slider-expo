import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import CircularSlider from './CircularSlider';
import ClockSlider from './ClockSlider';

class CircularSliderApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      slider1: 270,
      slider2: 180
    }
  }
  render() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={styles.slider1}>
            <CircularSlider width={400} height={400} meterColor='#0cd' textColor='#fff'
              value={this.state.slider1} onValueChange={(value)=>this.setState({slider1:value})}/>
          </View>
          <View style={styles.slider2}>
            <ClockSlider width={300} height={300} meterColor='#ffa' textColor='#000'
              value={this.state.slider2} onValueChange={(value)=>this.setState({slider2:value})}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    position: 'relative',
    width: 400,
    height: 400
  },
  slider1: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  slider2: {
    position: 'absolute',
    top: 50,
    left: 50
  }
});

export default CircularSliderApp;