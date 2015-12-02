---
title: Installing Jekyll and Github Pages on Windows
categories: [ jekyll, github ]
tags: [ jekyll, github, ruby, bundler, gem ]
devicon: github
---

My blog is proudly hosted with [Github Pages](https://pages.github.com/).
I used [Github installation](https://help.github.com/articles/using-jekyll-with-pages/) instructions to build it.
It's pretty simple until I bump onto some issues while trying to make things work on my Windows machine.

## Windows Issues
By default windows will use polling method when you use `jekyll watch` or `jekyll serve`.
As a result it takes a couple of seconds after saving a file before you can see your changes.

To solve this issue you have to install a gem called `wdm`.
This gem will monitor directory changes and will notify jekyll to rebuild your site.

### Using Bundler
If you are already using `bundler` just add `gem 'wdm', '>= 0.1.0'` in your Gemfile.

```
source 'https://rubygems.org'
gem 'github-pages'
gem 'wdm', '>= 0.1.0'
```

Then run the command `bundle update`.

### Using Gem Install
Just run the command `gem install wdm`.

After doing this. You can now run `jekyll watch` or `jekyll serve`. You will see your changes immediately.

## Pygments Issue
Pygments the highlighter that [github is using](https://help.github.com/articles/using-jekyll-with-pages/#defaults), does not have Python 3.x support.
[GitHub Issue](https://github.com/tmm1/pygments.rb/issues/45)

You can fix this by installing [Python 2.7.x](https://www.python.org/downloads/). Don't forget to add `C:\Python27` and `C:\Python27\Scripts` to your `PATH`.

## Highlightjs
If you don't want to deal with Jekyll markdown settings you can just leave your `_config.yml` with it's default settings and leave code highlighting to [Highlightsjs](https://highlightjs.org/)

### Jekyll Now
[Jekyll Now](https://github.com/barryclark/jekyll-now) is good for starting your blog without the hussle of setting up Jekyll locally.
You can just clone/fork the repository and your good to go.
