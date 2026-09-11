# Deployment Guide for Movement Website

You have two main options to host this website on the public web.

## Option 1: Vercel (Easiest & Current)
Your site is already deployed to Vercel. If you want to use your own domain (e.g., `invest-movement.com`):

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Select the project **movement-website**.
3.  Go to **Settings** > **Domains**.
4.  Enter your domain name (e.g., `invest-movement.com`) and click **Add**.
5.  Follow the instructions to update your DNS records (A Record or CNAME) with your domain registrar (GoDaddy, Namecheap, etc.).

---

## Option 2: Self-Hosting on Your Own Server (VPS)
If you have a Linux server (Ubuntu/Debian) and want to host it yourself, follow these steps.

### 1. Prepare the Server
Connect to your server via SSH and install Node.js, Nginx, and Git:

```bash
# Update packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 or later (Vercel builds with Node 24)
curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx and PM2 (Process Manager)
sudo apt install -y nginx
sudo npm install -g pm2
```

### 2. Transfer the Code
You can clone your repository (if you pushed it to GitHub/GitLab) or upload the files using `scp`/FileZilla.

```bash
# Example using Git
git clone https://github.com/your-username/movement-website.git
cd movement-website
```

### 3. Install & Build
Inside the project folder on your server:

```bash
# Install dependencies
npm install

# Build the production version
npm run build
```

### 4. Start the Application
Use PM2 to keep the app running in the background:

```bash
# Start Next.js on port 3000
pm2 start npm --name "movement-website" -- start

# Save the process list so it restarts on reboot
pm2 save
pm2 startup
```

### 5. Configure Nginx (Reverse Proxy)
Set up Nginx to point your domain to the running app.

Create a config file:
`sudo nano /etc/nginx/sites-available/movement`

Paste this content (replace `your-domain.com` with your actual domain):

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/movement /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. SSL Certificate (HTTPS)
Secure your site with a free certificate using Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Your site will now be live at `https://your-domain.com`.
