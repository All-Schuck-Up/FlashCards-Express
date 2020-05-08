// Cards route
const express = require('express');
const router = express.Router();
// Bring in flashCard data from the data json file in data folder
const { data } = require('../data/flashcardData.json'); // This syntax is the same as "flashcardData.json.data"
const { cards } = data; // This is the same as "data.cards"

router.get('/', (req, res) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor(Math.random() * numberOfCards); // generates random number/ id
  res.redirect(`/cards/${flashcardId}?side=question`);
});

// Card route that follows '/cards/ (card id- for specific card)' TEST WITH: => http://localhost:8080/cards/0?side=question
router.get('/:id', (req, res) => {
  const { side } = req.query; // This is a query for data for specific side of card (question/ answer)
  const { id } = req.params; // Grabs data from flashcardData.json for card_id

  if (!side) {
    res.redirect(`/cards/${id}?side=question`);
  }
  const name = req.cookies.username;
  const text = cards[id][side]; // Init var which is called in pug file card.pug to render text
  const { hint } = cards[id];

  const templateData = { id, text, name }; // Init var which is called in pug file card.pug

  // This makes app only display hint to user if on the question side of card
  if (side === 'question') {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if (side === 'answer') {
    templateData.sideToSohow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }

  res.render('card', templateData);
});

module.exports = router;
