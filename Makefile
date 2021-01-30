NAME := weirdprogram-crypto-robo
RESTART_DELAY := 60000

bash:
	docker exec -it ${NAME} bash
logs:
	docker logs -f ${NAME}
build:
	docker build -t ${NAME} .
clear:
	docker stop ${NAME} && \
	docker rm ${NAME}
stop:
	docker stop ${NAME}
run-dev:
	docker run --rm -it \
	-e NODE_ENV='development' \
	-e RESTART_DELAY=$(RESTART_DELAY) \
	-p ${PORT}:${PORT} \
	-v ${PWD}:/usr/src/crypto-robo \
	--name ${NAME} -d ${NAME} npx pm2 start index.js --restart-delay=${RESTART_DELAY} --no-daemon
run-production:
	docker run --rm -it \
	-e RESTART_DELAY=$(RESTART_DELAY) \
	-e NODE_ENV='production' \
	--name ${NAME} ${NAME} npx pm2 start index.js --restart-delay=${RESTART_DELAY} --no-daemon