NAME := weirdprogram-crypto-robo
RESTART_DELAY := 60000

bash:
	podman exec -it ${NAME} bash
logs:
	podman logs -f ${NAME}
build:
	podman build -t ${NAME} .
clear:
	podman stop ${NAME} && \
	podman rm ${NAME}
stop:
	podman stop ${NAME}
run:
	podman run --rm -it \
	-e NODE_ENV='development' \
	-e RESTART_DELAY=$(RESTART_DELAY) \
	-p 3000:3000 \
	-v ${PWD}:/usr/src/crypto-robo \
	--name ${NAME} -d ${NAME} tail -f /dev/null
run-dev:
	podman run --rm -it \
	-e NODE_ENV='development' \
	-e RESTART_DELAY=$(RESTART_DELAY) \
	-p 3000:3000 \
	-v ${PWD}:/usr/src/crypto-robo \
	--name ${NAME} -d ${NAME} npx pm2 start index.js --restart-delay=${RESTART_DELAY} --no-daemon
run-production:
	podman run --rm -it \
	-e RESTART_DELAY=$(RESTART_DELAY) \
	-p 3000:3000 \
	-e NODE_ENV='production' \
	--name ${NAME} ${NAME} npx pm2 start index.js --restart-delay=${RESTART_DELAY} --no-daemon