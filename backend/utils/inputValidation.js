/**
 * Input Whitelisting & Validation
 * 
 * Uses regex patterns to restrict characters known to be used in injection attacks
 * Implements whitelist approach - only allow known safe characters
 */

/**
 * Regex Patterns for Whitelisting
 * These patterns define what IS allowed (whitelist approach)
 */
const WHITELIST_PATTERNS = {
    // Alphanumeric only (letters and numbers)
    alphanumeric: /^[a-zA-Z0-9]+$/,
    
    // Alphanumeric with spaces
    alphanumericWithSpaces: /^[a-zA-Z0-9\s]+$/,
    
    // Username: letters, numbers, underscore, hyphen (3-30 chars)
    username: /^[a-zA-Z0-9_-]{3,30}$/,
    
    // Full name: letters, spaces, hyphens, apostrophes
    fullname: /^[a-zA-Z\s'-]{2,100}$/,
    
    // Email: standard email format
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    
    // ID Number: alphanumeric with optional hyphens
    idNumber: /^[a-zA-Z0-9-]{3,50}$/,
    
    // Account Number: numbers only (positive integers)
    accountNumber: /^[1-9][0-9]{0,19}$/,
    
    // Numeric only
    numeric: /^[0-9]+$/,
    
    // Phone number: numbers, spaces, hyphens, parentheses, plus sign
    phoneNumber: /^[0-9\s\-\(\)\+]{7,20}$/,
    
    // Address: alphanumeric, spaces, common punctuation
    address: /^[a-zA-Z0-9\s,.\-#\/]{5,200}$/
};

/**
 * Blacklist Patterns - Detect dangerous characters/patterns
 * These should NOT appear in user input
 */
const INJECTION_PATTERNS = {
    // SQL Injection patterns
    sqlInjection: /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|DECLARE)\b|--|\;|\/\*|\*\/|xp_|sp_)/gi,
    
    // NoSQL Injection operators
    noSqlOperators: /(\$where|\$ne|\$gt|\$gte|\$lt|\$lte|\$in|\$nin|\$regex|\$exists|\$type)/gi,
    
    // JavaScript/XSS patterns
    xssPatterns: /(<script|<iframe|<object|<embed|javascript:|onerror=|onload=|eval\(|expression\()/gi,
    
    // HTML tags (basic XSS prevention)
    htmlTags: /<[^>]*>/g,
    
    // Command injection
    commandInjection: /(\||&&|;|\$\(|\`|>|<)/g,
    
    // Path traversal
    pathTraversal: /(\.\.\/|\.\.\\)/g,
    
    // Null bytes
    nullBytes: /\x00/g
};

/**
 * Validate input against whitelist pattern
 * @param {string} input - The input to validate
 * @param {string} patternName - The name of the pattern from WHITELIST_PATTERNS
 * @returns {Object} - { isValid: boolean, error: string }
 */
export function validateAgainstWhitelist(input, patternName) {
    // Check if input exists
    if (input === undefined || input === null) {
        return {
            isValid: false,
            error: 'Input is required'
        };
    }
    
    // Convert to string and trim
    const inputStr = String(input).trim();
    
    // Check if pattern exists
    const pattern = WHITELIST_PATTERNS[patternName];
    if (!pattern) {
        return {
            isValid: false,
            error: `Unknown validation pattern: ${patternName}`
        };
    }
    
    // Test against whitelist pattern
    if (!pattern.test(inputStr)) {
        return {
            isValid: false,
            error: `Input contains invalid characters for ${patternName}`
        };
    }
    
    return {
        isValid: true,
        error: null
    };
}

/**
 * Check for injection attack patterns (blacklist)
 * @param {string} input - The input to check
 * @returns {Object} - { isSafe: boolean, threats: string[] }
 */
export function checkForInjectionPatterns(input) {
    if (!input) {
        return { isSafe: true, threats: [] };
    }
    
    const inputStr = String(input);
    const threats = [];
    
    // Check each injection pattern
    if (INJECTION_PATTERNS.sqlInjection.test(inputStr)) {
        threats.push('SQL injection pattern detected');
    }
    
    if (INJECTION_PATTERNS.noSqlOperators.test(inputStr)) {
        threats.push('NoSQL injection operator detected');
    }
    
    if (INJECTION_PATTERNS.xssPatterns.test(inputStr)) {
        threats.push('XSS pattern detected');
    }
    
    if (INJECTION_PATTERNS.htmlTags.test(inputStr)) {
        threats.push('HTML tags detected');
    }
    
    if (INJECTION_PATTERNS.commandInjection.test(inputStr)) {
        threats.push('Command injection pattern detected');
    }
    
    if (INJECTION_PATTERNS.pathTraversal.test(inputStr)) {
        threats.push('Path traversal pattern detected');
    }
    
    if (INJECTION_PATTERNS.nullBytes.test(inputStr)) {
        threats.push('Null byte detected');
    }
    
    return {
        isSafe: threats.length === 0,
        threats: threats
    };
}

/**
 * Sanitize input by removing dangerous characters
 * @param {string} input - The input to sanitize
 * @returns {string} - Sanitized input
 */
export function sanitizeInput(input) {
    if (!input) return '';
    
    let sanitized = String(input);
    
    // Remove HTML tags
    sanitized = sanitized.replace(/<[^>]*>/g, '');
    
    // Remove script tags and content
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remove dangerous characters
    sanitized = sanitized.replace(/[<>\"'`]/g, '');
    
    // Remove null bytes
    sanitized = sanitized.replace(/\x00/g, '');
    
    // Trim whitespace
    sanitized = sanitized.trim();
    
    return sanitized;
}

/**
 * Validate username with whitelist
 * @param {string} username 
 * @returns {Object}
 */
export function validateUsername(username) {
    // Whitelist check
    const whitelistResult = validateAgainstWhitelist(username, 'username');
    if (!whitelistResult.isValid) {
        return {
            isValid: false,
            error: 'Username must be 3-30 characters and contain only letters, numbers, underscores, or hyphens',
            field: 'username'
        };
    }
    
    // Blacklist check
    const injectionCheck = checkForInjectionPatterns(username);
    if (!injectionCheck.isSafe) {
        return {
            isValid: false,
            error: 'Username contains prohibited patterns',
            threats: injectionCheck.threats,
            field: 'username'
        };
    }
    
    return { isValid: true };
}

/**
 * Validate full name with whitelist
 * @param {string} fullname 
 * @returns {Object}
 */
export function validateFullname(fullname) {
    // Whitelist check
    const whitelistResult = validateAgainstWhitelist(fullname, 'fullname');
    if (!whitelistResult.isValid) {
        return {
            isValid: false,
            error: 'Full name must be 2-100 characters and contain only letters, spaces, hyphens, or apostrophes',
            field: 'fullname'
        };
    }
    
    // Blacklist check
    const injectionCheck = checkForInjectionPatterns(fullname);
    if (!injectionCheck.isSafe) {
        return {
            isValid: false,
            error: 'Full name contains prohibited patterns',
            threats: injectionCheck.threats,
            field: 'fullname'
        };
    }
    
    return { isValid: true };
}

/**
 * Validate email with whitelist
 * @param {string} email 
 * @returns {Object}
 */
export function validateEmail(email) {
    // Whitelist check
    const whitelistResult = validateAgainstWhitelist(email, 'email');
    if (!whitelistResult.isValid) {
        return {
            isValid: false,
            error: 'Invalid email format',
            field: 'email'
        };
    }
    
    // Additional length check
    if (email.length > 254) {
        return {
            isValid: false,
            error: 'Email is too long',
            field: 'email'
        };
    }
    
    // Blacklist check
    const injectionCheck = checkForInjectionPatterns(email);
    if (!injectionCheck.isSafe) {
        return {
            isValid: false,
            error: 'Email contains prohibited patterns',
            threats: injectionCheck.threats,
            field: 'email'
        };
    }
    
    return { isValid: true };
}

/**
 * Validate ID number with whitelist
 * @param {string} idNumber 
 * @returns {Object}
 */
export function validateIdNumber(idNumber) {
    // Whitelist check
    const whitelistResult = validateAgainstWhitelist(idNumber, 'idNumber');
    if (!whitelistResult.isValid) {
        return {
            isValid: false,
            error: 'ID number must be 3-50 characters and contain only letters, numbers, or hyphens',
            field: 'idNumber'
        };
    }
    
    // Blacklist check
    const injectionCheck = checkForInjectionPatterns(idNumber);
    if (!injectionCheck.isSafe) {
        return {
            isValid: false,
            error: 'ID number contains prohibited patterns',
            threats: injectionCheck.threats,
            field: 'idNumber'
        };
    }
    
    return { isValid: true };
}

/**
 * Validate account number with whitelist
 * @param {number|string} accountNumber 
 * @returns {Object}
 */
export function validateAccountNumber(accountNumber) {
    // Convert to string
    const accountStr = String(accountNumber);
    
    // Whitelist check
    const whitelistResult = validateAgainstWhitelist(accountStr, 'accountNumber');
    if (!whitelistResult.isValid) {
        return {
            isValid: false,
            error: 'Account number must be a positive number',
            field: 'accountNumber'
        };
    }
    
    // Check if it's a valid number
    const accountNum = Number(accountNumber);
    if (isNaN(accountNum) || accountNum <= 0) {
        return {
            isValid: false,
            error: 'Account number must be a positive number',
            field: 'accountNumber'
        };
    }
    
    return { isValid: true };
}

/**
 * Validate all registration inputs
 * @param {Object} data - Registration data
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export function validateRegistrationInput(data) {
    const errors = {};
    
    // Validate username
    const usernameResult = validateUsername(data.username);
    if (!usernameResult.isValid) {
        errors.username = usernameResult.error;
    }
    
    // Validate fullname
    const fullnameResult = validateFullname(data.fullname);
    if (!fullnameResult.isValid) {
        errors.fullname = fullnameResult.error;
    }
    
    // Validate email
    const emailResult = validateEmail(data.email);
    if (!emailResult.isValid) {
        errors.email = emailResult.error;
    }
    
    // Validate idNumber
    const idNumberResult = validateIdNumber(data.idNumber);
    if (!idNumberResult.isValid) {
        errors.idNumber = idNumberResult.error;
    }
    
    // Validate accountNumber
    const accountNumberResult = validateAccountNumber(data.accountNumber);
    if (!accountNumberResult.isValid) {
        errors.accountNumber = accountNumberResult.error;
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

/**
 * Validate login inputs
 * @param {Object} data - Login data
 * @returns {Object} - { isValid: boolean, errors: Object }
 */
export function validateLoginInput(data) {
    const errors = {};
    
    // Validate username
    const usernameResult = validateUsername(data.username);
    if (!usernameResult.isValid) {
        errors.username = usernameResult.error;
    }
    
    // Validate accountNumber
    const accountNumberResult = validateAccountNumber(data.accountNumber);
    if (!accountNumberResult.isValid) {
        errors.accountNumber = accountNumberResult.error;
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export default {
    validateAgainstWhitelist,
    checkForInjectionPatterns,
    sanitizeInput,
    validateUsername,
    validateFullname,
    validateEmail,
    validateIdNumber,
    validateAccountNumber,
    validateRegistrationInput,
    validateLoginInput,
    WHITELIST_PATTERNS,
    INJECTION_PATTERNS
};
