package notification

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/weirdprogram/crypto-robo/api/core/models"
)

func AlertCryptoNotification(ctx *gin.Context) {
	var statuscode int
	var data interface{}
	var message string
	var listError []models.ErrorModel
	var alertCryptoNotification AlertCryptoNotificationRequest
	var notification Notification

	endpoint := ctx.Request.URL.String()
	method := ctx.Request.Method

	ctx.BindJSON(&alertCryptoNotification)

	titleTemplate := map[string]string{
		"BUY":  "Prepare your money!! BUY!!",
		"SELL": "Eye on chart. SELL!!",
	}

	bodyTemplate := alertCryptoNotification.Indicator + "Indicate to Buy " +
		alertCryptoNotification.Pair + "with closing price: " +
		fmt.Sprintf("%f", alertCryptoNotification.ClosePrice)

	notification.Title = titleTemplate[alertCryptoNotification.Type]
	notification.Body = bodyTemplate
	notification.ClickAction = alertCryptoNotification.URL

	// Read token from db or
	notification.Ids = []string{}

	result, err := sendToFCM(&notification)

	if err != nil {
		message = err.Error()
		statuscode = http.StatusBadGateway
	} else {
		message = "Success Sent notification"
		statuscode = http.StatusOK
		data = result
	}

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
