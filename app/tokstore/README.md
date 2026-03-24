# 🏪 Tok Store - App Distribution System

A comprehensive app distribution and management platform integrated into your Tok ecosystem. Users can discover, download, rate, and review all Tok applications from a single, beautiful interface.

## 📋 Features

### For Users
- **App Discovery** - Browse apps by category (Health, Safety, Lifestyle, etc.)
- **Search & Filter** - Find apps quickly with powerful search functionality
- **Sorting Options** - Sort by rating, downloads, or release date
- **App Details** - View comprehensive app information, requirements, permissions
- **Installation Tracking** - Track your installed apps
- **Reviews & Ratings** - Read and write reviews for apps
- **Version History** - View changelog and previous versions
- **Support Access** - Direct contact with app developers

### For Developers
- **API Endpoints** - RESTful API for app management
- **Admin Dashboard** - Create and manage apps
- **Analytics Ready** - Track downloads and user engagement
- **Version Management** - Release new versions with changelogs

## 🚀 Getting Started

### Access the Store
Visit `/tokstore` to browse apps:
```
http://localhost:3000/tokstore
```

### Admin Dashboard
Access the admin panel at `/tokstore/admin`:
```
http://localhost:3000/tokstore/admin
```

**Admin Access:** Set `ADMIN_TOKEN` in your environment and use that token in the admin panel.

## 📁 Project Structure

```
app/tokstore/
├── page.tsx              # Main store interface
├── types.ts              # TypeScript interfaces and mock data
├── admin/
│   └── page.tsx          # Admin dashboard
api/store/
├── apps/
│   ├── route.ts          # GET all apps, POST create app
│   ├── [id]/
│   │   ├── route.ts      # GET/PUT/DELETE specific app
│   │   └── install/
│   │       └── route.ts  # POST track installation
```

## 🔌 API Reference

### Get All Apps
```bash
GET /api/store/apps

# With filters:
GET /api/store/apps?category=health&featured=true&sort=rating
```

**Query Parameters:**
- `category` - Filter by category (all, health, safety, lifestyle, productivity, communication, utilities)
- `featured` - Show only featured apps (true/false)
- `sort` - Sort by rating, downloads, or newest

**Response:**
```json
{
  "success": true,
  "count": 4,
  "apps": [...]
}
```

### Get Specific App
```bash
GET /api/store/apps/tokhealth
```

### Create New App (Admin)
```bash
POST /api/store/apps
Headers:
  - Content-Type: application/json
  - x-admin-token: your-admin-token

Body:
{
  "name": "TokGrow",
  "category": "productivity",
  "developer": "Tok Team",
  "description": "Plant management app",
  "longDescription": "...",
  "emoji": "🌱",
  "version": "1.0.0"
}
```

### Update App (Admin)
```bash
PUT /api/store/apps/tokhealth
Headers:
  - x-admin-token: your-admin-token

Body:
{
  "rating": 4.9,
  "downloads": 25000,
  ...
}
```

### Delete App (Admin)
```bash
DELETE /api/store/apps/tokhealth
Headers:
  - x-admin-token: your-admin-token
```

### Track Installation
```bash
POST /api/store/apps/tokhealth/install

Body:
{
  "userId": "user-123",
  "version": "2.1.0"
}
```

## 🗂️ Data Types

### TokApp Interface
```typescript
interface TokApp {
  id: string;
  name: string;
  category: string;
  emoji: string;
  description: string;
  longDescription: string;
  developer: string;
  icon: string;
  screenshots: string[];
  rating: number;           // 0-5
  downloads: number;
  reviews: number;
  featured: boolean;
  version: string;
  latestVersion: AppVersion;
  previousVersions: AppVersion[];
  requirements: string[];
  permissions: string[];
  privacy: string;
  support: {
    email?: string;
    website?: string;
    github?: string;
  };
  status: 'available' | 'beta' | 'coming-soon' | 'retired';
  releaseDate: Date;
}
```

### AppVersion Interface
```typescript
interface AppVersion {
  version: string;
  releaseDate: Date;
  changelog: string;
  downloadUrl: string;
  fileSize: number;          // in bytes
  minOsVersion?: string;
}
```

## 🎨 UI Features

### Store Header
- Search bar for quick app discovery
- Navigation back to VCC Hub
- Consistent Tok branding

### Sidebar Navigation
- **Categories** - Click to filter by app type
- **Sort Options** - Rating, Downloads, Newest
- Responsive design for mobile/tablet

### App Grid
- Featured apps banner
- App cards with quick stats (rating, downloads)
- Hover effects and transitions
- Search result counter

### App Details View
- Full app information
- Screenshots gallery
- Technical specifications
- Version history
- User reviews and ratings
- Review submission form
- Developer support links

## 🔐 Security

### Future Enhancements (Production)
Currently using mock data. For production deployment:

1. **Database Integration**
   - Replace mock data with database queries
   - Support SQLite, PostgreSQL, or MongoDB

2. **Authentication**
   - Implement proper OAuth/JWT for users
   - Secure admin token verification
   - Role-based access control

3. **Secure Uploads**
   - Validate APK/IPA files
   - Virus scanning
   - Code signing verification

4. **Rate Limiting**
   - Prevent API abuse
   - Track downloads per user
   - Limit review submissions

## 📊 Mock Data

Currently featured apps:
- **TokHealth** (🏥) - Health tracking
- **TokThru** (🚨) - Safety and emergency
- Add more apps via admin dashboard

## 🛠️ Customization

### Add New Category
Edit `app/tokstore/types.ts`:
```typescript
APP_CATEGORIES.push({
  id: 'custom',
  name: 'Custom Category',
  emoji: '📌',
  description: 'Your description',
});
```

### Change Admin Password
Update `.env.local`:
```
ADMIN_TOKEN=your-secure-token
```

### Customize Styling
All components use Tailwind CSS with Tok's color scheme:
- Primary: Emerald (#10b981)
- Dark: Slate-900 (#020617)
- Accent: Sky (#0284c7)

## 🚀 Deployment Checklist

- [ ] Replace mock data with real database
- [ ] Implement proper authentication
- [ ] Add HTTPS/SSL
- [ ] Set up CDN for app downloads
- [ ] Configure environment variables
- [ ] Run security audit
- [ ] Test on mobile devices
- [ ] Set up analytics tracking
- [ ] Create privacy policy
- [ ] Set up support channels

## 📝 Future Features

- [ ] App auto-update system
- [ ] Beta testing program
- [ ] App analytics dashboard
- [ ] Advanced analytics (crash reports, usage metrics)
- [ ] Featured app promotions
- [ ] App pre-orders
- [ ] In-app purchases integration
- [ ] Content moderation system
- [ ] Developer revenue sharing
- [ ] Multi-language support

## 🤝 Integration with Tok Ecosystem

The Store is accessible from:
- **VCC Hub** - New card in the main navigation
- **Direct URL** - `/tokstore`
- **Admin Panel** - `/tokstore/admin`

All Tok apps (TokHealth, TokThru, TokSmart, etc.) are featured in the store by default.

## 📞 Support

For questions or issues with the Tok Store:
- Check the API documentation above
- Review the types in `app/tokstore/types.ts`
- Test endpoints using the admin dashboard
- Check browser console for client-side errors

---

**Last Updated:** March 20, 2026
**Version:** 1.0.0
