---
title: Can't use method return value in write context
categories: [php]
tags: [php]
published: True
devicon: php
---

I got this error while working on a php project

```
Can't use method return value in write context
```

On this line of code.

```php
<?php

$x = ( emtpy( get_something() ) ) ? get_something() : '';
```

<br>
I was searching for a good answer and found this [stackoverflow post](http://stackoverflow.com/questions/1075534/cant-use-method-return-value-in-write-context/4328049#4328049)

Apparently PHP versions before 5.5 didn't support references to temporary values returned from functions.

### Solution 1:
Store the returned value in a variable before testing it.

```php
<?php

$y = get_something();
$x = ( emtpy( $y ) ) ? $y : '';
```

### Solution 2:
Since empty is just an alias for `!isset($x) || !$x`. We'll just use `!` operator.

```php
<?php

$x = ( ! get_something() ) ? get_something() : '';
```

<br>
I will just leave it here as a note to self.