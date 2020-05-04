import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  btnClickContain: {
    flexDirection: 'row',
    padding: 5,
    marginTop: 5,
    marginBottom: 5
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft:2,
    marginTop: 2,
  },
  btnIcon: {
    height: 25,
    width: 25
  },
  btnText: {
    fontSize: 16,
    marginLeft: 10,
    marginTop: 3,
    padding:2,
    //fontWeight:2
  }
});

export default styles;
