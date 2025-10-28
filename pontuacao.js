const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://LuisCampos:udEfl2ScR0KTF0e3@projetosistemasmultimid.24gzry8.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Conectado ao Banco de dados');
});

const pontuacaoSchema = new mongoose.Schema({
  nomeJogador: String,
  pontuacao: Number,
});

const Pontuacao = mongoose.model('Pontuacao', pontuacaoSchema);

app.use(express.json());

app.post('/api/pontuacao', (req, res) => {
  const { nomeJogador, pontuacao } = req.body;
  const novaPontuacao = new Pontuacao({
    nomeJogador,
    pontuacao,
  });

  novaPontuacao.save((err) => {
    if (err) {
      console.error('Erro ao salvar pontuação:', err);
      res.status(500).send('Erro ao salvar pontuação');
    } else {
      console.log('Pontuação salva com sucesso!');
      res.status(200).send('Pontuação salva com sucesso!');
    }
  });
});

app.get('/api/pontos', (req, res) => {
  Pontuacao.find({}, 'nomeJogador pontuacao', (err, pontuacoes) => {
    if (err) {
      console.error('Erro ao buscar pontuações:', err);
      res.status(500).send('Erro ao buscar pontuações');
    } else {
      res.status(200).json(pontuacoes);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
