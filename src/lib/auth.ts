import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
};

export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
};

export const getUserFromToken = (token: string): string | null => {
    const decoded = verifyToken(token);
    return decoded ? decoded.userId : null;
};