const evalInContext = (js, context) => {
  return function () {
    return eval(js);
  }.call(context);
};

module.exports = {
  evalInContext,
};
