/*
pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                bat 'npx jest --ci --reporters=default --reporters=jest-junit'
            }
        }

    }

    post {
        always {
            junit 'jest-junit.xml'
        }
    }
}
*/



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
                bat 'npx jest --ci --reporters=default --reporters=jest-junit'
            }
        }

        stage('Publish Results') {
            steps {
                junit 'jest-junit.xml'
            }
        }
    }
}
