const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock Database of known phishing domains (for demo purposes)
const knownPhishingDomains = [
    'secure-login.update-acccount.com',
    'verify-your-identity-now.net',
    'free-crypto-giveaway.org',
    'login.bankofamerica.security-check.com',
    'paypal-security-alert.com'
];

// Heuristic Checks
function analyzeUrl(url) {
    const risks = [];
    let score = 0; // 0 = Safe, 100 = Phishing

    try {
        const urlObj = new URL(url);
        const domain = urlObj.hostname;

        // 1. Check against known database
        if (knownPhishingDomains.some(d => domain.includes(d))) {
            return {
                status: 'DANGEROUS',
                score: 100,
                message: 'URL matched a known phishing domain in our database.',
                risks: ['Matched Blacklist']
            };
        }

        // 2. Check for IP address usage
        const isIp = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(domain);
        if (isIp) {
            score += 40;
            risks.push('Uses IP address instead of domain name');
        }

        // 3. Check for multiple subdomains (confusion)
        const parts = domain.split('.');
        if (parts.length > 4) {
            score += 20;
            risks.push('Excessive subdomains (potential confusion technique)');
        }

        // 4. Check for suspicious keywords in domain
        const suspiciousKeywords = ['secure', 'login', 'verify', 'account', 'update', 'banking', 'service'];
        const foundKeywords = suspiciousKeywords.filter(kw => domain.includes(kw));
        if (foundKeywords.length > 0) {
             // If it has keywords but is NOT a known legitimate site (simplified here)
             // In a real app, we'd whitelist 'google.com', 'facebook.com', etc.
             // For demo, we just flag it as "Suspicious if coupled with other things"
             score += 10; 
             risks.push(`Contains sensitive keywords: ${foundKeywords.join(', ')}`);
        }

        // 5. Check for @ symbol (URL redirection/auth obfuscation)
        if (url.includes('@')) {
            score += 50;
            risks.push('Contains "@" symbol (often used to obscure destination)');
        }

        // 6. Length check (very long URLs)
        if (url.length > 75) {
            score += 10;
            risks.push('URL is suspiciously long');
        }

    } catch (e) {
        return {
            status: 'INVALID',
            score: 0,
            message: 'Invalid URL format. Please enter a valid URL (e.g., https://example.com)',
            risks: []
        };
    }

    let status = 'SAFE';
    if (score >= 50) status = 'DANGEROUS';
    else if (score >= 20) status = 'SUSPICIOUS';

    return {
        status,
        score,
        message: status === 'SAFE' ? 'No obvious threats detected.' : 'Potential threats detected.',
        risks
    };
}

app.post('/api/check', (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    // Add protocol if missing for URL parsing
    let infoUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        infoUrl = 'http://' + url;
    }

    const result = analyzeUrl(infoUrl);
    res.json(result);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
