/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, Animated} from 'react-native';
import firestore from '@react-native-firebase/firestore';

// importing constants
import Constants from '../Constant.js';
import {FlatList} from 'react-native-gesture-handler';

export default class LeaderBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board: [],
    };
  }

  componentDidMount() {
    firestore()
      .collection('leaderboard')
      .orderBy('score')
      .limit(25)
      .onSnapshot(snap => {
        let tmp = [];
        snap.forEach(snap => {
          tmp.push(snap.data());
        });
        this.setState({board: tmp.reverse()});
      });
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <Image
          source={require('../../assets/background-day.png')}
          style={styles.backgroundImage}
          resizeMode="stretch"
        />
        <Image
          source={require('../../assets/bird2.png')}
          resizeMode="contain"
          style={[styles.birdImage]}
        />
        <Animated.View style={styles.innerContainer}>
          <FlatList
            style={styles.boardListContainer}
            data={this.state.board}
            keyExtractor={(i, index) => index}
            renderItem={({item}) => {
              return (
                <View style={styles.flatListRow}>
                  <Text style={styles.flatListText}>{item.name}</Text>
                  <Text style={styles.flatListText}>{item.score}</Text>
                </View>
              );
            }}
            ItemSeparatorComponent={() => {
              return <View style={styles.flatListSeparator} />;
            }}
            ListEmptyComponent={() => {
              return <Text style={styles.flatListText}>Loading...</Text>;
            }}
            ListHeaderComponent={() => {
              return (
                <View
                  style={[
                    styles.flatListRow,
                    {
                      borderBottomColor: 'white',
                      borderBottomWidth: 1,
                      marginBottom: 10,
                    },
                  ]}>
                  <Text style={styles.flatListText}>Name</Text>
                  <Text style={styles.flatListText}>Score</Text>
                </View>
              );
            }}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  birdImage: {
    width: 100,
    alignSelf: 'center',
    position: 'absolute',
    transform: [{translateY: -Constants.MAX_HEIGHT / 3}],
  },
  innerContainer: {
    alignSelf: 'center',
    position: 'absolute',
    height: Constants.MAX_HEIGHT - Constants.MAX_HEIGHT / 3 - 20,
    bottom: Constants.MAX_HEIGHT / 12,
    width: Constants.MAX_WIDTH - 80,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardListContainer: {
    alignSelf: 'stretch',
  },
  flatListRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  flatListText: {
    color: 'white',
    fontSize: 18,
    overflow: 'hidden',
  },
  flatListSeparator: {
    borderBottomColor: 'rgba(255,255,255, 0.2)',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
});