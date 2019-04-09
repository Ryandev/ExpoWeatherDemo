
import { StyleSheet } from 'react-native'

const tintColor = '#fff';

export default StyleSheet.create ({
  boot: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
      height: 600
   },
   default: {
      flex: 1,
      backgroundColor: '#d3d3d3',
   },
   actionBarContainer: {
     backgroundColor: '#111',
     tintColor: '#f00',
   },
   actionBarTitle: {
     color: '#fff',
     tintColor: '#f00',
   },
   actionBarBackArrowColor: '#fff',

  tab: {
	  iconDefault: '#ccc',
	  iconSelected: tintColor,
	  textDefault: '#ccc',
	  textSelected: tintColor,
	  backgroundColor: '#f35'
  },
  tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',

});
