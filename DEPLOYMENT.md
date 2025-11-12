# Deployment & Maintenance Guide

## 🚀 Live Applications
- **Frontend:** https://my-blog-lac-zeta.vercel.app/
- **Backend:** https://my-blog-backend-ib6l.onrender.com/

## 📊 Monitoring
- **Health Check:** https://my-blog-backend-ib6l.onrender.com/health
- **GitHub Actions:** Automated testing on every push
- **Render/Vercel:** Built-in monitoring and logs

## 🔄 Deployment Process
1. Push code to GitHub main branch
2. GitHub Actions automatically runs tests
3. Render & Vercel automatically deploy on success

## 🛠️ Maintenance Tasks
- **Weekly:** Check application health
- **Monthly:** Update dependencies
- **As needed:** Monitor MongoDB Atlas usage

## 🔙 Rollback Procedure
- Render/Vercel: Use dashboard to redeploy previous version
- Database: MongoDB Atlas has automatic backups