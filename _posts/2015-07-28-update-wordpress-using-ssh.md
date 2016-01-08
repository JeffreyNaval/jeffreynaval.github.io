---
title: Update Wordpress using SSH
devicon: wordpress
excerpt: We have to create a maintenance page so that users who access your website will be notified that you're website is just undergoing maintenance and everything is undercontrol. We don't want them to see error messages or a blank page while files are being updated.
---

## 1. Create a maintenance page
We have to create a maintenance page so that users who access your website will be notified that you're
website is just undergoing maintenance and everything is undercontrol. We don't want them to see error
messages or a blank page while files are being updated.

```bash
touch maintenance.html
vim maintenance.html
```

Update `maintenance.html` with your maintenance code or just use code below.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Down For Maintenance</title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <style>
        h1 { font-size: 50px; }
        body { text-align:center; font: 20px Helvetica, sans-serif; color: #333; }
        </style>
    </head>
    <body>
        <h1>Down For Maintenance</h1>
        <p>Sorry for the inconvenience, but we're performing a maintenance at the moment.</p>
        <p>We'll be back online shortly!</p>
    </body>
</html>
```

Set `.htaccess` to redirect to `maintenance.html` when `.maintenance` file exist.

```apache
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{DOCUMENT_ROOT}/maintenance.html -f
RewriteCond %{DOCUMENT_ROOT}/.maintenance -f
RewriteCond %{SCRIPT_FILENAME} !maintenance.html
RewriteRule ^.*$ /maintenance.html [R=503,L]
ErrorDocument 503 /maintenance.html
</IfModule>

...
```

Create `.maintenance` file to activate maintenance mode.

```bash
touch .maintenance
```

Visit your website to test if it works. You should see the contents of your `maintenance.html` not your website.

If you want you can also exclude your IP by adding.

```apache
RewriteCond %{REMOTE_ADDR} !^123\.456\.789\.000
```

Replace `!^123\.456\.789\.000` with your IP.

Now your `.htaccess` file will look like this.

```apache
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteCond %{REMOTE_ADDR} !^123\.456\.789\.000
RewriteCond %{DOCUMENT_ROOT}/maintenance.html -f
RewriteCond %{DOCUMENT_ROOT}/.maintenance -f
RewriteCond %{SCRIPT_FILENAME} !maintenance.html
RewriteRule ^.*$ /maintenance.html [R=503,L]
ErrorDocument 503 /maintenance.html
</IfModule>

...
```

This way you can visit your website while it is in maintenance mode.

## 2. Backup
It's always good to have a backup. We can easily do this by copying Wordpress files into a backup folder.

```bash
mkdir backup
cp -r wp-* ./backup/
cp xmlrpc.php ./backup/
```

Now if things go wrong we can just restore our files.

## 3. Get the latest version of Wordpress
Now we need to download and extract the latest version of Wordpress.
[Source](http://code.tutsplus.com/articles/quick-tip-upgrade-your-wordpress-site-via-ssh--wp-27691)

````bash
wget http://wordpress.org/latest.tar.gz
tar xfvz latest.tar.gz
```

This code will download the latest version `wget http://wordpress.org/latest.tar.gz` and extract it `tar xfvz latest.tar.gz`. A new directory `wordpress` will be created that contains latest version of Wordpress.

## 4. Delete wp files
Delete `wp-admin` and `wp-includes`. You can also check [Official Wordpress Docs](https://codex.wordpress.org/Upgrading_WordPress_-_Extended_Instructions#Step_7:_Delete_the_old_WordPress_files) for the list of files to delete.

```bash
rm -rf ./wp-admin
rm -rf ./wp-includes
```

## 5. Update Wordpress
After deleting wp files. You can now move contents of `wordpress` directory to your website directory.

```bash
cd wordpress
mv * ../
```

Now your Wordpress is up-to-date. Just visit your website's wp-admin page to Update the database. Don't forget to always backup your database before updating.

## 6. Cleaning up
Once we're done updating wordpress. We have to clean up files that we've created along the process.
Remove `latest.tar.gz` and `wordpress` directory from your public directory.

```bash
rm latest.tar.gz
rm -rf ./wordpress
```
You also have to move the backup directory anywhere where it's not publicly accessible.

Then remove `.maintenance` file to make your blog publicly available.

```bash
rm .maintenance
```

## Sources:
- <a href="http://www.shellhacks.com/en/Redirect-Site-to-Maintenance-Page-using-Apache-and-HTAccess" target="_blank">Redirect Site to Maintenance Page using Apache and HTAccess</a>
- <a href="http://www.hongkiat.com/blog/wordpress-maintenance/" target="_blank">How To Put WordPress Site Into Maintenance Mode</a>


