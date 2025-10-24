# Installation Guide - Vue.js Todo Application

## System Requirements

- **Node.js**: Version 16.x or higher
- **npm**: Version 7.x or higher (comes with Node.js)
- **OS**: Windows, macOS, or Linux

## Step-by-Step Installation

### 1. Verify Node.js Installation

```bash
node --version
# Should output v16.x.x or higher

npm --version
# Should output 7.x.x or higher
```

If Node.js is not installed, download it from [nodejs.org](https://nodejs.org/)

### 2. Navigate to Project Directory

```bash
cd todovuejs
```

### 3. Install Dependencies

```bash
npm install
```

This will install all required packages:
- Vue 3
- Vue Router
- Pinia
- Vue Query
- Ant Design Vue
- Axios
- Vite
- TypeScript
- And all development dependencies

**Expected Duration**: 1-3 minutes depending on your internet speed

### 4. Start Development Server

```bash
npm run dev
```

You should see output similar to:
```
VITE v6.0.11  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### 5. Open in Browser

Navigate to: `http://localhost:5173`

You should see the login page.

### 6. Login

Use the demo credentials:
- **Email**: `admin@example.com`
- **Password**: `password`

### 7. Start Using the App!

You're all set! You can now:
- Add todos
- Edit todos
- Delete todos
- Search and filter
- Toggle themes
- And more!

## Common Installation Issues

### Issue: Port 5173 Already in Use

**Solution**: Either kill the process using that port or change the port in `vite.config.ts`:

```typescript
export default defineConfig({
  // ...
  server: {
    port: 3000 // Change to any available port
  }
})
```

### Issue: npm install Fails

**Solutions**:
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete node_modules and try again:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. Try using `--legacy-peer-deps`:
   ```bash
   npm install --legacy-peer-deps
   ```

### Issue: TypeScript Errors

**Solution**: Ensure you have TypeScript installed:
```bash
npm install -D typescript
```

### Issue: Vite not found

**Solution**: Install Vite explicitly:
```bash
npm install -D vite
```

## Building for Production

Once development is complete, build the app for production:

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

## Deployment

The built files in `dist/` can be deployed to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop `dist/` folder
- **GitHub Pages**: Push `dist/` to gh-pages branch
- **Firebase Hosting**: `firebase deploy`

## Environment Variables

To add environment variables:

1. Create a `.env` file in the root:
   ```
   VITE_API_URL=https://api.example.com
   VITE_APP_TITLE=My Todo App
   ```

2. Access in your code:
   ```typescript
   const apiUrl = import.meta.env.VITE_API_URL
   ```

**Note**: Environment variables must start with `VITE_` to be exposed to the client.

## Updating Dependencies

To update all dependencies to their latest versions:

```bash
npm update
```

Or to check for outdated packages:

```bash
npm outdated
```

## Uninstallation

To remove the project:

1. Stop the dev server (Ctrl+C)
2. Delete the project folder

To remove global packages (if any were installed):
```bash
npm uninstall -g [package-name]
```

## Additional Resources

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Vue Router Documentation](https://router.vuejs.org/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Ant Design Vue](https://antdv.com/)

## Support

For issues or questions:
1. Check the documentation links above
2. Review the code comments in the project
3. Check the CONVERSION_NOTES.md for implementation details

---

**Happy Coding!** 🚀

