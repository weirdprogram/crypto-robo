package notification

import (
	"github.com/gin-gonic/gin"
	"github.com/weirdprogram/crypto-robo/api/core/models"
)

func SendSingleTarget(ctx *gin.Context) {
	var statuscode int
	var data interface{}
	var message string
	var listError []models.ErrorModel

	endpoint := ctx.Request.URL.String()
	method := ctx.Request.Method

	message = "Hello World"
	statuscode = 200

	responseModel := &models.ResponseModel{
		Statuscode: statuscode,
		Message:    message,
		Data:       data,
		ListError:  listError,
		Endpoint:   endpoint,
		Method:     method,
	}

	content := responseModel.NewResponse()
	ctx.JSON(statuscode, content)
}
