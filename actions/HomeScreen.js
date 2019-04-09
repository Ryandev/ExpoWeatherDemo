

const search = function(text) {
  return {
    type: 'SEARCH',
    text: text
  }  
};

const list = function(items) {
   return {
    type: 'LIST',
    items: items
   }
};

export default {
  search,
  list
}