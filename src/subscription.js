// Clase base para una suscripción
class Subscription {
    constructor(plan) {
      this.plan = plan;
      this.price = 10; // Precio base del plan básico
    }
  
    cost() {
      return this.price;
    }
  
    description() {
      return `Suscripción: ${this.plan}`;
    }
  }
  
  // Decorador para añadir HD
  class HDDecorator extends Subscription {
    constructor(subscription) {
      super(subscription.plan);
      this.subscription = subscription;
    }
  
    cost() {
      return this.subscription.cost() + 5; // Costo adicional por HD
    }
  
    description() {
      return `${this.subscription.description()} con HD`;
    }
  }
  
  // Decorador para múltiples dispositivos
  class MultipleDevicesDecorator extends Subscription {
    constructor(subscription) {
      super(subscription.plan);
      this.subscription = subscription;
    }
  
    cost() {
      return this.subscription.cost() + 7; // Costo adicional por múltiples dispositivos
    }
  
    description() {
      return `${this.subscription.description()} para múltiples dispositivos`;
    }
  }
  
  // Decorador para descargas sin conexión
  class OfflineDownloadsDecorator extends Subscription {
    constructor(subscription) {
      super(subscription.plan);
      this.subscription = subscription;
    }
  
    cost() {
      return this.subscription.cost() + 4; // Costo adicional por descargas sin conexión
    }
  
    description() {
      return `${this.subscription.description()} con descargas sin conexión`;
    }
  }
  
  // Decorador para contenido premium
  class PremiumContentDecorator extends Subscription {
    constructor(subscription) {
      super(subscription.plan);
      this.subscription = subscription;
    }
  
    cost() {
      return this.subscription.cost() + 10; // Costo adicional por contenido premium
    }
  
    description() {
      return `${this.subscription.description()} con contenido premium`;
    }
  }
  
  module.exports = {
    Subscription,
    HDDecorator,
    MultipleDevicesDecorator,
    OfflineDownloadsDecorator,
    PremiumContentDecorator
  };
  