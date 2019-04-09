function reducer(store, action) {
    var returnStore = store
    
    if ( store === undefined ) {
        returnStore = {}
    }
    
    switch (action.type) {
      case 'UPDATE_CURRENT': 
        returnStore = { ...returnStore, ...action.result }
    }
    
    return returnStore;        
}

export default reducer;