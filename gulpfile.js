var gulp=require('gulp'),
	gutil=require('gulp-util'),
	coffee=require('gulp-coffee'),
	browserify=require('gulp-browserify'),
	compass=require('gulp-compass'),
	concat=require('gulp-concat');


var coffeeSources=['component/coffee/tagline.coffee'];
var jsSources=[ 'component/scripts/rclick.js',
				'component/scripts/pixgrid.js',
				'component/scripts/tagline.js',
				'component/scripts/template.js'
				];

var sassSources=['component/sass/style.scss'];

gulp.task('coffee',function(){
	gulp.src(coffeeSources)
	  .pipe(coffee({ bare : true })
	  	.on('error',gutil.log))
	  .pipe(gulp.dest('component/scripts'))
});

gulp.task('js', function() {
   gulp.src(jsSources)
     .pipe(concat('script.js'))
     .pipe(browserify())
     .pipe(gulp.dest('builds/development/js'));
});

gulp.task('compass', function() {
   gulp.src(sassSources)
     .pipe(compass({
      sass: 'component/sass',
      image: 'builds/development/images',
      style: 'expanded'

    })
     .on('error',gutil.log))
     .pipe(gulp.dest('builds/development/css'));
});

gulp.task('watch',function(){
	gulp.watch(coffeeSources, ['coffee']);
	gulp.watch(jsSources, ['js']);
	gulp.watch('component/sass/*.scss', ['compass']);
});