class Customer {
   constructor(name, id){
      this.id = id;
      this.name = name;
   }

   requestRide(order){
      console.log(`Customer ${this.name} with id ${this.id} is requesting a ride: ${order.id}`);
   }
}

module.exports = Customer;