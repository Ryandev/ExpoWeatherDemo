import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { connect } from 'react-redux';
import apixu from '../model/apixu.js';
import actions from '../actions/DetailScreen.js';
import constants from '../constants';

const styles = StyleSheet.create({
  containerOuter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: '#1A1A1A',
  },
  containerHeader: {
    ...constants.theme.default,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 0.45,
  },
  containerHeaderNested: {
    ...constants.theme.default,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
  },
  containerHeaderRow: {
    ...constants.theme.default,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 0.5,
  },
  imageHeader: {
	  aspectRatio: 1, 
	  height: 260, 
  },
  headerTitleText: {
    textAlign: 'center',
    fontSize: '18vmin',
    fontWeight: '500',
  },
  headerBodyText: {
    textAlign: 'center',
    fontSize: '14vmin',
  },
  containerList: {
    ...constants.theme.default,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: 15,
    paddingBottom: 15,
    flex: 0.55,
    borderTopStyle: 'solid',
    borderTopWidth: '2px',
    borderTopColor: '#000',
    backgroundColor: '#1A1A1A',
    color: '#fff',
  },
  containerListItem: {
    ...constants.theme.default,
    backgroundColor: '#1A1A1A',
    color: '#fff',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  containerListItemNested: {
    ...constants.theme.default,
    backgroundColor: '#1A1A1A',
    color: '#fff',
    flexDirection: 'row',
    height: 30,
  },
  containerListItemInnerIcon: {
    ...constants.theme.default,
    backgroundColor: '#1A1A1A',
    color: '#fff',
    flexDirection: 'row',
    flex: 0.7,
    height: 30,
  },
  containerListItemInnerTempMax: {
    ...constants.theme.default,
    backgroundColor: '#1A1A1A',
    color: '#fff',
    flexDirection: 'row',
    flex: 0.3,
    height: 30,
  },
  containerListItemInnerTempMin: {
    ...constants.theme.default,
    backgroundColor: '#1A1A1A',
    color: '#fff',
    flexDirection: 'row',
    flex: 0.3,
    height: 30,
  },
  imageListLitem: {
    width: 50,
    height: 30,
  },
  textListItemTitle: {
    padding: 5,
    backgroundColor: '#1A1A1A',
    color: '#fff',
    fontSize: '16vmin',
    fontWeight: '300',
    fontFamily: 'spaced-mono',
  },
  textListItemBody: {
    padding: 5,
    backgroundColor: '#1A1A1A',
    color: '#fff',
    fontSize: '14vmin',
    fontWeight: '300',
  },
  textListItemIcon: {
    padding: 5,
    backgroundColor: '#1A1A1A',
    color: '#fff',
    paddingRight: 2,
    fontSize: '14vmin',
    fontWeight: '600',
  }
});

class DetailHeader extends React.Component {
  render() {
    return (
      <View style={styles.containerHeader}>
        <View style={styles.containerHeaderNested}>
          <View style={styles.containerHeaderRow}>
            <Image
              source={this.props.imageUrl}
              resizeMode="contain"
              fadeDuration={0}
              style={styles.imageHeader}
            />
          </View>
          <Text style={styles.headerTitleText}>
            {this.props.text}
          </Text>
          <Text style={styles.headerBodyText}>
            Now {this.props.temp_c}°c
          </Text>
          <Text style={styles.headerBodyText}>
            sunrise {this.props.sunrise}, sunset {this.props.sunset}, 
          </Text>
          <Text style={styles.headerBodyText}>
            wind {this.props.wind_mph} mph {this.props.wind_dir}, 
          </Text>
        </View>
      </View>
    );
  }
}

class DetailListItem extends React.Component {
  render() {
    const imageUrl = this.props.imageUrl || '';
    const minTempC = this.props.mintemp_c || 0;
    const maxTempC = this.props.maxtemp_c || 0;
    const text = this.props.text || '';
    const weekday = this.props.weekday || '';

    return (
	  <View style={styles.containerListItem}>
      <View style={styles.containerListItemNested}>
        <View style={styles.containerListItemInnerIcon}>
            <Text style={styles.textListItemTitle} numberOfLines={2}>
              {weekday.toUpperCase()}
            </Text>
        </View>    
        <View style={styles.containerListItemInnerTempMax}>
          <Text style={{...styles.textListItemIcon, paddingTop: 12}}>
            high
          </Text>
          <Text style={{...styles.textListItemBody, paddingTop: 12}}>
            {maxTempC}°c
          </Text>
        </View>
      </View>
      <View style={styles.containerListItemNested}>
        <View style={styles.containerListItemInnerIcon}>
          <Image
            source={imageUrl}
            resizeMode="contain"
            fadeDuration={0}
            style={styles.imageListLitem} 
          />	  
          <Text style={styles.textListItemBody} numberOfLines={2}>
            {text.toLowerCase()}
          </Text>
        </View>
        <View style={styles.containerListItemInnerTempMin}>
          <Text style={styles.textListItemIcon}>
            low
          </Text>
          <Text style={styles.textListItemBody}>
            {minTempC}°c
          </Text>
        </View>
    </View>	  
	</View>	  
    );
  }
}

const detailScreen = class DetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('item') ? navigation.getParam('item').name.split(',')[0] : '',
      headerStyle: constants.theme.actionBarContainer,
      headerTitleStyle: constants.theme.actionBarTitle,
      headerTintColor: constants.theme.actionBarBackArrowColor,
    };
  };
  
  static defaultProps = {
    current: {
		  temp_c: 0,
		  weatherIcon: '',
    },
    forecast: [{
		  temp_c: 0,
		  weatherIcon: '',
		  dayName: '',
		  mintemp_c: 0,
		  maxtemp_c: 0,
    }],
  }
  
  componentDidMount = () => {
      this.props.refresh()
  }

  render() {
		const { navigation } = this.props;
		const name = navigation.getParam('item') ? navigation.getParam('item').name : '';
    const forecast = this.props.forecast;

    return (
	    <View style={styles.containerOuter}>
	      <DetailHeader {...this.props.current} />
        <View style={styles.containerList}>
		      {forecast.map((value,index) => {
	  		    return <DetailListItem {...value} />
  		    })} 
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: State, ownProps: OwnProps) => {
  if ( typeof state.DetailScreen == undefined ) { return detailScreen.defaultProps; }
  let current = {};

  if ( 'current' in state.DetailScreen ) {
    current = state.DetailScreen.current;
    const weatherIconCodeFromImageUrl = current.condition.icon.split('/').splice(-1,1)[0].split('.')[0];
    current = {
      ...current,
      imageUrl: constants.weather.codes[parseInt(weatherIconCodeFromImageUrl)],
      ...current.condition,
    }
  }

  let forecast = [{}];
  
  if ( 'forecast' in state.DetailScreen ) {
	  forecast = state.DetailScreen.forecast.forecastday.map((value,index) => {
      const weatherIconCodeFromImageUrl = value.day.condition.icon.split('/').splice(-1,1)[0].split('.')[0];
      const date = new Date(value.date);
      const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		  return {
        weekday: weekdays[date.getDay()],
			  ...value, 
			  ...value.day, 
			  ...value.day.condition, 
			  ...value.astro,
			  imageUrl: constants.weather.codes[parseInt(weatherIconCodeFromImageUrl)],
			}
	  })

    current = {...current, ...forecast[0]};
    forecast.splice(0,1);
  }
  
  return {current,forecast};
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: OwnProps) => {
  return {
    refresh: (text) => {
      dispatch(function(dispacher){
        if ( !ownProps.navigation.getParam('item') ) { return; }
        const api = new apixu.Apixu({apikey:constants.keys.apixu.apikey});
        const lat = ownProps.navigation.getParam('item').lat;
        const lng = ownProps.navigation.getParam('item').lon;
        api.forecast(lat + ',' + lng, 7).then((result) => {
          dispatch(actions.updateCurrent(result));
        }, (err) => {
          console.log(err.code, err.message);
        });
      })
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(detailScreen); 