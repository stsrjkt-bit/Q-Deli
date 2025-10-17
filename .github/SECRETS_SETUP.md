# GitHub Secrets Setup Guide

## Required Secrets for CI/CD Pipeline

To configure the secrets for this repository, follow these steps:

### 1. Navigate to Repository Settings
1. Go to your GitHub repository
2. Click on **Settings** tab
3. Click on **Secrets and variables** → **Actions**
4. Click **New repository secret**

### 2. Add the Following Secrets

#### Firebase Configuration
```
Name: FIREBASE_PROJECT_ID
Value: [Your Firebase Project ID]

Name: FIREBASE_API_KEY
Value: [Your Firebase API Key]

Name: FIREBASE_AUTH_DOMAIN
Value: [Your Firebase Auth Domain]

Name: FIREBASE_STORAGE_BUCKET
Value: [Your Firebase Storage Bucket]

Name: FIREBASE_MESSAGING_SENDER_ID
Value: [Your Firebase Messaging Sender ID]

Name: FIREBASE_APP_ID
Value: [Your Firebase App ID]
```

#### API Keys
```
Name: CLAUDE_API_KEY
Value: [Your Claude/Anthropic API Key]

Name: YOUTUBE_API_KEY
Value: [Your YouTube Data API v3 Key]

Name: GOOGLE_SPEECH_API_KEY
Value: [Your Google Cloud Speech-to-Text API Key]
```

### 3. Vercel Environment Variables Setup

For Vercel deployment, configure these environment variables in your Vercel dashboard:

1. Go to your Vercel project dashboard
2. Click on **Settings** tab
3. Click on **Environment Variables**
4. Add the following variables:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=[Your Firebase API Key]
VITE_FIREBASE_PROJECT_ID=[Your Firebase Project ID]
VITE_FIREBASE_AUTH_DOMAIN=[Your Firebase Auth Domain]
VITE_FIREBASE_STORAGE_BUCKET=[Your Firebase Storage Bucket]
VITE_FIREBASE_MESSAGING_SENDER_ID=[Your Firebase Messaging Sender ID]
VITE_FIREBASE_APP_ID=[Your Firebase App ID]
```

### 4. Using GitHub CLI (Alternative Method)

You can also set secrets using the GitHub CLI:

```bash
# Install GitHub CLI if not already installed
# https://cli.github.com/

# Login to GitHub
gh auth login

# Set secrets (run these commands in your repository directory)
gh secret set FIREBASE_PROJECT_ID --body "your-project-id"
gh secret set FIREBASE_API_KEY --body "your-api-key"
gh secret set FIREBASE_AUTH_DOMAIN --body "your-auth-domain"
gh secret set FIREBASE_STORAGE_BUCKET --body "your-storage-bucket"
gh secret set FIREBASE_MESSAGING_SENDER_ID --body "your-sender-id"
gh secret set FIREBASE_APP_ID --body "your-app-id"
gh secret set CLAUDE_API_KEY --body "your-claude-api-key"
gh secret set YOUTUBE_API_KEY --body "your-youtube-api-key"
gh secret set GOOGLE_SPEECH_API_KEY --body "your-google-speech-api-key"
```

### 5. Verify Secrets

After adding all secrets, verify they are properly configured:
- GitHub Actions: Check the Actions tab for successful workflow runs
- Vercel: Trigger a deployment and check the build logs

## Security Notes

⚠️ **NEVER** commit actual API keys or secrets to the repository
⚠️ Always use environment variables for sensitive data
⚠️ Rotate API keys regularly
⚠️ Use different keys for development and production environments

## Questions?

If you encounter any issues setting up secrets, please contact the development team.
