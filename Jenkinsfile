def apiImage

/* Requires the Docker Pipeline plugin */
pipeline {
    agent any
    stages {
        stage('Build API Image') {
            steps { 
                script {
                    apiImage = docker.build("api-image", "-f api/Dockerfile ./api")
                }
            }
        }

        stage('API Unit Tests') {
            steps {            
                dir('api') {
                    script {
                        apiImage.inside("-u 0:0 --entrypoint=''") {
                            sh('cd $APP_PATH && yarn test')
                        }
                    }
                }
            }
        }
    }
}