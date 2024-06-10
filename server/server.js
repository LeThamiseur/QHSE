const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('dbase.json');
const middlewares = jsonServer.defaults();
const _ = require('lodash');

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Route personnalisée pour récupérer un risque spécifique
server.get('/dangers/:dangerId/risques/:risqueId', (req, res) => {
  const dangerId = req.params.dangerId;
  const risqueId = req.params.risqueId;

  const dangers = router.db.get('dangers').value();
  const danger = dangers.find(d => d.id == dangerId);

  if (danger) {
    const risque = danger.risques.find(r => r.id == risqueId);
    if (risque) {
      return res.jsonp(risque);
    }
  }

  res.status(404).send('Risque non trouvé');
});

// Route personnalisée pour mettre à jour un risque spécifique
server.put('/dangers/:dangerId/risques/:risqueId', (req, res) => {
  const dangerId = parseInt(req.params.dangerId);
  const risqueId = parseInt(req.params.risqueId);
  const riskData = req.body;

  const dangers = router.db.get('dangers').value();
  const danger = dangers.find(d => d.id == dangerId);

  if (danger) {
    const risqueIndex = danger.risques.findIndex(r => r.id == risqueId);
    if (risqueIndex !== -1) {
      // Mettre à jour le risque avec les nouvelles données
      danger.risques[risqueIndex] = { ...danger.risques[risqueIndex], ...riskData };

      // Mettre à jour la base de données
      router.db.get('dangers')
        .find({ id: dangerId })
        .assign({ risques: danger.risques })
        .write();  // Assurez-vous d'appeler write() pour sauvegarder les modifications

      return res.status(200).jsonp(danger.risques[risqueIndex]);
    } else {
      return res.status(404).send('Risque non trouvé');
    }
  } else {
    return res.status(404).send('Danger non trouvé');
  }
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
