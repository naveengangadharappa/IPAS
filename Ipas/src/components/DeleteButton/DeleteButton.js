import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../BackButton/styles';

export default class DeleteButton extends React.Component {
  render() {
    return (
      <TouchableHighlight onPress={this.props.onPress} style={styles.btnContainer}>
        <Image source={require('../../../assets/icons/clear.png')} style={styles.btnIcon} />
      </TouchableHighlight>
    );
  }
}

DeleteButton.propTypes = {
  onPress: PropTypes.func,
};
