import * as NotificationUseCases from "../../APPLICATION/usecases/notification/index.js";

export const ScheduleNotificationUseCase =
  NotificationUseCases.ScheduleNotification();
export const SendEmailNotificationUseCase =
  NotificationUseCases.SendEmailNotification();
export const SendPushNotificationUseCase =
  NotificationUseCases.SendPushNotification();
export const SendSMSNotificationUseCase =
  NotificationUseCases.SendSMSNotification();
export const SubscribeToTopicUseCase = NotificationUseCases.SubscribeToTopic();
export const UnsubscribeFromTopicUseCase =
  NotificationUseCases.UnsubscribeFromTopic();
