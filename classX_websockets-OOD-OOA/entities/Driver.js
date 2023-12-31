class Driver {
   constructor(name, id){
      this.id = id;
      this.name = name;
      this.driving = false;
   }

   acceptRide(order){
      console.log(`Driver ${this.name} with id ${this.id} is accepting a ride: ${order.id}`);
      order.assignDriver(this);
   }

   rejectRide(order){
      console.log(`Driver ${this.name} with id ${this.id} is rejecting a ride: ${order.id}`);
   }
}

module.exports = Driver;