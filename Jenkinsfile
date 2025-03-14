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
                bat 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npx jest --ci'
            }
        }

        stage('Publish Results') {
            steps {
                junit 'EchoFrameApp_Test_Pipeline/reports/jest-junit.xml'
            }
        }
    }
}
