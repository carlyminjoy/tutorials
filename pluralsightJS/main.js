var myCoffee = {
  flavor:      'espresso',
  temperature: 'piping hot',
  ounces:      100,
  milk:        true,
  reheat: function() {
    if(this.temperature === 'cold') {
      this.temperature = 'piping hot';
      alert('Your coffee has been reheated.');
    }
  }
};

function Friend(name, shirt) {
  this.name = name;
  this.shirt = shirt;

}
