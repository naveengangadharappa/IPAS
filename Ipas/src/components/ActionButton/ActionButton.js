import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class ActionButton extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={[styles.container,{width:this.props.width,height:this.props.height,opacity:this.props.opacity}]}>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

ActionButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
