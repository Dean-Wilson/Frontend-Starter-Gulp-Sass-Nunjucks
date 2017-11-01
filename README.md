# README #

### What is this repository for? ###

* Quick summary

Used as a starting point for projects that you want to use SASS with Gulp in. Uses Nunjucks for templating. 

* Version 1.0

GULP AND SASS
===============

## Steps to install and develop with Node and Gulp ###
* Install Node if you do not have it (https://nodejs.org/en/)
* Then run following to install gulp (if dont already have it)
* npm install --global gulp-cli
* You may need to edit "PATH" environment variable and add %APPDATA%\npm (http://stackoverflow.com gf/questions/9587665/nodejs-cannot-find-installed-module-on-windows/9588052#9588052)
* Open CMD and CD to directory (i.e ..ifss\wp-content\themes\ifss-smalltalk) and run:
  * **npm install** (this will install all of the dependencies)
* Then start gulp and development by running:
  * **gulp**  You should get a number of processes having run and your public folder populated. **The public folder should never be directly edited.**
* Ignore the node modules folder in Sublime text editor using this in your settings:
"binary_file_patterns":
  [
    "public/*",
    "node_modules/*",
    "*.jpg",
    "*.jpeg",
    "*.png",
    "*.gif",
    "*.ttf",
    "*.tga",
    "*.dds",
    "*.ico",
    "*.eot",
    "*.pdf",
    "*.swf",
    "*.jar",
    "*.zip"
  ],
and add to 
"folder_exclude_patterns": [..."node_modules"],
e.g:
"folder_exclude_patterns": [".svn", ".git", ".hg", "CVS", "node_modules"],
so you can still do searches without scouring these folders as well. 

### Troubleshooting Installation ###
* Lock file error - You might have an old version of Node. Update Node with:
  * npm install -g npm@latest (https://github.com/npm/npm/issues/11343)
* The sourcemaps aren't showing in the browser - restart gulp. 
* Errors when installing - including "please try running again as root/administrator windows" - 
  * run **npm cache clean** then try **npm install** again

## TODO file ###
When you run gulp, a compiled TODO file will automatically be created in ifss-smalltalk/src. To add to this file just place a "TODO: [notes]" wherever relevant but ensure that TODO are the first characters on a new line (spaces are OK) so this:
    <?
    //TODO: Task to be completed
    ?>
_not_ this:
    <? //TODO: Task to be completed ?>

### Browsersync ###
You should also get this when you run gulp (but not gulp build):

[BS] Access URLs:
 ------------------------------------
       Local: http://localhost:3000
    External: http://192.168.0.3:3000
 ------------------------------------
          UI: http://localhost:3001
 UI External: http://192.168.0.3:3001
 ------------------------------------

This will allow you to access the site at http://localhost:3000/. http://localhost:3001/ is browsersync admin - you can turn weinre on from here to use the inspector on mobile.


## Deploying ###
* Exit the watch task with ctrl-c
* run:
  * **gulp build** The scripts and styles will be concatenated and minified. You can then deploy the theme files and folders excluding the node_modules, src, tests and tools folders. 
  * Can then use a tool like phploy https://github.com/banago/PHPloy to deploy your project. 

## Styles (SASS) ###

The settings file holds all of the global settings for the project. The file further abstracts the colours that are set up in base/project/colours. We are using bootstrap in this project as well, and that CSS is added under styles/vendor.

Note: you do not have to worry about vendor prefixing as Gulp together with auto-prefixer handles that for us.  

### Who do I talk to? ###

* Dean Wilson - dean@yump.com.au
