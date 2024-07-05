const { PrismaClient } = require('@prisma/client');
const { transporter } = require('../config/emailConfig');
const prisma = new PrismaClient();

exports.addReferral = async (req, res) => {
    const {
        referrerName, referrerEmail,
        refereeName, refereeEmail
    } = req.body

    if (!referrerName || !referrerEmail || !refereeName || !refereeEmail) res.status(400).json({ "data": "All fiels are required!", "status": false });

    try {
        const referral = await prisma.referral.create({
            data: req.body,
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: referral.refereeEmail,
            subject: 'You have been referred!',
            text: `Hello ${referral.refereeName},\n\nYou have been referred by ${referral.referrerName}.`,
        });

        res.status(201).json({ data: referral, status: true });
    } catch (error) {
        res.status(400).json({ data: error.message, status: false });
    }
};