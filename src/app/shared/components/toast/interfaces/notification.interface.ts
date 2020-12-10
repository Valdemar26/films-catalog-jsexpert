import { NotificationTypeEnum } from '../enum/notification-type.enum';

export interface NotificationInterface {
  title: string;
  text: string;
  notificationType: NotificationTypeEnum.Error,
  icon: any;
}
