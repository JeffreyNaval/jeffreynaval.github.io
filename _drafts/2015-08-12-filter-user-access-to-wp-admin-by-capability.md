---
title: Filter user access to wp-admin by capability
devicon: wordpress
---

There are times where we need to block non-admins from accessing wp-admin, or better block access based on capability.

We can do this by redirecting the page if the user doesn't meet the required capability. You can check Wordpress
[Capability vs. Role Table](https://codex.wordpress.org/Roles_and_Capabilities#Capability_vs._Role_Table)

If you want to only allow users with `edit_posts` capability. We can use the code below.

```php
add_action( 'admin_init', 'redirect_user_by_capability' );

/**
 * Only allow users with edit_post capability
 */
function redirect_user_by_capability() {
    if ( ! current_user_can( 'edit_posts' ) && site_url() . '/wp-admin/admin-ajax.php' != $_SERVER['PHP_SELF'] ) {
        wp_redirect( home_url() );
        exit;
    }
}
```

This code will redirect users without `edit_posts` capability to homepage.