package main

import (
	"github.com/gin-gonic/gin"
	"github.com/weirdprogram/crypto-robo/api/middlewares/cors"
	v1 "github.com/weirdprogram/crypto-robo/api/routers/v1"
)

var router *gin.Engine

func init() {
	router = gin.New()
	router.Use(cors.CORSMiddleware())
	version1 := router.Group("/v1")
	v1.InitRoutes(version1)

}

func main() {
	router.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
