module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    keepalive: false,
                    port: <%= connect.port %>,
                    hostname: "*",
                    base: "./server"
                }
            }
        },
        ngmin: {
            app : {
                src: [
                    "src/js/**/module.js",
                    "src/js/**/*Provider.js",
                    "src/js/**/*config.js",
                    "src/js/**/run.js",
                    "src/js/**/*.js"
                ],
                dest: ".tmp/js/main.js"
            }
        },
        concat: {
            js: {
                src: ["src/js/.use-strict", "src/js/.prefix", ".tmp/js/main.js", "src/js/.suffix"],
                dest: "server/js/main.js"
            }
        },
        uglify: {
            js: {
                files: {
                    "server/js/main.min.js": ["server/js/main.js"]
                }
            }
        },
        less: {
            app : {
                files: {
                    "server/css/styles.css": ["src/less/styles.less"]
                }
            }
        },
        copy: {
            html: {
                files: [
                    {expand: true, src: ["**/*.html"], cwd: "src/html", dest: "server/"}
                ]
            },
            templates: {
                files: [
                    {expand: true, src: ["**/*"], cwd: "src/templates/", dest: "server/templates/"}
                ]
            },
            components: {
                files: [
                    {expand: true, src: ["angular*/*"], cwd: "bower_components/", dest: "server/components/"}
                    <% if(includes.bootstrap){ %>
                     ,{expand: true, src: ["bootstrap/**/*.*"], cwd: "bower_components/", dest: "server/components/"}
                    <% } %>
                    <% if(includes.jQuery){ %>
                     ,{expand: true, src: ["jquery/**/*.*"], cwd: "bower_components/", dest: "server/components/"}
                    <% } %>
                ]
            },
            fonts: {
                files: [
                    {expand: true, src: ["fonts/**/*"], cwd: "src/", dest: "server/"}
                ]
            },
            media: {
                files: [
                    {expand: true, src: ["**"], cwd: "src/media/", dest: "server/media/"}
                ]
            },
            data: {
                files: [
                    {expand: true, src: ["**"], cwd: "src/data/", dest: "server/data/"}
                ]
            }
        },
        watch: {
            scripts: {
                files: ["src/js/**/*.js"],
                tasks: ["ngmin:app", "concat:js","clean:tmp"]
            },
            html: {
                files: ["src/html/**/*.html"],
                tasks: ["clean:server_html","copy:html"]
            },
            templates: {
                files: ["src/templates/**/*"],
                tasks: ["clean:server_templates","copy:templates"]
            },
            less: {
                files: ["src/less/**/*.less"],
                tasks: ["less"]
            },
            media: {
                files: ["src/media/**/*"],
                tasks: ["clean:server_media","copy:media"]
            }
        },
        clean: {
            all: ["server", ".tmp"],
            tmp: [".tmp"],
            server_html: ["server/**/*.html"],
            server_templates: ["server/templates"],
            server_media: ["server/media"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-ngmin");


    grunt.registerTask("build-dev", ["ngmin:app", "concat:js", "clean:tmp", "copy", "less"]);


    grunt.registerTask("server", ["clean:all", "build-dev", "connect:server", "watch"]);


};