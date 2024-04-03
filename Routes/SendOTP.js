// Import required modules
const express = require('express');
const nodemailer = require('nodemailer');

// Create an instance of Express router
const router = express.Router();

// Dummy database to store OTPs (For demonstration purpose only)
const otpDatabase = {};

// Generate OTP function
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}

// Nodemailer configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ust.cis.ems@gmail.com', // Enter your Gmail email address
        pass: 'urpt tvap lhha febw' // Enter your Gmail password
    }
});

// Define the route for sending OTP
router.post('/', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email address is required' });
    }

    const otp = generateOTP();
    otpDatabase[email] = otp;

    // Send OTP via email
    const mailOptions = {
        from: 'ust.cis.ems@gmail.com', // Sender email address
        to: 'nehamary.baby@ust.com, vipin.kumarnair@ust.com, edwin.joseph12@ust.com', //change your email
        subject: 'OTP Verification',
        text: `Your OTP is: ${otp}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('OTP sent successfully:', info.response);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ message: 'Error sending OTP' });
    }
});


router.post('/verifyotp', (req, res) => {
    const { email, otp } = req.body;
    const storedOTP = otpDatabase[email];

    if (storedOTP && storedOTP.toString() === otp) {
        // OTP is valid
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        // Invalid OTP
        res.status(400).json({ message: 'Invalid OTP' });
    }
});
// Export the router
module.exports = router;
