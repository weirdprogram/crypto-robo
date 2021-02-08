package notification

import (
	"github.com/NaySoftware/go-fcm"
)

const (
	serverKey = "YOUR-KEY"
)

func sendToFCM(data *Notification) (*fcm.FcmResponseStatus, error) {
	var notification fcm.NotificationPayload
	notification.Title = data.Title
	notification.ClickAction = data.ClickAction
	notification.Body = data.Body

	extraPayload := data.ExtraPayloads

	ids := data.Ids

	c := fcm.NewFcmClient(serverKey)
	c.NewFcmRegIdsMsg(ids, extraPayload)
	return c.Send()

}
