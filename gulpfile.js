"use strict"

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const sourcemaps = require("gulp-sourcemaps");
const gulpif = require("gulp-if");
const jade = require("gulp-jade");
const data = require('gulp-data');
const uglify = require('gulp-uglify-es').default;
const cleanCss = require("gulp-clean-css");
const include = require("gulp-include");
const del = require("del");
const useref = require("gulp-useref");
const gutil = require("gulp-util");
const imagemin = require("gulp-image");
const autoprefixer = require("gulp-autoprefixer");
const foreach = require("gulp-foreach");
const rework = require("gulp-rework");
const reworkUrl = require("rework-plugin-url");
const filter = require("gulp-filter");
const runSequence = require("run-sequence");
const rename = require("gulp-rename");
const insert = require("gulp-insert");
const plumber = require("gulp-plumber");
const minifyCss = require("gulp-minify-css");
const jadeGlobbing = require("gulp-jade-globbing");
const sassGlob = require("gulp-sass-glob");
const changed = require("gulp-changed");
const replace = require("gulp-replace");
const print = require("gulp-print");
const spritesmith = require("gulp.spritesmith");
const fs = require('fs');
const GulpSSH = require('gulp-ssh');
const confirm = require('gulp-confirm');
const merge = require('gulp-merge-json');
const md5 = require("gulp-md5-assets");
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');

var sprites = ["sprite"];
var app = "./app";
var dev = "./develop"
var dist = "./dist"


/*
gulp.task("default", ["browser-sync", "libs", "watch"], function(){
    
});
*/

//-----DEPLOY-------

gulp.task("svgSprite", function() {
    let symbolConfig = {
        mode: {
            symbol: {
                dest: '.',
                sprite: 'html-sprite.svg',
            }
        }
    };
    let cssConfig = { // currently unused
        mode: {
            css: {
                dest: './app/css',
                layout: 'diagonal',
                sprite: '../images/css-sprite.svg',
                render: {
                    scss: {
                        dest: "../../develop/scss/sprite.scss",
                    }
                }
            }
        }
        /* shape: {},
        mode: {
            css: {
                dest: "./",
                layout: "diagonal",
                sprite: 'app/images/css-sprite.svg',
                bust: false,
                render: {
                    scss: {
                        dest: "./develop/scss/sprite.scss",
                        template: "./app/images/svg/template.scss"
                    }
                }
            }
        },
        variables: {
            mapname: "icons"
        } */
    }
    gulp.src('./app/images/svg/inline-svg/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(svgSprite(symbolConfig))
        .pipe(gulp.dest('./app/images'));
    /* gulp.src('./app/images/svg/css-svg/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(svgSprite(cssConfig))
        .pipe(gulp.dest('.')); */
    
})

// var CONFIG = require('./config.json');

// var config = {
//     host: CONFIG.deploy.host,
//     port: CONFIG.deploy.port,
//     username: CONFIG.deploy.username,
//     privateKey: fs.readFileSync(CONFIG.deploy.privateKey)
// };

// var gulpSSH = new GulpSSH({
//     ignoreErrors: false,
//     sshConfig: config
// });

// gulp.task("deploy", function () {
//     return gulp
//         .src('./dist/**/*')
//         .pipe(confirm({
//             question: 'Continue deploy to ' + CONFIG.deploy.dest + '? Press "y" if ok',
//             input: '_key:y'
//         }))
//         .pipe(gulpSSH.dest('/var/www/' + CONFIG.deploy.dest))
// })

gulp.task("default", ["compile", "watch", "browser-sync"], function () {});

gulp.task("compile", ["sprite", "scss", "js", "jadeBlocks"], function () {});


gulp.task("browser-sync", function () {
    browserSync.init({
        server: {
            baseDir: app
        },
        browser: "chrome",
        notify: false,
        port: 8000
    });
});


//-----SCSS-------
gulp.task("scss", function () {

    return gulp.src("./develop/scss/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(sassGlob())
        .pipe(print())
        .pipe(sass.sync({
            errLogToConsole: true,
            debugInfo: true,
            lineNumbers: true,
        }))
        .pipe(autoprefixer({
            browsers: ["last 2 version", "> 2%", "firefox 15", "safari 5", "ie 6", "ie 7", "ie 8", "ie 9", "opera 12.1", "ios 6", "android 4"]
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(app + "/css"))
        .pipe(browserSync.stream());

});


//-----JADE-------
gulp.task("jade", function () {

    return gulp.src(["./develop/jade/**/*.jade", "!./develop/jade/template/**/*", "!./develop/jade/includes/**/*", "!./develop/jade/includes.jade"])
        .pipe(changed(app, {
            extension: ".html"
        }))
        .pipe(print())
        .pipe(plumber())
        .pipe(jadeGlobbing())
        .pipe(jade({
            pretty: "  ",
        }))
        .pipe(gulp.dest(app))
});

gulp.task("mergeJSON", function() {
    return gulp.src('./develop/blocks/**/*.json')
        .pipe(merge({
            fileName: 'result.json',
            mergeArrays: false
        }))
        .pipe(gulp.dest('./'));
})
gulp.task("jadeBlocks", ["mergeJSON"], function () {

    return gulp.src(["./develop/jade/**/*.jade", "!./develop/jade/template/**/*", "!./develop/jade/includes/**/*", "!./develop/jade/includes.jade"])
        .pipe(plumber())
        .pipe(jadeGlobbing())
        .pipe(print())
        .pipe(data(function (file) {
            return JSON.parse(
                fs.readFileSync('./config.json')
            );
        }))
        .pipe(data(function (file) {
            return JSON.parse(
                fs.readFileSync('./result.json')
            );
        }))
        .pipe(jade({
            pretty: "  ",
        }))
        .pipe(gulp.dest(app))

});



//-----JS-------
gulp.task("deljs", function () {

    return del.sync([app + "/js/main.js"]);

});

gulp.task("js", ["deljs"], function () {

    return gulp.src("./develop/js/template.js")
        .pipe(plumber())
        .pipe(include())
        .pipe(print())
        .on("error", console.log)
        .pipe(concat("main.js"))
        .pipe(gulp.dest(app + "/js"));
});


//------SPRITE-----------
gulp.task("sprite", function generateSpritesheets() {

    // for(var i in sprites){
    //png sptite
    // var sprite = sprites[i];
    var spriteData = gulp.src(app + "/images/sprite/*.png")
        .pipe(print())
        .pipe(spritesmith({
            imgName: "sprite.png",
            cssName: "sprite.scss",
            imgPath: app + "/images/sprite.png",
            padding: 1
        }));

    spriteData.img.pipe(gulp.dest(app + "/images"));
    spriteData.css.pipe(gulp.dest(dev + "/scss"));
    //-png sptite
    // }

});



//-----WATCH-------
gulp.task("watch", function () {

    gulp.watch("images/{" + sprites.join(",") + "}/*.{jpg,png,svg,gif}", {
        cwd: "develop"
    }, ["sprite"]); //спрайт

    gulp.watch("**/*.scss", {
        cwd: "develop"
    }, ["scss"]); // css

    gulp.watch(["**/*.js", "!js/main.js"], {
        cwd: "develop"
    }, ["js", browserSync.reload]); //js
    
    gulp.watch(["jade/blocks/**/*.jade", "blocks/**/*.jade"], {
        cwd: "develop"
    }, ["jadeBlocks", browserSync.reload]); //блоки

    gulp.watch(["blocks/**/*.jade"], {
        cwd: "develop"
    }, ["jadeBlocks", browserSync.reload]); //блоки

    gulp.watch(["blocks/**/*.json"], {
        cwd: "develop"
    }, ["jadeBlocks", browserSync.reload]); //JSON

    gulp.watch(["jade/**/*.jade", "!jade/template/**/*.jade"], {
        cwd: "develop"
    }, ["jade", browserSync.reload]); //шаблоны

});





//=================build==========================


// ====TO DIST====

//cleandist
gulp.task("build:clean", /*["jadeBlocks"],*/ function () {
    return del.sync(["./dist"]);
});



//copydist
gulp.task("build:copyDist", function () {

    return gulp.src([
            app + "/*.php",
            app + "/.htaccess",
            app + "/favicon.png",
        ])
        .pipe(print())
        .pipe(gulp.dest("dist"));

});



//copylibs
gulp.task("build:copyLibs", function () {

    return gulp.src([
            app + "/libs/**"
        ])
        .pipe(print())
        .pipe(gulp.dest("dist/libs"));

});



//copy dist fonts
gulp.task("build:copyDistFonts", function () {

    return gulp.src([app + "/fonts/**/{*.eot,*.svg,*.ttf,*.eot,*.otf,*.woff2,*.woff}"])
        .pipe(print())
        .pipe(gulp.dest("dist/fonts"));

});



//minifi img
gulp.task("build:minifiImg", function () {

    return gulp.src([app + "/images/**/{*.jpg,*.png,*.jpeg,*.gif}"])
        .pipe(print())
        .pipe(imagemin({
            zopflipng: false
        }))
        .on("error", console.log)
        .pipe(gulp.dest("dist/images"));

});

gulp.task("build:minifiSvg", function () {

    return gulp.src([app + "/images/**/*.svg"])
        .pipe(print())
        // .pipe(svgmin({
        //     js2svg: {
        //         pretty: true
        //     }
        // }))
        .pipe(gulp.dest("dist/images"));

});



gulp.task("build:minifiJsCss", function () {
    return gulp.src(app + "/**/*.html")
        .pipe(useref({
            searchPath: app,
            base: app
        }))
        .pipe(print())
        .pipe(gulpif("*.js", uglify().on("error", function (err) {
            gutil.log(gutil.colors.red("[Error]"), err.toString());
            this.emit("end");
        })))
        .pipe(gulpif("*.css", minifyCss()))
        .pipe(gulp.dest("dist"));

});

gulp.task("hashJS", function () {
    return hashJS();
})
    
gulp.task("hashCSS", function () {
    return hashCSS();
})

function hashJS() {
    return gulp.src('./dist/js/*.js', { base: './dist/js/' })
        .pipe(md5(10, './dist/index.html'))
        .pipe(gulp.dest("./dist/js"))
        .pipe(print())
}

function hashCSS() {
    return gulp.src('./dist/css/*.css', { base: './dist/css/' })
        .pipe(md5(10, './dist/index.html'))
        .pipe(gulp.dest("./dist/css"))
        .pipe(print())
}

    
gulp.task("build:dist", ["build:clean"], function (callback) {

    return runSequence([ /*"build:copyDist",*/ "build:copyLibs", "build:copyDistFonts", "build:minifiImg", "build:minifiSvg", "build:minifiJsCss"], function () {
        hashJS();
        hashCSS()
        
    });

});
//===TO DIST====

/* ===TO JOOMLA==== */
//copy dist fonts
gulp.task("Jbuild:copyDistFonts", function () {

    return gulp.src([app + "/fonts/**/{*.eot,*.svg,*.ttf,*.eot,*.otf,*.woff2,*.woff}"])
        .pipe(print())
        .pipe(gulp.dest("../fonts"));

});



//minifi img
gulp.task("Jbuild:minifiImg", function () {

    return gulp.src([app + "/images/**/{*.jpg,*.png,*.jpeg,*.gif,*.svg}"])
        .pipe(print())
        .pipe(imagemin())
        .on("error", console.log)
        .pipe(gulp.dest("../images"));

});



gulp.task("Jbuild:minifiJsCss", function () {

    return gulp.src(app + "/index.html")
        .pipe(useref({
            searchPath: app,
            base: app
        }))
        .pipe(print())
        .pipe(gulpif("*.js", uglify()))
        .pipe(gulpif("*.css", minifyCss()))
        .pipe(gulp.dest("../"));

});



gulp.task("build:joomla", ["build:clean"], function (callback) {

    return runSequence(["Jbuild:copyDistFonts", "Jbuild:minifiJsCss"], callback);

});
/* ===TO JOOMLA==== */



//build
gulp.task("build", ["build:clean", "compile"], function (callback) {

    return runSequence(["build:dist", /*"Jbuild:minifiImg", "build:joomla"*/ ], callback);

});

//------------=====build======--------------------