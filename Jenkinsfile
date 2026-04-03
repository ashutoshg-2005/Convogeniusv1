pipeline {
  agent any

  tools {
    nodejs 'Node 20'
  }

  triggers {
    pollSCM('H/2 * * * *')
  }

  options {
    timestamps()
  }

  environment {
    CI = 'true'
    NEXT_TELEMETRY_DISABLED = '1'
    DATABASE_URL = credentials('DATABASE_URL')
    BETTER_AUTH_SECRET = credentials('BETTER_AUTH_SECRET')
    OPENAI_API_KEY = credentials('OPENAI_API_KEY')
    NEXT_PUBLIC_APP_URL = credentials('NEXT_PUBLIC_APP_URL')
    POLAR_ACCESS_TOKEN = credentials('POLAR_ACCESS_TOKEN')
    SMTP_HOST = credentials('SMTP_HOST')
    SMTP_PORT = credentials('SMTP_PORT')
    SMTP_USER = credentials('SMTP_USER')
    SMTP_PASS = credentials('SMTP_PASS')
    SMTP_FROM_NAME = credentials('SMTP_FROM_NAME')
    SMTP_FROM_EMAIL = credentials('SMTP_FROM_EMAIL')
    GITHUB_CLIENT_ID = credentials('GITHUB_CLIENT_ID')
    GITHUB_CLIENT_SECRET = credentials('GITHUB_CLIENT_SECRET')
    GOOGLE_CLIENT_ID = credentials('GOOGLE_CLIENT_ID')
    GOOGLE_CLIENT_SECRET = credentials('GOOGLE_CLIENT_SECRET')
    NEXT_PUBLIC_STREAM_CHAT_API_KEY = credentials('NEXT_PUBLIC_STREAM_CHAT_API_KEY')
    STREAM_CHAT_SECRET_KEY = credentials('STREAM_CHAT_SECRET_KEY')
    NEXT_PUBLIC_SECRET_STREAM_VIDEO_API_KEY = credentials('NEXT_PUBLIC_SECRET_STREAM_VIDEO_API_KEY')
    STREAM_VIDEO_SECRET_KEY = credentials('STREAM_VIDEO_SECRET_KEY')
    VERCEL_TOKEN = credentials('VERCEL_TOKEN')
    VERCEL_PROJECT_ID = credentials('VERCEL_PROJECT_ID')
    VERCEL_ORG_ID = credentials('VERCEL_ORG_ID')
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install') {
      steps {
        script {
          runCommand('npm ci --legacy-peer-deps')
        }
      }
    }

    stage('Lint') {
      steps {
        script {
          runCommand('npm run lint')
        }
      }
    }

    stage('Build') {
      steps {
        script {
          runCommand('npm run build')
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          def currentBranch = env.BRANCH_NAME ?: env.GIT_BRANCH ?: env.GIT_LOCAL_BRANCH ?: ''

          if (!currentBranch?.trim()) {
            currentBranch = isUnix()
              ? sh(script: 'git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
              : bat(script: '@git rev-parse --abbrev-ref HEAD', returnStdout: true).trim()
          }

          currentBranch = currentBranch
            .replace('refs/heads/', '')
            .replace('origin/', '')
            .replace('*/', '')
            .trim()

          if (currentBranch != 'main') {
            echo "Skipping deploy because branch is ${currentBranch}"
            return
          }

          def vercelProjectJson = """{"projectId":"${env.VERCEL_PROJECT_ID}","orgId":"${env.VERCEL_ORG_ID}"}"""

          if (isUnix()) {
            sh 'mkdir -p .vercel'
            writeFile file: '.vercel/project.json', text: vercelProjectJson
            runCommand('npx vercel pull --yes --environment=production --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID')
            runCommand('npx vercel deploy --prod --yes --token=$VERCEL_TOKEN --scope=$VERCEL_ORG_ID')
            return
          }

          bat 'if not exist .vercel mkdir .vercel'
          writeFile file: '.vercel\\project.json', text: vercelProjectJson
          runCommand('npx vercel pull --yes --environment=production --token=%VERCEL_TOKEN% --scope=%VERCEL_ORG_ID%')
          runCommand('npx vercel deploy --prod --yes --token=%VERCEL_TOKEN% --scope=%VERCEL_ORG_ID%')
        }
      }
    }
  }
}

def runCommand(String command) {
  if (isUnix()) {
    sh command
    return
  }

  bat command
}
