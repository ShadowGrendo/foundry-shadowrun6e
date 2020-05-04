import { series, parallel, src, dest, watch } from 'gulp'
import fs from 'fs'
import path from 'path'
import through from 'through2'
import replace from 'gulp-replace'
import { init, write } from "gulp-sourcemaps"
import babel from "gulp-babel"
import concat from "gulp-concat"
import gulpif from 'gulp-if'
import del from 'delete'
import { dirname } from 'path'
import Handlebars from 'handlebars'
import sass from 'node-sass'
import gulpSass from 'gulp-sass'
import browserSync from 'browser-sync'

let devServer = browserSync.create()

import handlebarsSetup from './testing/handlebars-setup.js'

handlebarsSetup()

function clean(done) {
   // clean up the dist directory before we start building
   del('dist/**', done)
}

function handlebars() {
   let prefix = 'systems/shadowrun6e/templates'
   return src('templates/**/*.html')
      .pipe(through.obj(function (file, encoding, done) {
         try {

            let partialName = `${prefix}/${file.relative.replace(/\\/g, '/')}`
            console.log(partialName)
            let partial = file.contents.toString()

            Handlebars.registerPartial(partialName, partial)

            done(null, file)
         }
         catch (error) {
            done(error, null)
         }
      }))
      // we just register the partials, we don't need to copy the files
      // .pipe(dest('dist'))
}

function html() {
   return src('testing/index.html')
      .pipe(through.obj(function (file, encoding, done) {
         try {
            let source = file.contents.toString()
            let json = fs.readFileSync('testing/data.json')
            let data = JSON.parse(json)
            let template = Handlebars.compile(source)
            let templated = template(data)
            file.contents = Buffer.from(templated)
            done(null, file)
         }
         catch (error) {
            done(error, null)
         }
      }))
      .pipe(dest('dist'))
}

let content = series(handlebars, html)

function scss() {
   return src('scss/main.scss')
      .pipe(gulpSass().on('error', gulpSass.logError))
      .pipe(dest('css/'))
}

function styles() {
   return src('testing/style.css')
      .pipe(dest('dist'))
}

function develop(done) {
   devServer.init({
      server: './dist',
      single: true,
      port: 8080,
      files: ['dist/**'],
      open: false,
      notify: false,
      // middleware for http2
   })

   // watch each type of file seperately so we can more efficently run just that pipeline 
   watch(['testing/index.html', 'testing/data.json', 'templates/**'], content)
   watch('testing/style.css', styles)
   watch('scss/**', scss)

   done()
}

// build processes files, 
// currently in parallel, but there may be some parts we want to serialize because, of sass and svelte stuff
let build = parallel(
   // assets,
   // components,
   // content,
   // styles,
   // internals,
   // js,
   scss,
   // icons
)

// default task is to clean and run build
let defaultTask = series(
   clean,
   build
)

let devTask = series(build, develop)

export {
   defaultTask as default,
   defaultTask as build,
   devTask as watch,
   clean as clean,
   // styles as styles,
   // components as components
}