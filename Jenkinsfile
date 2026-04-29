pipeline {
    agent any

    stages {
        stage('Installation & Check') {
            steps {
                echo 'Vérification de l\'environnement au Togo...'
                // Utilise 'bat' au lieu de 'sh'
                bat 'node -v'
                bat 'dir test' // 'dir' est l'équivalent de 'ls' sur Windows
            }
        }

        stage('Exécution des Tests') {
            steps {
                script {
                    echo 'Lancement de la suite de tests...'
                    
                    // On adapte la boucle pour Windows (plus simple pour débuter)
                    // Si tu n'as qu'un fichier pour l'instant :
                    bat 'node test/test.js'
                }
            }
        }

        stage('Déploiement') {
            steps {
                echo '✅ Tous les tests sont passés !'
                echo 'Déploiement en cours...'
            }
        }
    }

    post {
        failure {
            echo '❌ Le build a échoué.'
        }
    }
}