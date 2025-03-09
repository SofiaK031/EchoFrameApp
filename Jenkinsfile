pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/SofiaK031/EchoFrameApp.git'
            }
        }
        
        stage('Setup Environment') {
            steps {
                bat 'npm install selenium-webdriver mocha'
            }
        }
        
        stage('Run Tests') {
            steps {
                bat '''
                cd tests
                mocha smokeTests.js --exit --reporter mocha-junit-reporter
                '''
            }
        }
        
        stage('Publish Results') {
            steps {
                junit '**/test-results.xml'
            }
        }
    }
}
