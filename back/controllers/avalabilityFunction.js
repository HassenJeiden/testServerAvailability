const axios = require('axios')

const testServerAvailability = async (req, res) => {
  try {
    // Make an HTTP request to the server
    const { SERVER_URL } = req.body
    const response = await axios.get(SERVER_URL);

    if (response.status === 200) {
      res.status(200).json({ message: 'Server is available.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server is not available.' });
  }
}

module.exports = { testServerAvailability}
