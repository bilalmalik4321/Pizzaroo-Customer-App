

import * as actions from '../components/actions';
export default {
  
  user : {
    id: '',
    name: '',
    phone: '',
    email: '',
    addresses: [],
    password: '',
    repeatPassword: '',
    isAccepted: false,
    loadingRegister: false,
    loggedIn: false,
    hasAddress: false,
    showList: true,

  },
  address : {
    tittle: '',
    uuid: '',
    apt: '',
    street: '',
    city:'',
    state: '',
    postalCode: '',
    country: '',
    lng: '',
    lat: '',
    instruction: '',
    modalVisible: false,
    newlySearch: true,
    createdAt: ''
  },
  pizzaOrder :{
    name: '',
    size: '',
    description: '',
    price: '',
    quantity: 1,
    instruction: '',
  },
  pizzaMenu : {

  },

  order : {
    items: [],
    userId: '',
    size: null,
    description: '',
    address:'',
    type:'',
    paymentMethod: '',
    bill: '',
  },

  item: {
    name: null,
    quantity: 1,
    price: 14.99,
    size: 2,
    description: null, 
  },

  errors: {
    error_signup: {

    }
  },
  ...actions,

  menu : {

  },


  schema: [
    {
      name: `Aracta's Pizza`,
      description: `The idea with React Native about hello there component structure than actual design.`,
      menu: {
        pizza: [
          {
            name: 'Hawaii',
            description: 'Best pizza small:210 cal, med:300cal, ........',
            sizes: [
              {
                size: 'S',
                description: 'Small',
                price: 10.99
              },
              {
                size: 'M',
                description: 'Medium',
                price: 12.99
              },
              {
                size: 'L',
                description: 'Large',
                price: 14.99
              },
              {
                size: 'XL',
                description: 'Extra Large',
                price: 17.99
              },
            ]
          },
          {
            name: 'Cheese and Sauage',
            description: 'Best pizza small:210 cal, med:300cal, ........',
            sizes: [
              {
                size: 'S',
                description: 'Small',
                price: 7.99
              },
              {
                size: 'M',
                description: 'Medium',
                price: 12.99
              },
              {
                size: 'L',
                description: 'Large',
                price: 78.99
              },
              {
                size: 'XLL',
                description: 'Extra Large Large',
                price: 117.99
              },
              {
                size: 'MXX',
                description: 'Medium Large',
                price: 121.99
              },
              {
                size: 'LLL',
                description: 'Extra Extra Large',
                price: 142.99
              },
  
            ]
          },
          {
            name: 'Vegie',
            description: 'Best pizza small:210 cal, lot and lot of vegie, ........',
            sizes: [
              {
                size: 'S',
                description: 'Small',
                price: 120.99
              },
              {
                size: 'M',
                description: 'Medium',
                price: 121.99
              },
              {
                size: 'L',
                description: 'Large',
                price: 142.99
              },
            
            ]
          }
        ],
        desserts: [
          {
            name: 'Funnel Cake Stick',
            description: 'Sweet strips of delicious funnel cake made by our special in house chef. Fresh out of the kitchen!!',
            price: 3.33
          },
          {
            name: 'Brownie',
            description: 'Sweet strips of delicious funnel cake made by our special in house chef. Fresh out of the kitchen!!',
            price: 9.99
          },
          {
            name: 'Deep fry icecream',
            description: 'Sweet strips of delicious funnel cake made by our special in house chef. Fresh out of the kitchen!!',
            price: 4.0
          },
          {
            name: 'Sweet Candy',
            description: 'Sweet strips of delicious funnel cake made by our special in house chef. Fresh out of the kitchen!!',
            price: 9.99
          }
        ],
        drinks: [
          {
            name: 'coke',
            size: '500ml',
            type: 'Bottle',
            price: 2.99,
            cal: 200
          },
          {
            name: 'Diet coke',
            size: '500ml',
            type: 'Bottle',
            price: 2.99,
            cal: 0
          },
          {
            name: 'Orange soda coke',
            size: '500ml',
            type: 'Bottle',
            price: 2.99,
            cal: 200
          },
          {
            name: 'Sprite coke',
            size: '500ml',
            type: 'Bottle',
            price: 2.99,
            cal: 200
          }
        ],
        sides: [
          {
            name: '10 Chicken wings',
            description: 'Sweet, spicy and Cripsy dreep fried chicken wings with our special sauce!!',
            styleChoice: {
              hasOption: true,
              options: ['Breaded', 'Classic']
            },
            freeDipping: 2,
            gluten: false,
            price: 12.333
          },
          {
            name: 'Big Box Fries',
            description: 'Sweet, spicy and Cripsy dreep fried chicken wings with our special sauce!!',
            styleChoice: {
              hasOption: false,
              options: []
            },
            freeDipping: 0,
            gluten: false,
            price: 4.55
          },
          {
            name: 'Half Moon Cheesy Bread',
            description: 'Sweet, spicy and Cripsy dreep fried chicken wings with our special sauce!!',
            styleChoice: {
              hasOption: false,
              options: []
            },
            freeDipping: 0,
            gluten: false,
            price: 4.55
          }
        ],
        dipping: [
          {
            name: 'Creamy Garlic',
            cal: 0,
            description: '',
            price: 1.44,
            gluten: false
          },
          {
            name: 'Blue Cheese',
            cal: 150,
            description: '',
            price: 1.44,
            gluten: false
          },
          {
            name: 'Honey Garlic',
            cal: 150,
            description: '',
            price: 1.44,
            gluten: false
          },
          {
            name: 'Creamy Dil',
            cal: 150,
            description: '',
            price: 1.44,
            gluten: false
          },
          {
            name: 'Mild',
            cal: 150,
            description: '',
            price: 1.44,
            gluten: false
          },
          {
            name: 'Hot',
            cal: 150,
            description: '',
            price: 1.44,
            gluten: false
          }
        ]
      }
    }
  ]
}
