#!/usr/bin/env bash

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

configure_aws_cli(){
	aws --version
	aws configure set default.region eu-central-1
	aws configure set default.output json
}

deploy_cluster() {

    family="front-family"

    make_task_def
    register_definition
    if [[ $(aws ecs update-service --cluster etg --service etg-front --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi

    for attempt in {1..60}; do
        if stale=$(aws ecs describe-services --cluster etg --services etg-front | \
                       $JQ ".services[0].deployments | .[] | select(.taskDefinition != \"$revision\") | .taskDefinition"); then
            echo "Waiting for stale deployments:"
            echo "$stale"
            sleep 30
        else
            echo "Deployed!"
            return 0
        fi
    done
    echo "Service update took too long."
    return 1
}

make_task_def(){
	task_template='[
		{
			"name": "frontend",
			"image": "%s.dkr.ecr.eu-central-1.amazonaws.com/front:%s",
			"essential": true,
			"memory": 200,
			"cpu": 10,
			"portMappings": [
				{
					"containerPort": 2000,
					"hostPort": 0
				}
			],
            "environment" : [
                { "name" : "MAPMAKERURL", "value" : "http://etg-balancer-862594806.eu-central-1.elb.amazonaws.com:3000" },
                { "name" : "HIGHSCOREURL", "value" : "http://etg-balancer-862594806.eu-central-1.elb.amazonaws.com:4000" }
            ]
		}
	]'
	
	task_def=$(printf "$task_template" $AWS_ACCOUNT_ID $CIRCLE_SHA1)
}

push_ecr_image(){
	eval $(aws ecr get-login --region eu-central-1)
	docker push $AWS_ACCOUNT_ID.dkr.ecr.eu-central-1.amazonaws.com/front:$CIRCLE_SHA1
}

register_definition() {

    if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family $family | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi

}

configure_aws_cli
push_ecr_image
deploy_cluster