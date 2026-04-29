pipeline {
    agent any

    stages {
        stage('Installation & Check') {
            steps {
                echo 'Vérification de l\'environnement au Togo...'
                sh 'node -v'
                // On s'assure que le dossier test existe
                sh 'ls test/' 
            }
        }

        stage('Exécution des Tests') {
            steps {
                script {
                    echo 'Lancement de la suite de tests dans le dossier test/...'
                    
                    // Cette commande cherche tous les fichiers .js dans test/ 
                    // et les exécute un par un avec Node.js
                    sh '''
                        for f in test/*.js; do
                            echo "Exécution de : $f"
                            node "$f" || exit 1
                        done
                    '''
                }
            }
        }

        stage('Déploiement') {
            // Cette étape ne s'exécute que si l'étape précédente est un succès total
            steps {
                echo '✅ Tous les tests sont passés !'
                echo 'Déploiement de "La Tablée Togolaise" en cours sur le serveur...'
                // Ici tu mettrais tes commandes de déploiement réelles (ex: scp, rsync, etc.)
            }
        }
    }

    post {
        always {
            echo 'Fin du build.'
        }
        failure {
            echo '❌ Le build a échoué. Vérifie les logs de tes fichiers dans le dossier test/.'
        }
    }
}