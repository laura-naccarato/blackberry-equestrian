# Decap CMS GitHub OAuth Setup Guide

## Overview
This guide will help you set up GitHub OAuth authentication for Decap CMS on your Blackberry Equestrian website.

## Step 1: Create a GitHub OAuth App

1. **Go to GitHub Settings**
   - Log in to GitHub with your account: https://github.com/laura-naccarato
   - Click your profile picture (top right) → Settings
   - Scroll down to "Developer settings" in the left sidebar
   - Click "OAuth Apps" → "New OAuth App"

2. **Fill in the OAuth App Details**
   ```
   Application name: Blackberry Equestrian CMS
   Homepage URL: https://laura-naccarato.github.io/blackberry-equestrian
   Authorization callback URL: https://api.netlify.com/auth/done
   ```
   
   > **Note**: Even though we're using GitHub Pages, we use Netlify's OAuth service as a proxy

3. **Register the Application**
   - Click "Register application"
   - You'll be taken to your app's settings page
   - **SAVE THESE VALUES** (keep them secret!):
     - Client ID: (shown on the page)
     - Client Secret: Click "Generate a new client secret" and save it

## Step 2: Set Up Netlify OAuth Proxy (Free Service)

Since GitHub Pages doesn't provide OAuth backend services, we'll use Netlify's free OAuth proxy:

### Option A: Use Netlify's Hosted OAuth Service (Easiest)

1. **Deploy OAuth Settings to Netlify**
   - Create a free Netlify account at https://netlify.com
   - Create a new site from Git
   - Connect your GitHub repository: `laura-naccarato/blackberry-equestrian`
   - Don't worry about the actual site deployment - we just need the OAuth service

2. **Configure Environment Variables in Netlify**
   - Go to Site Settings → Environment Variables
   - Add these variables:
     ```
     GITHUB_CLIENT_ID = your_client_id_from_step_1
     GITHUB_CLIENT_SECRET = your_client_secret_from_step_1
     ```

3. **Enable Identity Service**
   - Go to Site Settings → Identity
   - Click "Enable Identity"
   - Under Registration, select "Invite only" for security
   - Under External providers, add GitHub

4. **Update Your CMS Config**
   ```yaml
   backend:
     name: github
     repo: laura-naccarato/blackberry-equestrian
     branch: main
     base_url: https://your-netlify-site.netlify.app
     auth_endpoint: /api/auth
   ```

### Option B: Use a Simple OAuth Proxy Service (Alternative)

If you prefer not to use Netlify, you can use a lightweight OAuth proxy:

1. **Use an External OAuth Service**
   
   There are free OAuth proxy services available:
   - https://github.com/vencax/netlify-cms-github-oauth-provider
   
   Deploy this to a free service like:
   - Vercel: https://vercel.com
   - Render: https://render.com
   - Railway: https://railway.app

2. **Configure the OAuth Provider**
   
   Set environment variables in your chosen platform:
   ```
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   ORIGIN=https://laura-naccarato.github.io
   ```

3. **Update CMS Config**
   ```yaml
   backend:
     name: github
     repo: laura-naccarato/blackberry-equestrian
     branch: main
     base_url: https://your-oauth-provider.vercel.app
   ```

## Step 3: Configure CMS for Production

Update your `/public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: laura-naccarato/blackberry-equestrian
  branch: main
  # If using Netlify Identity:
  # base_url: https://your-site.netlify.app
  # auth_endpoint: api/auth
  
  # If using external OAuth provider:
  # base_url: https://your-oauth-provider.vercel.app

# Rest of your config...
```

## Step 4: Test the Setup

1. **Commit and Push Changes**
   ```bash
   git add .
   git commit -m "Configure Decap CMS with GitHub OAuth"
   git push origin main
   ```

2. **Wait for GitHub Pages to Deploy**
   - Check Actions tab on GitHub to see deployment status
   - Usually takes 2-5 minutes

3. **Access Your CMS**
   - Go to: https://laura-naccarato.github.io/blackberry-equestrian/admin/
   - Click "Login with GitHub"
   - Authorize the OAuth app
   - You should now see your CMS dashboard!

## Step 5: Managing Users

### Who Can Access the CMS?

By default, anyone with write access to your repository can log in to the CMS:
- Repository owner (you)
- Collaborators with write permissions

### Adding CMS Users

1. **Add Repository Collaborators**
   - Go to your repository: https://github.com/laura-naccarato/blackberry-equestrian
   - Settings → Manage access → Invite a collaborator
   - They'll need a GitHub account
   - Give them "Write" permission

2. **User Instructions**
   
   Send this to your CMS users:
   ```
   To access the Blackberry Equestrian CMS:
   1. Accept the GitHub repository invitation
   2. Go to: https://laura-naccarato.github.io/blackberry-equestrian/admin/
   3. Click "Login with GitHub"
   4. Authorize the application
   5. Start editing content!
   ```

## Troubleshooting

### "Error: Failed to load settings from GitHub"
- Check that your repository name is correct in config.yml
- Ensure the branch name is correct (main vs master)
- Verify GitHub OAuth app settings

### "Authentication Error"
- Check Client ID and Secret are correct
- Ensure callback URL matches exactly
- Clear browser cookies and try again

### "404 Not Found" on /admin
- Wait for GitHub Pages deployment to complete
- Check that /public/admin/index.html exists
- Verify the build process includes the admin folder

### Content Not Showing
- Ensure content files are in Markdown format (.md)
- Check that file paths in config.yml match actual locations
- Verify frontmatter format is valid YAML

## Security Best Practices

1. **Never commit OAuth secrets to Git**
   - Keep Client Secret secure
   - Use environment variables only

2. **Limit Repository Access**
   - Only give write access to trusted users
   - Review collaborators regularly

3. **Use Branch Protection**
   - Consider protecting the main branch
   - Require pull request reviews for changes

4. **Regular Audits**
   - Check OAuth app access logs on GitHub
   - Review CMS user activity
   - Monitor repository access

## Local Development

For local development without OAuth:

```bash
# Install test backend
npm install -g decap-server

# Update config.yml temporarily
backend:
  name: test-repo

# Run both servers
npx decap-server & npm run dev

# Access at http://localhost:5173/admin/
```

## Quick Setup Checklist

- [ ] Created GitHub OAuth App
- [ ] Saved Client ID and Secret
- [ ] Set up OAuth proxy (Netlify or alternative)
- [ ] Configured environment variables
- [ ] Updated config.yml with correct settings
- [ ] Pushed changes to GitHub
- [ ] Tested login at /admin
- [ ] Added necessary collaborators
- [ ] Documented access for team members

## Support Resources

- Decap CMS Docs: https://decapcms.org/docs/github-backend/
- GitHub OAuth Apps: https://docs.github.com/en/developers/apps/building-oauth-apps
- Netlify Identity: https://docs.netlify.com/visitor-access/identity/

## Next Steps

Once OAuth is configured:
1. Test creating and editing content
2. Train content managers on CMS usage
3. Set up content workflow and approval process
4. Configure automated backups
5. Monitor and maintain the system

---

For questions or issues, consult the Decap CMS documentation or GitHub's OAuth guides.