pipeline {
  agent any

  environment {
    DEPLOY_HOST = credentials('rtb_server_host')
    DEPLOY_PORT = credentials('rtb_ssh_port')
    DEPLOY_USER = credentials('rtb_server_user')
    DEPLOY_PASSWORD = credentials('rtb_server_password')
    DOCKER_IMAGE = 'etrainermis/survey-tool'
    DOCKER_CONTAINER='survey-tool'
    GITHUB_TOKEN = credentials('github-token-id')
    REPO = 'etrainermis/survey-tool'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout([$class: 'GitSCM', branches: [
            [name: 'main']
          ],
          userRemoteConfigs: [
            [url: 'https://github.com/etrainermis/survey-tool.git', credentialsId: 'etrainer_org_secret']
          ]
        ])
      }
    }
      stage('Prepare') {
            steps {
                script {
                    echo "Checking out the repository"
                    checkout scm
                    echo "Retrieving SHA"
                    def sha = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    echo "Commit SHA: ${sha}"
                    ETRAINER_FE_SHA = sha
                }
            }
        }
          stage("Set GitHub Status") {
            steps {
                script {
                    def sha = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
                    setGitHubStatus("pending", "Deployment in progress...", sha)
                }
            }
        }

    stage('Debug Workspace') {
      steps {
        script {
          sh 'ls -la'
        }
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          sh """
            echo "Building Docker image..."
            ls
            docker build -t ${DOCKER_IMAGE}:${env.BUILD_ID} -f Dockerfile . &&
            docker tag ${DOCKER_IMAGE}:${env.BUILD_ID} ${DOCKER_IMAGE}:latest
          """
        }
      }
    }

    stage('Deploy Docker Container') {
      steps {
        script {
          sh """
            sshpass -p '${DEPLOY_PASSWORD}' ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST -p $DEPLOY_PORT '
              # Check if the container is already running and stop it if necessary
              if [ \$(docker ps -a -q -f name=${DOCKER_CONTAINER}) ]; then
                echo "Stopping and removing existing container..."
                docker stop -t 10 ${DOCKER_CONTAINER} || docker kill ${DOCKER_CONTAINER}
                docker rm -f ${DOCKER_CONTAINER}
              fi

              # Run the new Docker image
              echo "Deploying new container..."
              docker run -d --restart always --name ${DOCKER_CONTAINER} -p 3435:3435  ${DOCKER_IMAGE}:latest
            '
          """

        }
      }
    }


    stage('Cleanup on Target Server') {
      steps {
        script {
          sh """
            sshpass -p '${DEPLOY_PASSWORD}' ssh -o StrictHostKeyChecking=no $DEPLOY_USER@$DEPLOY_HOST -p $DEPLOY_PORT '
              docker container prune -f &&
              docker image prune -a -f
            '
          """
        }
      }
    }
  }

  post {
    success {
      script {
        // def sha = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
        setGitHubStatus("success", "Deployment succeeded!", ETRAINER_FE_SHA)
      }
    }
    failure {
      script {
          // def sha = sh(script: 'git rev-parse HEAD', returnStdout: true).trim()
          setGitHubStatus("failure", "Deployment failed!", ETRAINER_FE_SHA)
      }
        }
    always {
      cleanWs()
      echo 'The pipeline has completed'
    }
  }
}


def setGitHubStatus(status, description, sha) {
    def context = "ci/jenkins"
    
    if (!sha) {
        echo "Warning: No SHA available. Skipping GitHub status update."
        return
    }

    def apiUrl = "https://api.github.com/repos/${env.REPO}/statuses/${sha}"
    
    // Log parameters to ensure they're being passed correctly
    echo "Setting GitHub status for SHA: ${sha}, status: ${status}, description: ${description}"

    withCredentials([string(credentialsId: 'github-token-id', variable: 'GITHUB_TOKEN')]) {
        sh """
            curl -L \
              -X POST \
              -H "Accept: application/vnd.github+json" \
              -H "Authorization: Bearer ${GITHUB_TOKEN}" \
              -H "X-GitHub-Api-Version: 2022-11-28" \
              ${apiUrl} \
              -d '{
                "state": "${status}",
                "description": "${description}",
                "context": "ci/jenkins",
                "target_url": "${BUILD_URL}"
              }'
        """
    }
}
