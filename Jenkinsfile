/* Requires the Docker Pipeline plugin */
pipeline {
    agent { docker { image 'node' } }
    stages {
        stage('build') {
            steps {
                sh 'node -v'
            }
        }
    }
}