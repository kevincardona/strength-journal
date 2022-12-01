#!/usr/bin/env groovy

Boolean deployImage = env.BRANCH_NAME == 'main'
def apiImage, uiImage
String apiImageName = "192.168.0.63:5000/strength-journal-api"
String uiImageName = "192.168.0.63:5000/strength-journal-ui"

pipeline {
    agent any

    parameters {
        booleanParam(defaultValue: deployImage, name: 'deployImage')
    }

    stages {
        stage('Build Docker Images') {
            parallel {
                stage('Build API Image') {
                    steps { 
                        script {
                            apiImage = docker.build("${apiImageName}", "-f api/Dockerfile ./api")
                        }
                    }
                }

                stage('Build UI Image') {
                    steps { 
                        script {
                            uiImage = docker.build("${uiImageName}", "-f ui/Dockerfile ./ui")
                        }
                    }
                }
            }
        }

        stage('Unit Tests') {
            parallel {
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

                stage('UI Unit Tests') {
                    steps {            
                        dir('ui') {
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

        stage('Deploy') {
            when {
                expression {
                    return params.deployImage
                }
            }
            stages {
                stage("Push Images") {
                    parallel {
                        stage('Push Api Image') {
                            when {
                                expression {
                                    // def imageExists = !sh(returnStatus: true, script: "docker pull ${apiImageName}")
                                    // if (imageExists) { echo("Image ${apiImageName} exists. Skipping push...") }
                                    // return !imageExists
                                    return true
                                }
                            }
                            steps {
                                script {
                                    echo("Pushing api image: ${apiImageName}")
                                    apiImage.push()
                                }
                            }
                        }

                        stage('Push UI Image') {
                            when {
                                expression {
                                    // def imageExists = !sh(returnStatus: true, script: "docker pull ${uiImageName}")
                                    // if (imageExists) { echo("Image ${uiImageName} exists. Skipping push...") }
                                    // return !imageExists
                                    return true
                                }
                            }
                            steps {
                                script {
                                    echo("Pushing ui image: ${uiImageName}")
                                    uiImage.push()
                                }
                            }
                        }
                    }
                }

                stage('Deploy to K3s Beta') {
                    steps {
                        script {
                            sh("kubectl apply -f kubernetes/beta/ui.yaml")
                            sh("kubectl apply -f kubernetes/beta/api.yaml")
                            sh("kubectl scale deployment strength-journal-ui --replicas=0")
                            sh("kubectl scale deployment strength-journal-ui --replicas=1")
                            sh("kubectl scale deployment strength-journal-api --replicas=0")
                            sh("kubectl scale deployment strength-journal-api --replicas=1")
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                sh("docker rm -f -v ${apiImageName} || true")
                sh("docker rm -f -v ${uiImageName} || true")
            }
        }
    }
}