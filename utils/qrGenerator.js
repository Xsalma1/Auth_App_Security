const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Generate 2FA Secret and QR Code for a user
const generate2FA = async (userEmail) => {
    const secret = speakeasy.generateSecret({
        issuer: "SecureAuthSystem",
        name: `SecureAuth (${userEmail})`,
    });

    // Convert otpauth_url to a QR code image (Base64)
    const qrCodeImage = await QRCode.toDataURL(secret.otpauth_url);

    return {
        secret: secret.base32,
        qrCodeImage: qrCodeImage
    };
};

module.exports = { generate2FA };