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
                sh 'pip3 install selenium pytest'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh '''
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
