import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  TextInput
} from 'react-native';
// import { TextInput } from 'react-native-paper';
import {Input, Button} from 'react-native-elements';
import { subscribe } from 'react-contextual';

const Search = subscribe()(props => {

  console.log("props----", props);
  const [timeout , setTime ] = useState(null);

  const onPlaceSearch = () => {
    clearTimeout(timeout);
    setTime(setTimeout(this.fetchPlaces, props.requiredTimeBeforeSearch));
  };

  const buildCountryQuery = () => {
    const {queryCountries} = props;

    if (!queryCountries) {
      return '';
    }

    return `&components=${queryCountries.map(countryCode => {
      return `country:${countryCode}`;
    }).join('|')}`;
  };

  const buildLocationQuery = () => {
    const {searchLatitude, searchLongitude, searchRadius} = props;

    if (!searchLatitude || !searchLongitude || !searchRadius) {
      return '';
    }

    return `&location=${searchLatitude},${searchLongitude}&radius=${searchRadius}`;
  };

  const buildTypesQuery = () => {
    const {queryTypes} = props;

    if (!queryTypes) {
      return '';
    }

    return `&types=${queryTypes}`;
  };

  const buildSessionQuery = () => {
    const {querySession} = props;

    if (querySession) {
      return `&sessiontoken=${querySession}`
    }

    return ''
  };

  const fetchPlaces = async () => {
    if (
      !props.search.query ||
      props.search.query.length < props.requiredCharactersBeforeSearch
    ) {
      return;
    }
    props.updateSearch(
      {
        showList: true,
        isLoading: true,
      });
        const places = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
            props.search.query
          }&key=${props.googleApiKey}&inputtype=textquery&language=${
            props.language
          }&fields=${
            props.queryFields
          }${this.buildLocationQuery()}${this.buildCountryQuery()}${this.buildTypesQuery()}${this.buildSessionQuery()}`
        ).then(response => response.json());
      
        props.updateSearch({
          isLoading: false,
          places: places.predictions,
        });
  };

  const onPlaceSelect = async (id, passedPlace) => {
    props.updateSearch({
      isLoading: true,
    }, async () => {
      try {
        const place = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${props.googleApiKey}&fields=${props.queryFields}&language=${props.language}${this.buildSessionQuery()}`
        ).then(response => response.json());

        return props.updateSearch(
          {
            showList: false,
            isLoading: false,
            query:
              place &&
              place.result &&
              (place.result.formatted_address || place.result.name),
          },
          () => {
            return props.onSelect && props.onSelect(place);
          }
        );
      } catch (e) {
        return props.updateSearch(
          {
            isLoading: false,
            showList: false,
            query: passedPlace.description,
          },
          () => {
            return props.onSelect && props.onSelect(passedPlace);
          }
        );
      }
    });
  };


  return (
    <View style={[styles.container, props.stylesContainer]}>
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
        placeholder={props.placeHolder}
        style={{paddingRight: 15, backgroundColor: 'white', height: 40}}
        onChangeText={query => {
          props.updateSearch({query}, () => {
            this.onPlaceSearch();
            props.onChangeText && props.onChangeText(query, this);
          });
        }}
        value={props.search.query}
        onFocus={() => props.updateSearch({showList: true, showClear: true})}
        onBlur={() => props.updateSearch({showList: false, showClear: false})}
        {...props.textInputProps}
        // clearButtonMode="always"
      />
      </View>
      { props.search.showClear &&
        <View style={{ width: '20%'}}>
        <Button
            buttonStyle={{ backgroundColor: 'white' , borderRadius: 30}}
            onPress={()=> {
              this.updateSearch({query: ''})
            }}
            title="Clear"
            titleStyle={{color: 'grey', fontSize: 15}}
          />
      </View>
      }
      
     </View>

      {props.search.showList && (
        <View
          style={[styles.scrollView, props.stylesList]}
          keyboardShouldPersistTaps="always"
        >
          {props.contentScrollViewTop}
          {props.search.isLoading && (
            <ActivityIndicator
              size="small"
              style={[styles.loading, props.stylesLoading]}
            />
          )}
          {props.search.places.map(place => {
            return (
              <TouchableOpacity
                key={`place-${place.id}`}
                style={[styles.place, props.stylesItem]}
                onPress={() => this.onPlaceSelect(place.place_id, place)}
              >
                <Text style={[styles.placeText, props.stylesItemText]}>
                  {props.resultRender(place)}
                </Text>
                {props.iconResult}
              </TouchableOpacity>
            );
          })}
          {props.contentScrollViewBottom}
        </View>
      )}
    </View>
  )
  
});
// class PlacesInput extends Component {
//   state = {
//     query: props.query || '',
//     places: [],
//     showList: false,
//     isLoading: false,
//     isFocused: false,
//     showClear: false,
//   };

//   timeout = null;

//   render() {
//     return (
//       <View style={[styles.container, props.stylesContainer]}>
//       <View style={{ 
//         marginTop: 10,
//         justifyContent:'space-between',
//         alignItems: 'center',
//         flexDirection: 'row' , 
//         backgroundColor: 'white', 
//         paddingLeft: 15,
//         marginBottom: 20,
//         paddingTop: 5, 
//         paddingRight: 10,
//         paddingBottom: 5, 
//         shadowRadius: 10, 
//         borderRadius: 20,
//         shadowColor: '#000',
//         shadowOffset: {
//           width: 0,
//           height: 3,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,

//         elevation: 6,
//         }}>
        
//         <View style={{ width: '80%'}}>
//         <TextInput
//           placeholder={props.placeHolder}
//           style={{paddingRight: 15, backgroundColor: 'white', height: 40}}
//           onChangeText={query => {
//             this.setState({query}, () => {
//               this.onPlaceSearch();
//               props.onChangeText && props.onChangeText(query, this);
//             });
//           }}
//           value={this.state.query}
//           onFocus={() => this.setState({showList: true, showClear: true})}
//           onBlur={() => this.setState({showList: false, showClear: false})}
//           {...props.textInputProps}
//           // clearButtonMode="always"
//         />
//         </View>
//         { this.state.showClear &&
//           <View style={{ width: '20%'}}>
//           <Button
//               buttonStyle={{ backgroundColor: 'white' , borderRadius: 30}}
//               onPress={()=> {
//                 this.setState({query: ''})
//               }}
//               title="Clear"
//               titleStyle={{color: 'grey', fontSize: 15}}
//             />
//         </View>
//         }
        
//        </View>

//         {this.state.showList && (
//           <View
//             style={[styles.scrollView, props.stylesList]}
//             keyboardShouldPersistTaps="always"
//           >
//             {props.contentScrollViewTop}
//             {this.state.isLoading && (
//               <ActivityIndicator
//                 size="small"
//                 style={[styles.loading, props.stylesLoading]}
//               />
//             )}
//             {this.state.places.map(place => {
//               return (
//                 <TouchableOpacity
//                   key={`place-${place.id}`}
//                   style={[styles.place, props.stylesItem]}
//                   onPress={() => this.onPlaceSelect(place.place_id, place)}
//                 >
//                   <Text style={[styles.placeText, props.stylesItemText]}>
//                     {props.resultRender(place)}
//                   </Text>
//                   {props.iconResult}
//                 </TouchableOpacity>
//               );
//             })}
//             {props.contentScrollViewBottom}
//           </View>
//         )}
//       </View>
//     );
//   }

//   onPlaceSearch = () => {
//     clearTimeout(this.timeout);
//     this.timeout = setTimeout(this.fetchPlaces, props.requiredTimeBeforeSearch);
//   };

//   buildCountryQuery = () => {
//     const {queryCountries} = props;

//     if (!queryCountries) {
//       return '';
//     }

//     return `&components=${queryCountries.map(countryCode => {
//       return `country:${countryCode}`;
//     }).join('|')}`;
//   };

//   buildLocationQuery = () => {
//     const {searchLatitude, searchLongitude, searchRadius} = props;

//     if (!searchLatitude || !searchLongitude || !searchRadius) {
//       return '';
//     }

//     return `&location=${searchLatitude},${searchLongitude}&radius=${searchRadius}`;
//   };

//   buildTypesQuery = () => {
//     const {queryTypes} = props;

//     if (!queryTypes) {
//       return '';
//     }

//     return `&types=${queryTypes}`;
//   };

//   buildSessionQuery = () => {
//     const {querySession} = props;

//     if (querySession) {
//       return `&sessiontoken=${querySession}`
//     }

//     return ''
//   };

//   fetchPlaces = async () => {
//     if (
//       !this.state.query ||
//       this.state.query.length < props.requiredCharactersBeforeSearch
//     ) {
//       return;
//     }
//     this.setState(
//       {
//         showList: true,
//         isLoading: true,
//       },
//       async () => {
//         const places = await fetch(
//           `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${
//             this.state.query
//           }&key=${props.googleApiKey}&inputtype=textquery&language=${
//             props.language
//           }&fields=${
//             props.queryFields
//           }${this.buildLocationQuery()}${this.buildCountryQuery()}${this.buildTypesQuery()}${this.buildSessionQuery()}`
//         ).then(response => response.json());

//         this.setState({
//           isLoading: false,
//           places: places.predictions,
//         });
//       }
//     );
//   };

//   onPlaceSelect = async (id, passedPlace) => {
//     this.setState({
//       isLoading: true,
//     }, async () => {
//       try {
//         const place = await fetch(
//           `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${props.googleApiKey}&fields=${props.queryFields}&language=${props.language}${this.buildSessionQuery()}`
//         ).then(response => response.json());

//         return this.setState(
//           {
//             showList: false,
//             isLoading: false,
//             query:
//               place &&
//               place.result &&
//               (place.result.formatted_address || place.result.name),
//           },
//           () => {
//             return props.onSelect && props.onSelect(place);
//           }
//         );
//       } catch (e) {
//         return this.setState(
//           {
//             isLoading: false,
//             showList: false,
//             query: passedPlace.description,
//           },
//           () => {
//             return props.onSelect && props.onSelect(passedPlace);
//           }
//         );
//       }
//     });
//   };
// }

Search.propTypes = {
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
  googleApiKey: PropTypes.string.isRequired,
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

Search.defaultProps = {
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

export default Search;
