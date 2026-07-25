module.exports = {
  apps: [
    {
      // ⚠️ Already deployed, PORT changing 4005 → 4031 to match new vhost.
      //    Restart required after this file is applied.
      name: "angular-common-details",
      cwd: "/home/homes247-hostinger3/htdocs/hostinger.homes247.in/mobile-details/dist/Common-details-project/server",
      script: "server.mjs",
      instances: 1,
      exec_mode: "fork",
      priority: 10,
      max_memory_restart: "1200M",
      min_uptime: "60s",
      restart_delay: 2000,
      watch: false,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      out_file: "/home/homes247-hostinger3/.pm2/logs/common-details-out.log",
      error_file: "/home/homes247-hostinger3/.pm2/logs/common-details-error.log",
      merge_logs: true,
      env: {
        NODE_ENV: "production",
        PORT: 4031,
        NODE_OPTIONS: "--max_old_space_size=1024"
      }
    },
    {
      // ✅ cwd + server.mjs confirmed via ls
      name: "angular-mobile-listing",
      cwd: "/home/homes247-hostinger3/htdocs/hostinger.homes247.in/mobile listing/dist/Buy_listing_Project/server",
      script: "server.mjs",
      instances: 1,
      exec_mode: "fork",
      priority: 9,
      max_memory_restart: "1200M",
      min_uptime: "60s",
      restart_delay: 2000,
      watch: false,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      out_file: "/home/homes247-hostinger3/.pm2/logs/mobile-listing-out.log",
      error_file: "/home/homes247-hostinger3/.pm2/logs/mobile-listing-error.log",
      merge_logs: true,
      env: {
        NODE_ENV: "production",
        PORT: 4030,
        NODE_OPTIONS: "--max_old_space_size=1024"
      }
    },
    {
      // ✅ cwd confirmed via ls. Script is main.js (older Angular Universal
      //    build format), NOT server.mjs like the other apps here.
      name: "angular-mobile-common-pages",
      cwd: "/home/homes247-hostinger3/htdocs/hostinger.homes247.in/mobile Common pages/dist/angular-mobile/server",
      script: "main.js",   // ✅ confirmed via ls — this build outputs main.js, not server.mjs
      instances: 1,
      exec_mode: "fork",
      priority: 8,
      max_memory_restart: "1200M",
      min_uptime: "60s",
      restart_delay: 2000,
      watch: false,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      out_file: "/home/homes247-hostinger3/.pm2/logs/mobile-common-pages-out.log",
      error_file: "/home/homes247-hostinger3/.pm2/logs/mobile-common-pages-error.log",
      merge_logs: true,
      env: {
        NODE_ENV: "production",
        PORT: 4032,
        NODE_OPTIONS: "--max_old_space_size=1024"
      }
    },
    {
      // ✅ cwd + server.mjs confirmed via ls (folder is spelled
      //    "Subcription" on disk, no "s" — kept exactly as-is)
      name: "angular-mobile-subscription",
      cwd: "/home/homes247-hostinger3/htdocs/hostinger.homes247.in/mobile Subcription/dist/Buy_listing_Project/server",
      script: "server.mjs",
      instances: 1,
      exec_mode: "fork",
      priority: 7,
      max_memory_restart: "1200M",
      min_uptime: "60s",
      restart_delay: 2000,
      watch: false,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      out_file: "/home/homes247-hostinger3/.pm2/logs/mobile-subscription-out.log",
      error_file: "/home/homes247-hostinger3/.pm2/logs/mobile-subscription-error.log",
      merge_logs: true,
      env: {
        NODE_ENV: "production",
        PORT: 4033,
        NODE_OPTIONS: "--max_old_space_size=1024"
      }
    }
  ]
};