function reducer(store, action) {
    var returnStore = store
    
    if ( store === undefined ) {
        returnStore = { }
    }
    
    switch (action.type) {
      case 'SEARCH': 
        returnStore = { ...returnStore, 'search': action.text }

      case 'LIST':
        returnStore = { ...returnStore, 'items': action.items }
    }
        
	return returnStore;
}

export default reducer;