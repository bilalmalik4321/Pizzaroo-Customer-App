import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import { Button} from 'react-native-elements';
import { callCloudFunctions,geoCodeSearchDetail } from '../api';
/**
 * Forked repo from react-native-place-input
 * Modified and added an Icon to clear input
 */
class PlacesInput extends Component {
  state = {
    query: ''|| this.props.query,
    places: [],
    showList: false,
    isLoading: false,
    isFocused: false,
    showClear: false,
 
  };
  timeout = null;
  render() {
  
    return (
      <View style={[styles.container, this.props.stylesContainer]}>
      <View style={{ 
        marginTop: 10,
        justifyContent:'space-between',
        alignItems: 'center',
        flexDirection: 'row' , 
        backgroundColor: 'white', 
        paddingLeft: 15,
        marginBottom: 20,
        paddingTop: 5, 
        paddingRight: 10,
        paddingBottom: 5, 
        shadowRadius: 10, 
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,

        elevation: 6,
        }}>
        
        <View style={{ width: '80%'}}>
        <TextInput
          placeholder={this.props.placeHolder}
          style={{paddingRight: 15, backgroundColor: 'white', height: 40}}
          onChangeText={query => {
              this.setState({query}, () => {
              this.onPlaceSearch();
              this.props.onChangeText && this.props.onChangeText(query, this);

              });
          }}
          value={this.state.query}
          onFocus={() => this.setState({showList: true, showClear: true})}
          onBlur={() => this.setState({showList: false, showClear: false})}
          {...this.props.textInputProps}
          // clearButtonMode="always"
        />
        </View>
        { this.state.showClear &&
          <View style={{ width: '20%'}}>
          <Button
              buttonStyle={{ backgroundColor: 'white' , borderRadius: 30}}
              onPress={()=> {
                this.setState({query: ''})
              }}
              title="Clear"
              titleStyle={{color: 'grey', fontSize: 15}}
            />
        </View>
        }
        
       </View>

        {this.state.showList && (
          <View
            style={[styles.scrollView, this.props.stylesList]}
            keyboardShouldPersistTaps="always"
          >
            {this.props.contentScrollViewTop}
            {this.state.isLoading && (
              <ActivityIndicator
                size="small"
                style={[styles.loading, this.props.stylesLoading]}
              />
            )}
            {this.state.places.map(place => {
              return (
                <TouchableOpacity
                  key={`place-${place.id}`}
                  style={[styles.place, this.props.stylesItem]}
                  onPress={() => this.onPlaceSelect(place.place_id, place)}
                >
                  <Text style={[styles.placeText, this.props.stylesItemText]}>
                    {this.props.resultRender(place)}
                  </Text>
                  {this.props.iconResult}
                </TouchableOpacity>
              );
            })}
            {this.props.contentScrollViewBottom}
          </View>
        )}
      </View>
    );
  }

  onPlaceSearch = () => {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.fetchPlaces, this.props.requiredTimeBeforeSearch);
  };

  buildCountryQuery = () => {
    const {queryCountries} = this.props;
    console.log("props", this.props)

    if (!queryCountries) {
      return '';
    }

    return `&components=${queryCountries.map(countryCode => {
      return `country:${countryCode}`;
    }).join('|')}`;
  };

  buildLocationQuery = () => {
    const {searchLatitude, searchLongitude, searchRadius} = this.props;

    if (!searchLatitude || !searchLongitude || !searchRadius) {
      return '';
    }

    return `&location=${searchLatitude},${searchLongitude}&radius=${searchRadius}`;
  };

  buildTypesQuery = () => {
    const {queryTypes} = this.props;

    if (!queryTypes) {
      return '';
    }

    return `&types=${queryTypes}`;
  };

  buildSessionQuery = () => {
    const {querySession} = this.props;

    if (querySession) {
      return `&sessiontoken=${querySession}`
    }

    return ''
  };

  fetchPlaces = async () => {
    if (
      !this.state.query ||
      this.state.query.length < this.props.requiredCharactersBeforeSearch
    ) {
      return;
    }
    this.setState(
      {
        showList: true,
        isLoading: true,
      },
      async () => {
        const places = await callCloudFunctions('geoCodeAutoComplete',{
          query: this.state.query,
          language: this.props.language, 
          queryFields: this.props.queryFields, 
          buildLocationQuery: this.buildLocationQuery(), 
          buildCountryQuery: this.buildCountryQuery(), 
          buildTypesQuery: this.buildTypesQuery(),
          buildSessionQuery: this.buildSessionQuery()
        })
        // console.log("place results", places)
        this.setState({
          isLoading: false,
          places: places.predictions
        });
      }
    );
  };

  onPlaceSelect = async (id, passedPlace) => {
    this.setState({
      isLoading: true,
    }, async () => {
      try {
        const place = await callCloudFunctions('geoCodeSearchDetail',{
          id,
          queryFields: this.props.queryFields,
          buildSessionQuery: this.buildSessionQuery(),
          language: this.props.language
        })
        // console.log("places ------- *********", {
        //   id,
        //   queryFields: this.props.queryFields,
        //   buildSessionQuery: this.buildSessionQuery(),
        //   language: this.props.language
        // })
        return this.setState(
          {
            showList: false,
            isLoading: false,
            query: ''
            // query:
            //   place &&
            //   place.result &&
            //   (place.result.formatted_address || place.result.name),
          },
          () => {
            return this.props.onSelect && this.props.onSelect(place);
          }
        );
      } catch (e) {
        return this.setState(
          {
            isLoading: false,
            showList: false,
            query: passedPlace.description,
          },
          () => {
            return this.props.onSelect && this.props.onSelect(passedPlace);
          }
        );
      }
    });
  };
}

PlacesInput.propTypes = {
  contentScrollViewBottom: PropTypes.node,
  contentScrollViewTop: PropTypes.node,
  stylesInput: PropTypes.object,
  stylesContainer: PropTypes.object,
  stylesList: PropTypes.object,
  stylesItem: PropTypes.object,
  stylesItemText: PropTypes.object,
  stylesLoading: PropTypes.object,
  resultRender: PropTypes.func,
  query: PropTypes.string,
  queryFields: PropTypes.string,
  queryCountries: PropTypes.array,
  queryTypes: PropTypes.string,
  querySession: PropTypes.string,
  searchRadius: PropTypes.number,
  searchLatitude: PropTypes.number,
  searchLongitude: PropTypes.number,
  // googleApiKey: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  textInputProps: PropTypes.object,
  iconResult: PropTypes.any,
  iconInput: PropTypes.any,
  language: PropTypes.string,
  onSelect: PropTypes.func,
  onChangeText: PropTypes.func,
  requiredCharactersBeforeSearch: PropTypes.number,
  requiredTimeBeforeSearch: PropTypes.number,
};

PlacesInput.defaultProps = {
  stylesInput: {},
  stylesContainer: {},
  stylesList: {},
  stylesItem: {},
  stylesLoading: {},
  stylesItemText: {},
  queryFields: 'formatted_address,geometry,name',
  placeHolder: 'Search places...',
  textInputProps: {},
  language: 'en',
  resultRender: place => place.description,
  requiredCharactersBeforeSearch: 2,
  requiredTimeBeforeSearch: 1000,
};

const styles = StyleSheet.create({
  container: {

    position: 'absolute',
    top: 15,
    left: 10,
    right: 10,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  place: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 15,
    position: 'relative',
    zIndex: 10001,
  },
  placeIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
    color: 'rgba(0,0,0,0.3)',
  },
  placeText: {
    color: 'rgba(0,0,0,0.8)',
    paddingRight: 60,
  },
  loading: {
    margin: 10,
  },
});

export default PlacesInput;
