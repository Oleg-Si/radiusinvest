"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
// var svgstore = require("gulp-svgstore"); //svg спрайт
// var svgmin = require("gulp-svgmin");
var run = require("run-sequence");
var del = require("del");
var server = require("browser-sync").create();

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 5 versions"
      ]})
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html:update"]);
  gulp.watch("js/**/*.js", ["copyJs"]);
  gulp.watch("img/**/*.{png,jpg,svg,gif}", ["copyImg"]);
});

gulp.task("copyJs", function() {
  return gulp.src("js/**/*.js")
    .pipe(gulp.dest("build/js"));
});

gulp.task("copyImg", function() {
  return gulp.src("img/**/*.{png,jpg,svg}")
    .pipe(gulp.dest("build/img"));
});

gulp.task("copyCss", function() {
  return gulp.src("sass/*.css")
    .pipe(gulp.dest("build/css"));
});

gulp.task("images", function() {
  return gulp.src("build/img/**/*.{png,jpg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationlevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("build", function(fn){
  run("style", /*"images",*/ fn);
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2,ttf}",
    "img/**",
    "js/**",
    "*.html"
    ], {
    base: "."
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
  return del("build");
});

gulp.task("html:copy", function() {
  return gulp.src("*.html")
    .pipe(gulp.dest("build"));
});

gulp.task("html:update", ["html:copy"], function(done) {
  server.reload();
  done();
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "copyCss",
    "style",
    fn
  );
});

gulp.task("fin", function(fn) {
  run(
    "clean",
    "copy",
    "copyCss",
    "images",
    "style",
    fn
  );
});
