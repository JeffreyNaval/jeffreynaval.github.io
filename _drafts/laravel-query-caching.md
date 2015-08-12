---
title: Laravel Query Caching
categories: [ laravel ]
tags: [ laravel, database, php ]
published: True
devicon: laravel
---

Caching database query using Laravel Eloquent.

```php
<?php
Route::get('projects', function ()
{
    $projects = Project::with('owner')->remember(60)->get();
    return view('projects');
});
```

This code will cache the query for an hour.