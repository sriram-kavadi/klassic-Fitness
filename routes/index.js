const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    title: 'Klassic Fitness Studio — Transform in 90 Days',
    spotsLeft: 20
  });
});

router.post('/lead', (req, res) => {
  const { name, phone, goal } = req.body;
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Please enter your full name.');
  if (!phone || !/^[6-9]\d{9}$/.test(phone.trim())) errors.push('Please enter a valid 10-digit Indian phone number.');
  if (!goal) errors.push('Please select your fitness goal.');

  if (errors.length > 0) {
    return res.json({ success: false, errors });
  }

  console.log(`🎯 New Lead: ${name} | ${phone} | Goal: ${goal}`);
  return res.json({
    success: true,
    message: `Thanks ${name}! We'll WhatsApp you within 10 minutes. 🔥`
  });
});

module.exports = router;
