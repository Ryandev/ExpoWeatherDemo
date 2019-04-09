import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  FlatList,
} from 'react-native';
import { WebBrowser } from 'expo';
import { SearchBar, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import actions from '../actions/HomeScreen'
import apixu from '../model/apixu.js';
import constants from '../constants';

const styles = StyleSheet.create({
  container: {
    ...constants.theme.default,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#222',
  },
  searchbarContainer: {
    backgroundColor: 'transparent',
  },
  searchbarInput: {
    backgroundColor: '#fff',
    color: '#111',
  },
  list: {
    ...constants.theme.default,
    backgroundColor: 'transparent',
  },
  listitemContainer: {
    ...constants.theme.default,
    backgroundColor: 'transparent',
  },
  listitemTitle: {
    ...constants.theme.default,
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: '700',
  },
  listitemSubtitle: {
    ...constants.theme.default,
    backgroundColor: 'transparent',
    color: '#fff',
    fontWeight: '300',
  }
});

const homeScreen = class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Search',
    headerStyle: constants.theme.actionBarContainer,
    headerTitleStyle: constants.theme.actionBarTitle,
  };
  
  static defaultProps = {
    search: '',
    items: [],
    search: function(){},
  }

  render() {
    return (
      <View style={styles.container}>
		  <SearchBar
			lightTheme
			onChangeText={this.props.onSearch}
			placeholder='type a location...'
			value={this.props.search}
			inputContainerStyle={styles.searchbarInput}
			containerStyle={styles.searchbarContainer}
			inputStyle={styles.searchbarInput}
			leftIconContainerStyle={styles.searchbarInput}
			rightIconContainerStyle={styles.searchbarInput}
			placeholderTextColor={styles.searchbarInput.color}
			underlineColorAndroid='transparent'
			 />
			 <FlatList
			    style={styles.list}
				data={this.props.items}
				keyExtractor={item => item.id}  
				renderItem={({item}) => 
					<ListItem
						title={item.name.split(',')[0]}
						subtitle={item.name.split(',').splice(1,2).join(', ').trim()}
						titleStyle={styles.listitemTitle}
						subtitleStyle={styles.listitemSubtitle}
						chevron			
						onPress={() => this.props.onItemSelect(item)}		  					  
						containerStyle={styles.listitemContainer}
					/>
				}
			/>
      </View>
    );
  }
}

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  if ( typeof state.HomeScreen == undefined ) { return homeScreen.defaultProps; }
  return state.HomeScreen;
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    onItemSelect: (item) => {
		ownProps.navigation.navigate('Detail', {'item':item})
    },
    
    onSearch: (text) => {
      dispatch(actions.search(text))

      dispatch(function(dispacher){
		const api = new apixu.Apixu({apikey:constants.keys.apixu.apikey})            
		api.search(text).then((searchItems) => {
			dispatch(actions.list(searchItems));
		}, (err) => {
// 		  console.log(err.code, err.message);
		});
      })
    },
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(homeScreen); 