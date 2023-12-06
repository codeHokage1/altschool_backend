class Order {
   constructor(customer, destination, currentLocation, price){
      this.id = Math.floor(Math.random() * 1000 + 1).toString();
      this.customer = customer;
      this.destination = destination;
      this.driver = null;
      this.currentLocation = currentLocation;
      this.price = price;
      this.status = "pending";
   }

   assignDriver(driver){
      this.driver = driver;
      this.status = "accepted";
      console.log(`Order ${this.id} is accepted by driver ${this.driver.name}`);
   }
}

module.exports = Order;