class Customer {
    constructor(name, email, address) {
      this.name = name;
      this.email = email;
      this.address = address;
      this.subscription = null;
  
      // Añadir el cliente
      Customer.customers.push(this);
    }
  
    static customers = []; 
  
    subscribe(subscription) {
      this.subscription = subscription;
    }
  
    cancelSubscription() {
      this.subscription = null;
    }
  
    static getCustomerByName(name) {
      return Customer.customers.find(customer => customer.name === name);
    }
  }
  
  module.exports = Customer;
  