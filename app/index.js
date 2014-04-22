'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var FrontEndGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = require('../package.json');

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();

        this.log(chalk.magenta('front-end generator'));

        var prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: 'project name ?',
                validate: function (input) {
                    return input && typeof input === "string" && input.length > 0;
                }
            },
            {
                type: 'input',
                name: 'angularjsAppName',
                message: 'angularjs app name ?',
                validate: function (input) {
                    //TODO
                    return true;
                },
                default: "app"
            },
            {
                type: 'input',
                name: 'connectPort',
                message: 'server port ?',
                validate: function (input) {
                    //TODO
                    return true;
                },
                default: 8080

            },
            {
                type: 'checkbox',
                name: 'angularModules',
                message: 'Which angular module would you like to include?',
                choices: [
                    {
                        value: 'includeAngularRoute',
                        name: 'angular-route',
                        checked: true
                    },
                    {
                        value: 'includeAngularAnimate',
                        name: 'angular-animate',
                        checked: true
                    }
                ]
            },

            {
                type: 'checkbox',
                name: 'components',
                message: 'Which component would you like to include?',
                choices: [
                    {
                        value: 'includeBootstrap',
                        name: 'bootstrap',
                        checked: true
                    },
                    {
                        value: 'includeJQuery',
                        name: 'jQuery',
                        checked: true
                    }
                ]
            }
        ];

        this.prompt(prompts, function (props) {
            var exists = function (value,target) { return target.indexOf(value) !== -1; };
            this.projectName = props.projectName;
            this.connect = {
                port: props.connectPort
            };
            this.angularjs = {
                appName: props.angularjsAppName
            };
            this.includes = {
                angular_routes: exists("includeAngularRoute",props.angularModules),
                angular_animate: exists("includeAngularAnimate",props.angularModules),
                bootstrap: exists("includeBootstrap",props.components),
                jQuery: exists("includeJQuery",props.components)
            };

            done();
        }.bind(this));
    },

    app: function () {
        this.mkdir('src');

        this.mkdir('src/html');
        this.template('src/html/_index.html', 'src/html/index.html');

        this.mkdir('src/js');
        this.copy('src/js/.use-strict', 'src/js/.use-strict');
        this.template('src/js/_.prefix', 'src/js/.prefix');
        this.template('src/js/.suffix', 'src/js/.suffix');
        this.mkdir('src/js/app');
        this.template('src/js/app/_module.js', 'src/js/app/module.js');
        this.template('src/js/app/_config.js', 'src/js/app/config.js');
        this.template('src/js/app/_run.js', 'src/js/app/run.js');
        this.mkdir('src/js/app/controllers');
        this.template('src/js/app/controllers/_MainController.js', 'src/js/app/controllers/MainController.js');

        this.mkdir('src/less');
        this.copy('src/less/styles.less', 'src/less/styles.less');

        this.mkdir('src/media');
        this.mkdir('src/media/images');

        this.mkdir('src/templates');

        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');
        this.template('_Gruntfile.js', 'Gruntfile.js');

    },
    projectfiles: function () {
        this.copy('_README.md', 'README.md');
        this.copy('_CHANGELOG.md', 'CHANGELOG.md');
        this.copy('.gitignore', '.gitignore');
    }
});

module.exports = FrontEndGenerator;