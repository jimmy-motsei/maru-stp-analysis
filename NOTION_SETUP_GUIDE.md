# 🔧 Quick Setup Guide - Notion Integration

Follow these steps to connect your Maru STP Analysis app with Notion:

---

## Step 1: Create Notion Integration (5 minutes)

### 1.1 Open Notion Integrations Page
Click this link: **https://www.notion.so/my-integrations**

### 1.2 Create New Integration
1. Click the **"+ New integration"** button
2. Fill in the form:
   - **Name**: `Maru STP Analysis`
   - **Logo**: (optional) Upload a logo
   - **Associated workspace**: Select **"Maru-Online"**
3. Click **"Submit"**

### 1.3 Copy Your Integration Token
1. After creation, you'll see **"Internal Integration Token"**
2. Click **"Show"** then **"Copy"**
3. The token looks like: `secret_xxxxxxxxxxxxxxxxxxxx`
4. **IMPORTANT**: Save this token somewhere safe!

### 1.4 Configure Capabilities (should be default)
Make sure these are enabled:
- ✅ Read content
- ✅ Update content  
- ✅ Insert content

---

## Step 2: Share Notion Page with Integration (2 minutes)

### 2.1 Open Your Notion Page
Go to: https://www.notion.so/63a92a3883af4b7996a415332fbc990b

### 2.2 Add Connection
1. Click the **"..."** menu in the top-right corner
2. Scroll down and find **"Connections"** or **"Add connections"**
3. Search for **"Maru STP Analysis"** 
4. Click it to add the connection
5. Click **"Confirm"** when prompted

✅ Your integration now has access to this page!

---

## Step 3: Provide Integration Details to Me

Once you've completed Steps 1 and 2, provide:

1. **Your Integration Token** (starts with `secret_`)
   ```
   Example: secret_Ab12Cd34Ef56Gh78Ij90Kl12Mn34Op56
   ```

2. **Confirm the Page ID** (we already have this, but let's verify):
   ```
   Page ID: 63a92a3883af4b7996a415332fbc990b
   ```

---

## Step 4: I'll Build the Integration

Once you provide the token, I will:

1. ✅ Create a Notion database called **"Maru STP Implementation Tasks"**
2. ✅ Set up all properties (Status, Priority, Phase, etc.)
3. ✅ Populate with all 24 tasks from your roadmap
4. ✅ Add API routes to your Next.js app
5. ✅ Create a "Tasks" view in your app
6. ✅ Enable Notion Calendar sync
7. ✅ Deploy everything to Vercel

---

## Security Note 🔒

**NEVER share your Integration Token publicly!**

We'll add it as an environment variable in Vercel:
- Local: `.env.local` file (git-ignored)
- Production: Vercel dashboard (encrypted)

---

## What You'll Get

After integration:
- 📊 **Notion Database**: All tasks organized with phases, priorities, and dates
- 📅 **Calendar View**: See deadlines in Notion Calendar
- 🔄 **Live Sync**: Update from app or Notion, stays in sync
- ✅ **Progress Tracking**: Visual status updates
- 👥 **Team Collaboration**: Assign tasks to team members
- 📈 **Metrics Dashboard**: Track MRR targets and client counts

---

## Need Help?

If you get stuck:
1. Check Notion's official guide: https://developers.notion.com/docs/create-a-notion-integration
2. Make sure you're logged into the **Maru-Online** workspace
3. Verify the integration appears in your connections

---

**Ready?** Complete Steps 1-2 above and share your Integration Token! 🚀
