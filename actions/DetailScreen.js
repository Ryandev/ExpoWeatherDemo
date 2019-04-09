

const updateCurrent = function(result) {
  return {
    type: 'UPDATE_CURRENT',
    result: result
  }  
};

export default {
  updateCurrent,
}