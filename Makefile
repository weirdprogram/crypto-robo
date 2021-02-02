NAME := weirdprogram-crypto-robo
CONTAINER_CMD := podman

bash:
	${CONTAINER_CMD} exec -it ${NAME} bash
logs:
	${CONTAINER_CMD} logs -f ${NAME}
build:
	${CONTAINER_CMD} build -t ${NAME} .
clear:
	${CONTAINER_CMD} stop ${NAME} && \
	${CONTAINER_CMD} rm ${NAME}
stop:
	${CONTAINER_CMD} stop ${NAME}
run:
	${CONTAINER_CMD} run --rm -it \
	-e NODE_ENV='development' \
	-p 3000:3000 \
	-v ${PWD}:/usr/src/crypto-robo \
	--name ${NAME} -d ${NAME} tail -f /dev/null
run-indodax-ws-client:
	${CONTAINER_CMD} run --rm -it \
    -e DATA_FOLDER=/usr/src/crypto-robo/data \
    -v ${PWD}/data:/usr/src/crypto-robo/data:z \
    -w /usr/src/crypto-robo/cmd \
	--name ${NAME}-indodax-ws-client -d ${NAME} npx pm2 start indodax_ws_client.js --no-daemon
run-dev:
	${CONTAINER_CMD} run --rm -it \
	-e NODE_ENV='development' \
	-p 3000:3000 \
	-v ${PWD}:/usr/src/crypto-robo \
	--name ${NAME} -d ${NAME} npx pm2 start index.js --no-daemon
run-production:
	${CONTAINER_CMD} run --rm -it \
	-p 3000:3000 \
	-e NODE_ENV='production' \
	--name ${NAME} ${NAME} npx pm2 start index.js --no-daemon
