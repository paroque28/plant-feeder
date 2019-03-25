import React, { Component } from 'react';
import {
  TouchableHighlight, 
  Text,
  View,
  StyleSheet,
  Image,

  FlatList
} from 'react-native';

import styles from './styles'




class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index)
  }

  render() {
    const  { item } = this.props
    const price = item.price_formatted.split(' ')[0]

    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor="#dddddd"
      >
        <View style={styles.rowContainer}>
          <Image style={styles.thumbnail} source={{ uri: item.img_url }} />

          <View style={styles.textContainer}>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    )
  }
}

export default class SearchResults extends React.Component {
  static navigationOptions = {
    title: 'Resultados'
  }

  _keyExtractor = (item, index) => index.toString()

  _onPressItem = () => {
    // TBD
  }

  _renderItem = ({ item, index }) => {
    return (
      <ListItem 
        item={item}
        index={index}
        onPressItem={this._onPressItem}
      />
    )
  }

  render() {
    const { params } = this.props.navigation.state

    return (
      <FlatList
        data={params.listings}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
