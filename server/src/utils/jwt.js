
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { join } from 'path';

/**
 * Generates a JWT token for the given user.
 * 
 * @param {Object} user - The user object containing user information.
 * @param {string} user._id - The unique identifier of the user.
 * @returns {string} A signed JWT token that expires in 30 days.
 * @description Creates a JWT token using the ES512 algorithm with a 30-day expiration period.
 * The token contains the user's ID as payload.
 */
function generateToken(user) {
    
    const key_path = process.env.NODE_ENV === 'production'
        ? '/etc/secrets/ec-private-key.pem'
        : join(process.cwd(), '../etc/secrets/ec-private-key.pem');

    return jwt.sign(
        { user_id: user.user_id },
        fs.readFileSync(key_path, 'utf8'),
        { algorithm: 'ES512', expiresIn: '30d' }
    );
};
export default generateToken;
