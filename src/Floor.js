/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Image} from 'react-native';

export default class Floor extends Component {
  render() {
    const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
    const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    const imageIteration = Math.ceil(width / height);

    return (
      <View
        style={{
          position: 'absolute',
          top: y,
          left: x,
          width: width,
          height: height,
          overflow: 'hidden',
          flexDirection: 'row',
        }}>
        {Array.apply(null, Array(imageIteration)).map((el, idx) => {
          return (
            <Image
              style={{width: width, height: height}}
              key={idx}
              resizeMode="stretch"
              source={require('./assets/floor.png')}
            />
          );
        })}
      </View>
    );
  }
}
