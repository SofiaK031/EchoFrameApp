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
                bat 'pip install selenium pytest'
            }
        }
        
        stage('Run Tests') {
            steps {
                bat '''
                cd tests
                pytest smokeTests.py --maxfail=1 --tb=short
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
