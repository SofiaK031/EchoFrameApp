pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/SofiaK031/EchoFrameApp.git'
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
                cd smokeTests_Prof_pr_5/tests
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
