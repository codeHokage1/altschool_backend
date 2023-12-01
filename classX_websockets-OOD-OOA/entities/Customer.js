class Customer {
   constructor(name){
      this.id = Math.floor(Math.random() * 1000 + 1).toString();
      this.name = name;
   }

   requestRide(order){
      console.log(`Customer ${this.name} with id ${this.id} is requesting a ride: ${order.id}`);
   }
}

module.exports = Customer;