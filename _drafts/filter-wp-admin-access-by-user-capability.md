---
title: Filter wp-admin access by user capability
categories: [wordpress]
tags: [wordperss,php]
published: True
devicon: wordpress
---

There are times where we need to block non-admins from accessing wp-admin, or better block access based on capability.

We can do this by redirecting the page if the user doesn't meet the required capability. You can check Wordpress
[Capability vs. Role Table](https://codex.wordpress.org/Roles_and_Capabilities#Capability_vs._Role_Table)

If you want to only allow users with `edit_posts` capability. We can use the code below.

```php
<?php
add_action( 'admin_init', 'redirect_user_by_capability' );

/**
 * Only allow users with edit_post capability
 */
function redirect_user_by_capability() {
    $admin_ajaxurl = str_replace(
        array( 'http://', 'https://' ,$_SERVER['HTTP_HOST'] ),
        '',
        admin_url( 'admin-ajax.php' ) );

    if ( ! current_user_can( 'edit_posts' ) &&  $admin_ajaxurl != $_SERVER['PHP_SELF'] ) {
        wp_redirect( home_url() );
        exit;
    }
}
```

This code will redirect users without `edit_posts` capability to homepage.