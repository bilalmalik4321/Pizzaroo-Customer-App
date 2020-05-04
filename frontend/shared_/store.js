

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


  schema: [
    {
      name: `Aracta's Pizza`,
      description: `The idea with React Native Elements is more about component
      structure than actual design.`,
      menu: {
        pizza: [
          {
            name: 'Hawaii',
            description: 'Best pizza small:210 cal, med:300cal, ........',
            sizes: [
              {
                size: 'S',
                price: 10.99
              },
              {
                size: 'M',
                price: 12.99
              },
              {
                size: 'L',
                price: 14.99
              },
              {
                size: 'XL',
                price: 14.99
              },
            ]
          },
          {
            name: 'Cheese and Sauage',
            description: 'Best pizza small:210 cal, med:300cal, ........',
            sizes: [
              {
                size: 'S',
                price: 10.99
              },
              {
                size: 'M',
                price: 12.99
              },
              {
                size: 'L',
                price: 14.99
              },
              {
                size: 'XL',
                price: 14.99
              },
            ]
          },
          {
            name: 'Vegie',
            description: 'Best pizza small:210 cal, lot and lot of vegie, ........',
            sizes: [
              {
                size: 'S',
                price: 10.99
              },
              {
                size: 'M',
                price: 12.99
              },
              {
                size: 'L',
                price: 14.99
              },
              {
                size: 'XL',
                price: 14.99
              },
            ]
          }
        ],
        desert: [
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
        drink: [
          {
            name: 'coke',
            size: '500ml',
            type: 'Bottle',
            price: 2.99
          },
          {
            name: 'Diet coke',
            size: '500ml',
            type: 'Bottle',
            price: 2.99
          },
          {
            name: 'Orange soda coke',
            size: '500ml',
            type: 'Bottle',
            price: 2.99
          },
          {
            name: 'Sprite coke',
            size: '500ml',
            type: 'Bottle',
            price: 2.99
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
            description: '',
            price: 1.44,
            gluten: false
          },
          {
            name: 'Blue Cheese',
            description: '',
            price: 1.44,
            gluten: false
          },
          {
            name: 'Honey Garlic',
            description: '',
            price: 1.44,
            gluten: false
          },
          {
            name: 'Creamy Dil',
            description: '',
            price: 1.44,
            gluten: false
          },
          {
            name: 'Mild',
            description: '',
            price: 1.44,
            gluten: false
          },
          {
            name: 'Hot',
            description: '',
            price: 1.44,
            gluten: false
          }
        ]
      }
    }
  ]
}
