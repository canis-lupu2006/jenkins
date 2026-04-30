pipeline {
    agent any

    environment {
        // Définition des variables d'environnement si nécessaire
        NODEJS_HOME = 'C:\\ProgramData\\nodejs' 
    }

    stages {
        stage('Installation & Check') {
            steps {
                echo "Vérification de l'environnement au Togo..."
                
                // Vérifie la version de Node
                bat 'node -v'
                
                // Correction du "ls" : Utilisation de "dir" pour Windows
                // On utilise un bloc script pour vérifier si le dossier existe avant de lister
                script {
                    if (fileExists('test')) {
                        bat 'dir test'
                    } else {
                        echo "Le dossier 'test' n'existe pas encore, passage à l'étape suivante."
                    }
                }
            }
        }

        stage('Exécution des Tests') {
            steps {
                echo "Lancement des tests unitaires..."
                // bat 'npm test' // Décommentez si vous avez des tests npm
            }
        }

        stage('Déploiement') {
            steps {
                echo "Déploiement en cours..."
            }
        }
    }

    post {
        success {
            echo '✅ Le build a réussi !'
        }
        failure {
            echo '❌ Le build a échoué.'
        }
    }
}