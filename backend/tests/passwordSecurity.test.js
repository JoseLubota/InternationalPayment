import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { hashPassword, verifyPassword, validatePasswordStrength, isPasswordUnique } from '../utils/passwordSecurity.js';

describe('Password Security Utilities', () => {
    describe('hashPassword', () => {
        it('should hash a password successfully', async () => {
            const password = 'TestPassword123!';
            const hash = await hashPassword(password);
            
            expect(hash).toBeDefined();
            expect(hash).not.toBe(password);
            expect(hash.length).toBeGreaterThan(0);
        });

        it('should produce different hashes for same password', async () => {
            const password = 'TestPassword123!';
            const hash1 = await hashPassword(password);
            const hash2 = await hashPassword(password);
            
            expect(hash1).not.toBe(hash2); // bcrypt uses random salt
        });
    });

    describe('verifyPassword', () => {
        it('should verify correct password', async () => {
            const password = 'TestPassword123!';
            const hash = await hashPassword(password);
            const isValid = await verifyPassword(password, hash);
            
            expect(isValid).toBe(true);
        });

        it('should reject incorrect password', async () => {
            const password = 'TestPassword123!';
            const wrongPassword = 'WrongPassword123!';
            const hash = await hashPassword(password);
            const isValid = await verifyPassword(wrongPassword, hash);
            
            expect(isValid).toBe(false);
        });
    });

    describe('validatePasswordStrength', () => {
        it('should accept strong password', () => {
            const result = validatePasswordStrength('Str0ng!P@ssw0rd');
            expect(result.isValid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should reject password without uppercase', () => {
            const result = validatePasswordStrength('weakpass123!');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must contain at least one uppercase letter');
        });

        it('should reject password without lowercase', () => {
            const result = validatePasswordStrength('WEAKPASS123!');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must contain at least one lowercase letter');
        });

        it('should reject password without number', () => {
            const result = validatePasswordStrength('WeakPassword!');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must contain at least one number');
        });

        it('should reject password without special character', () => {
            const result = validatePasswordStrength('WeakPassword123');
            expect(result.isValid).toBe(false);
            expect(result.errors.some(err => err.includes('special character'))).toBe(true);
        });

        it('should reject password that is too short', () => {
            const result = validatePasswordStrength('Pass1!');
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Password must be at least 8 characters long');
        });

        it('should reject common passwords', () => {
            const result = validatePasswordStrength('password123');
            expect(result.isValid).toBe(false);
            expect(result.errors.some(err => err.includes('too common'))).toBe(true);
        });

        it('should reject sequential characters', () => {
            const result = validatePasswordStrength('Abc12345!');
            expect(result.isValid).toBe(false);
            expect(result.errors.some(err => err.includes('sequential'))).toBe(true);
        });

        it('should reject repeated characters', () => {
            const result = validatePasswordStrength('Passs111!');
            expect(result.isValid).toBe(false);
            expect(result.errors.some(err => err.includes('repeated'))).toBe(true);
        });
    });

    describe('isPasswordUnique', () => {
        it('should return true for unique password with empty history', async () => {
            const password = 'NewPassword123!';
            const isUnique = await isPasswordUnique(password, []);
            expect(isUnique).toBe(true);
        });

        it('should return true for unique password with undefined history', async () => {
            const password = 'NewPassword123!';
            const isUnique = await isPasswordUnique(password);
            expect(isUnique).toBe(true);
        });

        it('should return false if password exists in history', async () => {
            const password = 'TestPassword123!';
            const hash = await hashPassword(password);
            const passwordHistory = [hash];
            
            const isUnique = await isPasswordUnique(password, passwordHistory);
            expect(isUnique).toBe(false);
        });

        it('should return true if password not in history', async () => {
            const oldPassword = 'OldPassword123!';
            const newPassword = 'NewPassword123!';
            const oldHash = await hashPassword(oldPassword);
            const passwordHistory = [oldHash];
            
            const isUnique = await isPasswordUnique(newPassword, passwordHistory);
            expect(isUnique).toBe(true);
        });
    });
});
