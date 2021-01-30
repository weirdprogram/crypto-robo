PORT := 53000
NAME := weirdprogram-crypto-robo

build:
	docker build -t ${NAME} .
clear:
	docker stop ${NAME} && \
	docker rm ${NAME}
run:
	docker run --rm -it \
	-e PORT=${PORT} \
	-e NODE_ENV='development' \
	-p ${PORT}:${PORT} \
	-v ${PWD}:/usr/src/crypto-robo \
	--name ${NAME} -d ${NAME}