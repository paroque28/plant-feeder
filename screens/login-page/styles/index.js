import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  image: {
    width: '80%',
    height: '40%',
    resizeMode: 'contain'
  },
  flowRight: {
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  searchInput: {
    height: 36,
    padding: 4,
    margin: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#48BBEC",
    borderRadius: 8,
    color: "#48BBEC"
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  description: {
    marginBottom: 20,
    fontSize:  18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#656500'
  },
});
