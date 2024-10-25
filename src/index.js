const express = require('express');
const app = express();
const {
  Subscription,
  HDDecorator,
  MultipleDevicesDecorator,
  OfflineDownloadsDecorator,
  PremiumContentDecorator
} = require('./subscription');
const Customer = require('./Customer'); 

app.use(express.json());
app.use(express.static('public')); 


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); 
});


app.post('/subscribe', (req, res) => {
  const { name, email, address, plan, options } = req.body;

  
  const customer = new Customer(name, email, address);

  
  let subscription = new Subscription(plan);

  
  if (options) {
    if (options.includes('HD')) {
      subscription = new HDDecorator(subscription);
    }
    if (options.includes('Múltiples Dispositivos')) {
      subscription = new MultipleDevicesDecorator(subscription);
    }
    if (options.includes('Descargas sin conexión')) {
      subscription = new OfflineDownloadsDecorator(subscription);
    }
    if (options.includes('Contenido Premium')) {
      subscription = new PremiumContentDecorator(subscription);
    }
  }

  customer.subscribe(subscription);

  res.status(201).json({
    message: 'Suscripción creada',
    subscription: subscription.description(),
    cost: subscription.cost()
  });
});

// Mostrar detalles del cliente
app.get('/customer', (req, res) => {
  const { name } = req.query;
  const customer = Customer.getCustomerByName(name);

  if (!customer) {
    return res.status(404).send('Cliente no encontrado.');
  }

  res.json({
    name: customer.name,
    email: customer.email,
    address: customer.address,
    plan: customer.subscription ? customer.subscription.description() : 'No está suscrito a ningún plan'
  });
});

// Cancelar la suscripción 
app.delete('/cancel', (req, res) => {
  const { name } = req.body;

  const customer = Customer.getCustomerByName(name);
  if (!customer) {
    return res.status(404).send('Cliente no encontrado.');
  }

  customer.cancelSubscription();
  res.send(`Suscripción cancelada para ${customer.name}.`);
});


app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
