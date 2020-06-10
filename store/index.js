import Vuex from 'vuex'
const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      itemCartAmount:0,
      itemCartCount:0,
      username:'',
      userid:'',
      order_no:'',
      loggedIn:false
    },
    mounted() {
      
    },
    mutations: {
      increment (state) {state.counter++},
      setItemCount(state,payload){state.itemCartCount=payload},
      setItemAmount(state,payload){state.itemCartAmount=payload},
      setUserId(state,payload){state.userid=payload},
      setUserName(state,payload){state.username=payload},
      setOrderNo(state,payload){state.order_no=payload},     
      setLoggedIn(state,payload){state.loggedIn=payload},

    },
  })
}
export default createStore
