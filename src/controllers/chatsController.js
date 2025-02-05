const path = require('path');

// Serve o arquivo HTML para o chat
const getChatPage = (req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
};

module.exports = { getChatPage };
